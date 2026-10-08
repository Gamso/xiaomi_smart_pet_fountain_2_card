import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { extractBaseName, findRelatedEntities } from "../src/utils";
import { BASE, fountainEntities, makeHass } from "./helpers";

// Every entity id the README lists for the fountain: the card promises that
// any of them can be picked in the editor.
const readme = readFileSync(join(process.cwd(), "README.md"), "utf8");
const README_ENTITIES = [
  ...new Set(
    readme.match(/\b[a-z_]+\.xiaomi_iv02_b820_[a-z0-9_]+\b/g) ?? [],
  ),
];

describe("extractBaseName", () => {
  it("finds the README entities", () => {
    // 16 entities documented, all must be covered
    expect(README_ENTITIES.length).toBeGreaterThanOrEqual(16);
  });

  it.each(README_ENTITIES)("%s gives the base name", (entityId) => {
    expect(extractBaseName(entityId)).toBe(BASE);
  });

  it.each(README_ENTITIES)(
    "%s finds all the related entities",
    (entityId) => {
      const related = findRelatedEntities(
        makeHass(fountainEntities()),
        extractBaseName(entityId),
      );
      expect(Object.keys(related).sort()).toEqual(
        [
          "batteryLevel",
          "chargingState",
          "filterLeftTime",
          "filterLifeLevel",
          "mode",
          "noDisturb",
          "outWaterInterval",
          "outWaterInterval2",
          "physicalControlLock",
          "powerSwitch",
          "resetFilterButton",
          "waterShortage",
        ].sort(),
      );
    },
  );

  it("keeps an unknown entity name whole", () => {
    expect(extractBaseName("switch.my_fountain")).toBe("my_fountain");
    expect(extractBaseName("sensor.status")).toBe("status");
    expect(extractBaseName("")).toBeNull();
    expect(extractBaseName("nodomain")).toBeNull();
  });
});
