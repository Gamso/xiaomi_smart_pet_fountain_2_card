// Minimal Lovelace card configuration type. Kept local on purpose:
// custom-card-helpers is unmaintained and was only used for this one type.
export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}

export interface XiaomiSmartPetFountainCardConfig extends LovelaceCardConfig {
  entity: string;
  name?: string;
}
