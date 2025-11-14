export const AppEvent = {
    ApplicationWarning: "app:warning",
    ApplicationError: "app:error",

    StationEmitUpdate: "station:emit_update",
    StationSetConfig: "station:set_config",

    SystemSetMode: "system:set_mode",

    SensorSetConfig: "sensor:set_config",
} as const;
