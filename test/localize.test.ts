import { describe, expect, it } from "vitest";
import { localize, setupCustomlocalize } from "../src/localize";
import type { HomeAssistant } from "../src/types/hass";

const hass = (language?: string) =>
  ({
    states: {},
    callService: async () => undefined,
    locale: language ? { language } : undefined,
  }) as unknown as HomeAssistant;

describe("localize", () => {
  it("returns the string for the Home Assistant language", () => {
    expect(localize(hass("fr"), "card.turn_on")).toBe("Allumer");
    expect(localize(hass("en"), "card.turn_on")).toBe("Turn on");
  });

  it("falls back to English for an unknown language or no hass", () => {
    expect(localize(hass("de"), "card.turn_on")).toBe("Turn on");
    expect(localize(undefined, "card.turn_on")).toBe("Turn on");
  });

  it("replaces ${placeholders} from an object", () => {
    expect(localize(hass("en"), "card.days_left", { days: 12 })).toBe(
      "12 days left",
    );
  });

  it("returns the key itself when it is missing everywhere", () => {
    expect(setupCustomlocalize(hass("fr"))("editor.missing_key")).toBe(
      "editor.missing_key",
    );
  });
});
