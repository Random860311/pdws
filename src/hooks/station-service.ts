import { useEffect, useState } from "react";
import { StationDto } from "./../api/dto/station-dto";
import { AppEvent, subscribe, unsubscribe } from "src/api";

export function useStation() {
    const [station, setStation] = useState<StationDto | null>(null);

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
    };
}
