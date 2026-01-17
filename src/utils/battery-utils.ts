import { HomeAssistant } from '../types/hass';
import { localize } from '../localize';

/**
 * Get icon for charging state
 */
export function getChargingIcon(chargingState: string | undefined, batteryLevel: number): string {
  // Battery at 0% always shows alert icon, regardless of charging state
  if (batteryLevel === 0) {
    return 'mdi:battery-alert';
  }

  if (!chargingState) return 'mdi:battery';

  const state = chargingState.toLowerCase();
  if (state.includes('charging') && !state.includes('full')) {
    return 'mdi:battery-charging';
  } else if (state.includes('full')) {
    // Charge full means on AC power - show power plug icon
    return 'mdi:power-plug';
  } else {
    // No charge - show battery level icon
    if (batteryLevel >= 90) return 'mdi:battery';
    if (batteryLevel >= 70) return 'mdi:battery-80';
    if (batteryLevel >= 50) return 'mdi:battery-60';
    if (batteryLevel >= 30) return 'mdi:battery-40';
    if (batteryLevel >= 10) return 'mdi:battery-20';
    return 'mdi:battery-alert';
  }
}

/**
 * Get battery tooltip text
 */
export function getBatteryTooltip(
  hass: HomeAssistant | undefined,
  chargingState: string | undefined,
  batteryLevel: number
): string {
  if (!chargingState) return `${localize(hass, 'card.battery')}: ${batteryLevel}%`;

  const state = chargingState.toLowerCase();
  if (state.includes('charging') && !state.includes('full')) {
    return `${localize(hass, 'card.charging')}: ${batteryLevel}%`;
  } else if (state.includes('full')) {
    return localize(hass, 'card.charge_full');
  } else {
    return `${localize(hass, 'card.no_charge')}: ${batteryLevel}%`;
  }
}

/**
 * Get battery icon CSS class
 */
export function getBatteryIconClass(chargingState: string | undefined, batteryLevel: number): string {
  // Battery at 0% should blink red
  if (batteryLevel === 0) {
    return 'critical-icon-pulse';
  }

  // Charging animation (but not when charge full)
  if (
    chargingState &&
    chargingState.toLowerCase().includes('charging') &&
    !chargingState.toLowerCase().includes('full')
  ) {
    return 'charging';
  }

  return '';
}
