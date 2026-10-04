import { beforeAll, describe, expect, it } from "vitest";
import { detectIntegration, resolveEntities } from "../src/utils";
import { XiaomiSmartPetFountainCard } from "../src/components/card";
import type { XiaomiSmartPetFountainCardConfig } from "../src/types/config";
import {
  $,
  $$,
  BASE,
  entity,
  fountain2Entities,
  fountainEntities,
  makeFountain2Hass,
  makeHass,
  mountCard,
  P2,
} from "./helpers";

const TYPE = "custom:xiaomi-smart-pet-fountain-2-card";
const config = (
  c: Partial<XiaomiSmartPetFountainCardConfig>,
): XiaomiSmartPetFountainCardConfig =>
  ({ type: TYPE, entity: "", ...c }) as XiaomiSmartPetFountainCardConfig;

/** What the card must find on a xiaomi_pet_fountain_2 device. */
const EXPECTED = {
  powerSwitch: `switch.${P2}_power`,
  mode: `select.${P2}_mode`,
  filterLifeLevel: `sensor.${P2}_filter_life`,
  filterLeftTime: `sensor.${P2}_filter_time_left`,
  batteryLevel: `sensor.${P2}_battery`,
  chargingState: `sensor.${P2}_charging_state`,
  waterShortage: `binary_sensor.${P2}_water_shortage`,
  physicalControlLock: `switch.${P2}_child_lock`,
  noDisturb: `switch.${P2}_do_not_disturb`,
  outWaterInterval: `number.${P2}_water_interval`,
  outWaterInterval2: `number.${P2}_water_interval_5_min_steps`,
  resetFilterButton: `button.${P2}_reset_filter`,
  pumpBlocked: `binary_sensor.${P2}_pump_blocked`,
  fault: `binary_sensor.${P2}_fault`,
  keepMode: `switch.${P2}_keep_mode`,
  lastModeRestore: `sensor.${P2}_last_mode_restoration`,
};

describe("xiaomi_pet_fountain_2 resolution", () => {
  const { states } = fountain2Entities();

  it.each(states.map((s) => s.entity_id))(
    "finds every entity from %s",
    (picked) => {
      const hass = makeFountain2Hass();
      expect(detectIntegration(hass, picked)).toBe("xiaomi_pet_fountain_2");
      const { entities, integration, missing } = resolveEntities(
        hass,
        config({ entity: picked }),
      );
      expect(integration).toBe("xiaomi_pet_fountain_2");
      expect(entities).toEqual(EXPECTED);
      expect(missing).toEqual([]);
    },
  );

  it("finds renamed entities by translation_key, the battery by device class", () => {
    const rename = (id: string) => id.replace(P2, "cat_water");
    const { states, registry } = fountain2Entities({}, "dev", (id) =>
      id === `sensor.${P2}_battery`
        ? "sensor.cat_water_accu"
        : rename(id).replace("_power", "_pump"),
    );
    const hass = makeHass(states, "en", { entities: registry });
    const { entities, missing } = resolveEntities(
      hass,
      config({ entity: "select.cat_water_mode" }),
    );
    expect(entities.powerSwitch).toBe("switch.cat_water_pump");
    expect(entities.batteryLevel).toBe("sensor.cat_water_accu");
    // binary_sensor.cat_water_mains_pump (usb_power) is never the power switch
    expect(entities.filterLeftTime).toBe("sensor.cat_water_filter_time_left");
    expect(missing).toEqual([]);
  });

  it("falls back to the entity_id suffix when the registry has no translation_key", () => {
    const { states, registry } = fountain2Entities();
    for (const e of Object.values(registry)) delete e.translation_key;
    const hass = makeHass(states, "en", { entities: registry });
    const { entities, missing } = resolveEntities(
      hass,
      config({ entity: `switch.${P2}_power` }),
    );
    expect(entities).toEqual(EXPECTED);
    expect(missing).toEqual([]);
  });

  it("prefers xiaomi_pet_fountain_2 on a device shared with Xiaomi Miot Auto", () => {
    // Both integrations register the MAC: Home Assistant merges the devices
    const local = fountain2Entities({}, "shared");
    const miot = fountainEntities();
    const registry: Record<string, unknown> = { ...local.registry };
    for (const e of miot) {
      registry[e.entity_id] = {
        entity_id: e.entity_id,
        device_id: "shared",
        platform: "xiaomi_miot",
      };
    }
    const hass = makeHass([...local.states, ...miot], "en", {
      entities: registry,
    });
    const picked = `switch.${BASE}_pet_drinking_fountain`;
    expect(detectIntegration(hass, picked)).toBe("xiaomi_pet_fountain_2");
    const { entities } = resolveEntities(hass, config({ entity: picked }));
    expect(entities).toEqual(EXPECTED);
  });

  it("keeps Xiaomi Miot Auto devices on the Miot Auto discovery", () => {
    const miot = fountainEntities();
    const registry = Object.fromEntries(
      miot.map((e) => [
        e.entity_id,
        { entity_id: e.entity_id, device_id: "m", platform: "xiaomi_miot" },
      ]),
    );
    const hass = makeHass(miot, "en", { entities: registry });
    const { entities, integration } = resolveEntities(
      hass,
      config({ entity: `select.${BASE}_mode` }),
    );
    expect(integration).toBe("xiaomi_miot");
    expect(entities.powerSwitch).toBe(`switch.${BASE}_pet_drinking_fountain`);
    expect(entities.pumpBlocked).toBeUndefined();
  });

  it("never mixes in the entities of another fountain", () => {
    const a = fountain2Entities({}, "a");
    const b = fountain2Entities({}, "b", (id) => id.replace(P2, "other"));
    const hass = makeHass([...a.states, ...b.states], "en", {
      entities: { ...a.registry, ...b.registry },
    });
    const { entities } = resolveEntities(
      hass,
      config({ entity: "sensor.other_filter_life" }),
    );
    expect(entities.mode).toBe("select.other_mode");
    expect(entities.powerSwitch).toBe("switch.other_power");
  });

  it("gives the overrides priority", () => {
    const hass = makeFountain2Hass();
    hass.states["number.kitchen_interval"] = entity("number.kitchen_interval", "20");
    const { entities } = resolveEntities(
      hass,
      config({
        entity: `switch.${P2}_power`,
        water_interval_entity: `number.${P2}_water_interval_5_min_steps`,
        battery_entity: "sensor.typo",
      }),
    );
    expect(entities.outWaterInterval).toBe(
      `number.${P2}_water_interval_5_min_steps`,
    );
    expect(entities.batteryLevel).toBe("sensor.typo");
    expect(entities.mode).toBe(`select.${P2}_mode`);
  });

  it("reports the entities the integration did not create", () => {
    const { states, registry } = fountain2Entities();
    const kept = states.filter((s) => !s.entity_id.endsWith("_charging_state"));
    const hass = makeHass(kept, "en", { entities: registry });
    const { missing } = resolveEntities(
      hass,
      config({ entity: `switch.${P2}_power` }),
    );
    expect(missing).toEqual(["charging_state_entity"]);
  });
});

