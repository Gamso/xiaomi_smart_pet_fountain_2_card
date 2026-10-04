import { HomeAssistant } from "../types/hass";
import { localize } from "../localize";
import { stateKey } from "./state-utils";

// The charging state sensor of the iv02 reports "charging", "charge full"
// (on AC power) or "no charge" (running on battery) with Xiaomi Miot Auto,
// "charging", "charge_full" or "no_charge" with xiaomi_pet_fountain_2: the
// state is compared through stateKey(). An undefined state or level means
// "unknown" (entity missing, unavailable or unknown): it is never treated as
// 0 %, so it can't raise the empty-battery alert.

function isCharging(state: string): boolean {
  return state.includes("charging") && !state.includes("full");
}

function isChargeFull(state: string): boolean {
  return state.includes("full");
}

function isOnBattery(state: string): boolean {
  return state.includes("no_charge");
}

function levelIcon(batteryLevel: number): string {
  if (batteryLevel >= 90) return "mdi:battery";
  if (batteryLevel >= 70) return "mdi:battery-80";
  if (batteryLevel >= 50) return "mdi:battery-60";
  if (batteryLevel >= 30) return "mdi:battery-40";
  if (batteryLevel >= 10) return "mdi:battery-20";
  return "mdi:battery-alert";
}

/**
 * Get icon for charging state
 */
export function getChargingIcon(
  chargingState: string | undefined,
  batteryLevel: number | undefined,
): string {
  const state = stateKey(chargingState);

  if (state !== undefined) {
    if (isCharging(state)) return "mdi:battery-charging";
    // Charge full means on AC power - show power plug icon
    if (isChargeFull(state)) return "mdi:power-plug";
  }

  // On battery, or charging state unknown: the level decides
  if (batteryLevel === undefined) return "mdi:battery-unknown";
  return levelIcon(batteryLevel);
}

/**
 * Get battery tooltip text
 */
export function getBatteryTooltip(
  hass: HomeAssistant | undefined,
  chargingState: string | undefined,
  batteryLevel: number | undefined,
): string {
  const level =
    batteryLevel === undefined
      ? localize(hass, "card.unknown")
      : `${Math.round(batteryLevel)}%`;
  const state = stateKey(chargingState);

  if (state === undefined) return `${localize(hass, "card.battery")}: ${level}`;
  if (isCharging(state)) return `${localize(hass, "card.charging")}: ${level}`;
  if (isChargeFull(state)) return localize(hass, "card.charge_full");
  return `${localize(hass, "card.no_charge")}: ${level}`;
}

/**
 * Get battery icon CSS class
 */
export function getBatteryIconClass(
  chargingState: string | undefined,
  batteryLevel: number | undefined,
): string {
  const state = stateKey(chargingState);
  if (state === undefined) return "";

  // Battery really at 0 % while running on battery should blink red
  if (isOnBattery(state) && batteryLevel === 0) {
    return "critical-icon-pulse";
  }

  // Charging animation (but not when charge full)
  if (isCharging(state)) return "charging";

  return "";
}
