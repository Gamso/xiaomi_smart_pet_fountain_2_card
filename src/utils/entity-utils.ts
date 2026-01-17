/**
 * Extract base name from entity_id
 * Example: switch.xiaomi_iv02_b820_pet_drinking_fountain => xiaomi_iv02_b820
 */
export function extractBaseName(entityId: string): string | null {
  if (!entityId) return null;

  // Remove domain prefix (switch., sensor., etc.)
  const withoutDomain = entityId.split('.')[1];
  if (!withoutDomain) return null;

  // Try to find the base pattern by removing common suffixes
  const suffixes = [
    '_pet_drinking_fountain',
    '_filter_life_level',
    '_filter_left_time',
    '_battery_level',
    '_charging_state',
    '_status',
    '_water_shortage_status',
    '_physical_control_locked',
    '_no_disturb',
    '_out_water_interval',
    '_out_water_interval_2',
    '_mode',
    '_reset_filter_life',
  ];

  for (const suffix of suffixes) {
    if (withoutDomain.endsWith(suffix)) {
      return withoutDomain.slice(0, -suffix.length);
    }
  }

  return withoutDomain;
}
