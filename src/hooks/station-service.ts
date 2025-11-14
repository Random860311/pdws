import { useEffect, useMemo, useState } from "react";
import { StationDto } from "./../api/dto/station-dto";
import { AppEvent, stationApi, subscribe, unsubscribe, useApiCall } from "src/api";
import equal from "fast-deep-equal";

export function useStation() {
    const [station, setStation] = useState<StationDto | null>(null);

    const setSystemMode = useApiCall("Failed to set system mode", stationApi.setSystemMode);
    const setStationConfig = useApiCall("Failed to set station settings", stationApi.setStationConfig);
    const setSensorConfig = useApiCall("Failed to set sensor settings", stationApi.setSensorConfig);

    useEffect(() => {
        const handleStationUpdated = (newStation: StationDto) => {
            setStation((prev) => {
                if (!prev) return newStation;

                return prev && (Object.is(prev, newStation) || equal(prev, newStation)) ? prev : newStation;
            });
        };

        subscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);

        return () => {
            unsubscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);
        };
    }, []);

    return useMemo(() => ({ station, setSystemMode, setStationConfig, setSensorConfig }), [station, setSystemMode, setStationConfig, setSensorConfig]);
}
