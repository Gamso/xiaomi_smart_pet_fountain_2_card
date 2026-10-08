import { describe, expect, it, vi } from "vitest";
import "../src/components/editor";
import { $, BASE, fountainEntities, makeHass, mountCard } from "./helpers";

type Editor = HTMLElement & {
  hass: unknown;
  setConfig(config: Record<string, unknown>): void;
  updateComplete: Promise<boolean>;
};

async function mountEditor(config: Record<string, unknown>) {
  const el = document.createElement(
    "xiaomi-smart-pet-fountain-2-card-editor",
  ) as Editor;
  el.hass = makeHass(fountainEntities(), "fr");
  el.setConfig(config);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe("card name", () => {
  it("shows the name option as title", async () => {
    const el = await mountCard(
      { entity: `switch.${BASE}_pet_drinking_fountain`, name: "Cat water" },
      makeHass(fountainEntities()),
    );
    expect($(el, ".card-title")!.textContent).toBe("Cat water");
  });

  it("keeps the product name by default", async () => {
    const el = await mountCard(
      { entity: `switch.${BASE}_pet_drinking_fountain` },
      makeHass(fountainEntities()),
    );
    expect($(el, ".card-title")!.textContent).toBe(
      "Xiaomi Smart Pet Fountain 2",
    );
  });
});

describe("editor", () => {
  it("offers entity, name and the entity overrides, with labels", async () => {
    const el = await mountEditor({ entity: `switch.${BASE}_pet_drinking_fountain` });
    const form = el.shadowRoot!.querySelector("ha-form") as any;
    const names = form.schema.map((s: any) => s.name);
    expect(names.slice(0, 2)).toEqual(["entity", "name"]);
    const overrides = form.schema.find((s: any) => s.type === "expandable");
    expect(overrides.flatten).toBe(true);
    expect(overrides.schema.map((s: any) => s.name)).toContain("battery_entity");

    expect(form.computeLabel({ name: "name" })).toBe("Nom (facultatif)");
    expect(form.computeLabel({ name: "mode_entity" })).toBe(
      "Mode de fonctionnement",
    );
    expect(form.computeHelper({ name: "entity" })).toContain("Fontaine");
  });

  it("drops emptied fields from the emitted config", async () => {
    const el = await mountEditor({ entity: "switch.a" });
    const listener = vi.fn();
    el.addEventListener("config-changed", listener);
    const form = el.shadowRoot!.querySelector("ha-form")!;
    form.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: { type: "x", entity: "switch.a", name: "", mode_entity: "" } },
      }),
    );
    expect(listener.mock.calls[0][0].detail.config).toEqual({
      type: "x",
      entity: "switch.a",
    });
  });
});
