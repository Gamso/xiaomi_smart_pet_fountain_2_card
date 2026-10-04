"""Config flow of the simulated xiaomi_pet_fountain_2 (devcontainer only)."""
from homeassistant import config_entries

from .sim import DEVICE_NAME, DOMAIN


class SimFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input=None):
        return self.async_create_entry(title=DEVICE_NAME, data={})

    async def async_step_import(self, import_data):
        return await self.async_step_user()
