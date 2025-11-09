import { Box } from "@mui/material";
import React from "react";
import { AnalogIODto } from "src/api/dto";
import { ValueLabel } from "src/components";

export interface AnalogStatusProps {
    label: string;
    io: AnalogIODto;
}

export const AnalogStatus: React.FC<AnalogStatusProps> = ({ io: AnalogIODto, label: string }) => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 4,
                flexDirection: "column",
                p: 2,
                height: "wrap-content",
                alignItems: "center",
            }}
        ></Box>
    );
};
