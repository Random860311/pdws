import { Box, FormLabel } from "@mui/material";
import React from "react";
import { AnalogIODto } from "src/api";
import { ValueLabel } from "src/components";

export interface AnalogIoProps {
    io: AnalogIODto;
}

export const AnalogIoStatus: React.FC<AnalogIoProps> = ({ io }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "flex-start",
                border: "1px solid gray",
                borderRadius: 2,
                p: 1,
            }}
        >
            <FormLabel component="legend" sx={{ width: "fit-content", textAlign: "start" }}>
                {String(io.io_id)}:
            </FormLabel>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <ValueLabel label="Raw" value={String(io.raw_value)} />
                <ValueLabel label="Current" value={String(io.ma_value) + " mA"} />
            </Box>
        </Box>
    );
};
