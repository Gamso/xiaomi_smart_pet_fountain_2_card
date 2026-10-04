import { LitElement, html, svg, css, nothing, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { HassEntity, HomeAssistant } from "../types/hass";
import { XiaomiSmartPetFountainCardConfig } from "../types/config";
import {
  resolveEntities,
  numericState,
  knownState,
  percentState,
  buildIntervalOptions,
  PET_FOUNTAIN_2_PLATFORM,
  stateKey,
} from "../utils";
import {
  getChargingIcon,
  getBatteryTooltip,
  getBatteryIconClass,
} from "../utils/battery-utils";
import { localize, setupCustomlocalize } from "../localize";
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

const DEFAULT_TITLE = "Xiaomi Smart Pet Fountain 2";
const DEFAULT_MODES = ["auto", "interval", "constant"];

@customElement("xiaomi-smart-pet-fountain-2-card")
export class XiaomiSmartPetFountainCard extends LitElement {
  @property({ type: Object }) hass?: HomeAssistant;
  @property({ type: Object }) config?: XiaomiSmartPetFountainCardConfig;
  @query("dialog.reset-dialog") private _resetDialog?: HTMLDialogElement;
  @query("button.reset-filter-button") private _resetButton?: HTMLButtonElement;

  // The editor is bundled with the card (static import above): no lazy load
  static getConfigElement(): HTMLElement {
    return document.createElement("xiaomi-smart-pet-fountain-2-card-editor");
  }

  static getStubConfig(
    hass?: HomeAssistant,
  ): XiaomiSmartPetFountainCardConfig {
    // Default configuration for the card picker preview: the first fountain
    // power switch of this Home Assistant, if any (xiaomi_pet_fountain_2
    // first, then Xiaomi Miot Auto).
    const states = hass?.states ?? {};
    const local = Object.values(hass?.entities ?? {})
      .filter(
        (e) =>
          e?.platform === PET_FOUNTAIN_2_PLATFORM &&
          e.translation_key === "power" &&
          !!states[e.entity_id],
      )
      .map((e) => e.entity_id)
      .sort()[0];
    const fountain =
      local ??
      Object.keys(states)
        .sort()
        .find((id) => /^switch\..+_pet_drinking_fountain$/.test(id));
    return {
      type: "custom:xiaomi-smart-pet-fountain-2-card",
      entity: fountain ?? "",
    };
  }

  setConfig(config: XiaomiSmartPetFountainCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this.config = config;
  }

  /**
   * Height in 50 px units for the masonry view: the rendered height once laid
   * out, otherwise an estimate (title + gauge ~ 350 px, banner ~ 50 px).
   */
  getCardSize(): number {
    const height = this.offsetHeight;
    if (height > 0) return Math.ceil(height / 50);
    const missing = resolveEntities(this.hass, this.config).missing.length;
    return missing ? 8 : 7;
  }

  /** Sections view: half width by default (the gauge is ~280 px wide), never
   * narrower, height follows the content. */
  getGridOptions(): { columns: number; min_columns: number; rows: "auto" } {
    return { columns: 6, min_columns: 6, rows: "auto" };
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html`
        <ha-card>
          <div class="card-content message">
            <div class="message-detail">${localize(this.hass, "card.loading")}</div>
          </div>
        </ha-card>
      `;
    }

    const { entities: relatedEntities, missing } = resolveEntities(
      this.hass,
      this.config,
    );
    const entity = this.hass.states[this.config.entity];
    const anyEntityFound = Object.values(relatedEntities).some(
      (id) => !!id && !!this.hass?.states[id],
    );
    if (!entity && !anyEntityFound) {
      // No fountain entity at all (none configured, or a wrong entity_id)
      return html`
        <ha-card>
          <div class="card-content message">
            <div class="message-title">${this._title()}</div>
            ${this.config.entity
              ? html`<div class="message-detail">
                  ${localize(this.hass, "card.entity_not_found")}:
                  ${this.config.entity}
                </div>`
              : nothing}
            <div class="message-hint">
              ${localize(this.hass, "card.select_entity")}
            </div>
          </div>
        </ha-card>
      `;
    }

    // Power switch: never read on/off from another entity
    const powerSwitchId = relatedEntities.powerSwitch;
    const powerEntity = powerSwitchId
      ? this.hass.states[powerSwitchId]
      : undefined;

    // Get mode from mode select entity. Options are the entity's own
    // strings ("Constant" with Miot Auto, "constant" with
    // xiaomi_pet_fountain_2), compared through stateKey().
    const modeEntityId = relatedEntities.mode;
    const modeEntity = modeEntityId ? this.hass.states[modeEntityId] : undefined;
    const modeOptions = this._modeOptions(modeEntity);
    const modeKey = stateKey(knownState(modeEntity)) ?? (modeEntity ? undefined : "auto");
    const mode = modeOptions.find((option) => stateKey(option) === modeKey);

    // Get battery info
    const batteryLevelId = relatedEntities.batteryLevel;
    const batteryLevelEntity = batteryLevelId
      ? this.hass.states[batteryLevelId]
      : null;
    // Unknown (entity missing, unavailable, unknown) stays undefined: never 0
    const batteryLevel = numericState(batteryLevelEntity);

    const chargingStateId = relatedEntities.chargingState;
    const chargingStateEntity = chargingStateId
      ? this.hass.states[chargingStateId]
      : null;
    const chargingState = knownState(chargingStateEntity);
    // Hide the indicator when the fountain exposes neither battery entity
    const showBattery = !!(batteryLevelId || chargingStateId);

    // Get water shortage status
    const waterShortageId = relatedEntities.waterShortage;
    const waterShortageEntity = waterShortageId
      ? this.hass.states[waterShortageId]
      : null;
    const waterShortage = waterShortageEntity
      ? waterShortageEntity.state === "on"
      : false;

    // Faults (xiaomi_pet_fountain_2 only): shown only while on
    const faults = [
      {
        on: this.hass.states[relatedEntities.pumpBlocked ?? ""]?.state === "on",
        icon: "mdi:pump-off",
        label: localize(this.hass, "card.pump_blocked"),
      },
      {
        on: this.hass.states[relatedEntities.fault ?? ""]?.state === "on",
        icon: "mdi:alert-circle",
        label: localize(this.hass, "card.fault"),
      },
    ].filter((f) => f.on);

    // Get filter life
    const filterLifeId = relatedEntities.filterLifeLevel;
    const filterLifeEntity = filterLifeId
      ? this.hass.states[filterLifeId]
      : null;
    const filterLife = percentState(filterLifeEntity);

    // Get filter left time
    const filterLeftTimeId = relatedEntities.filterLeftTime;
    const filterLeftTimeEntity = filterLeftTimeId
      ? this.hass.states[filterLeftTimeId]
      : null;
    const filterLeftTime = numericState(filterLeftTimeEntity);

    // Get water interval
    const waterIntervalId = relatedEntities.outWaterInterval;
    const waterIntervalEntity = waterIntervalId
      ? this.hass.states[waterIntervalId]
      : null;
    // Real value, 0 included; undefined while unknown
    const waterInterval = numericState(waterIntervalEntity);

    // Water interval options (from min to max by step, bounded)
    const waterIntervalOptions = buildIntervalOptions(
      waterIntervalEntity?.attributes?.min,
      waterIntervalEntity?.attributes?.max,
      waterIntervalEntity?.attributes?.step,
      waterInterval,
    );

    const isOn = powerEntity?.state === "on";

    const arcLength = 85 * 2 * Math.PI * (250 / 360);
    const progressLength = ((filterLife ?? 0) / 100) * arcLength;

    // Build tooltip for filter life gauge
    let tooltipText = "";
    if (filterLeftTime !== undefined) {
      tooltipText = localize(this.hass, "card.days_left", {
        days: Math.round(filterLeftTime),
      });
    }
    const filterLifeText =
      filterLife === undefined
        ? localize(this.hass, "card.unknown")
        : `${Math.round(filterLife)}%`;
    const gaugeLabel = [
      `${localize(this.hass, "card.filter_life")}: ${filterLifeText}`,
      tooltipText,
    ]
      .filter(Boolean)
      .join(", ");

    const noDisturbOn =
      this.hass.states[relatedEntities.noDisturb || ""]?.state === "on";
    const lockOn =
      this.hass.states[relatedEntities.physicalControlLock || ""]?.state ===
      "on";
    const batteryText = getBatteryTooltip(
      this.hass,
      chargingState,
      batteryLevel,
    );
    const powerLabel = isOn
      ? localize(this.hass, "card.turn_off")
      : localize(this.hass, "card.turn_on");

    return html`
      <ha-card>
        <div class="card-content">
          <!-- Card Title -->
          <div class="card-title">${this._title()}</div>

          ${missing.length
            ? html`
                <div class="missing-banner" role="status">
                  ${localize(this.hass, "card.missing_entities", {
                    entities: missing.join(", "),
                  })}
                </div>
              `
            : nothing}

          <!-- Filter Life Circular Gauge -->
          <div class="gauge-container">
            <svg
              class="gauge-svg"
              viewBox="0 0 200 200"
              role="img"
              aria-label="${gaugeLabel}"
            >
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
              <!-- Progress arc (3/4 circle), hidden while the level is unknown -->
              ${filterLife === undefined
                ? nothing
                : svg`<path
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
              />`}
            </svg>

            <!-- Content over the gauge: a vertical flow, not absolute pixel
                 positions, so larger text pushes items down instead of
                 overlapping them -->
            <div class="gauge-overlay">
              <!-- Status Icons Row (above percentage) -->
              <div class="status-icons-row">
                <!-- Battery/Charging Icon -->
                ${showBattery
                  ? html`
                      <div
                        class="icon-indicator"
                        role="img"
                        aria-label="${batteryText}"
                        title="${batteryText}"
                      >
                        <ha-icon
                          icon="${getChargingIcon(chargingState, batteryLevel)}"
                          class="${getBatteryIconClass(
                            chargingState,
                            batteryLevel,
                          )}"
                        ></ha-icon>
                      </div>
                    `
                  : nothing}

                <!-- Water Shortage Icon -->
                ${waterShortageId
                  ? html`
                      <div
                        class="icon-indicator"
                        role=${waterShortage ? "img" : nothing}
                        aria-label=${waterShortage
                          ? localize(this.hass, "card.water_shortage")
                          : nothing}
                        aria-hidden=${waterShortage ? nothing : "true"}
                        title=${waterShortage
                          ? localize(this.hass, "card.water_shortage")
                          : nothing}
                      >
                        <ha-icon
                          icon="mdi:water-alert"
                          class="water-shortage ${waterShortage
                            ? "critical-icon-pulse"
                            : "hidden"}"
                        ></ha-icon>
                      </div>
                    `
                  : ""}

                <!-- Fault Icons (pump blocked, device fault) -->
                ${faults.map(
                  (f) => html`
                    <div
                      class="icon-indicator"
                      role="img"
                      aria-label="${f.label}"
                      title="${f.label}"
                    >
                      <ha-icon
                        icon="${f.icon}"
                        class="fault critical-icon-pulse"
                      ></ha-icon>
                    </div>
                  `,
                )}
              </div>

              <!-- Center Percentage Value-->
              <div class="gauge-center" aria-hidden="true">
                <div class="gauge-value">
                  ${filterLife === undefined ? "--" : `${Math.round(filterLife)}%`}
                </div>
              </div>

              <!-- Horizontal Line -->
              <div class="separator-line"></div>

              <!-- Additional Control Buttons -->
              <div class="container-controls additional-controls">
                <button
                  class="control-button ${noDisturbOn ? "on" : "off"}"
                  @click=${() => this._toggleSwitch(relatedEntities.noDisturb)}
                  ?disabled="${!relatedEntities.noDisturb}"
                  title="${localize(this.hass, "card.no_disturb_mode")}"
                  aria-label="${localize(this.hass, "card.no_disturb_mode")}"
                  aria-pressed="${noDisturbOn ? "true" : "false"}"
                >
                  <ha-icon icon="mdi:bell-off"></ha-icon>
                </button>

                <button
                  class="control-button ${lockOn ? "on" : "off"}"
                  @click=${() =>
                    this._toggleSwitch(relatedEntities.physicalControlLock)}
                  ?disabled="${!relatedEntities.physicalControlLock}"
                  title="${localize(this.hass, "card.physical_control_lock")}"
                  aria-label="${localize(this.hass, "card.physical_control_lock")}"
                  aria-pressed="${lockOn ? "true" : "false"}"
                >
                  <ha-icon icon="mdi:lock"></ha-icon>
                </button>

                <select
                  class="pill-select"
                  .value="${waterInterval === undefined ? "" : String(waterInterval)}"
                  @change="${(e: Event) =>
                    this._setWaterInterval(
                      Number((e.target as HTMLSelectElement).value),
                    )}"
                  ?disabled="${!waterIntervalId || modeKey !== "interval"}"
                  title="${localize(this.hass, "card.water_interval")}"
                  aria-label="${localize(this.hass, "card.water_interval")}"
                >
                  ${waterInterval === undefined
                    ? html`<option value="" disabled selected>--</option>`
                    : nothing}
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
                  ?disabled="${!powerEntity}"
                  title="${powerLabel}"
                  aria-label="${localize(this.hass, "card.power")}"
                  aria-pressed="${isOn ? "true" : "false"}"
                >
                  <ha-icon icon="mdi:power"></ha-icon>
                </button>

                <button
                  class="control-button reset-filter-button"
                  @click=${() => this._showResetConfirmation()}
                  ?disabled="${!relatedEntities.resetFilterButton}"
                  title="${localize(this.hass, "card.reset_filter")}"
                  aria-label="${localize(this.hass, "card.reset_filter")}"
                  aria-haspopup="dialog"
                >
                  <ha-icon icon="mdi:air-filter"></ha-icon>
                </button>

                <select
                  class="pill-select mode-select"
                  .value="${mode ?? ""}"
                  @change="${(e: Event) =>
                    this._selectMode((e.target as HTMLSelectElement).value)}"
                  ?disabled="${!modeEntityId}"
                  title="${localize(this.hass, "card.operating_mode")}"
                  aria-label="${localize(this.hass, "card.operating_mode")}"
                >
                  ${mode === undefined
                    ? html`<option value="" disabled selected>--</option>`
                    : nothing}
                  ${modeOptions.map(
                    (option: string) => html`
                      <option value="${option}" ?selected="${option === mode}">
                        ${this._modeLabel(modeEntity, option)}
                      </option>
                    `,
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Reset Confirmation Dialog: native modal <dialog>, so it is
             rendered in the top layer, the page behind is inert with the
             focus kept inside, Escape closes it and it has role "dialog". -->
        <dialog
          class="reset-dialog"
          aria-labelledby="reset-dialog-message"
          @click=${(e: Event) => {
            // A click on the backdrop targets the <dialog> element itself
            if (e.target === e.currentTarget) this._hideResetDialog();
          }}
          @close=${() => this._resetButton?.focus()}
        >
          <div class="dialog-message" id="reset-dialog-message">
            ${localize(this.hass, "dialog.reset_filter_message")}
          </div>
          <div class="dialog-buttons">
            <button
              class="dialog-button cancel"
              autofocus
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
        </dialog>
      </ha-card>
    `;
  }

  /** Card title: the `name` option, or the product name by default */
  private _title(): string {
    return this.config?.name?.trim() || DEFAULT_TITLE;
  }

  private _relatedEntities() {
    return resolveEntities(this.hass, this.config).entities;
  }

  /** Options of the mode select entity, exactly as it expects them */
  private _modeOptions(modeEntity: HassEntity | undefined): string[] {
    const options = modeEntity?.attributes?.options;
    return Array.isArray(options) && options.length
      ? options.map(String)
      : DEFAULT_MODES;
  }

  /**
   * Displayed name of a mode: the entity's translated state when Home
   * Assistant has one (hass.formatEntityState), else the card's
   * translation, never the raw option.
   */
  private _modeLabel(
    modeEntity: HassEntity | undefined,
    option: string,
  ): string {
    const formatted =
      modeEntity && typeof this.hass?.formatEntityState === "function"
        ? this.hass.formatEntityState(modeEntity, option)
        : undefined;
    if (formatted && formatted !== option) return formatted;
    const key = `card.modes.${stateKey(option)}`;
    const own = setupCustomlocalize(this.hass)(key);
    return own !== key ? own : formatted || option;
  }

  /**
   * Call a service and report a failure (device offline, validation error,
   * missing permission) as a Home Assistant toast instead of an unhandled
   * promise rejection. The card re-renders so the selects snap back to the
   * entity's real state.
   */
  private async _callService(
    domain: string,
    service: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    if (!this.hass) return;
    try {
      await this.hass.callService(domain, service, data);
    } catch (err) {
      console.error(`${domain}.${service} failed`, err);
      const error =
        err instanceof Error
          ? err.message
          : ((err as { message?: string })?.message ?? String(err));
      this.dispatchEvent(
        new CustomEvent("hass-notification", {
          bubbles: true,
          composed: true,
          detail: {
            message: localize(this.hass, "card.service_error", { error }),
          },
        }),
      );
      this.requestUpdate();
    }
  }

  private _togglePower(): void {
    if (!this.config || !this.hass) return;

    const relatedEntities = this._relatedEntities();

    // Use power switch entity
    const powerSwitchId = relatedEntities.powerSwitch;
    const powerEntity = powerSwitchId
      ? this.hass.states[powerSwitchId]
      : undefined;

    if (!powerSwitchId || !powerEntity) {
      console.error("Power switch entity not found");
      return;
    }

    const service = powerEntity.state === "on" ? "turn_off" : "turn_on";

    this._callService("homeassistant", service, {
      entity_id: powerSwitchId,
    });
  }

  private _selectMode(selectedMode: string): void {
    if (!this.config || !this.hass) return;

    const relatedEntities = this._relatedEntities();

    // Use mode select entity
    const modeEntityId = relatedEntities.mode;

    if (!modeEntityId) {
      console.error("Mode select entity not found");
      return;
    }

    // Send the option string the entity lists (its own casing)
    const key = stateKey(selectedMode);
    const option =
      this._modeOptions(this.hass.states[modeEntityId]).find(
        (o) => stateKey(o) === key,
      ) ?? selectedMode;

    this._callService("select", "select_option", {
      entity_id: modeEntityId,
      option,
    });
  }

  private _resetFilter(): void {
    if (!this.config || !this.hass) return;

    const relatedEntities = this._relatedEntities();

    // Use reset filter button entity
    const resetButtonId = relatedEntities.resetFilterButton;

    if (!resetButtonId) {
      console.error("Reset filter button entity not found");
      return;
    }

    this._callService("button", "press", {
      entity_id: resetButtonId,
    });
  }

  private _showResetConfirmation(): void {
    const dialog = this._resetDialog;
    if (!dialog || dialog.open) return;
    dialog.showModal();
  }

  private _hideResetDialog(): void {
    if (this._resetDialog?.open) this._resetDialog.close();
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

    this._callService("homeassistant", service, {
      entity_id: entityId,
    });
  }

  private _setWaterInterval(value: number): void {
    if (!this.config || !this.hass) return;

    const relatedEntities = this._relatedEntities();

    // Use water interval number entity
    const waterIntervalId = relatedEntities.outWaterInterval;

    if (!waterIntervalId) {
      console.error("Water interval entity not found");
      return;
    }

    this._callService("number", "set_value", {
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

      .missing-banner {
        margin: 0 0 12px;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 13px;
        color: var(--primary-text-color);
        background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.15);
        border-left: 4px solid var(--warning-color, #ffa600);
        overflow-wrap: anywhere;
      }

      .message {
        padding: 16px;
        text-align: center;
      }

      .message-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 8px;
        color: var(--primary-text-color);
      }

      .message-detail {
        color: var(--secondary-text-color);
        font-size: 14px;
        overflow-wrap: anywhere;
      }

      .message-hint {
        color: var(--secondary-text-color);
        font-size: 12px;
        margin-top: 8px;
      }

      /* Gauge: the SVG and the overlay share one grid cell */
      .gauge-container {
        position: relative;
        display: grid;
        margin: 0 auto;
        width: min(100%, 280px);
        /* cqw units below scale with the gauge width */
        container-type: inline-size;
      }

      .gauge-svg {
        grid-area: 1 / 1;
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 1;
      }

      .gauge-background {
        opacity: 0.2;
      }

      .gauge-progress {
        transition:
          stroke-dasharray 0.3s ease,
          stroke 0.3s ease;
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

      .gauge-overlay {
        grid-area: 1 / 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* Proportions of the 280 px design: icons at 16 %, value centred
           at 43 %, controls in the opening of the arc */
        padding-top: 16cqw;
        min-width: 0;
      }

      /* Status Icons Row - above percentage, between gauge and center */
      .status-icons-row {
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: center;
        min-height: 24px;
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

      /* Center Percentage Value */
      .gauge-center {
        margin-top: 9.5cqw;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .gauge-value {
        font-size: clamp(24px, 15cqw, 42px);
        line-height: 1.15;
        font-weight: 400;
        color: var(--primary-text-color);
        text-align: center;
      }

      /* Horizontal Separator Line */
      .separator-line {
        flex-shrink: 0;
        margin-top: 3.5cqw;
        width: min(200px, 72%);
        height: 3px;
        background-color: var(--disabled-text-color);
        border-radius: 2px;
      }

      .container-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 4px;
        max-width: 100%;
      }

      /* Additional Control Buttons (No Disturb, Physical Lock) */
      .additional-controls {
        margin-top: 4.5cqw;
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
        margin-top: 8cqw;
      }

      .pill-select {
        /* Narrower on a narrow gauge so the row stays inside the arc */
        width: clamp(76px, 36cqw, 90px);
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
      }

      .pill-select:hover:not(:disabled) {
        border-color: var(--primary-color);
      }

      .pill-select:focus {
        border-color: var(--primary-color);
      }

      /* Keyboard focus: always visible */
      .control-button:focus-visible,
      .pill-select:focus-visible,
      .dialog-button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .control-button {
        border-radius: 50%;
      }

      .pill-select:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .mode-select {
        text-transform: capitalize;
      }

      /* Reset Confirmation Dialog */
      .reset-dialog {
        border: none;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        border-radius: 8px;
        padding: 24px;
        width: min(400px, calc(100vw - 32px));
        box-sizing: border-box;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .reset-dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
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

      @media (prefers-reduced-motion: reduce) {
        .gauge-progress.critical,
        .icon-indicator ha-icon.charging,
        .critical-icon-pulse {
          animation: none;
        }

        .gauge-progress,
        .control-button,
        .pill-select,
        .dialog-button {
          transition: none;
        }

        .control-button:hover:not(:disabled),
        .control-button:active:not(:disabled) {
          transform: none;
        }
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "xiaomi-smart-pet-fountain-2-card": XiaomiSmartPetFountainCard;
  }
}
