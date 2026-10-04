import { vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../src/types/hass";
import type { XiaomiSmartPetFountainCardConfig } from "../src/types/config";
import "../src/components/card";

export const BASE = "xiaomi_iv02_b820";

export function entity(
  entity_id: string,
  state: string,
  attributes: Record<string, unknown> = {},
): HassEntity {
  return {
    entity_id,
    state,
    attributes,
    last_changed: "",
    last_updated: "",
    context: { id: "", parent_id: null, user_id: null },
  };
}

/** The 16 entities Xiaomi Miot Auto creates for the iv02 (see README). */
export function fountainEntities(
  overrides: Record<string, string> = {},
  base = BASE,
): HassEntity[] {
  const defaults: [string, string, Record<string, unknown>?][] = [
    [`switch.${base}_pet_drinking_fountain`, "on"],
    [`select.${base}_mode`, "auto", { options: ["auto", "interval", "constant"] }],
    [`sensor.${base}_filter_life_level`, "80"],
    [`sensor.${base}_filter_left_time`, "24"],
    [`sensor.${base}_battery_level`, "100"],
    [`sensor.${base}_charging_state`, "charge full"],
    [`sensor.${base}_status`, "idle"],
    [`sensor.${base}_event_mode`, "unknown"],
    [`sensor.${base}_event_water`, "unknown"],
    [`binary_sensor.${base}_water_shortage_status`, "off"],
    [`switch.${base}_physical_control_locked`, "off"],
    [`switch.${base}_no_disturb`, "off"],
    [`number.${base}_out_water_interval`, "10", { min: 0, max: 120, step: 5 }],
    [`number.${base}_out_water_interval_2`, "10", { min: 0, max: 180, step: 5 }],
    [`button.${base}_info`, "unknown"],
    [`button.${base}_reset_filter_life`, "unknown"],
  ];
  return defaults.map(([id, state, attrs]) =>
    entity(id, overrides[id] ?? state, attrs ?? {}),
  );
}

export type MockHass = HomeAssistant & {
  callService: ReturnType<typeof vi.fn>;
};

export function makeHass(
  entities: HassEntity[],
  language = "en",
  extra: Record<string, unknown> = {},
): MockHass {
  const states: Record<string, HassEntity> = {};
  for (const e of entities) states[e.entity_id] = e;
  return {
    states,
    language,
    locale: { language },
    callService: vi.fn().mockResolvedValue(undefined),
    ...extra,
  } as MockHass;
}

export type CardElement = HTMLElement & {
  hass: HomeAssistant;
  setConfig(config: XiaomiSmartPetFountainCardConfig): void;
  updateComplete: Promise<boolean>;
  getCardSize(): number;
};

export async function mountCard(
  config: Partial<XiaomiSmartPetFountainCardConfig>,
  hass: HomeAssistant,
): Promise<CardElement> {
  const el = document.createElement(
    "xiaomi-smart-pet-fountain-2-card",
  ) as CardElement;
  el.setConfig({
    type: "custom:xiaomi-smart-pet-fountain-2-card",
    ...config,
  } as XiaomiSmartPetFountainCardConfig);
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

export function $(el: HTMLElement, selector: string): HTMLElement | null {
  return el.shadowRoot!.querySelector(selector);
}

export function $$(el: HTMLElement, selector: string): HTMLElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll(selector));
}

/** Device name prefix of the xiaomi_pet_fountain_2 entity_ids (README). */
export const P2 = "xiaomi_smart_pet_fountain_2";

type RegistryEntry = {
  entity_id: string;
  device_id: string;
  platform: string;
  translation_key?: string;
  entity_category?: string;
};

/**
 * The 22 entities the xiaomi_pet_fountain_2 integration creates (its tests
 * and README): entity_id, translation_key, category and attributes. The
 * battery sensor has no translation_key (named by its device class).
 */
