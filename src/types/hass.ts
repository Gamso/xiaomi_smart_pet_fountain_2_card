export interface HomeAssistant {
  states: { [entity_id: string]: HassEntity };
  /** Entity registry display entries (Home Assistant 2023.4+) */
  entities?: { [entity_id: string]: HassEntityRegistryEntry };
  locale?: { language?: string };
  language?: string;
  callService: (domain: string, service: string, serviceData?: any) => Promise<unknown>;
  /** Translated state of an entity, or of another state of it (2023.9+) */
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
  [key: string]: any;
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  /** Integration (domain) that created the entity */
  platform?: string;
  /** Translation key of the entity, stable across renames */
  translation_key?: string;
  [key: string]: any;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: { [key: string]: any };
  last_changed: string;
  last_updated: string;
  context: { id: string; parent_id: string | null; user_id: string | null };
}
