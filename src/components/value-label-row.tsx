import React from "react";
import { Stack, Typography, FormLabel } from "@mui/material";
import { Outlet } from "react-router-dom";

export interface ValueLabelRowProps {
    value?: string;
    label: string;
}

export const ValueLabelRow: React.FC<ValueLabelRowProps> = ({ value, label }) => {
    if (value) {
        return (
            <Stack direction="row" justifyContent="start" sx={{ width: "100%" }}>
                <FormLabel component="legend" sx={{ minWidth: "50%" }}>
                    {label}:
                </FormLabel>
                <Typography variant="body1" sx={{ maxWidth: "50%", textAlign: "start" }}>
                    {value}
                </Typography>
            </Stack>
        );
    }
    return <Outlet />;
};
/*className="motor-card-label" 
return (
        <div className="motor-card-row">
            <span className="motor-card-label">{label}:</span>
            <span className="motor-card-value">{value}</span>
        </div>
    ); */
