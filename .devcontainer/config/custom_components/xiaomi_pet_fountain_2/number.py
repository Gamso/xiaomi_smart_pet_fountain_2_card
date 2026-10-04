"""number platform of the simulated xiaomi_pet_fountain_2 (devcontainer only)."""
from .sim import setup_platform


async def async_setup_entry(hass, entry, async_add_entities):
    await setup_platform(hass, entry, async_add_entities, "number")
