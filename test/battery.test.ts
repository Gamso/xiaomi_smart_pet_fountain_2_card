import { describe, expect, it } from "vitest";
import {
  getBatteryIconClass,
  getBatteryTooltip,
  getChargingIcon,
} from "../src/utils/battery-utils";

describe("getChargingIcon", () => {
  it.each([
    [100, "mdi:battery"],
    [90, "mdi:battery"],
    [89, "mdi:battery-80"],
    [70, "mdi:battery-80"],
    [50, "mdi:battery-60"],
    [30, "mdi:battery-40"],
    [10, "mdi:battery-20"],
    [9, "mdi:battery-alert"],
    [0, "mdi:battery-alert"],
  ])("on battery at level %i shows %s", (level, icon) => {
    expect(getChargingIcon("no charge", level)).toBe(icon);
  });

  it("shows the charging icon while charging, even at 0 %", () => {
    expect(getChargingIcon("charging", 0)).toBe("mdi:battery-charging");
    expect(getChargingIcon("charging", 55)).toBe("mdi:battery-charging");
  });

  it("shows the power plug when the charge is full (on AC power)", () => {
    expect(getChargingIcon("charge full", 100)).toBe("mdi:power-plug");
    expect(getChargingIcon("charge full", undefined)).toBe("mdi:power-plug");
  });

  it("shows battery-unknown when the level is unknown", () => {
    expect(getChargingIcon("no charge", undefined)).toBe("mdi:battery-unknown");
    expect(getChargingIcon(undefined, undefined)).toBe("mdi:battery-unknown");
  });

  it("falls back to the level icon when the charging state is unknown", () => {
    expect(getChargingIcon(undefined, 75)).toBe("mdi:battery-80");
  });
});

describe("getBatteryIconClass", () => {
  it("pulses red only on battery at a real 0 %", () => {
    expect(getBatteryIconClass("no charge", 0)).toBe("critical-icon-pulse");
    expect(getBatteryIconClass("no charge", 5)).toBe("");
  });

  it("never pulses red when level or charging state is unknown", () => {
    expect(getBatteryIconClass("no charge", undefined)).toBe("");
    expect(getBatteryIconClass(undefined, 0)).toBe("");
    expect(getBatteryIconClass(undefined, undefined)).toBe("");
  });

  it("animates while charging, not when the charge is full", () => {
    expect(getBatteryIconClass("charging", 0)).toBe("charging");
    expect(getBatteryIconClass("charge full", 100)).toBe("");
  });
});

describe("getBatteryTooltip", () => {
  it("describes each charging state", () => {
    expect(getBatteryTooltip(undefined, "charging", 42)).toBe("Charging: 42%");
    expect(getBatteryTooltip(undefined, "charge full", 100)).toBe("On AC power");
    expect(getBatteryTooltip(undefined, "no charge", 42.4)).toBe(
      "On battery: 42%",
    );
  });

  it("says unknown instead of 0 %", () => {
    expect(getBatteryTooltip(undefined, "no charge", undefined)).toBe(
      "On battery: Unknown",
    );
    expect(getBatteryTooltip(undefined, undefined, undefined)).toBe(
      "Battery: Unknown",
    );
  });
});
