import { subscribe, emitAsync, unsubscribe } from "./socket";
import type { AppEventKey, AppEventValue } from "./socket";
import { AppEvent } from "./socket-events";

import type {
    ResponseDto,
    AppEventDto,
    StationDto,
    AppSettingsDto,
    ContactorDto,
    PumpDto,
    SensorDto,
    SensorConfigDto,
    SystemDto,
    IOStatusDto,
    AnalogIODto,
    DigitalIODto,
} from "./dto";

import { useApiRunner, useApiCall } from "./utils";

import { stationApi } from "./station-api";

export { useApiRunner, useApiCall, subscribe, emitAsync, unsubscribe, AppEvent, stationApi };
export type {
    AppEventKey,
    AppEventValue,
    ResponseDto,
    AppEventDto,
    StationDto,
    AppSettingsDto,
    ContactorDto,
    PumpDto,
    SensorDto,
    SensorConfigDto,
    SystemDto,
    IOStatusDto,
    AnalogIODto,
    DigitalIODto,
};
