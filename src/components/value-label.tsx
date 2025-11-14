import React from "react";
import { Typography, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import equal from "fast-deep-equal";

export interface ValueLabelProps {
    value?: string;
    color?: string;
    label: string;
}

const areEqual = (prev: ValueLabelProps, next: ValueLabelProps) => equal(prev.value, next.value) && equal(prev.color, next.color) && equal(prev.label, next.label);

export const ValueLabel = React.memo(function ValueLabel({ value, label, color }: ValueLabelProps) {
    if (value) {
        return (
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 1, width: "100%", mt: "auto" }}>
                <Typography variant="body2" sx={{ width: "fit-content", textAlign: "start", color: "gray" }}>
                    {label}:
                </Typography>
                <Typography variant="body2" sx={{ width: "fit-content", textAlign: "end", color: color, fontWeight: "bold" }}>
                    {value}
                </Typography>
            </Box>
        );
    }
    return <Outlet />;
}, areEqual);
