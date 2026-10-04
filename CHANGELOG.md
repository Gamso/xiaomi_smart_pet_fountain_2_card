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

### Features

- ✨ Optional entity overrides (`power_entity`, `mode_entity`, `battery_entity`, …) and device-based discovery through the entity registry; a banner lists the entities not found
- ♿ Accessibility: labelled buttons and toggle states, native modal confirmation dialog (Escape, focus), visible keyboard focus, reduced motion support
- 📐 Real card size for masonry, grid options for sections, gauge layout that follows the card width and text size

### Maintenance

- 🧪 Vitest tests, ESLint, type checking and a CI workflow (build, committed `dist/` check, HACS validation)
- 📦 Release bundle without source map (no more 404 on the `.map` file), `custom-card-helpers` dependency removed
- 📝 README: options, services actually called, water shortage indicator, Node.js version, HACS name

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
