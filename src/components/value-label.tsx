import React from "react";
import { Typography, FormLabel, Box, Theme, SxProps } from "@mui/material";
import { Outlet } from "react-router-dom";

export interface ValueLabelProps {
    value?: string;
    color?: string;
    label: string;
    textSize?: number;
    sx?: SxProps<Theme>;
}

export const ValueLabel: React.FC<ValueLabelProps> = ({ value, label, color, sx = {} }) => {
    if (value) {
        return (
            <Box sx={{ ...sx, ...{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 1, width: "100%" } }}>
                <FormLabel component="legend" sx={{ width: "fit-content", textAlign: "start", color: color }}>
                    {label}:
                </FormLabel>
                <Typography variant="body1" sx={{ width: "fit-content", textAlign: "end", color: color, fontWeight: "bold" }}>
                    {value}
                </Typography>
            </Box>
        );
    }
    return <Outlet />;
};
