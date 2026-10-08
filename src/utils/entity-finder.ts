import { HomeAssistant } from "../types/hass";
import { RelatedEntities } from "../types/entities";
import { XiaomiSmartPetFountainCardConfig } from "../types/config";
import { extractBaseName } from "./entity-utils";

export type EntityRole = keyof RelatedEntities;

/**
 * Integrations the card supports, in order of preference:
 * - "xiaomi_pet_fountain_2": the local integration
 *   (github.com/Gamso/ha-xiaomi-pet-fountain-2);
 * - "xiaomi_miot": Xiaomi Miot Auto (al-one/hass-xiaomi-miot).
 */
export const PET_FOUNTAIN_2_PLATFORM = "xiaomi_pet_fountain_2";
export const XIAOMI_MIOT_PLATFORM = "xiaomi_miot";
export type Integration =
  | typeof PET_FOUNTAIN_2_PLATFORM
  | typeof XIAOMI_MIOT_PLATFORM;

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
 * that lets the user point the card at another entity (same domain with both
 * integrations).
 */
export const ENTITY_ROLES: Partial<Record<EntityRole, RoleDefinition>> = {
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

interface Fountain2RoleDefinition {
  domain: string;
  /** translation_key of the entity (none: the battery, named by its device class) */
  key?: string;
  /** device_class attribute that identifies an entity without translation_key */
  deviceClass?: string;
  /** entity_id suffix Home Assistant derives from the English name */
  suffix: string;
}

/**
 * Entities of the xiaomi_pet_fountain_2 integration (its sensor.py, switch.py
 * & co. and translations/en.json), for a device named "Xiaomi Smart Pet
 * Fountain 2". The translation_key survives any rename of the entity_id.
 */
export const FOUNTAIN2_ROLES: Record<EntityRole, Fountain2RoleDefinition> = {
  powerSwitch: { domain: "switch", key: "power", suffix: "_power" },
  mode: { domain: "select", key: "mode", suffix: "_mode" },
  filterLifeLevel: { domain: "sensor", key: "filter_life", suffix: "_filter_life" },
  filterLeftTime: {
    domain: "sensor",
    key: "filter_left_time",
    suffix: "_filter_time_left",
  },
  batteryLevel: { domain: "sensor", deviceClass: "battery", suffix: "_battery" },
  chargingState: { domain: "sensor", key: "charging_state", suffix: "_charging_state" },
  waterShortage: {
    domain: "binary_sensor",
    key: "water_shortage",
    suffix: "_water_shortage",
  },
  physicalControlLock: { domain: "switch", key: "child_lock", suffix: "_child_lock" },
  noDisturb: { domain: "switch", key: "no_disturb", suffix: "_do_not_disturb" },
  // MIoT 2.7 (spec v1 and v2): the property the card drives with Miot Auto
  // (`_out_water_interval`). 2.11 (spec v2 only) stays reachable through the
  // `water_interval_entity` override.
  outWaterInterval: {
    domain: "number",
    key: "out_water_interval",
    suffix: "_water_interval",
  },
  outWaterInterval2: {
    domain: "number",
    key: "out_water_interval_2",
    suffix: "_water_interval_5_min_steps",
  },
  resetFilterButton: { domain: "button", key: "reset_filter", suffix: "_reset_filter" },
  pumpBlocked: { domain: "binary_sensor", key: "pump_blocked", suffix: "_pump_blocked" },
  fault: { domain: "binary_sensor", key: "fault", suffix: "_fault" },
  // Mode keeping of the integration
  keepMode: { domain: "switch", key: "keep_mode", suffix: "_keep_mode" },
  lastModeRestore: {
    domain: "sensor",
    key: "last_mode_restore",
    suffix: "_last_mode_restoration",
  },
};

const ROLES = Object.keys(FOUNTAIN2_ROLES) as EntityRole[];
const MIOT_ROLES = Object.keys(ENTITY_ROLES) as EntityRole[];

/** Config keys of the entity overrides, in display order. */
export const ENTITY_OVERRIDE_KEYS = MIOT_ROLES.map(
  (role) => ENTITY_ROLES[role]?.option,
).filter((key): key is EntityOverrideKey => !!key);

/** Domain of the entity each override key expects (for the editor). */
export function overrideDomain(key: EntityOverrideKey): string {
  const role = MIOT_ROLES.find((r) => ENTITY_ROLES[r]?.option === key);
  return (role && ENTITY_ROLES[role]?.domain) || "sensor";
}

function matchesRole(entityId: string, role: EntityRole): boolean {
  const def = ENTITY_ROLES[role];
  return (
    !!def &&
    entityId.startsWith(`${def.domain}.`) &&
    entityId.endsWith(def.suffix)
  );
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
  for (const role of MIOT_ROLES) {
    const { domain, suffix } = ENTITY_ROLES[role]!;
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
  for (const role of MIOT_ROLES) {
    // endsWith keeps '_out_water_interval' away from '_out_water_interval_2'
    // and the domain keeps select '_mode' away from sensor '_event_mode'.
    const match = siblings.find((id) => matchesRole(id, role));
    if (match) entities[role] = match;
  }
  return entities;
}

/**
 * Integration of the fountain picked as `entity`: xiaomi_pet_fountain_2 when
 * the entity or any entity of its device (entity registry) comes from it,
 * Xiaomi Miot Auto otherwise (also without entity registry).
 */
export function detectIntegration(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): Integration {
  const registry = hass?.entities;
  const entry = entityId ? registry?.[entityId] : undefined;
  if (!registry || !entry) return XIAOMI_MIOT_PLATFORM;
  if (entry.platform === PET_FOUNTAIN_2_PLATFORM) return PET_FOUNTAIN_2_PLATFORM;
  const deviceId = entry.device_id;
  const local =
    !!deviceId &&
    Object.values(registry).some(
      (e) => e?.device_id === deviceId && e.platform === PET_FOUNTAIN_2_PLATFORM,
    );
  return local ? PET_FOUNTAIN_2_PLATFORM : XIAOMI_MIOT_PLATFORM;
}

/**
 * Entities of the xiaomi_pet_fountain_2 device of `entityId`: by
 * translation_key (device class for the battery, which has none), then by
 * the default entity_id suffix for an entry without translation_key.
 */
export function findFountain2Entities(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): RelatedEntities {
  const registry = hass?.entities;
  const entry = entityId ? registry?.[entityId] : undefined;
  if (!hass || !registry || !entry) return {};

  const deviceId = entry.device_id;
  const siblings = (
    deviceId
      ? Object.values(registry).filter((e) => e?.device_id === deviceId)
      : [entry]
  )
    .filter(
      (e) =>
        e.platform === PET_FOUNTAIN_2_PLATFORM && !!hass.states[e.entity_id],
    )
    .sort((a, b) => a.entity_id.localeCompare(b.entity_id));

  const entities: RelatedEntities = {};
  for (const role of ROLES) {
    const { domain, key, deviceClass, suffix } = FOUNTAIN2_ROLES[role];
    const inDomain = siblings.filter((e) =>
      e.entity_id.startsWith(`${domain}.`),
    );
    const match =
      inDomain.find((e) =>
        key
          ? e.translation_key === key
          : !e.translation_key &&
            hass.states[e.entity_id]?.attributes?.device_class === deviceClass,
      ) ??
      inDomain.find((e) => !e.translation_key && e.entity_id.endsWith(suffix));
    if (match) entities[role] = match.entity_id;
  }
  return entities;
}

export interface ResolvedEntities {
  entities: RelatedEntities;
  /** Integration the entities were discovered in */
  integration: Integration;
  /** Override keys of the entities the card needs but could not find */
  missing: EntityOverrideKey[];
}

/**
 * Resolve every entity the card uses. Priority: explicit override in the
 * config, then the device of `entity` (entity registry: translation_key for
 * xiaomi_pet_fountain_2, entity_id suffix for Xiaomi Miot Auto), then, for
 * Xiaomi Miot Auto, the base name of `entity`. Configs with only `entity:`
 * keep working unchanged.
 */
export function resolveEntities(
  hass: HomeAssistant | undefined,
  config: XiaomiSmartPetFountainCardConfig | undefined,
): ResolvedEntities {
  if (!hass || !config) {
    return { entities: {}, integration: XIAOMI_MIOT_PLATFORM, missing: [] };
  }

  const integration = detectIntegration(hass, config.entity);
  let discovered: RelatedEntities;
  if (integration === PET_FOUNTAIN_2_PLATFORM) {
    discovered = findFountain2Entities(hass, config.entity);
  } else {
    const byName = findRelatedEntities(hass, extractBaseName(config.entity));
    discovered = { ...byName, ...findDeviceEntities(hass, config.entity) };
  }

  const entities: RelatedEntities = {};
  for (const role of ROLES) {
    const option = ENTITY_ROLES[role]?.option;
    const override = option ? config[option] : undefined;
    const entityId =
      typeof override === "string" && override ? override : discovered[role];
    if (entityId) entities[role] = entityId;
  }

  // Backwards compatibility: a switch picked as main entity that matches no
  // other role is the power switch (renamed entity_id, old configs).
  if (
    integration === XIAOMI_MIOT_PLATFORM &&
    !entities.powerSwitch &&
    config.entity?.startsWith("switch.") &&
    !Object.values(entities).includes(config.entity)
  ) {
    entities.powerSwitch = config.entity;
  }

  const missing: EntityOverrideKey[] = [];
  for (const role of MIOT_ROLES) {
    const option = ENTITY_ROLES[role]?.option;
    const id = entities[role];
    if (option && (!id || !hass.states[id])) missing.push(option);
  }

  return { entities, integration, missing };
}
