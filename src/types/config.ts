// Minimal Lovelace card configuration type. Kept local on purpose:
// custom-card-helpers is unmaintained and was only used for this one type.
export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}

export interface XiaomiSmartPetFountainCardConfig extends LovelaceCardConfig {
  /** Any entity of the fountain: the others are discovered from it */
  entity: string;
  name?: string;
  // Optional overrides, used instead of the auto-discovered entities
  power_entity?: string;
  mode_entity?: string;
  filter_life_entity?: string;
  filter_left_time_entity?: string;
  battery_entity?: string;
  charging_state_entity?: string;
  water_shortage_entity?: string;
  physical_control_lock_entity?: string;
  no_disturb_entity?: string;
  water_interval_entity?: string;
  reset_filter_entity?: string;
}
