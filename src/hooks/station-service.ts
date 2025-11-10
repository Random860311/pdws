import { useEffect, useMemo, useState } from "react";
import { StationDto } from "./../api/dto/station-dto";
import { AnalogIODto, AppEvent, DigitalIODto, stationApi, subscribe, unsubscribe, useApiCall } from "src/api";
import equal from "fast-deep-equal";

export function useAnalogInputs() {
    const [listAi, setListDi] = useState<AnalogIODto[]>([]);

    useEffect(() => {
        const handleStationUpdated = (newStation: StationDto) => {
            const same = listAi && (Object.is(listAi, newStation.io_status.ai) || equal(listAi, newStation.io_status.ai));
            if (!same) {
                setListDi(newStation.io_status.ai);
            }
        };

        subscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);

        return () => {
            unsubscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);
        };
    }, [listAi]);

    return useMemo(() => ({ listAi }), [listAi]);
}

export function useDigitalInputs() {
    const [listDi, setListDi] = useState<DigitalIODto[]>([]);

    useEffect(() => {
        const handleStationUpdated = (newStation: StationDto) => {
            const same = listDi && (Object.is(listDi, newStation.io_status.di) || equal(listDi, newStation.io_status.di));
            if (!same) {
                setListDi(newStation.io_status.di);
            }
        };

        subscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);

        return () => {
            unsubscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);
        };
    }, [listDi]);

    return useMemo(() => ({ listDi }), [listDi]);
}

export function useStation() {
    const [station, setStation] = useState<StationDto | null>(null);

    const [listAi, setListAi] = useState<AnalogIODto[]>([]);

    const setSystemMode = useApiCall("Failed to set system mode", stationApi.setSystemMode);

    useEffect(() => {
        const handleStationUpdated = (newStation: StationDto) => {
            setStation((prev) => {
                if (!prev) return newStation;

                return prev && (Object.is(prev, newStation) || equal(prev, newStation)) ? prev : newStation;
            });
            const sameListAi = listAi && (Object.is(listAi, newStation.io_status.ai) || equal(listAi, newStation.io_status.ai));
            if (!sameListAi) {
                setListAi(newStation.io_status.ai);
            }
        };

        subscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);

        return () => {
            unsubscribe<StationDto>(AppEvent.StationEmitUpdate, handleStationUpdated);
        };
    }, []);

    return useMemo(() => ({ station, setSystemMode }), [station, setSystemMode]);
}
