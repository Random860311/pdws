import { Box, Paper } from "@mui/material";
import { useStation } from "src/hooks";

import { useAppLayout } from "src/context";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { CmpSystem, CmpSystemAlarm, CmpSystemOperationTime, renderSystemPump } from "src/components";

export const SystemsScreen: React.FC = () => {
    const { station, setSystemMode } = useStation();
    const { setTitle } = useAppLayout();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        setTitle(`Pump ${id}`);
        return () => setTitle(null);
    }, [setTitle, id]);

    if (id == null || id === undefined) return <Outlet />;

    const position = +id - 1;
    const systems = station?.systems;

    if (systems == null || position >= systems.length) return <Outlet />;

    const system = systems[position];

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <Paper elevation={3} sx={{ p: 4, height: "fit-content" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                        }}
                    >
                        <Box sx={{ alignContent: "start" }}>{renderSystemPump(system)}</Box>
                        <CmpSystem
                            sys={system}
                            onSetAuto={() => setSystemMode(system.device_id, 2)}
                            onSetHand={() => setSystemMode(system.device_id, 1)}
                            onSetOff={() => setSystemMode(system.device_id, 0)}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 4,
                        }}
                    >
                        <CmpSystemOperationTime run_time_current={system.run_time_current} run_time_last={system.run_time_last} run_time_total={system.run_time_total} />
                        <CmpSystemAlarm alarms={[{ label: "Fail to start:", value: system.alarm_fail_to_start }]} />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
