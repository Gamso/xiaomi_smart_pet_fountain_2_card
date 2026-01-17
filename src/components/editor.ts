import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from '../types/hass';
import { XiaomiSmartPetFountainCardConfig } from '../types/config';
import { setupCustomlocalize } from '../localize';

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
const computeSchema = () => [
  {
    name: 'entity',
    required: true,
    selector: {
      entity: {
        include_domains: ['switch', 'sensor', 'select', 'number', 'binary_sensor', 'button'],
      },
    },
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

    if (schema.name === 'entity') {
      return customLocalize('editor.entity');
    }
    if (schema.name === 'name') {
      return customLocalize('editor.name');
    }

    return schema.name;
  };

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const schema = computeSchema();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value;
    
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
