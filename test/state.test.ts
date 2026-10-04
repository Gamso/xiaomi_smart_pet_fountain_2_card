import { describe, expect, it } from "vitest";
import { knownState, numericState, percentState } from "../src/utils";
import {
  $,
  $$,
  BASE,
  entity,
  fountainEntities,
  makeHass,
  mountCard,
} from "./helpers";

describe("state helpers", () => {
  it("treat missing, unavailable and unknown as undefined, never 0", () => {
    for (const s of ["unavailable", "unknown", "", "abc"]) {
      expect(numericState(entity("sensor.x", s))).toBeUndefined();
    }
    expect(numericState(undefined)).toBeUndefined();
    expect(numericState(null)).toBeUndefined();
    expect(knownState(entity("sensor.x", "unavailable"))).toBeUndefined();
    expect(knownState(entity("sensor.x", "no charge"))).toBe("no charge");
  });

  it("keep a real 0", () => {
    expect(numericState(entity("sensor.x", "0"))).toBe(0);
  });

  it("clamp percentages to 0-100", () => {
    expect(percentState(entity("sensor.x", "120"))).toBe(100);
    expect(percentState(entity("sensor.x", "-3"))).toBe(0);
    expect(percentState(entity("sensor.x", "unavailable"))).toBeUndefined();
  });
});

const POWER = `switch.${BASE}_pet_drinking_fountain`;
const batteryIcon = (el: HTMLElement) =>
  $(el, ".status-icons-row ha-icon:not(.water-shortage)");

describe("card battery indicator", () => {
  it("shows battery-unknown, not a red alert, when the sensors are unavailable", async () => {
    const hass = makeHass(
      fountainEntities({
        [`sensor.${BASE}_battery_level`]: "unavailable",
        [`sensor.${BASE}_charging_state`]: "unavailable",
      }),
    );
    const el = await mountCard({ entity: POWER }, hass);
    const icon = batteryIcon(el)!;
    expect(icon.getAttribute("icon")).toBe("mdi:battery-unknown");
    expect(icon.className).not.toContain("critical");
  });

  it("hides the indicator when neither battery entity exists", async () => {
    const hass = makeHass(
      fountainEntities().filter(
        (e) => !/_battery_level$|_charging_state$/.test(e.entity_id),
      ),
    );
    const el = await mountCard({ entity: POWER }, hass);
    expect(batteryIcon(el)).toBeNull();
  });

  it("keeps the red alert for a real empty battery", async () => {
    const hass = makeHass(
      fountainEntities({
        [`sensor.${BASE}_battery_level`]: "0",
        [`sensor.${BASE}_charging_state`]: "no charge",
      }),
    );
    const el = await mountCard({ entity: POWER }, hass);
    const icon = batteryIcon(el)!;
    expect(icon.getAttribute("icon")).toBe("mdi:battery-alert");
    expect(icon.className).toContain("critical-icon-pulse");
  });
});

describe("card filter gauge", () => {
  it("shows -- and no critical arc when the filter sensor is unavailable", async () => {
    const hass = makeHass(
      fountainEntities({
        [`sensor.${BASE}_filter_life_level`]: "unavailable",
        [`sensor.${BASE}_filter_left_time`]: "unavailable",
      }),
    );
    const el = await mountCard({ entity: POWER }, hass);
    expect($(el, ".gauge-value")!.textContent!.trim()).toBe("--");
    expect($(el, ".gauge-progress")).toBeNull();
    expect($(el, ".gauge-svg title")!.textContent).toBe("");
  });

  it("keeps the critical arc for a real 0 % and rounds the value", async () => {
    let el = await mountCard(
      { entity: POWER },
      makeHass(fountainEntities({ [`sensor.${BASE}_filter_life_level`]: "0" })),
    );
    expect($$(el, ".gauge-progress.critical")).toHaveLength(1);

    el = await mountCard(
      { entity: POWER },
      makeHass(
        fountainEntities({
          [`sensor.${BASE}_filter_life_level`]: "66.6",
          [`sensor.${BASE}_filter_left_time`]: "12.4",
        }),
      ),
    );
    expect($(el, ".gauge-value")!.textContent!.trim()).toBe("67%");
    expect($(el, ".gauge-svg title")!.textContent).toBe("12 days left");
  });
});
