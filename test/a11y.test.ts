import { beforeAll, describe, expect, it } from "vitest";
import { $, $$, BASE, fountainEntities, makeHass, mountCard } from "./helpers";

const POWER = `switch.${BASE}_pet_drinking_fountain`;

// jsdom has HTMLDialogElement but not its modal API: minimal stand-in.
beforeAll(() => {
  const proto = HTMLDialogElement.prototype as any;
  if (typeof proto.showModal !== "function") {
    proto.showModal = function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
    proto.close = function (this: HTMLDialogElement) {
      if (!this.hasAttribute("open")) return;
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  }
});

const button = (el: HTMLElement, icon: string) =>
  $$(el, "button.control-button").find(
    (b) => b.querySelector("ha-icon")?.getAttribute("icon") === icon,
  ) as HTMLButtonElement;

describe("accessibility", () => {
  it("names every icon-only button and exposes toggle states", async () => {
    const hass = makeHass(
      fountainEntities({ [`switch.${BASE}_no_disturb`]: "on" }),
    );
    const el = await mountCard({ entity: POWER }, hass);
    for (const b of $$(el, "button.control-button")) {
      expect(b.getAttribute("aria-label")).toBeTruthy();
    }
    expect(button(el, "mdi:bell-off").getAttribute("aria-pressed")).toBe("true");
    expect(button(el, "mdi:lock").getAttribute("aria-pressed")).toBe("false");
    expect(button(el, "mdi:power").getAttribute("aria-pressed")).toBe("true");
    for (const s of $$(el, "select")) {
      expect(s.getAttribute("aria-label")).toBeTruthy();
    }
  });

  it("describes the gauge and the status icons", async () => {
    const hass = makeHass(
      fountainEntities({
        [`binary_sensor.${BASE}_water_shortage_status`]: "on",
      }),
    );
    const el = await mountCard({ entity: POWER }, hass);
    expect($(el, ".gauge-svg")!.getAttribute("aria-label")).toBe(
      "Filter life: 80%, 24 days left",
    );
    const icons = $$(el, ".icon-indicator[role=img]");
    expect(icons.map((i) => i.getAttribute("aria-label"))).toEqual([
      "On AC power",
      "Water shortage !",
    ]);
  });

  it("hides the water shortage icon from assistive tech when there is water", async () => {
    const el = await mountCard({ entity: POWER }, makeHass(fountainEntities()));
    const water = $(el, ".water-shortage")!.parentElement!;
    expect(water.getAttribute("aria-hidden")).toBe("true");
    expect(water.hasAttribute("role")).toBe(false);
  });

  it("uses a native modal dialog for the filter reset, focus back on close", async () => {
    const hass = makeHass(fountainEntities());
    const el = await mountCard({ entity: POWER }, hass);
    const dialog = $(el, "dialog.reset-dialog") as HTMLDialogElement;
    expect(dialog.getAttribute("aria-labelledby")).toBe("reset-dialog-message");
    expect(dialog.open).toBe(false);

    const reset = button(el, "mdi:air-filter");
    expect(reset.getAttribute("aria-haspopup")).toBe("dialog");
    reset.click();
    expect(dialog.open).toBe(true);

    // Cancel: nothing called, focus back on the trigger
    ($(el, ".dialog-button.cancel") as HTMLButtonElement).click();
    expect(dialog.open).toBe(false);
    expect(el.shadowRoot!.activeElement).toBe(reset);
    expect(hass.callService).not.toHaveBeenCalled();

    // Confirm: button.press, dialog closed
    reset.click();
    ($(el, ".dialog-button.confirm") as HTMLButtonElement).click();
    expect(dialog.open).toBe(false);
    expect(hass.callService).toHaveBeenCalledWith("button", "press", {
      entity_id: `button.${BASE}_reset_filter_life`,
    });
  });

  it("closes the dialog on a backdrop click only", async () => {
    const el = await mountCard({ entity: POWER }, makeHass(fountainEntities()));
    const dialog = $(el, "dialog.reset-dialog") as HTMLDialogElement;
    button(el, "mdi:air-filter").click();
    $(el, ".dialog-message")!.click();
    expect(dialog.open).toBe(true);
    dialog.click();
    expect(dialog.open).toBe(false);
  });
});

describe("styles", () => {
  it("never removes the focus outline and honours reduced motion", async () => {
    const el = await mountCard({ entity: POWER }, makeHass(fountainEntities()));
    const css = (el.constructor as any).styles.cssText as string;
    expect(css).not.toMatch(/outline:\s*none/);
    expect(css).toContain(":focus-visible");
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});
