export interface HomeAssistant {
  states: { [entity_id: string]: HassEntity };
  /** Entity registry display entries (Home Assistant 2023.4+) */
  entities?: { [entity_id: string]: HassEntityRegistryEntry };
  locale?: { language?: string };
  language?: string;
  callService: (domain: string, service: string, serviceData?: any) => Promise<unknown>;
  [key: string]: any;
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
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
