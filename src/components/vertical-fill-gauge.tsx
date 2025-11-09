import { Box, Typography } from "@mui/material";
import React from "react";

export interface VerticalFillGaugeProps {
    value: number; // current value
    min?: number; // default 0
    max?: number; // default 100
    width?: number; // gauge width (px)
    height?: number; // gauge height (px)
    barColor?: string; // fill color
    trackColor?: string; // background
    borderColor?: string; // track border color
    tickColor?: string; // tick color
    tickCount?: number; // number of tick rows (major steps)
    minorPerMajor?: number; // minor ticks per major
    showPercentLabel?: boolean;
}

export const VerticalFillGauge: React.FC<VerticalFillGaugeProps> = ({
    value,
    min = 0,
    max = 100,
    width = 18,
    height = 220,
    barColor = "#8e24aa", // purple
    trackColor = "#e3f2fd", // light blue track background
    borderColor = "#212121",
    tickColor = "#212121",
    tickCount = 10,
    minorPerMajor = 4,
    showPercentLabel = false,
}) => {
    const clamp = (v: number) => Math.max(min, Math.min(max, v));
    const pct = ((clamp(value) - min) / (max - min)) * 100;

    // Build tick positions from bottom (0%) to top (100%)
    const majors = Array.from({ length: tickCount + 1 }, (_, i) => i / tickCount);
    const minors = Array.from(
        { length: tickCount * minorPerMajor - minorPerMajor },
        (_, i) =>
            // skip positions that coincide with majors
            (i + 1) / (tickCount * minorPerMajor)
    ).filter((f) => !majors.some((m) => Math.abs(m - f) < 1e-6));

    return (
        <Box display="flex" alignItems="flex-end" gap={1}>
            {/* Outer wrapper for ticks + track */}
            <Box sx={{ position: "relative", height, display: "flex" }}>
                {/* Track */}
                <Box
                    sx={{
                        position: "relative",
                        width,
                        height,
                        bgcolor: trackColor, // track background
                        border: `2px solid ${borderColor}`, // track border
                        borderRadius: 0.5, // slight rounding
                        overflow: "hidden", // clip the fill bar
                    }}
                >
                    {/* Fill (bottom-aligned) */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            width: "100%",
                            height: `${pct}%`, // fill height
                            bgcolor: barColor, // fill color
                            transition: "height 200ms linear",
                        }}
                    />
                </Box>

                {/* Tick-layer (to the right side) */}
                <Box
                    aria-hidden
                    sx={{
                        position: "absolute",
                        right: -10, // pull ticks to the right of the bar
                        top: 0,
                        height,
                        width: 12, // space reserved for tick lines
                        pointerEvents: "none",
                    }}
                >
                    {/* Major ticks */}
                    {majors.map((f, i) => (
                        <Box
                            key={`maj-${i}`}
                            sx={{
                                position: "absolute",
                                // place line with 0 at bottom → convert to top offset
                                top: `${(1 - f) * 100}%`,
                                transform: "translateY(-1px)",
                                width: 10, // major tick length
                                height: 2, // thickness
                                bgcolor: tickColor,
                            }}
                        />
                    ))}
                    {/* Minor ticks */}
                    {minors.map((f, i) => (
                        <Box
                            key={`min-${i}`}
                            sx={{
                                position: "absolute",
                                top: `${(1 - f) * 100}%`,
                                transform: "translateY(-1px)",
                                width: 6, // minor tick length
                                height: 2,
                                bgcolor: tickColor,
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {showPercentLabel && (
                <Typography variant="caption" sx={{ userSelect: "none" }}>
                    {Math.round(pct)}%
                </Typography>
            )}
        </Box>
    );
};
