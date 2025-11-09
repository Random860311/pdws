import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ValueLabel } from "./value-label";
import { Led } from "./led";

export interface ValueLabelLedProps {
    value?: string;
    label: string;
    color: "green" | "red" | "yellow" | "gray";
    size?: number;
}

export const ValueLabelLed: React.FC<ValueLabelLedProps> = ({ value, label, color, size }) => {
    if (value) {
        return (
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 1, width: "100%" }}>
                <ValueLabel value={value} label={label} />
                <Led color={color} size={size} />
            </Box>
        );
    }
    return <Outlet />;
};
