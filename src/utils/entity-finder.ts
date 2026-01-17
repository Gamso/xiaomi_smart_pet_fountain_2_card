import { HomeAssistant } from '../types/hass';
import { RelatedEntities } from '../types/entities';

/**
 * Find entities related to this fountain based on base name
 */
export function findRelatedEntities(
  hass: HomeAssistant | undefined,
  baseName: string | null
): RelatedEntities {
  if (!hass || !baseName) return {};

  const entities: RelatedEntities = {};
  const allStates = hass.states;

  // Define entity patterns to look for
  const patterns: Record<keyof RelatedEntities, string> = {
    powerSwitch: `switch.${baseName}_pet_drinking_fountain`,
    mode: `select.${baseName}_mode`,
    filterLifeLevel: `sensor.${baseName}_filter_life_level`,
    filterLeftTime: `sensor.${baseName}_filter_left_time`,
    batteryLevel: `sensor.${baseName}_battery_level`,
    chargingState: `sensor.${baseName}_charging_state`,
    status: `sensor.${baseName}_status`,
    waterShortage: `binary_sensor.${baseName}_water_shortage_status`,
    physicalControlLock: `switch.${baseName}_physical_control_locked`,
    noDisturb: `switch.${baseName}_no_disturb`,
    outWaterInterval: `number.${baseName}_out_water_interval`,
    outWaterInterval2: `number.${baseName}_out_water_interval_2`,
    resetFilterButton: `button.${baseName}_reset_filter_life`,
  };

  // Find existing entities
  for (const [key, entityId] of Object.entries(patterns)) {
    if (allStates[entityId]) {
      entities[key as keyof RelatedEntities] = entityId;
    }
  }

  return entities;
}
