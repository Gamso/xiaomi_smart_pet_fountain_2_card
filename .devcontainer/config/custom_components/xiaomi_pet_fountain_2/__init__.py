"""Simulation of the xiaomi_pet_fountain_2 integration, for the devcontainer only.

It creates the same entities as github.com/Gamso/ha-xiaomi-pet-fountain-2
(translation keys, so the same entity_ids) on a device named "Xiaomi Smart
Pet Fountain 2". Nothing talks to a fountain.

The extra `xiaomi_pet_fountain_2.simulate` service changes the simulated
state (power cut, water shortage, battery level...) to try the card.
"""
from __future__ import annotations

import voluptuous as vol

from homeassistant.config_entries import SOURCE_IMPORT, ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv

from .sim import CHARGING, DOMAIN, MODES, SimFountain

PLATFORMS = [
    Platform.BINARY_SENSOR,
    Platform.BUTTON,
    Platform.NUMBER,
    Platform.SELECT,
    Platform.SENSOR,
    Platform.SWITCH,
]

CONFIG_SCHEMA = cv.empty_config_schema(DOMAIN)

SIMULATE_SCHEMA = vol.Schema(
    {
        vol.Optional("power_cut"): cv.boolean,
        vol.Optional("power_back"): cv.boolean,
        vol.Optional("unavailable"): cv.boolean,
        vol.Optional("mode"): vol.In(MODES),
        vol.Optional("battery_level"): vol.All(vol.Coerce(int), vol.Range(min=0, max=100)),
        vol.Optional("charging_state"): vol.In(CHARGING),
        vol.Optional("filter_life"): vol.All(vol.Coerce(int), vol.Range(min=0, max=100)),
        vol.Optional("water_shortage"): cv.boolean,
        vol.Optional("pump_blocked"): cv.boolean,
        vol.Optional("fault"): cv.boolean,
    }
)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Create the simulated fountain when `xiaomi_pet_fountain_2:` is in the YAML."""
    if DOMAIN in config and not hass.config_entries.async_entries(DOMAIN):
        hass.async_create_task(
            hass.config_entries.flow.async_init(
                DOMAIN, context={"source": SOURCE_IMPORT}, data={}
            )
        )
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    fountain = SimFountain()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = fountain
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    async def simulate(call: ServiceCall) -> None:
        fountain.set(**call.data)

    if not hass.services.has_service(DOMAIN, "simulate"):
        hass.services.async_register(DOMAIN, "simulate", simulate, schema=SIMULATE_SCHEMA)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if ok:
        hass.data[DOMAIN].pop(entry.entry_id)
    return ok
