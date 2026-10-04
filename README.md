# Xiaomi Smart Pet Fountain 2 Card

<a href="https://github.com/hacs/integration"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge"></a>

A custom Home Assistant card to visualize and control the Xiaomi Smart Pet Fountain 2 (xiaomi.pet_waterer.iv02).

It works with two integrations:

- [**xiaomi_pet_fountain_2**](https://github.com/Gamso/ha-xiaomi-pet-fountain-2)
  (recommended): local integration, no Xiaomi cloud, keeps the water mode
  after power cuts;
- [**Xiaomi Miot Auto**](https://github.com/al-one/hass-xiaomi-miot).

The card detects the integration of the configured entity in the entity
registry: xiaomi_pet_fountain_2 first, Xiaomi Miot Auto otherwise.

![Card Preview](assets/card_preview.png)

## Installation

### Via HACS (Recommended)

1. Click the button below to add this repository to HACS:

   <a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=Gamso&repository=xiaomi_smart_pet_fountain_2_card&category=plugin"><img src="https://my.home-assistant.io/badges/hacs_repository.svg"></a>

2. Or manually:
   - Open HACS in Home Assistant
   - Go to "Frontend"
   - Click the three-dot menu in the top right
   - Select "Custom repositories"
   - Add this repository URL: `https://github.com/Gamso/xiaomi_smart_pet_fountain_2_card`
   - Select category "Dashboard" (called "Lovelace" in older HACS versions)
   - Click "Add"
   - Search for "Xiaomi Smart Pet Fountain 2 Card"
   - Click "Install"
   - Restart Home Assistant

### Manual Installation

1. Download `xiaomi-smart-pet-fountain-2-card.js` from the latest release
2. Copy the file to your `config/www/` directory
3. Add the resource in your Lovelace configuration:
   - Go to Configuration -> Lovelace Dashboards -> Resources
   - Click "Add Resource"
   - URL: `/local/xiaomi-smart-pet-fountain-2-card.js`
   - Type: JavaScript Module

## Configuration

### ⚡ Auto-Discovery of Entities

The card now uses an **intelligent auto-discovery system**! You can provide **any entity** from your fountain (switch, sensor, select, etc.), and the card will automatically find all related entities.

**With xiaomi_pet_fountain_2**, the card reads the entities of the same
device in the entity registry and recognises each one by its translation key,
so renamed entities are still found (see
[Using with xiaomi_pet_fountain_2](#using-with-xiaomi_pet_fountain_2-recommended)).

**With Xiaomi Miot Auto:**

1. You provide an entity (e.g., `switch.xiaomi_iv02_b820_pet_drinking_fountain`)
2. The card extracts the base name (e.g., `xiaomi_iv02_b820`)
3. The card automatically searches for all related entities:
   - `switch.xiaomi_iv02_b820_pet_drinking_fountain` (on/off control)
   - `select.xiaomi_iv02_b820_mode` (modes: auto, interval, constant)
   - `sensor.xiaomi_iv02_b820_filter_life_level` (filter life)
   - `button.xiaomi_iv02_b820_reset_filter_life` (reset filter)
   - And all other entities!

### Minimal Configuration

With xiaomi_pet_fountain_2:

```yaml
type: custom:xiaomi-smart-pet-fountain-2-card
entity: switch.xiaomi_smart_pet_fountain_2_power
```

With Xiaomi Miot Auto:

```yaml
type: custom:xiaomi-smart-pet-fountain-2-card
entity: switch.xiaomi_iv02_b820_pet_drinking_fountain
```

or with any related entity:

```yaml
type: custom:xiaomi-smart-pet-fountain-2-card
entity: select.xiaomi_iv02_b820_mode
```

When Home Assistant knows the device of the configured entity (entity
registry), the card also finds the other Xiaomi Miot Auto entities of that
device by their suffix, even if the device prefix was renamed.

### Options

| Option   | Type   | Default                       | Description                                             |
| -------- | ------ | ----------------------------- | ------------------------------------------------------- |
| `entity` | string | **required**                  | Any entity of the fountain, used for the auto-discovery |
| `name`   | string | `Xiaomi Smart Pet Fountain 2` | Card title                                              |

#### Entity overrides (optional)

Each of these options replaces one auto-discovered entity, for renamed entities
or another integration. They take priority over the auto-discovery with both
integrations, and are also available in the visual editor, in the "Entities"
section.

| Option                         | Domain          | Xiaomi Miot Auto entity ending with | xiaomi_pet_fountain_2 translation key |
| ------------------------------ | --------------- | ----------------------------------- | ------------------------------------- |
| `power_entity`                 | `switch`        | `_pet_drinking_fountain`            | `power`                               |
| `mode_entity`                  | `select`        | `_mode`                             | `mode`                                |
| `filter_life_entity`           | `sensor`        | `_filter_life_level`                | `filter_life`                         |
| `filter_left_time_entity`      | `sensor`        | `_filter_left_time`                 | `filter_left_time`                    |
| `battery_entity`               | `sensor`        | `_battery_level`                    | none (battery device class)           |
| `charging_state_entity`        | `sensor`        | `_charging_state`                   | `charging_state`                      |
| `water_shortage_entity`        | `binary_sensor` | `_water_shortage_status`            | `water_shortage`                      |
| `physical_control_lock_entity` | `switch`        | `_physical_control_locked`          | `child_lock`                          |
| `no_disturb_entity`            | `switch`        | `_no_disturb`                       | `no_disturb`                          |
| `water_interval_entity`        | `number`        | `_out_water_interval`               | `out_water_interval`                  |
| `reset_filter_entity`          | `button`        | `_reset_filter_life`                | `reset_filter`                        |

```yaml
type: custom:xiaomi-smart-pet-fountain-2-card
entity: switch.kitchen_fountain_pet_drinking_fountain
name: Cat water
battery_entity: sensor.kitchen_fountain_battery
```

When an entity the card needs can't be found, a banner lists the matching
override options. Controls whose entity is missing are disabled; a missing or
unavailable sensor is shown as unknown (`--`, battery with a question mark),
never as 0 %.

## Using with xiaomi_pet_fountain_2 (recommended)

[xiaomi_pet_fountain_2](https://github.com/Gamso/ha-xiaomi-pet-fountain-2) is a
local integration for this fountain (miIO/MIoT on your network, no Xiaomi
cloud). Install it from HACS (custom repository, type Integration), then pick
any of its entities in the card.

### Entities used by the card

Entity IDs below are for a device named *Xiaomi Smart Pet Fountain 2*. The
card does not depend on them: it finds each entity of the device by its
translation key (the battery sensor, which has none, by its `battery` device
class), then by the default entity_id suffix.

| Card element                             | Entity                                                         | Translation key        |
| ---------------------------------------- | -------------------------------------------------------------- | ---------------------- |
| Power button                             | `switch.xiaomi_smart_pet_fountain_2_power`                     | `power`                |
| Mode list (`auto`, `interval`, `constant`) | `select.xiaomi_smart_pet_fountain_2_mode`                    | `mode`                 |
| Filter gauge                             | `sensor.xiaomi_smart_pet_fountain_2_filter_life`               | `filter_life`          |
| Days left (gauge tooltip)                | `sensor.xiaomi_smart_pet_fountain_2_filter_time_left`          | `filter_left_time`     |
| Battery icon                             | `sensor.xiaomi_smart_pet_fountain_2_battery`                   | none                   |
| Charging state (`no_charge`, `charging`, `charge_full`) | `sensor.xiaomi_smart_pet_fountain_2_charging_state` | `charging_state`  |
| Water shortage icon                      | `binary_sensor.xiaomi_smart_pet_fountain_2_water_shortage`     | `water_shortage`       |
| Pump blocked icon                        | `binary_sensor.xiaomi_smart_pet_fountain_2_pump_blocked`       | `pump_blocked`         |
| Fault icon                               | `binary_sensor.xiaomi_smart_pet_fountain_2_fault`              | `fault`                |
| Child lock button                        | `switch.xiaomi_smart_pet_fountain_2_child_lock`                | `child_lock`           |
| Do not disturb button                    | `switch.xiaomi_smart_pet_fountain_2_do_not_disturb`            | `no_disturb`           |
| Water interval list                      | `number.xiaomi_smart_pet_fountain_2_water_interval`            | `out_water_interval`   |
| Filter reset (`button.press`)            | `button.xiaomi_smart_pet_fountain_2_reset_filter`              | `reset_filter`         |
| Mode keeping line                        | `switch.xiaomi_smart_pet_fountain_2_keep_mode`                 | `keep_mode`            |
| Last restoration                         | `sensor.xiaomi_smart_pet_fountain_2_last_mode_restoration`     | `last_mode_restore`    |

**Water interval:** the integration exposes two interval properties, MIoT 2.7
(`number.…_water_interval`, 0-120 min, step 15, spec v1 and v2) and 2.11
(`number.…_water_interval_5_min_steps`, 10-120 min, step 5, spec v2). The card
uses 2.7, the property it also drives with Xiaomi Miot Auto
(`_out_water_interval`) and the one every iv02 firmware has. Which one the
firmware applies in interval mode is not confirmed yet; to use 2.11 instead:

```yaml
type: custom:xiaomi-smart-pet-fountain-2-card
entity: switch.xiaomi_smart_pet_fountain_2_power
water_interval_entity: number.xiaomi_smart_pet_fountain_2_water_interval_5_min_steps
```

The interval list offers the values of the entity's grid from 10 min up
(15, 30... 120 for 2.7; 10, 15... 120 for 2.11).

**States:** the integration reports lowercase keys (`constant`, `no_charge`,
`charge_full`); Xiaomi Miot Auto reports `Constant`, `no charge`,
`charge full`. The card accepts both. Mode names are shown translated by Home
Assistant when it can (`hass.formatEntityState`), else by the card, and the
mode is sent exactly as the select entity lists it.

**Mode keeping:** when the integration's *Keep mode* switch exists, a small
line under the gauge shows the kept mode (or that it is not kept) and the time
of the last restoration, in red when it failed.

**Faults:** the pump blocked and fault icons appear next to the water shortage
one only while those binary sensors are on.

## Using with Xiaomi Miot Integration

This card is designed to work with the [Xiaomi Miot Auto](https://github.com/al-one/hass-xiaomi-miot) integration for Home Assistant.

### Prerequisites

1. Install the Xiaomi Miot Auto integration via HACS
2. Configure your Xiaomi Smart Pet Fountain 2
3. The entity should appear as `xiaomi.pet_waterer.iv02` (or similar)

### Created Entities

The Xiaomi Miot integration automatically creates the following entities for the Xiaomi Smart Pet Fountain 2:

#### Sensors

- `sensor.xiaomi_iv02_b820_filter_life_level` - Remaining filter life (%)
- `sensor.xiaomi_iv02_b820_filter_left_time` - Remaining filter time (days)
- `sensor.xiaomi_iv02_b820_battery_level` - Battery level (%)
- `sensor.xiaomi_iv02_b820_charging_state` - Battery charging state
- `sensor.xiaomi_iv02_b820_status` - Water pump operating status
- `sensor.xiaomi_iv02_b820_event_mode` - Mode event
- `sensor.xiaomi_iv02_b820_event_water` - Water event

#### Binary Sensors

- `binary_sensor.xiaomi_iv02_b820_water_shortage_status` - Water shortage

#### Switches

- `switch.xiaomi_iv02_b820_pet_drinking_fountain` - Pet drinking fountain
- `switch.xiaomi_iv02_b820_physical_control_locked` - Physical control lock
- `switch.xiaomi_iv02_b820_no_disturb` - Do not disturb

#### Selects

- `select.xiaomi_iv02_b820_mode` - Operating mode (auto, interval, constant)

#### Numbers

- `number.xiaomi_iv02_b820_out_water_interval` - Water dispensing interval
- `number.xiaomi_iv02_b820_out_water_interval_2` - Water dispensing interval (2)

#### Buttons

- `button.xiaomi_iv02_b820_info` - Info
- `button.xiaomi_iv02_b820_reset_filter_life` - Reset filter life

### Supported Attributes

The card displays and controls:

- Power state (on/off) - `switch.xiaomi_iv02_b820_pet_drinking_fountain`
- Water shortage indicator (shown only when water is lacking; the fountain
  reports a shortage, not a water level) - `binary_sensor.xiaomi_iv02_b820_water_shortage_status`
- Filter life gauge, with the days left as tooltip - `sensor.xiaomi_iv02_b820_filter_life_level`, `sensor.xiaomi_iv02_b820_filter_left_time`
- Battery level and charging state - `sensor.xiaomi_iv02_b820_battery_level`, `sensor.xiaomi_iv02_b820_charging_state`
- Operating mode (auto, interval, constant) - `select.xiaomi_iv02_b820_mode`
- Water interval (enabled in interval mode) - `number.xiaomi_iv02_b820_out_water_interval`
- No disturb and physical control lock - `switch.xiaomi_iv02_b820_no_disturb`, `switch.xiaomi_iv02_b820_physical_control_locked`
- Filter life reset, after a confirmation - `button.xiaomi_iv02_b820_reset_filter_life`

### Used Services

The card uses the following services:

- `homeassistant.turn_on` / `homeassistant.turn_off` - To turn the fountain, no disturb and the physical control lock on/off
- `select.select_option` - To change the operating mode
- `number.set_value` - To change water interval
- `button.press` - To reset filter life

A failed call (device offline, invalid value) is reported as a Home Assistant
notification.

## Development

### DevContainer (Recommended)

To test the card in an isolated Home Assistant environment:

1. Open the project in VS Code
2. Install the "Dev Containers" extension
3. Click "Reopen in Container"
4. Home Assistant will be available at `http://localhost:8123`

See [.devcontainer/README.md](.devcontainer/README.md) for more details.

### Prerequisites

- Node.js 18 or higher to build (Rollup 4); Node.js 22.12 or higher (24 in
  CI) to run the tests and the linter
- npm

### Installing Dependencies

```bash
npm ci
```

### Build

```bash
npm run build
```

The compiled file will be generated in `dist/xiaomi-smart-pet-fountain-2-card.js`.
It is committed: HACS installs it straight from the repository, so rebuild and
commit it with any source change (the CI fails when `dist/` doesn't match the
sources). The release build has no source map.

### Checks

```bash
npm run typecheck   # TypeScript, sources and tests
npm run lint        # ESLint
npm test            # Vitest
```

### Watch Mode

For development with automatic reloading (emits a source map, git-ignored):

```bash
npm run watch
```

## License

MIT License

## Credits

Developed for the Home Assistant community.
