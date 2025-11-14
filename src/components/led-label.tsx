import { Box, Typography } from "@mui/material";
import { Led } from "./led";
import equal from "fast-deep-equal";
import React from "react";

export interface LedLabelProps {
    color: "green" | "red" | "yellow" | "gray";
    label?: string;
    size?: number;
}

const areEqual = (prev: LedLabelProps, next: LedLabelProps) => equal(prev.color, next.color) && equal(prev.label, next.label) && equal(prev.size, next.size);

export const LedLabel = React.memo(function LedLabel({ color, size = 16, label = "" }: LedLabelProps) {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, width: "fit-content" }}>
            <Typography variant="body2" sx={{ width: "fit-content", textAlign: "start", color: "gray" }}>
                {label}
            </Typography>
            <Led color={color} size={size} />
        </Box>
    );
}, areEqual);
