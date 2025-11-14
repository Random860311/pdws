import { Box } from "@mui/material";
import equal from "fast-deep-equal";
import React from "react";

export interface LedProps {
    color: "green" | "red" | "yellow" | "gray";
    size?: number;
}

const areEqual = (prev: LedProps, next: LedProps) => equal(prev.color, next.color) && equal(prev.size, next.size);

export const Led = React.memo(function Led({ color, size = 16 }: LedProps) {
    const colorMap: Record<string, string> = {
        green: "#4caf50",
        red: "#f44336",
        yellow: "#ffeb3b",
        gray: "#9e9e9e",
    };

    return (
        <Box
            sx={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: colorMap[color],
                boxShadow: `0 0 6px ${colorMap[color]}`,
            }}
        />
    );
}, areEqual);
