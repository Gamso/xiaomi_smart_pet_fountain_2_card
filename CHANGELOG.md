# CHANGELOG

## Unreleased

### Fixes

- 🐛 An unavailable, unknown or missing battery or filter sensor no longer shows as 0 % (red pulsing empty battery, critical filter): it shows as unknown
- 🐛 Any entity listed in the README can be picked again (`*_water_shortage_status`, `*_event_mode`, `*_event_water`, `*_info` broke the auto-discovery)
- 🐛 The `name` option is displayed as card title, and available in the editor
- 🐛 The water interval list can no longer freeze the page (step 0, huge range) and always shows the real value
- 🐛 Failed actions are reported as a Home Assistant notification
- 🐛 The card picker preview uses a fountain of your Home Assistant instead of the author's entity
- 🐛 Power on/off is never read from a non-switch entity
- 🐛 With Xiaomi Miot Auto too: the mode list and the battery logic accept both state vocabularies (`no charge` / `no_charge`, `charge full` / `charge_full`, `Constant` / `constant`), mode names are translated (Home Assistant translation, else the card's) and the mode is sent with the entity's own casing
- 🐛 The water interval list stays on the entity's step grid (15, 30... for a 0-120 step 15 entity instead of 10, 25...)
- 🐛 The mode list is wide enough for "Constant" and disabled while the mode is unknown

### Features

- ✨ Support of the local [xiaomi_pet_fountain_2](https://github.com/Gamso/ha-xiaomi-pet-fountain-2) integration (recommended): detected in the entity registry before Xiaomi Miot Auto, entities found by translation key; the overrides keep priority
- ✨ Pump blocked and fault icons (xiaomi_pet_fountain_2)
- ✨ Mode keeping line: kept mode and last restoration (xiaomi_pet_fountain_2)
- ✨ Optional entity overrides (`power_entity`, `mode_entity`, `battery_entity`, …) and device-based discovery through the entity registry; a banner lists the entities not found
- ♿ Accessibility: labelled buttons and toggle states, native modal confirmation dialog (Escape, focus), visible keyboard focus, reduced motion support
- 📐 Real card size for masonry, grid options for sections, gauge layout that follows the card width and text size

### Maintenance

- 🧪 Vitest tests, ESLint, type checking and a CI workflow (build, committed `dist/` check, HACS validation)
- 📦 Release bundle without source map (no more 404 on the `.map` file), `custom-card-helpers` dependency removed
- 📝 README: options, services actually called, water shortage indicator, Node.js version, HACS name, one section per integration
- 🧰 Devcontainer: simulated xiaomi_pet_fountain_2 integration next to the Xiaomi Miot Auto template entities

## Version 1.1.1 (2026-01-18)

- ✨ Improve battery icon behavior

## Version 1.1.0 (2026-01-17)

- 🎨 Add title card
- 🌐 Improve translation
- ✨ Improve UI/UX behavior
- ✂️ Remove "Watering Status Icon"

## Version 1.0.0 (2026-01-16)

### Features

- ✨ Initial release of Xiaomi Smart Pet Fountain 2 Card
- 🔧 Auto-discovery of related entities
- 🌐 Internationalization (i18n) support (English & French)