describe("getStubConfig", () => {
  it("picks the xiaomi_pet_fountain_2 power switch first", () => {
    const local = fountain2Entities();
    const hass = makeHass([...fountainEntities(), ...local.states], "en", {
      entities: local.registry,
    });
    expect(XiaomiSmartPetFountainCard.getStubConfig(hass).entity).toBe(
      `switch.${P2}_power`,
    );
  });
});

// jsdom has HTMLDialogElement but not its modal API: minimal stand-in.
beforeAll(() => {
  const proto = HTMLDialogElement.prototype as any;
  if (typeof proto.showModal !== "function") {
    proto.showModal = function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
    proto.close = function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    };
  }
});

const button = (el: HTMLElement, icon: string) =>
  $$(el, "button.control-button").find(
    (b) => b.querySelector("ha-icon")?.getAttribute("icon") === icon,
  ) as HTMLButtonElement;

describe("card with xiaomi_pet_fountain_2", () => {
  it("renders the device without missing entities", async () => {
    const el = await mountCard({ entity: `select.${P2}_mode` }, makeFountain2Hass());
    expect($(el, ".missing-banner")).toBeNull();
    expect($(el, ".gauge-value")!.textContent!.trim()).toBe("80%");
    expect(button(el, "mdi:power").disabled).toBe(false);
  });

  it("resets the filter with button.press on the integration's button", async () => {
    const hass = makeFountain2Hass();
    const el = await mountCard({ entity: `switch.${P2}_power` }, hass);
    button(el, "mdi:air-filter").click();
    ($(el, ".dialog-button.confirm") as HTMLButtonElement).click();
    expect(hass.callService).toHaveBeenCalledWith("button", "press", {
      entity_id: `button.${P2}_reset_filter`,
    });
  });

  it("toggles the power, child lock and do-not-disturb switches", async () => {
    const hass = makeFountain2Hass();
    const el = await mountCard({ entity: `switch.${P2}_power` }, hass);
    button(el, "mdi:power").click();
    button(el, "mdi:lock").click();
    button(el, "mdi:bell-off").click();
    expect(hass.callService.mock.calls).toEqual([
      ["homeassistant", "turn_off", { entity_id: `switch.${P2}_power` }],
      ["homeassistant", "turn_on", { entity_id: `switch.${P2}_child_lock` }],
      ["homeassistant", "turn_on", { entity_id: `switch.${P2}_do_not_disturb` }],
    ]);
  });

  it("shows the pump blocked and fault icons only while they are on", async () => {
    let el = await mountCard({ entity: `switch.${P2}_power` }, makeFountain2Hass());
    expect($$(el, "ha-icon.fault")).toHaveLength(0);

    el = await mountCard(
      { entity: `switch.${P2}_power` },
      makeFountain2Hass({
        [`binary_sensor.${P2}_pump_blocked`]: "on",
        [`binary_sensor.${P2}_fault`]: "on",
      }),
    );
    const icons = $$(el, "ha-icon.fault").map((i) => i.getAttribute("icon"));
    expect(icons).toEqual(["mdi:pump-off", "mdi:alert-circle"]);
    const labels = $$(el, ".icon-indicator[role=img]").map((d) =>
      d.getAttribute("aria-label"),
    );
    expect(labels).toContain("Pump blocked");
    expect(labels).toContain("Device fault");
  });
});
