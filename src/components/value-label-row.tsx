import React from "react";
import { Typography, FormLabel, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export interface ValueLabelRowProps {
    value?: string;
    label: string;
}

export const ValueLabelRow: React.FC<ValueLabelRowProps> = ({ value, label }) => {
    if (value) {
        return (
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, width: "fit-content" }}>
                <FormLabel component="legend" sx={{ minWidth: "50%" }}>
                    {label}:
                </FormLabel>
                <Typography variant="body1" sx={{ maxWidth: "50%", textAlign: "start" }}>
                    {value}
                </Typography>
            </Box>
        );
    }
    return <Outlet />;
};
