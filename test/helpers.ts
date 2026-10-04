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
