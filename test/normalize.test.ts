import { describe, expect, it } from "vitest";
import { stateKey } from "../src/utils";
import {
  getBatteryIconClass,
  getBatteryTooltip,
  getChargingIcon,
} from "../src/utils/battery-utils";
import {
  $,
  $$,
  BASE,
  fountainEntities,
  makeFountain2Hass,
  makeHass,
  mountCard,
  P2,
} from "./helpers";

describe("stateKey", () => {
  it.each([
    ["no charge", "no_charge"],
    ["no_charge", "no_charge"],
    ["charge full", "charge_full"],
    ["Charge_Full", "charge_full"],
    ["Constant", "constant"],
    [" interval ", "interval"],
    ["pet-drinking", "pet_drinking"],
  ])("%s gives %s", (state, key) => {
    expect(stateKey(state)).toBe(key);
  });

  it("gives undefined for no state", () => {
    expect(stateKey(undefined)).toBeUndefined();
    expect(stateKey(null)).toBeUndefined();
    expect(stateKey("  ")).toBeUndefined();
  });
});

// Same behaviour with the Miot Auto and the xiaomi_pet_fountain_2 states
describe.each([
  ["Xiaomi Miot Auto", "no charge", "charging", "charge full"],
  ["xiaomi_pet_fountain_2", "no_charge", "charging", "charge_full"],
])("battery helpers with %s states", (_name, noCharge, charging, full) => {
  it("picks the icon from the charging state", () => {
    expect(getChargingIcon(noCharge, 75)).toBe("mdi:battery-80");
    expect(getChargingIcon(noCharge, 5)).toBe("mdi:battery-alert");
    expect(getChargingIcon(charging, 40)).toBe("mdi:battery-charging");
    expect(getChargingIcon(full, 100)).toBe("mdi:power-plug");
  });

  it("pulses red only on battery at a real 0 %", () => {
    expect(getBatteryIconClass(noCharge, 0)).toBe("critical-icon-pulse");
    expect(getBatteryIconClass(noCharge, undefined)).toBe("");
    expect(getBatteryIconClass(charging, 0)).toBe("charging");
    expect(getBatteryIconClass(full, 100)).toBe("");
  });

  it("describes the state with the card's words, never the raw key", () => {
    expect(getBatteryTooltip(undefined, noCharge, 42)).toBe("On battery: 42%");
    expect(getBatteryTooltip(undefined, charging, 42)).toBe("Charging: 42%");
    expect(getBatteryTooltip(undefined, full, 100)).toBe("On AC power");
  });
});

const batteryIcon = (el: HTMLElement) =>
  $(el, ".status-icons-row ha-icon:not(.water-shortage):not(.fault)");
const CHARGING = `sensor.${P2}_charging_state`;
const BATTERY = `sensor.${P2}_battery`;
const MODE = `select.${P2}_mode`;

describe("card battery indicator with xiaomi_pet_fountain_2", () => {
  it.each([
    ["on mains power", "charge_full", "100", "mdi:power-plug", "", "On AC power"],
    ["charging", "charging", "60", "mdi:battery-charging", "charging", "Charging: 60%"],
    ["on battery", "no_charge", "75", "mdi:battery-80", "", "On battery: 75%"],
    ["on an empty battery", "no_charge", "0", "mdi:battery-alert", "critical-icon-pulse", "On battery: 0%"],
    ["unavailable", "unavailable", "unavailable", "mdi:battery-unknown", "", "Battery: Unknown"],
  ])("%s", async (_name, charging, level, icon, cls, label) => {
    const el = await mountCard(
      { entity: MODE },
      makeFountain2Hass({ [CHARGING]: charging, [BATTERY]: level }),
    );
    const i = batteryIcon(el)!;
    expect(i.getAttribute("icon")).toBe(icon);
    expect(i.className).toBe(cls);
    expect(i.parentElement!.getAttribute("aria-label")).toBe(label);
  });
});

const modeSelect = (el: HTMLElement) =>
  $(el, "select.mode-select") as HTMLSelectElement;
const optionLabels = (el: HTMLElement) =>
  Array.from(modeSelect(el).options).map((o) => o.textContent!.trim());

describe("mode select", () => {
  it("shows the translated state from hass.formatEntityState", async () => {
    const names: Record<string, string> = {
      auto: "Automatique",
      interval: "Intervalle",
      constant: "Continu",
    };
    const hass = makeFountain2Hass(
      {},
      { formatEntityState: (_s: unknown, state: string) => names[state] ?? state },
    );
    const el = await mountCard({ entity: MODE }, hass);
    expect(modeSelect(el).value).toBe("constant");
    expect(optionLabels(el)).toEqual(["Automatique", "Intervalle", "Continu"]);
  });

  it("falls back to the card's translation, never the raw key", async () => {
    let el = await mountCard({ entity: MODE }, makeFountain2Hass());
    expect(optionLabels(el)).toEqual(["Auto", "Interval", "Constant"]);

    // formatEntityState without translation returns the state itself
    el = await mountCard(
      { entity: MODE },
      makeFountain2Hass({}, { formatEntityState: (_s: unknown, st: string) => st }, "fr"),
    );
    expect(optionLabels(el)).toEqual(["Auto", "Intervalle", "Continu"]);
  });

  it("sends the option with the casing of xiaomi_pet_fountain_2", async () => {
    const hass = makeFountain2Hass();
    const el = await mountCard({ entity: MODE }, hass);
    const select = modeSelect(el);
    select.value = "interval";
    select.dispatchEvent(new Event("change"));
    (el as any)._selectMode("Auto");
    expect(hass.callService.mock.calls).toEqual([
      ["select", "select_option", { entity_id: MODE, option: "interval" }],
      ["select", "select_option", { entity_id: MODE, option: "auto" }],
    ]);
  });

  it("selects and sends the capitalised options of Xiaomi Miot Auto", async () => {
    const miotMode = `select.${BASE}_mode`;
    const entities = fountainEntities({ [miotMode]: "Constant" });
    entities.find((e) => e.entity_id === miotMode)!.attributes.options = [
      "Auto",
      "Interval",
      "Constant",
    ];
    const hass = makeHass(entities);
    const el = await mountCard({ entity: miotMode }, hass);
    expect(modeSelect(el).value).toBe("Constant");
    expect(optionLabels(el)).toEqual(["Auto", "Interval", "Constant"]);
    (el as any)._selectMode("interval");
    expect(hass.callService).toHaveBeenCalledWith("select", "select_option", {
      entity_id: miotMode,
      option: "Interval",
    });
  });

  it("enables the interval list in interval mode, whatever the casing", async () => {
    for (const [hass, interval] of [
      [makeFountain2Hass({ [MODE]: "interval" }), 0],
      [makeHass(fountainEntities({ [`select.${BASE}_mode`]: "Interval" })), 0],
    ] as const) {
      const el = await mountCard({ entity: Object.keys(hass.states)[0] }, hass);
      const select = $$(el, "select.pill-select")[interval] as HTMLSelectElement;
      expect(select.disabled).toBe(false);
    }
  });

  it("shows a placeholder while the mode is unavailable", async () => {
    const el = await mountCard(
      { entity: `switch.${P2}_power` },
      makeFountain2Hass({ [MODE]: "unavailable" }),
    );
    expect(modeSelect(el).selectedOptions[0].textContent!.trim()).toBe("--");
  });
});
