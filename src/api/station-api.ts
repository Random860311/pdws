import { withLoading } from "src/context";
import { emitAsync } from "./socket";
import { AppEvent } from "./socket-events";
import { AppSettingsDto, SensorConfigDto } from "./dto";

export interface StationApi {
    setSystemMode(deviceId: number, mode: number): Promise<void>;

    setStationConfig(config: AppSettingsDto): Promise<void>;

    setSensorConfig(config: SensorConfigDto): Promise<void>;
}

export const stationApi: StationApi = {
    async setSystemMode(deviceId, mode): Promise<void> {
        await withLoading(async () => {
            const data = {
                device_id: deviceId,
                mode: mode,
            };
            emitAsync(AppEvent.SystemSetMode, data);
        });
    },
    async setStationConfig(config: AppSettingsDto): Promise<void> {
        await withLoading(async () => {
            emitAsync(AppEvent.StationSetConfig, config);
        });
    },
    async setSensorConfig(config: SensorConfigDto): Promise<void> {
        await withLoading(async () => {
            emitAsync(AppEvent.SensorSetConfig, config);
        });
    },
};