export function fountain2Entities(
  overrides: Record<string, string> = {},
  device_id = "fountain2",
  rename: (entityId: string) => string = (id) => id,
): { states: HassEntity[]; registry: Record<string, RegistryEntry> } {
  const D = "diagnostic";
  const C = "config";
  const defs: [string, string | undefined, string, string | undefined, Record<string, unknown>?][] = [
    [`switch.${P2}_power`, "power", "on", undefined],
    [`switch.${P2}_child_lock`, "child_lock", "off", C],
    [`switch.${P2}_do_not_disturb`, "no_disturb", "off", C],
    [`switch.${P2}_keep_mode`, "keep_mode", "on", C, { preferred_mode: "constant", force: false, restoring: false }],
    [`select.${P2}_mode`, "mode", "constant", undefined, { options: ["auto", "interval", "constant"] }],
    [`sensor.${P2}_pump_status`, "pump_status", "watering", undefined, { device_class: "enum", options: ["waterless", "watering"] }],
    [`sensor.${P2}_filter_life`, "filter_life", "80", undefined, { unit_of_measurement: "%", state_class: "measurement" }],
    [`sensor.${P2}_filter_time_left`, "filter_left_time", "45", undefined, { device_class: "duration", unit_of_measurement: "d" }],
    [`sensor.${P2}_battery`, undefined, "100", D, { device_class: "battery", unit_of_measurement: "%" }],
    [`sensor.${P2}_charging_state`, "charging_state", "charge_full", D, { device_class: "enum", options: ["no_charge", "charging", "charge_full"] }],
    [`sensor.${P2}_preferred_mode`, "preferred_mode", "constant", D, { device_class: "enum", options: ["auto", "interval", "constant"] }],
    [`sensor.${P2}_last_mode_restoration`, "last_mode_restore", "2026-10-04T08:12:00+00:00", D, { device_class: "timestamp", reason: "power_restored", result: "success", from_mode: "auto", to_mode: "constant", attempts: 1, error: null }],
    [`binary_sensor.${P2}_water_shortage`, "water_shortage", "off", undefined, { device_class: "problem" }],
    [`binary_sensor.${P2}_pump_blocked`, "pump_blocked", "off", undefined, { device_class: "problem" }],
    [`binary_sensor.${P2}_fault`, "fault", "off", D, { device_class: "problem" }],
    [`binary_sensor.${P2}_low_battery`, "low_battery", "off", D, { device_class: "battery" }],
    [`binary_sensor.${P2}_mains_power`, "usb_power", "on", D, { device_class: "plug" }],
    [`number.${P2}_water_interval`, "out_water_interval", "15", C, { min: 0, max: 120, step: 15, mode: "box", unit_of_measurement: "min" }],
    [`number.${P2}_water_interval_5_min_steps`, "out_water_interval_2", "30", C, { min: 10, max: 120, step: 5, mode: "box", unit_of_measurement: "min" }],
    [`button.${P2}_reset_filter`, "reset_filter", "unknown", C],
    [`time.${P2}_do_not_disturb_start`, "no_disturb_start", "22:00:00", C],
    [`time.${P2}_do_not_disturb_end`, "no_disturb_end", "07:00:00", C],
  ];
  const states: HassEntity[] = [];
  const registry: Record<string, RegistryEntry> = {};
  for (const [id, key, state, category, attrs] of defs) {
    const entityId = rename(id);
    states.push(entity(entityId, overrides[id] ?? state, attrs ?? {}));
    registry[entityId] = {
      entity_id: entityId,
      device_id,
      platform: "xiaomi_pet_fountain_2",
      ...(key ? { translation_key: key } : {}),
      ...(category ? { entity_category: category } : {}),
    };
  }
  return { states, registry };
}

/** hass with the xiaomi_pet_fountain_2 entities and their registry. */
export function makeFountain2Hass(
  overrides: Record<string, string> = {},
  extra: Record<string, unknown> = {},
  language = "en",
): MockHass {
  const { states, registry } = fountain2Entities(overrides);
  return makeHass(states, language, { entities: registry, ...extra });
}
