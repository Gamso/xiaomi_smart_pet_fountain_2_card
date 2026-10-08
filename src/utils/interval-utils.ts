/** Upper bound of the options of the water interval list */
export const MAX_INTERVAL_OPTIONS = 100;

/** Lowest interval offered, in minutes (the device minimum in practice) */
const MIN_INTERVAL = 10;
const DEFAULT_MAX = 120;
const DEFAULT_STEP = 15;

function toNumber(value: unknown): number | undefined {
  const n = typeof value === "string" ? Number.parseFloat(value) : value;
  return typeof n === "number" && Number.isFinite(n) ? n : undefined;
}

/**
 * Options of the water interval list, from the min / max / step attributes of
 * the number entity. Never loops forever (step 0 or negative falls back to 1)
 * and never builds more than MAX_INTERVAL_OPTIONS options (the step grows
 * instead). Options stay on the entity's grid (min + n * step) from
 * MIN_INTERVAL up: 15, 30... for MIoT 2.7 (0-120, step 15). The current
 * value is always offered, even off the grid.
 */
export function buildIntervalOptions(
  min: unknown,
  max: unknown,
  step: unknown,
  current?: number,
): number[] {
  const high = toNumber(max) ?? DEFAULT_MAX;
  let increment = toNumber(step) ?? DEFAULT_STEP;
  if (!(increment > 0)) increment = 1;
  const minValue = toNumber(min);
  const low =
    minValue === undefined || minValue >= MIN_INTERVAL
      ? Math.max(MIN_INTERVAL, minValue ?? 0)
      : Math.round(
          (minValue +
            Math.ceil((MIN_INTERVAL - minValue) / increment - 1e-9) *
              increment) *
            1e6,
        ) / 1e6;

  const count = Math.floor((high - low) / increment) + 1;
  if (count > MAX_INTERVAL_OPTIONS) {
    increment *= Math.ceil(count / MAX_INTERVAL_OPTIONS);
  }

  const options: number[] = [];
  for (let i = 0; i < MAX_INTERVAL_OPTIONS; i++) {
    // Rounded so that a 0.1 step doesn't produce 10.299999999999999
    const value = Math.round((low + i * increment) * 1e6) / 1e6;
    if (value > high) break;
    options.push(value);
  }

  if (current !== undefined && !options.includes(current)) {
    options.push(current);
    options.sort((a, b) => a - b);
  }
  return options;
}
