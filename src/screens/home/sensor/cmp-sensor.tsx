import { Box, Typography } from "@mui/material";
import { SensorDto } from "src/api/dto";
import { PipeHorizontal, PipeTeeUp, PressureTransmitter } from "src/assets";

export interface SensorProps {
    sensor: SensorDto;
}

export const CmpSensor: React.FC<SensorProps> = ({ sensor }) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateRows: "1fr",
                gridTemplateColumns: "1fr",
            }}
        >
            <Box sx={{ display: "flex", width: "100%", gridRow: 1, gridColumn: 1, alignItems: "flex-end" }}>
                <PipeHorizontal height="17px" width="100%" />
            </Box>
            <Box sx={{ display: "flex", gridRow: 1, gridColumn: 1, flexDirection: "column", alignItems: "center", gap: 1 }}>
                <Box sx={{ display: "flex", gridRow: 1, gridColumn: 1 }}>
                    <Typography>{sensor.value_scaled} psi</Typography>
                </Box>
                <Box sx={{ display: "flex", width: "34px", height: "51px", gridRow: 2, gridColumn: 1 }}>
                    <PressureTransmitter height="100%" width="100%" />
                </Box>

                <Box sx={{ display: "flex", width: "34px", height: "34px", gridRow: 3, gridColumn: 1, alignItems: "center" }}>
                    <PipeTeeUp height="34px" width="34px" />
                </Box>
            </Box>
        </Box>
    );
};
