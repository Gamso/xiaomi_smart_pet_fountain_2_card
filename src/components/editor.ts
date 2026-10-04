import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from '../types/hass';
import { XiaomiSmartPetFountainCardConfig } from '../types/config';
import { setupCustomlocalize } from '../localize';
import { ENTITY_OVERRIDE_KEYS, overrideDomain } from '../utils/entity-finder';

// Load Home Assistant components needed for the editor
const loadHaComponents = () => {
  if (!customElements.get('ha-form')) {
    (customElements.get('hui-button-card') as any)?.getConfigElement();
  }
  if (!customElements.get('ha-entity-picker')) {
    (customElements.get('hui-entities-card') as any)?.getConfigElement();
  }
};

// Define the form schema
const computeSchema = (customLocalize: (key: string) => string) => [
  {
    name: 'entity',
    required: true,
    selector: {
      entity: {
        include_domains: ['switch', 'sensor', 'select', 'number', 'binary_sensor', 'button'],
      },
    },
  },
  {
    name: 'name',
    selector: { text: {} },
  },
  {
    // Optional overrides of the auto-discovered entities
    type: 'expandable',
    name: 'entities',
    flatten: true,
    title: customLocalize('editor.entities_section'),
    schema: ENTITY_OVERRIDE_KEYS.map((key) => ({
      name: key,
      selector: { entity: { domain: overrideDomain(key) } },
    })),
  },
];

@customElement('xiaomi-smart-pet-fountain-2-card-editor')
export class XiaomiSmartPetFountainCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: XiaomiSmartPetFountainCardConfig;

  connectedCallback() {
    super.connectedCallback();
    if (this.hass) {
      loadHaComponents();
    }
  }

  setConfig(config: XiaomiSmartPetFountainCardConfig): void {
    this._config = { ...config };
  }

  private _computeLabel = (schema: any): string => {
    const customLocalize = setupCustomlocalize(this.hass);

    const label = customLocalize(`editor.${schema.name}`);
    return label === `editor.${schema.name}` ? schema.name : label;
  };

  private _computeHelper = (schema: any): string | undefined => {
    if (schema.name === 'entity') {
      return setupCustomlocalize(this.hass)('editor.entity_helper');
    }
    return undefined;
  };

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const schema = computeSchema(setupCustomlocalize(this.hass));

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    // Drop the overrides left empty so the YAML stays minimal
    const config = Object.fromEntries(
      Object.entries(ev.detail.value as Record<string, unknown>).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null,
      ),
    );

    // Fire config-changed event
    const event = new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config },
    });
    this.dispatchEvent(event);
  }

  static get styles() {
    return css`
      ha-form {
        width: 100%;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'xiaomi-smart-pet-fountain-2-card-editor': XiaomiSmartPetFountainCardEditor;
  }
}
