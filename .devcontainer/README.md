# DevContainer Development Environment

This project includes a DevContainer configuration to facilitate the development and testing of the Xiaomi Smart Pet Fountain card in an isolated Home Assistant environment.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/get-started)
- VS Code Extension: [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Setup

### Build the Card (Required)

Build the card into the DevContainer:

```bash
npm install
npm run build
```

Verify that `dist/xiaomi-smart-pet-fountain-2-card.js` exists.

## Quick Start

1. **Open in Container**:
   - Press `F1` → "Dev Containers: Reopen in Container"
   - Wait for setup (~5 minutes first time, ~30 seconds subsequently)

2. **Build the card** :

   ```bash
   npm install
   npm run build
   ```

3. **Wait for Home Assistant**:
   - Look for: `Home Assistant initialized in XXs` in the Terminal
   - First time: 1-2 minutes after "Setup complete!"

4. **Access Home Assistant**:
   - Open: http://localhost:8123
   - Create an account and complete initial setup

5. **Enable Advanced Mode** (Required):
   - Profile (bottom left) → Enable **"Advanced Mode"**
   - This makes test entities visible

## Card Configuration

The card resource is pre-configured in `configuration.yaml`. You can also add it manually:

1. Go to **Settings** → **Dashboards** → **Resources**
2. Click **Add Resource**
3. URL: `/local/xiaomi_smart_pet_fountain_2_card/xiaomi-smart-pet-fountain-2-card.js`
4. Type: **JavaScript Module**

## Test Entities

The devcontainer creates 16 test entities simulating the Xiaomi Smart Pet Fountain 2:

### Main Entities

- `select.xiaomi_iv02_b820_mode` - Operating mode (auto/interval/constant)
- `switch.xiaomi_iv02_b820_pet_drinking_fountain` - Water dispenser (on/off)
- `sensor.xiaomi_iv02_b820_filter_life_level` - Filter life level (%)
- `sensor.xiaomi_iv02_b820_battery_level` - Battery level (%)
- `sensor.xiaomi_iv02_b820_status` - Pump status
- `button.xiaomi_iv02_b820_reset_filter_life` - Reset filter

### Additional Entities

- `sensor.xiaomi_iv02_b820_filter_left_time` - Filter days remaining
- `sensor.xiaomi_iv02_b820_charging_state` - Charging state
- `binary_sensor.xiaomi_iv02_b820_water_shortage_status` - Water shortage
- `number.xiaomi_iv02_b820_out_water_interval` - Interval (min)
- `switch.xiaomi_iv02_b820_physical_control_locked` - Physical control lock
- `switch.xiaomi_iv02_b820_no_disturb` - Do not disturb
- `sensor.xiaomi_iv02_b820_event_mode` - Mode event
- `sensor.xiaomi_iv02_b820_event_water` - Water event
- `number.xiaomi_iv02_b820_out_water_interval_2` - Interval 2
- `button.xiaomi_iv02_b820_info` - Info

**Note:** Enable Advanced Mode in your profile to see these entities in Developer Tools → States.

## Adding the Card to Dashboard

### Visual Mode (Recommended)

1. Click **three dots** → **Edit Dashboard**
2. Click **+ Add Card**
3. Scroll to bottom and select: **Custom: Xiaomi Smart Pet Fountain Card**
4. Select entity: `select.xiaomi_iv02_b820_mode`
5. Click **Save**

### YAML Mode

```yaml
type: custom:xiaomi-smart-pet-fountain-2-card
entity: select.xiaomi_iv02_b820_mode
```

The card displays:

- Power status (on/off)
- Operating mode (auto/interval/constant)
- Water level indicator
- Filter life percentage
- Battery level
- Control buttons (power, mode, reset filter, no disturb, physical lock)

## Development

### Building the Card

**On your host machine** (not in container):

```bash
npm install
npm run build
npm run watch
```

The built file (`dist/xiaomi-smart-pet-fountain-2-card.js`) is automatically mounted in Home Assistant.

### Making Changes

1. Edit files in `src/`
2. Rebuild: `npm run build`
3. Reload Home Assistant page (F12 → `location.reload(true)`)

## Debugging

### Home Assistant Logs

```bash
tail -f /config/home-assistant.log
```

### Browser Console

Press F12 to see JavaScript errors and console messages.

## Stopping

- Close VS Code, or
- Press `F1` → "Dev Containers: Reopen Folder Locally"

The container stops automatically.

## Support

- [Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Home Assistant Development](https://developers.home-assistant.io/)
