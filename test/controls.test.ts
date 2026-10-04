import { describe, expect, it, vi } from "vitest";
import {
  buildIntervalOptions,
  MAX_INTERVAL_OPTIONS,
} from "../src/utils/interval-utils";
import { $, $$, BASE, fountainEntities, makeHass, mountCard } from "./helpers";

describe("buildIntervalOptions", () => {
  it("builds the grid from the entity attributes", () => {
    expect(buildIntervalOptions(0, 30, 5)).toEqual([10, 15, 20, 25, 30]);
  });

  it("stays on the entity's step grid from 10 min up", () => {
    // xiaomi_pet_fountain_2 MIoT 2.7 and 2.11
    expect(buildIntervalOptions(0, 120, 15)).toEqual([
      15, 30, 45, 60, 75, 90, 105, 120,
    ]);
    expect(buildIntervalOptions(10, 30, 5)).toEqual([10, 15, 20, 25, 30]);
    expect(buildIntervalOptions(1, 20, 3)).toEqual([10, 13, 16, 19]);
  });

  it("keeps the historical defaults when attributes are missing", () => {
    expect(buildIntervalOptions(undefined, undefined, undefined)).toEqual([
      10, 25, 40, 55, 70, 85, 100, 115,
    ]);
  });

  it("does not loop forever on a zero or negative step", () => {
    expect(buildIntervalOptions(0, 15, 0)).toEqual([
      10, 11, 12, 13, 14, 15,
    ]);
    expect(buildIntervalOptions(0, 12, -5)).toEqual([10, 11, 12]);
  });

  it("caps the number of options on a large range", () => {
    const options = buildIntervalOptions(0, 100000, 1);
    expect(options.length).toBeLessThanOrEqual(MAX_INTERVAL_OPTIONS);
    expect(options[0]).toBe(10);
  });

  it("accepts numeric strings and rounds float steps", () => {
    expect(buildIntervalOptions("10", "10.3", "0.1")).toEqual([
      10, 10.1, 10.2, 10.3,
    ]);
  });

  it("offers the current value even off the grid, 0 included", () => {
    expect(buildIntervalOptions(0, 30, 10, 17)).toEqual([10, 17, 20, 30]);
    expect(buildIntervalOptions(0, 20, 10, 0)).toEqual([0, 10, 20]);
  });
});

const POWER = `switch.${BASE}_pet_drinking_fountain`;
const INTERVAL = `number.${BASE}_out_water_interval`;

describe("water interval select", () => {
  it("selects the real value, even 0 or off the grid", async () => {
    const el = await mountCard(
      { entity: POWER },
      makeHass(fountainEntities({ [INTERVAL]: "0" })),
    );
    const select = $$(el, "select.pill-select")[0] as HTMLSelectElement;
    expect(select.value).toBe("0");
  });

  it("shows a placeholder when the value is unknown", async () => {
    const el = await mountCard(
      { entity: POWER },
      makeHass(fountainEntities({ [INTERVAL]: "unavailable" })),
    );
    const select = $$(el, "select.pill-select")[0] as HTMLSelectElement;
    expect(select.selectedOptions[0].textContent!.trim()).toBe("--");
  });
});

describe("service calls", () => {
  it("reports a failed call as a hass-notification", async () => {
    const hass = makeHass(fountainEntities());
    hass.callService.mockRejectedValue(new Error("Device offline"));
    const el = await mountCard({ entity: POWER }, hass);
    const toast = vi.fn();
    el.addEventListener("hass-notification", toast);
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});

    const power = $$(el, "button.control-button").find(
      (b) => b.querySelector("ha-icon")?.getAttribute("icon") === "mdi:power",
    )!;
    power.click();
    await vi.waitFor(() => expect(toast).toHaveBeenCalled());

    expect(hass.callService).toHaveBeenCalledWith("homeassistant", "turn_off", {
      entity_id: POWER,
    });
    expect(toast.mock.calls[0][0].detail.message).toBe(
      "Action failed: Device offline",
    );
    errors.mockRestore();
  });

  it("sets the water interval with number.set_value", async () => {
    const hass = makeHass(
      fountainEntities({ [`select.${BASE}_mode`]: "interval" }),
    );
    const el = await mountCard({ entity: POWER }, hass);
    const select = $$(el, "select.pill-select")[0] as HTMLSelectElement;
    select.value = "25";
    select.dispatchEvent(new Event("change"));
    expect(hass.callService).toHaveBeenCalledWith("number", "set_value", {
      entity_id: INTERVAL,
      value: 25,
    });
    expect($(el, ".missing-banner")).toBeNull();
  });
});
