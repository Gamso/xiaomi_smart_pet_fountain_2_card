"""Simulated fountain state and entities (devcontainer only).

Same entities as github.com/Gamso/ha-xiaomi-pet-fountain-2: translation
keys, device classes, categories and options, so the same entity_ids
(prefix xiaomi_smart_pet_fountain_2_) and the same registry entries.
Nothing talks to a fountain. The time entities (do not disturb start/end)
are left out: the card does not use them.
"""
from __future__ import annotations

from datetime import datetime
from typing import Any, Callable

from homeassistant.components.binary_sensor import BinarySensorDeviceClass, BinarySensorEntity
from homeassistant.components.button import ButtonEntity
from homeassistant.components.number import NumberDeviceClass, NumberEntity, NumberMode
from homeassistant.components.select import SelectEntity
from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.components.switch import SwitchEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import PERCENTAGE, EntityCategory, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.util import dt as dt_util

DOMAIN = "xiaomi_pet_fountain_2"
DEVICE_NAME = "Xiaomi Smart Pet Fountain 2"
MODES = ["auto", "interval", "constant"]
CHARGING = ["no_charge", "charging", "charge_full"]

DIAG = EntityCategory.DIAGNOSTIC
CONFIG = EntityCategory.CONFIG


class SimFountain:
    """State of the simulated fountain (keys of the integration's coordinator)."""

    def __init__(self) -> None:
        self.available = True
        self.on = True
        self.mode = "constant"
        self.status = "watering"
        self.filter_life = 80
        self.filter_left_time = 45
        self.battery_level = 100
        self.charging_state = "charge_full"
        self.water_shortage = False
        self.pump_blocked = False
        self.fault = False
        self.low_battery = False
        self.usb_power = True
        self.child_lock = False
        self.no_disturb = False
        self.out_water_interval = 15
        self.out_water_interval_2 = 30
        self.keep_mode = True
        self.preferred_mode = "constant"
        self.last_restore: dict[str, Any] | None = None
        self._listeners: list[Callable[[], None]] = []

    def listen(self, cb: Callable[[], None]) -> Callable[[], None]:
        self._listeners.append(cb)
        return lambda: self._listeners.remove(cb)

    def notify(self) -> None:
        for cb in list(self._listeners):
            cb()

    def set(self, **values: Any) -> None:
        if "unavailable" in values:
            self.available = not values.pop("unavailable")
        if values.pop("power_cut", False):
            # On battery the fountain falls back to auto
            values = {"usb_power": False, "charging_state": "no_charge", "mode": "auto", **values}
        if values.pop("power_back", False):
            values = {"usb_power": True, "charging_state": "charging", **values}
            if self.keep_mode and self.mode != self.preferred_mode:
                values["mode"] = self.preferred_mode
                self.last_restore = {
                    "time": dt_util.now(),
                    "reason": "power_restored",
                    "result": "success",
                    "from_mode": self.mode,
                    "to_mode": self.preferred_mode,
                    "attempts": 1,
                    "error": None,
                }
        for key, value in values.items():
            setattr(self, key, value)
        self.notify()


class SimEntity:
    """Mixin: device, translation key and updates like the real integration."""

    _attr_has_entity_name = True
    _attr_should_poll = False
    # Mode keeping entities live in Home Assistant: always available
    always_available = False

    def __init__(self, fountain: SimFountain, entry: ConfigEntry, key: str, attr: str | None = None, **attrs: Any) -> None:
        self.fountain = fountain
        self.attr = attr or key
        if key != "battery_level":
            self._attr_translation_key = key
        self._attr_unique_id = f"{entry.entry_id}_{attr or key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=DEVICE_NAME,
            manufacturer="Xiaomi",
            model="Smart Pet Fountain 2",
            model_id="xiaomi.pet_waterer.iv02",
        )
        for name, value in attrs.items():
            setattr(self, f"_attr_{name}", value)

    @property
    def available(self) -> bool:
        return self.always_available or self.fountain.available

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self.fountain.listen(self.async_write_ha_state))


class SimSwitch(SimEntity, SwitchEntity):
    @property
    def is_on(self) -> bool:
        return getattr(self.fountain, self.attr)

    async def async_turn_on(self, **kwargs: Any) -> None:
        self.fountain.set(**{self.attr: True})

    async def async_turn_off(self, **kwargs: Any) -> None:
        self.fountain.set(**{self.attr: False})


