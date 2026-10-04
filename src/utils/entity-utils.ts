/**
 * Suffixes Xiaomi Miot Auto appends to the device base name for each entity
 * of the Xiaomi Smart Pet Fountain 2 (xiaomi.pet_waterer.iv02). Every entity
 * listed in the README must be here, or picking it in the card editor leaves
 * the card without any related entity.
 */
const ENTITY_SUFFIXES = [
  '_pet_drinking_fountain',
  '_filter_life_level',
  '_filter_left_time',
  '_battery_level',
  '_charging_state',
  '_status',
  '_event_mode',
  '_event_water',
  '_water_shortage_status',
  '_physical_control_locked',
  '_no_disturb',
  '_out_water_interval',
  '_out_water_interval_2',
  '_mode',
  '_info',
  '_reset_filter_life',
];

// Longest first: '_water_shortage_status' must win over '_status',
// '_event_mode' over '_mode', '_out_water_interval_2' over '_out_water_interval'.
const SUFFIXES_LONGEST_FIRST = [...ENTITY_SUFFIXES].sort(
  (a, b) => b.length - a.length,
);

/**
 * Extract base name from entity_id
 * Example: switch.xiaomi_iv02_b820_pet_drinking_fountain => xiaomi_iv02_b820
 */
export function extractBaseName(entityId: string): string | null {
  if (!entityId) return null;

  // Remove domain prefix (switch., sensor., etc.)
  const withoutDomain = entityId.split('.')[1];
  if (!withoutDomain) return null;

  // Remove the longest known suffix
  for (const suffix of SUFFIXES_LONGEST_FIRST) {
    if (withoutDomain.endsWith(suffix) && withoutDomain.length > suffix.length) {
      return withoutDomain.slice(0, -suffix.length);
    }
  }

  return withoutDomain;
}
