import { describe, expect, it } from "vitest";
import { XiaomiSmartPetFountainCard } from "../src/components/card";
import { $, entity, makeHass, mountCard } from "./helpers";

describe("card API", () => {
  it("creates the editor synchronously", () => {
    const editor = XiaomiSmartPetFountainCard.getConfigElement();
    expect(editor.tagName.toLowerCase()).toBe(
      "xiaomi-smart-pet-fountain-2-card-editor",
    );
  });
});

describe("messages", () => {
  it("localizes the entity-not-found message", async () => {
    const el = await mountCard(
      { entity: "switch.nothing_here" },
      makeHass([entity("switch.lamp", "on")], "fr"),
    );
    const text = $(el, ".message")!.textContent!;
    expect(text).toContain("Entité non trouvée");
    expect(text).toContain("switch.nothing_here");
    expect(text).toContain("Sélectionnez une entité");
    expect(text).not.toContain("Please select");
  });

  it("only asks for an entity when none is configured", async () => {
    const el = await mountCard({ entity: "" }, makeHass([]));
    const text = $(el, ".message")!.textContent!;
    expect(text).not.toContain("Entity not found");
    expect(text).toContain("Select an entity");
  });
});
