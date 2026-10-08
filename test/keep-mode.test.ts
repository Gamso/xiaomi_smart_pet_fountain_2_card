import { describe, expect, it } from "vitest";
import {
  $,
  BASE,
  fountainEntities,
  makeFountain2Hass,
  makeHass,
  mountCard,
  P2,
} from "./helpers";

const KEEP = `switch.${P2}_keep_mode`;
const LAST = `sensor.${P2}_last_mode_restoration`;
const text = (el: HTMLElement, selector: string) =>
  $(el, selector)?.textContent?.replace(/\s+/g, " ").trim();

describe("mode keeping line", () => {
  it("shows the kept mode and the last restoration", async () => {
    const hass = makeFountain2Hass(
      {},
      {
        formatEntityState: (s: { entity_id: string }, state?: string) =>
          s.entity_id === LAST ? "4 October 2026 at 10:12" : (state ?? ""),
      },
    );
    const el = await mountCard({ entity: `switch.${P2}_power` }, hass);
    expect(text(el, ".keep-mode-status")).toBe("Kept mode: Constant");
    expect(text(el, ".keep-mode-last")).toBe(
      "Last restoration: 4 October 2026 at 10:12",
    );
  });

  it("flags a failed restoration and says when the mode is not kept", async () => {
    const hass = makeFountain2Hass({ [KEEP]: "off" }, {}, "fr");
    hass.states[LAST].attributes.result = "failed";
    const el = await mountCard({ entity: `switch.${P2}_power` }, hass);
    expect(text(el, ".keep-mode-status")).toBe(
      "Mode non conservé après les coupures",
    );
    const last = $(el, ".keep-mode-last")!;
    expect(last.classList.contains("failed")).toBe(true);
    expect(text(el, ".keep-mode-last")).toMatch(
      /^Dernière restauration : .+ \(échec\)$/,
    );
  });

  it("hides the restoration before the first one", async () => {
    const el = await mountCard(
      { entity: `switch.${P2}_power` },
      makeFountain2Hass({ [LAST]: "unknown" }),
    );
    expect($(el, ".keep-mode-status")).not.toBeNull();
    expect($(el, ".keep-mode-last")).toBeNull();
  });

  it("is absent with Xiaomi Miot Auto", async () => {
    const el = await mountCard(
      { entity: `switch.${BASE}_pet_drinking_fountain` },
      makeHass(fountainEntities()),
    );
    expect($(el, ".keep-mode")).toBeNull();
  });
});
