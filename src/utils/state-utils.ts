import { HassEntity } from "../types/hass";

/**
 * States Home Assistant reports when it has no value for an entity (device
 * offline, integration reloading...). They must never be read as a number:
 * parseFloat("unavailable") is NaN, and NaN || 0 turned them into 0 % before.
 */
const NO_VALUE_STATES = new Set(["unavailable", "unknown", ""]);

/**
 * State string of an entity, or undefined when the entity is missing or has
 * no value (unavailable / unknown).
 */
export function knownState(
  entity: HassEntity | null | undefined,
): string | undefined {
  if (!entity || typeof entity.state !== "string") return undefined;
  return NO_VALUE_STATES.has(entity.state.toLowerCase())
    ? undefined
    : entity.state;
}

/**
 * Numeric state of an entity, or undefined when it is missing, unavailable,
 * unknown or not a finite number. Unknown is never 0.
 */
export function numericState(
  entity: HassEntity | null | undefined,
): number | undefined {
  const state = knownState(entity);
  if (state === undefined) return undefined;
  const value = Number.parseFloat(state);
  return Number.isFinite(value) ? value : undefined;
}

/**
 * Numeric state clamped to 0-100, or undefined when unknown.
 */
export function percentState(
  entity: HassEntity | null | undefined,
): number | undefined {
  const value = numericState(entity);
  return value === undefined ? undefined : Math.min(100, Math.max(0, value));
}
