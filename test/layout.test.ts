import { describe, expect, it } from "vitest";
import { $, BASE, fountainEntities, makeHass, mountCard } from "./helpers";

const POWER = `switch.${BASE}_pet_drinking_fountain`;

describe("card size", () => {
  it("estimates the masonry height before layout (title + 280 px gauge)", async () => {
    // jsdom does no layout: offsetHeight is 0, the estimate is used
    const el = await mountCard({ entity: POWER }, makeHass(fountainEntities()));
    expect(el.getCardSize()).toBe(7);
  });

  it("counts the missing-entities banner", async () => {
    const hass = makeHass(
      fountainEntities().filter((e) => !e.entity_id.endsWith("_mode")),
    );
    const el = await mountCard({ entity: POWER }, hass);
    expect(el.getCardSize()).toBe(8);
  });

  it("uses the rendered height once laid out", async () => {
    const el = await mountCard({ entity: POWER }, makeHass(fountainEntities()));
    Object.defineProperty(el, "offsetHeight", { value: 420 });
    expect(el.getCardSize()).toBe(9);
  });

  it("declares grid options for the sections view", async () => {
    const el = (await mountCard(
      { entity: POWER },
      makeHass(fountainEntities()),
    )) as unknown as { getGridOptions(): Record<string, unknown> };
    expect(el.getGridOptions()).toEqual({
      columns: 6,
      min_columns: 6,
      rows: "auto",
    });
  });
});

describe("gauge layout", () => {
  it("draws everything over the gauge in one flow overlay", async () => {
    const el = await mountCard({ entity: POWER }, makeHass(fountainEntities()));
    const overlay = $(el, ".gauge-container > .gauge-overlay")!;
    for (const selector of [
      ".status-icons-row",
      ".gauge-center",
      ".separator-line",
      ".additional-controls",
      ".gauge-controls",
    ]) {
      expect(overlay.querySelector(selector)).not.toBeNull();
    }
  });

  it("uses no absolute pixel offsets, sizes from the gauge width", async () => {
    const el = await mountCard({ entity: POWER }, makeHass(fountainEntities()));
    const css = (el.constructor as any).styles.cssText as string;
    expect(css).not.toMatch(/[\s;{]top:\s*\d+px/);
    expect(css).not.toContain("position: absolute");
    expect(css).not.toContain("container-type: size");
    expect(css).toContain("container-type: inline-size");
    expect(css).toMatch(/\d+cqw/);
  });
});
