import { describe, expect, it } from "vitest";
import { resolveEntities } from "../src/utils";
import { ENTITY_OVERRIDE_KEYS } from "../src/utils/entity-finder";
import { XiaomiSmartPetFountainCard } from "../src/components/card";
import type { XiaomiSmartPetFountainCardConfig } from "../src/types/config";
import {
  $,
  $$,
  BASE,
  entity,
  fountainEntities,
  makeHass,
  mountCard,
} from "./helpers";

const TYPE = "custom:xiaomi-smart-pet-fountain-2-card";
const config = (
  c: Partial<XiaomiSmartPetFountainCardConfig>,
): XiaomiSmartPetFountainCardConfig =>
  ({ type: TYPE, entity: "", ...c }) as XiaomiSmartPetFountainCardConfig;

describe("resolveEntities", () => {
  it("discovers everything from the base name of an old `entity:` config", () => {
    const hass = makeHass(fountainEntities());
    const { entities, missing } = resolveEntities(
      hass,
      config({ entity: `select.${BASE}_mode` }),
    );
    expect(entities.powerSwitch).toBe(`switch.${BASE}_pet_drinking_fountain`);
    expect(entities.mode).toBe(`select.${BASE}_mode`);
    expect(missing).toEqual([]);
  });

  it("gives an override priority over the auto-discovery", () => {
    const hass = makeHass([
      ...fountainEntities(),
      entity("sensor.kitchen_fountain_battery", "50"),
    ]);
    const { entities } = resolveEntities(
      hass,
      config({
        entity: `switch.${BASE}_pet_drinking_fountain`,
        battery_entity: "sensor.kitchen_fountain_battery",
      }),
    );
    expect(entities.batteryLevel).toBe("sensor.kitchen_fountain_battery");
    expect(entities.mode).toBe(`select.${BASE}_mode`);
  });

  it("finds renamed entities through the device in the entity registry", () => {
    // The device was renamed: entities no longer share the picked base name
    const states = fountainEntities({}, "kitchen_fountain");
    const registry = Object.fromEntries(
      [
        ...states.map((e) => [e.entity_id, { entity_id: e.entity_id, device_id: "dev1" }]),
        ["switch.other_pet_drinking_fountain", { entity_id: "switch.other_pet_drinking_fountain", device_id: "dev2" }],
      ],
    );
    const picked = entity("switch.water_for_the_cat", "on");
    registry[picked.entity_id] = { entity_id: picked.entity_id, device_id: "dev1" };
    const hass = makeHass(
      [...states, picked, entity("switch.other_pet_drinking_fountain", "off")],
      "en",
      { entities: registry },
    );
    const { entities, missing } = resolveEntities(
      hass,
      config({ entity: picked.entity_id }),
    );
    expect(entities.powerSwitch).toBe(
      "switch.kitchen_fountain_pet_drinking_fountain",
    );
    expect(entities.mode).toBe("select.kitchen_fountain_mode");
    expect(entities.outWaterInterval).toBe(
      "number.kitchen_fountain_out_water_interval",
    );
    expect(entities.outWaterInterval2).toBe(
      "number.kitchen_fountain_out_water_interval_2",
    );
    expect(missing).toEqual([]);
  });

  it("uses a switch with an unknown name as power switch (backwards compatible)", () => {
    const hass = makeHass([entity("switch.fountain", "on")]);
    const { entities, missing } = resolveEntities(
      hass,
      config({ entity: "switch.fountain" }),
    );
    expect(entities.powerSwitch).toBe("switch.fountain");
    expect(missing).not.toContain("power_entity");
  });

  it("never uses a non-switch entity as power switch", () => {
    const hass = makeHass([entity("sensor.fountain_level", "50")]);
    const { entities, missing } = resolveEntities(
      hass,
      config({ entity: "sensor.fountain_level" }),
    );
    expect(entities.powerSwitch).toBeUndefined();
    expect(missing).toEqual(ENTITY_OVERRIDE_KEYS);
  });

  it("does not take the no-disturb switch for the power switch", () => {
    const hass = makeHass(
      fountainEntities().filter((e) => !e.entity_id.endsWith("_pet_drinking_fountain")),
    );
    const { entities, missing } = resolveEntities(
      hass,
      config({ entity: `switch.${BASE}_no_disturb` }),
    );
    expect(entities.powerSwitch).toBeUndefined();
    expect(missing).toEqual(["power_entity"]);
  });

  it("reports an override pointing to a missing entity", () => {
    const hass = makeHass(fountainEntities());
    const { missing } = resolveEntities(
      hass,
      config({
        entity: `switch.${BASE}_pet_drinking_fountain`,
        mode_entity: "select.typo",
      }),
    );
    expect(missing).toEqual(["mode_entity"]);
  });
});

describe("card with missing entities", () => {
  it("lists the missing entities in a banner", async () => {
    const hass = makeHass(
      fountainEntities().filter(
        (e) => !/_mode$|_battery_level$/.test(e.entity_id),
      ),
    );
    const el = await mountCard(
      { entity: `switch.${BASE}_pet_drinking_fountain` },
      hass,
    );
    const banner = $(el, ".missing-banner")!;
    expect(banner.textContent).toContain("mode_entity");
    expect(banner.textContent).toContain("battery_entity");
    expect(banner.textContent).not.toContain("power_entity");
  });

  it("shows no banner when everything is found", async () => {
    const el = await mountCard(
      { entity: `switch.${BASE}_pet_drinking_fountain` },
      makeHass(fountainEntities()),
    );
    expect($(el, ".missing-banner")).toBeNull();
  });

  it("disables the power button instead of reading another entity", async () => {
    const hass = makeHass([entity(`sensor.${BASE}_filter_life_level`, "50")]);
    const el = await mountCard(
      { entity: `sensor.${BASE}_filter_life_level` },
      hass,
    );
    const power = $$(el, "button.control-button").find(
      (b) => b.querySelector("ha-icon")?.getAttribute("icon") === "mdi:power",
    )!;
    expect((power as HTMLButtonElement).disabled).toBe(true);
  });
});

describe("getStubConfig", () => {
  it("picks a fountain of this Home Assistant, not the author's", () => {
    const hass = makeHass(fountainEntities({}, "xiaomi_iv02_1234"));
    expect(XiaomiSmartPetFountainCard.getStubConfig(hass).entity).toBe(
      "switch.xiaomi_iv02_1234_pet_drinking_fountain",
    );
  });

  it("leaves the entity empty when there is no fountain", () => {
    const hass = makeHass([entity("switch.lamp", "on")]);
    expect(XiaomiSmartPetFountainCard.getStubConfig(hass).entity).toBe("");
    expect(XiaomiSmartPetFountainCard.getStubConfig().entity).toBe("");
  });
});
