import { useEffect, useState } from "react";
import { StationDto } from "./../api/dto/station-dto";
import { AppEvent, stationApi, subscribe, unsubscribe, useApiCall } from "src/api";

export function useStation() {
    const [station, setStation] = useState<StationDto | null>(null);
    const setSystemMode = useApiCall("Failed to set system mode", stationApi.setSystemMode);

    useEffect(() => {
        const handleStationUpdated = (newStation: StationDto) => {
            setStation(newStation);
        };

        subscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);

        return () => {
            unsubscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);
        };
    }, []);

    return {
        station,
        setSystemMode,
    };
}
