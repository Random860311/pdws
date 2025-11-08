import { withLoading } from "src/context";
import { emitAsync } from "./socket";
import { AppEvent } from "./socket-events";

export interface StationApi {
    setSystemMode(deviceId: number, mode: number): Promise<void>;
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
};
