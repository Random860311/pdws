import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { PipeCurveRight, PipeHorizontal, PipeVertical } from "src/assets";
import { useStation } from "src/hooks/station-service";
import { System } from "./system";
import { CmpSensor } from "./sensor";

export const HomeScreen: React.FC = () => {
    const { station, setSystemMode } = useStation();
    if (station == null) return <Outlet />;

    return (
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

                <Box sx={{ gridColumn: 1, gridRow: 1, alignSelf: "stretch" }}>
                    {station.systems.map((sys, i) => (
                        <System
                            key={i}
                            sys={sys}
                            onSetHand={() => setSystemMode(sys.device_id, 1)}
                            onSetAuto={() => setSystemMode(sys.device_id, 2)}
                            onSetOff={() => setSystemMode(sys.device_id, 0)}
                        />
                    ))}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gridRow: 2, gridColumn: 1, height: "100%", width: "100%", alignItems: "flex-end" }}>
                    <PipeCurveRight height="20px" width="23px" />
                    <PipeHorizontal height="17px" width="100%" />
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                <PipeHorizontal height={17} width="100%" />
            </Box>
            <CmpSensor sensor={station.pressure_sensor} />
        </Box>
    );
};
