import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "../types/hass";
import { XiaomiSmartPetFountainCardConfig } from "../types/config";
import { extractBaseName, findRelatedEntities } from "../utils";
import {
  getChargingIcon,
  getBatteryTooltip,
  getBatteryIconClass,
} from "../utils/battery-utils";
import { localize } from "../localize";
import { version } from "../../package.json";
import "./editor";

console.info(
  `%c  XIAOMI-SMART-PET-FOUNTAIN-2-CARD  \n%c  Version ${version}  `,
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray",
);

// Register the card with Home Assistant
interface RegisterCardParams {
  type: string;
  name: string;
  description: string;
}

export function registerCustomCard(params: RegisterCardParams) {
  const windowWithCards = window as unknown as Window & {
    customCards: unknown[];
  };
  windowWithCards.customCards = windowWithCards.customCards || [];
  windowWithCards.customCards.push({
    ...params,
    preview: true,
  });
}

registerCustomCard({
  type: "xiaomi-smart-pet-fountain-2-card",
  name: "Xiaomi Smart Pet Fountain 2 Card",
  description: "A custom card for controlling Xiaomi Smart Pet Fountain 2",
});

@customElement("xiaomi-smart-pet-fountain-2-card")
export class XiaomiSmartPetFountainCard extends LitElement {
  @property({ type: Object }) hass?: HomeAssistant;
  @property({ type: Object }) config?: XiaomiSmartPetFountainCardConfig;
  @state() private _showResetDialog = false;

  static async getConfigElement(): Promise<HTMLElement> {
    await import("./editor");
    return document.createElement("xiaomi-smart-pet-fountain-2-card-editor");
  }

  static async getStubConfig(
    hass: HomeAssistant,
  ): Promise<XiaomiSmartPetFountainCardConfig> {
    // Return a default configuration for card preview in dashboard editor
    return {
      type: "custom:xiaomi-smart-pet-fountain-2-card",
      entity: "switch.xiaomi_iv02_b820_pet_drinking_fountain",
    };
  }

