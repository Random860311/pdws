import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { PipeCurveRight, PipeHorizontal, PipeVertical } from "src/assets";
import { useStation } from "src/hooks/station-service";
import { CmpHomeSystem } from "./system";
import { CmpGaugeSensor, CmpSensor } from "./sensor";
import { CmpSettings } from "./settings";
import { LedLabel } from "src/components";
import { useAppLayout } from "src/context";
import { useEffect } from "react";

export const HomeScreen: React.FC = () => {
    const { station, setSystemMode } = useStation();
    const { setTitle } = useAppLayout();

    useEffect(() => {
        setTitle("Home");
        return () => setTitle(null);
    }, [setTitle]);

    if (station == null) return <Outlet />;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",

                height: "fit-content",
                width: "fit-content",
                gap: 2,
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateRows: "1fr 19px",
                        gridTemplateColumns: "1fr",
                        alignContent: "center",
                    }}
                >
                    <Box sx={{ gridColumn: 1, gridRow: 1, alignSelf: "stretch", height: "100%" }}>
                        <PipeVertical width={16} height="100%" />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gridColumn: 1, gridRow: 1, minWidth: "360px" }}>
                        {station.systems.map((sys, i) => (
                            <CmpHomeSystem
                                key={i}
                                sys={sys}
                                onSetHand={() => setSystemMode(sys.device_id, 1)}
                                onSetAuto={() => setSystemMode(sys.device_id, 2)}
                                onSetOff={() => setSystemMode(sys.device_id, 0)}
                            />
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gridRow: 2, gridColumn: 1, height: "19px", width: "100%", alignItems: "flex-end" }}>
                        <PipeCurveRight height="20px" width="20px" />
                        <PipeHorizontal height="17px" width="100%" />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", width: "48px" }}>
                    <PipeHorizontal height="17px" width="100%" />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, minWidth: "140px", paddingRight: "24px" }}>
                    <CmpSettings settings={station.app_settings} />
                    <CmpSensor sensor={station.pressure_sensor} />
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 3,
                }}
            >
                <LedLabel label="Emergency Stop:" color={station.emergency_stop ? "red" : "gray"} size={36} />
                <CmpGaugeSensor sensor={station.pressure_sensor} />
            </Box>
        </Box>
    );
};
