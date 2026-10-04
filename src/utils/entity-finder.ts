import { HomeAssistant } from "../types/hass";
import { RelatedEntities } from "../types/entities";
import { XiaomiSmartPetFountainCardConfig } from "../types/config";
import { extractBaseName } from "./entity-utils";

export type EntityRole = keyof RelatedEntities;

export type EntityOverrideKey =
  | "power_entity"
  | "mode_entity"
  | "filter_life_entity"
  | "filter_left_time_entity"
  | "battery_entity"
  | "charging_state_entity"
  | "water_shortage_entity"
  | "physical_control_lock_entity"
  | "no_disturb_entity"
  | "water_interval_entity"
  | "reset_filter_entity";

interface RoleDefinition {
  domain: string;
  suffix: string;
  /** Config key that overrides the auto-discovery (none: not used by the card) */
  option?: EntityOverrideKey;
}

/**
 * Entities of the fountain as Xiaomi Miot Auto names them, and the config key
 * that lets the user point the card at another entity.
 */
export const ENTITY_ROLES: Record<EntityRole, RoleDefinition> = {
  powerSwitch: {
    domain: "switch",
    suffix: "_pet_drinking_fountain",
    option: "power_entity",
  },
  mode: { domain: "select", suffix: "_mode", option: "mode_entity" },
  filterLifeLevel: {
    domain: "sensor",
    suffix: "_filter_life_level",
    option: "filter_life_entity",
  },
  filterLeftTime: {
    domain: "sensor",
    suffix: "_filter_left_time",
    option: "filter_left_time_entity",
  },
  batteryLevel: {
    domain: "sensor",
    suffix: "_battery_level",
    option: "battery_entity",
  },
  chargingState: {
    domain: "sensor",
    suffix: "_charging_state",
    option: "charging_state_entity",
  },
  waterShortage: {
    domain: "binary_sensor",
    suffix: "_water_shortage_status",
    option: "water_shortage_entity",
  },
  physicalControlLock: {
    domain: "switch",
    suffix: "_physical_control_locked",
    option: "physical_control_lock_entity",
  },
  noDisturb: {
    domain: "switch",
    suffix: "_no_disturb",
    option: "no_disturb_entity",
  },
  outWaterInterval: {
    domain: "number",
    suffix: "_out_water_interval",
    option: "water_interval_entity",
  },
  outWaterInterval2: { domain: "number", suffix: "_out_water_interval_2" },
  resetFilterButton: {
    domain: "button",
    suffix: "_reset_filter_life",
    option: "reset_filter_entity",
  },
};

const ROLES = Object.keys(ENTITY_ROLES) as EntityRole[];

/** Config keys of the entity overrides, in display order. */
export const ENTITY_OVERRIDE_KEYS = ROLES.map(
  (role) => ENTITY_ROLES[role].option,
).filter((key): key is EntityOverrideKey => !!key);

/** Domain of the entity each override key expects (for the editor). */
export function overrideDomain(key: EntityOverrideKey): string {
  const role = ROLES.find((r) => ENTITY_ROLES[r].option === key);
  return role ? ENTITY_ROLES[role].domain : "sensor";
}

function matchesRole(entityId: string, role: EntityRole): boolean {
  const { domain, suffix } = ENTITY_ROLES[role];
  return entityId.startsWith(`${domain}.`) && entityId.endsWith(suffix);
}

/**
 * Find entities related to this fountain based on base name
 */
export function findRelatedEntities(
  hass: HomeAssistant | undefined,
  baseName: string | null,
): RelatedEntities {
  if (!hass || !baseName) return {};

  const entities: RelatedEntities = {};
  for (const role of ROLES) {
    const { domain, suffix } = ENTITY_ROLES[role];
    const entityId = `${domain}.${baseName}${suffix}`;
    if (hass.states[entityId]) entities[role] = entityId;
  }
  return entities;
}

/**
 * Find the entities of the same device as `entityId` through the entity
 * registry (hass.entities). Works whatever the base name, as long as each
 * entity_id keeps the integration's suffix.
 */
export function findDeviceEntities(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): RelatedEntities {
  const registry = hass?.entities;
  const deviceId = entityId ? registry?.[entityId]?.device_id : undefined;
  if (!hass || !registry || !deviceId) return {};

  const siblings = Object.values(registry)
    .filter(
      (entry) => entry.device_id === deviceId && !!hass.states[entry.entity_id],
    )
    .map((entry) => entry.entity_id)
    .sort();

  const entities: RelatedEntities = {};
  for (const role of ROLES) {
    // endsWith keeps '_out_water_interval' away from '_out_water_interval_2'
    // and the domain keeps select '_mode' away from sensor '_event_mode'.
    const match = siblings.find((id) => matchesRole(id, role));
    if (match) entities[role] = match;
  }
  return entities;
}

export interface ResolvedEntities {
  entities: RelatedEntities;
  /** Override keys of the entities the card needs but could not find */
  missing: EntityOverrideKey[];
}

/**
 * Resolve every entity the card uses. Priority: explicit override in the
 * config, then the device of `entity` (entity registry), then the base name
 * of `entity`. Configs with only `entity:` keep working unchanged.
 */
export function resolveEntities(
  hass: HomeAssistant | undefined,
  config: XiaomiSmartPetFountainCardConfig | undefined,
): ResolvedEntities {
  if (!hass || !config) return { entities: {}, missing: [] };

  const byDevice = findDeviceEntities(hass, config.entity);
  const byName = findRelatedEntities(hass, extractBaseName(config.entity));

  const entities: RelatedEntities = {};
  for (const role of ROLES) {
    const option = ENTITY_ROLES[role].option;
    const override = option ? config[option] : undefined;
    const entityId =
      typeof override === "string" && override
        ? override
        : (byDevice[role] ?? byName[role]);
    if (entityId) entities[role] = entityId;
  }

  // Backwards compatibility: a switch picked as main entity that matches no
  // other role is the power switch (renamed entity_id, old configs).
  if (
    !entities.powerSwitch &&
    config.entity?.startsWith("switch.") &&
    !Object.values(entities).includes(config.entity)
  ) {
    entities.powerSwitch = config.entity;
  }

  const missing: EntityOverrideKey[] = [];
  for (const role of ROLES) {
    const option = ENTITY_ROLES[role].option;
    const id = entities[role];
    if (option && (!id || !hass.states[id])) missing.push(option);
  }

  return { entities, missing };
}