class SimKeepMode(SimSwitch):
    always_available = True

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"preferred_mode": self.fountain.preferred_mode, "force": False, "restoring": False}


class SimMode(SimEntity, SelectEntity):
    _attr_options = MODES

    @property
    def current_option(self) -> str:
        return self.fountain.mode

    async def async_select_option(self, option: str) -> None:
        self.fountain.set(mode=option, preferred_mode=option)


class SimSensor(SimEntity, SensorEntity):
    @property
    def native_value(self) -> Any:
        return getattr(self.fountain, self.attr)


class SimPreferredMode(SimSensor):
    always_available = True


class SimLastRestore(SimEntity, SensorEntity):
    always_available = True

    @property
    def native_value(self) -> datetime | None:
        record = self.fountain.last_restore
        return record["time"] if record else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        record = dict(self.fountain.last_restore or {})
        record.pop("time", None)
        return record


class SimBinary(SimEntity, BinarySensorEntity):
    @property
    def is_on(self) -> bool:
        return bool(getattr(self.fountain, self.attr))


class SimInterval(SimEntity, NumberEntity):
    _attr_device_class = NumberDeviceClass.DURATION
    _attr_native_unit_of_measurement = UnitOfTime.MINUTES
    _attr_mode = NumberMode.BOX
    _attr_entity_category = CONFIG

    @property
    def native_value(self) -> float:
        return float(getattr(self.fountain, self.attr))

    async def async_set_native_value(self, value: float) -> None:
        self.fountain.set(**{self.attr: round(value)})


class SimResetFilter(SimEntity, ButtonEntity):
    _attr_entity_category = CONFIG

    async def async_press(self) -> None:
        self.fountain.set(filter_life=100, filter_left_time=60)


def build(platform: str, f: SimFountain, entry: ConfigEntry) -> list:
    """Entities of one platform, as the real integration describes them."""
    problem = BinarySensorDeviceClass.PROBLEM
    enum = SensorDeviceClass.ENUM
    entities = {
        "switch": [
            SimSwitch(f, entry, "power", "on"),
            SimSwitch(f, entry, "child_lock", entity_category=CONFIG),
            SimSwitch(f, entry, "no_disturb", entity_category=CONFIG),
            SimKeepMode(f, entry, "keep_mode", entity_category=CONFIG),
        ],
        "select": [SimMode(f, entry, "mode")],
        "sensor": [
            SimSensor(f, entry, "pump_status", "status", device_class=enum, options=["waterless", "watering"]),
            SimSensor(f, entry, "filter_life", native_unit_of_measurement=PERCENTAGE),
            SimSensor(
                f, entry, "filter_left_time",
                device_class=SensorDeviceClass.DURATION, native_unit_of_measurement=UnitOfTime.DAYS,
            ),
            SimSensor(
                f, entry, "battery_level",
                device_class=SensorDeviceClass.BATTERY, native_unit_of_measurement=PERCENTAGE,
                entity_category=DIAG,
            ),
            SimSensor(f, entry, "charging_state", device_class=enum, options=CHARGING, entity_category=DIAG),
            SimPreferredMode(f, entry, "preferred_mode", device_class=enum, options=MODES, entity_category=DIAG),
            SimLastRestore(
                f, entry, "last_mode_restore",
                device_class=SensorDeviceClass.TIMESTAMP, entity_category=DIAG,
            ),
        ],
        "binary_sensor": [
            SimBinary(f, entry, "water_shortage", device_class=problem),
            SimBinary(f, entry, "pump_blocked", device_class=problem),
            SimBinary(f, entry, "fault", device_class=problem, entity_category=DIAG),
            SimBinary(f, entry, "low_battery", device_class=BinarySensorDeviceClass.BATTERY, entity_category=DIAG),
            SimBinary(f, entry, "usb_power", device_class=BinarySensorDeviceClass.PLUG, entity_category=DIAG),
        ],
        "number": [
            SimInterval(f, entry, "out_water_interval", native_min_value=0, native_max_value=120, native_step=15),
            SimInterval(f, entry, "out_water_interval_2", native_min_value=10, native_max_value=120, native_step=5),
        ],
        "button": [SimResetFilter(f, entry, "reset_filter")],
    }
    return entities[platform]


async def setup_platform(hass: HomeAssistant, entry: ConfigEntry, add, platform: str) -> None:
    add(build(platform, hass.data[DOMAIN][entry.entry_id], entry))