  setConfig(config: XiaomiSmartPetFountainCardConfig): void {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  getCardSize(): number {
    return 4;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html`
        <ha-card>
          <div class="card-content" style="padding: 16px;">
            <div
              style="text-align: center; color: var(--secondary-text-color);"
            >
              Loading...
            </div>
          </div>
        </ha-card>
      `;
    }

    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      // For preview mode, show a demo card instead of error
      return html`
        <ha-card>
          <div class="card-content" style="padding: 16px;">
            <div style="text-align: center;">
              <div
                style="font-size: 16px; font-weight: 500; margin-bottom: 8px;"
              >
                Xiaomi Smart Pet Fountain 2
              </div>
              <div style="color: var(--secondary-text-color); font-size: 14px;">
                ${localize(this.hass, "card.entity_not_found")}:
                ${this.config.entity}
              </div>
              <div
                style="color: var(--secondary-text-color); font-size: 12px; margin-top: 8px;"
              >
                Please select a valid entity in the configuration
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }

    // Extract base name and find related entities
    const baseName = extractBaseName(this.config.entity);
    const relatedEntities = findRelatedEntities(this.hass, baseName);

    // Get power switch entity (either the main entity if it's a switch, or find it)
    const powerSwitchId = this.config.entity.startsWith("switch.")
      ? this.config.entity
      : relatedEntities.powerSwitch;
    const powerEntity = powerSwitchId
      ? this.hass.states[powerSwitchId]
      : entity;

    // Get mode from mode select entity
    const modeEntityId = relatedEntities.mode;
    const modeEntity = modeEntityId ? this.hass.states[modeEntityId] : null;
    const mode = modeEntity ? modeEntity.state : "auto";
    const modeOptions =
      modeEntity && modeEntity.attributes.options
        ? modeEntity.attributes.options
        : ["auto", "interval", "constant"];

    // Get battery info
    const batteryLevelId = relatedEntities.batteryLevel;
    const batteryLevelEntity = batteryLevelId
      ? this.hass.states[batteryLevelId]
      : null;
    const batteryLevel = batteryLevelEntity
      ? parseFloat(batteryLevelEntity.state) || 0
      : 0;

    const chargingStateId = relatedEntities.chargingState;
    const chargingStateEntity = chargingStateId
      ? this.hass.states[chargingStateId]
      : null;
    const chargingState = chargingStateEntity
      ? chargingStateEntity.state
      : "no charge";

    // Get water shortage status
    const waterShortageId = relatedEntities.waterShortage;
    const waterShortageEntity = waterShortageId
      ? this.hass.states[waterShortageId]
      : null;
    const waterShortage = waterShortageEntity
      ? waterShortageEntity.state === "on"
      : false;

    // Get filter life
    const filterLifeId = relatedEntities.filterLifeLevel;
    const filterLifeEntity = filterLifeId
      ? this.hass.states[filterLifeId]
      : null;
    const filterLife = filterLifeEntity
      ? parseFloat(filterLifeEntity.state) || 0
      : 0;

    // Get filter left time
    const filterLeftTimeId = relatedEntities.filterLeftTime;
    const filterLeftTimeEntity = filterLeftTimeId
      ? this.hass.states[filterLeftTimeId]
      : null;
    const filterLeftTime = filterLeftTimeEntity
      ? filterLeftTimeEntity.state
      : null;

    // Get water interval
    const waterIntervalId = relatedEntities.outWaterInterval;
    const waterIntervalEntity = waterIntervalId
      ? this.hass.states[waterIntervalId]
      : null;
    const waterInterval = waterIntervalEntity
      ? parseFloat(waterIntervalEntity.state) || 10
      : 10;
    const waterIntervalMin = waterIntervalEntity?.attributes?.min ?? 0;
    const waterIntervalMax = waterIntervalEntity?.attributes?.max ?? 120;
    const waterIntervalStep = waterIntervalEntity?.attributes?.step ?? 15;

    // Generate water interval options (from min to max by step)
    const waterIntervalOptions: number[] = [];
    for (
      let i = Math.max(10, waterIntervalMin);
      i <= waterIntervalMax;
      i += waterIntervalStep
    ) {
      waterIntervalOptions.push(i);
    }

    const isOn = powerEntity.state === "on";
    const name =
      this.config.name || entity.attributes.friendly_name || "Pet Fountain";

    const arcLength = 85 * 2 * Math.PI * (250 / 360);
    const progressLength = (filterLife / 100) * arcLength;

    // Build tooltip for filter life gauge
    let tooltipText = "";
    if (filterLeftTime) {
      tooltipText = localize(this.hass, "card.days_left", {
        days: filterLeftTime,
      });
    }

    return html`
      <ha-card>
        <div class="card-content">
          <!-- Card Title -->
          <div class="card-title">Xiaomi Smart Pet Fountain 2</div>

          <!-- Filter Life Circular Gauge -->
          <div class="gauge-container">
            <svg class="gauge-svg" viewBox="0 0 200 200">
              <title>${tooltipText}</title>
              <!-- Background arc (3/4 circle) -->
              <path
                class="gauge-background"
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke="var(--disabled-text-color)"
                stroke-width="12"
                stroke-linecap="round"
              />
              <!-- Progress arc (3/4 circle) -->
              <path
                class="gauge-progress ${isOn ? "on" : "off"} ${filterLife === 0
                  ? "critical"
                  : ""}"
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="${filterLife === 0
                  ? arcLength
                  : progressLength + " " + arcLength}"
                stroke-dashoffset="0"
                style="transition: stroke-dasharray 0.3s ease, stroke 0.3s ease;"
              />
            </svg>

            <!-- Status Icons Row (above percentage) -->
            <div class="status-icons-row">
              <!-- Battery/Charging Icon -->
              <div class="icon-indicator">
                <ha-icon
                  icon="${getChargingIcon(chargingState, batteryLevel)}"
                  class="${getBatteryIconClass(chargingState, batteryLevel)}"
                  title="${getBatteryTooltip(
                    this.hass,
                    chargingState,
                    batteryLevel,
                  )}"
                ></ha-icon>
              </div>

              <!-- Water Shortage Icon -->
              ${waterShortageId
                ? html`
                    <div class="icon-indicator">
                      <ha-icon
                        icon="mdi:water-alert"
                        class="water-shortage ${waterShortage
                          ? "critical-icon-pulse"
                          : "hidden"}"
                        title="${localize(this.hass, "card.water_shortage")}"
                      ></ha-icon>
                    </div>
                  `
                : ""}
            </div>

            <!-- Center Percentage Value-->
            <div class="gauge-center">
              <div class="gauge-value">${filterLife}%</div>
            </div>

            <!-- Horizontal Line -->
            <div class="separator-line"></div>

            <!-- Additional Control Buttons -->
            <div class="container-controls additional-controls">
              <button
                class="control-button ${this.hass.states[
                  relatedEntities.noDisturb || ""
                ]?.state === "on"
                  ? "on"
                  : "off"}"
                @click=${() => this._toggleSwitch(relatedEntities.noDisturb)}
                ?disabled="${!relatedEntities.noDisturb}"
                title="${localize(this.hass, "card.no_disturb_mode")}"
              >
                <ha-icon icon="mdi:bell-off"></ha-icon>
              </button>

              <button
                class="control-button ${this.hass.states[
                  relatedEntities.physicalControlLock || ""
                ]?.state === "on"
                  ? "on"
                  : "off"}"
                @click=${() =>
                  this._toggleSwitch(relatedEntities.physicalControlLock)}
                ?disabled="${!relatedEntities.physicalControlLock}"
                title="${localize(this.hass, "card.physical_control_lock")}"
              >
                <ha-icon icon="mdi:lock"></ha-icon>
              </button>

              <select
                class="pill-select"
                .value="${waterInterval}"
                @change="${(e: Event) =>
                  this._setWaterInterval(
                    parseInt((e.target as HTMLSelectElement).value),
                  )}"
                ?disabled="${!waterIntervalId ||
                mode.toLowerCase() !== "interval"}"
                title="${localize(this.hass, "card.water_interval")}"
              >
                ${waterIntervalOptions.map(
                  (option) => html`
                    <option
                      value="${option}"
                      ?selected="${option === waterInterval}"
                    >
                      ${option} min
                    </option>
                  `,
                )}
              </select>
            </div>

            <!-- Controls in Bottom Quarter (Power Button + Mode Selector) -->
            <div class="container-controls gauge-controls">
              <button
                class="control-button ${isOn ? "on" : "off"}"
                @click=${() => this._togglePower()}
                title="${isOn
                  ? localize(this.hass, "card.turn_off")
                  : localize(this.hass, "card.turn_on")}"
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>

              <button
                class="control-button"
                @click=${() => this._showResetConfirmation()}
                ?disabled="${!relatedEntities.resetFilterButton}"
                title="${localize(this.hass, "card.reset_filter")}"
              >
                <ha-icon icon="mdi:air-filter"></ha-icon>
              </button>

              <select
                class="pill-select mode-select"
                .value="${mode}"
                @change="${(e: Event) =>
                  this._selectMode((e.target as HTMLSelectElement).value)}"
                ?disabled="${!modeEntityId}"
                title="${localize(this.hass, "card.operating_mode")}"
              >
                ${modeOptions.map(
                  (option: string) => html`
                    <option value="${option}" ?selected="${option === mode}">
                      ${option}
                    </option>
                  `,
                )}
              </select>
            </div>
          </div>
        </div>

        <!-- Reset Confirmation Dialog -->
        ${this._showResetDialog
          ? html`
              <div
                class="dialog-overlay"
                @click=${() => this._hideResetDialog()}
              >
                <div
                  class="dialog-content"
                  @click=${(e: Event) => e.stopPropagation()}
                >
                  <div class="dialog-message">
                    ${localize(this.hass, "dialog.reset_filter_message")}
                  </div>
                  <div class="dialog-buttons">
                    <button
                      class="dialog-button cancel"
                      @click=${() => this._hideResetDialog()}
                    >
                      ${localize(this.hass, "dialog.cancel")}
                    </button>
                    <button
                      class="dialog-button confirm"
                      @click=${() => this._confirmResetFilter()}
                    >
                      ${localize(this.hass, "dialog.confirm")}
                    </button>
                  </div>
                </div>
              </div>
            `
          : ""}
      </ha-card>
    `;
  }

  private _togglePower(): void {
    if (!this.config || !this.hass) return;

    const baseName = extractBaseName(this.config.entity);
    const relatedEntities = findRelatedEntities(this.hass, baseName);

    // Use power switch entity
    const powerSwitchId = this.config.entity.startsWith("switch.")
      ? this.config.entity
      : relatedEntities.powerSwitch;

    if (!powerSwitchId) {
      console.error("Power switch entity not found");
      return;
    }

    const powerEntity = this.hass.states[powerSwitchId];
    const service = powerEntity.state === "on" ? "turn_off" : "turn_on";

    this.hass.callService("homeassistant", service, {
      entity_id: powerSwitchId,
    });
  }

  private _selectMode(selectedMode: string): void {
    if (!this.config || !this.hass) return;

    const baseName = extractBaseName(this.config.entity);
    const relatedEntities = findRelatedEntities(this.hass, baseName);

    // Use mode select entity
    const modeEntityId = relatedEntities.mode;

    if (!modeEntityId) {
      console.error("Mode select entity not found");
      return;
    }

    this.hass.callService("select", "select_option", {
      entity_id: modeEntityId,
      option: selectedMode,
    });
  }

  private _resetFilter(): void {
    if (!this.config || !this.hass) return;

    const baseName = extractBaseName(this.config.entity);
    const relatedEntities = findRelatedEntities(this.hass, baseName);

    // Use reset filter button entity
    const resetButtonId = relatedEntities.resetFilterButton;

    if (!resetButtonId) {
      console.error("Reset filter button entity not found");
      return;
    }

    this.hass.callService("button", "press", {
      entity_id: resetButtonId,
    });
  }

  private _showResetConfirmation(): void {
    this._showResetDialog = true;
    this.requestUpdate();
  }

  private _hideResetDialog(): void {
    this._showResetDialog = false;
    this.requestUpdate();
  }

  private _confirmResetFilter(): void {
    this._resetFilter();
    this._hideResetDialog();
  }

  private _toggleSwitch(entityId: string | undefined): void {
    if (!entityId || !this.hass) {
      console.error("Switch entity not found");
      return;
    }

    const entity = this.hass.states[entityId];
    if (!entity) {
      console.error("Entity not found:", entityId);
      return;
    }

    const service = entity.state === "on" ? "turn_off" : "turn_on";

    this.hass.callService("homeassistant", service, {
      entity_id: entityId,
    });
  }

  private _setWaterInterval(value: number): void {
    if (!this.config || !this.hass) return;

    const baseName = extractBaseName(this.config.entity);
    const relatedEntities = findRelatedEntities(this.hass, baseName);

    // Use water interval number entity
    const waterIntervalId = relatedEntities.outWaterInterval;

    if (!waterIntervalId) {
      console.error("Water interval entity not found");
      return;
    }

    this.hass.callService("number", "set_value", {
      entity_id: waterIntervalId,
      value: value,
    });
  }

  static get styles() {
    return css`
      ha-card {
        padding: 16px;
      }

      .card-content {
        position: relative;
      }

      .card-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        text-align: center;
        margin-bottom: 16px;
        letter-spacing: 0.5px;
      }

      .card-header {
        font-size: 24px;
        font-weight: bold;
        padding-bottom: 16px;
      }

      .warning {
        display: block;
        color: red;
        padding: 16px;
      }

      /* Gauge Container - */
      .gauge-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0 auto;
        width: min(100%, 320px);
        height: 280px;
        flex-shrink: 0;
        container-type: size;
      }

      .gauge-svg {
        position: absolute;
        width: 100%;
        max-width: 320px;
        height: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      .gauge-background {
        opacity: 0.2;
      }

      .gauge-progress.on {
        stroke: var(--primary-color);
      }

      .gauge-progress.off {
        stroke: var(--disabled-text-color);
      }

      /* Critical filter alert - red blinking border */
      .gauge-progress.critical {
        stroke: var(--error-color);
        animation: pulse 2s infinite;
      }

      /* Status Icons Row - Positioned above percentage, between gauge and center */
      .status-icons-row {
        position: absolute;
        top: 45px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }

      .icon-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        position: relative;
      }

      .icon-indicator ha-icon {
        font-size: 24px;
      }

      .icon-indicator ha-icon.active {
        color: var(--primary-color);
      }

      .icon-indicator ha-icon.inactive {
        color: var(--disabled-text-color);
      }

      .icon-indicator ha-icon.charging {
        color: var(--success-color);
        animation: pulse 2s infinite;
      }

      .critical-icon-pulse {
        color: var(--error-color);
        animation: pulse 2s infinite;
      }

      .icon-indicator ha-icon.water-shortage.hidden {
        opacity: 0 !important;
        visibility: hidden;
        animation: none !important;
        pointer-events: none;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
      }

      .icon-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        text-align: center;
        white-space: nowrap;
      }

      /* Center Percentage Value */
      .gauge-center {
        position: absolute;
        top: 43%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5;
      }

      .gauge-value {
        font-size: 42px;
        font-weight: 400;
        color: var(--primary-text-color);
        text-align: center;
      }

      /* Horizontal Separator Line */
      .separator-line {
        position: absolute;
        top: 154px;
        left: 50%;
        transform: translateX(-50%);
        width: min(200px, 60%);
        height: 3px;
        background-color: var(--disabled-text-color);
        border-radius: 2px;
        z-index: 5;
      }

      .container-controls {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        z-index: 10;
        width: auto;
        padding: 0 20px 0 20px;
      }

      /* Additional Control Buttons (No Disturb, Physical Lock) */
      .additional-controls {
        top: 170px;
      }

      .control-button {
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        flex-shrink: 0;
        padding: 0;
        margin: 0;
      }

      .control-button:hover:not(:disabled) {
        opacity: 0.8;
        transform: scale(1.1);
      }

      .control-button:active:not(:disabled) {
        transform: scale(0.95);
      }

      .control-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .control-button.on {
        color: var(--primary-text-color);
      }

      .control-button.off {
        color: var(--disabled-text-color);
        opacity: 0.6;
      }

      /* Controls in Bottom Quarter */
      .gauge-controls {
        top: 225px;
      }

      .pill-select {
        width: 90px;
        height: 32px;
        padding: 0 8px;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background-color: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        cursor: pointer;
        transition: border-color 0.2s ease;
        margin: 0;
        outline: none;
      }

      .pill-select:hover:not(:disabled) {
        border-color: var(--primary-color);
      }

      .pill-select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .pill-select:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .mode-select {
        text-transform: capitalize;
      }

      /* Reset Confirmation Dialog */
      .dialog-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        border-radius: inherit;
      }

      .dialog-content {
        background: var(--card-background-color);
        border-radius: 8px;
        padding: 24px;
        min-width: 280px;
        max-width: 400px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .dialog-message {
        color: var(--primary-text-color);
        font-size: 16px;
        margin-bottom: 24px;
        text-align: center;
        line-height: 1.5;
      }

      .dialog-buttons {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }

      .dialog-button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        text-transform: uppercase;
      }

      .dialog-button.cancel {
        background: transparent;
        color: var(--primary-color);
      }

      .dialog-button.cancel:hover {
        background: var(--divider-color);
      }

      .dialog-button.confirm {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .dialog-button.confirm:hover {
        opacity: 0.9;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "xiaomi-smart-pet-fountain-2-card": XiaomiSmartPetFountainCard;
  }
}
