import { Box, Button, Typography } from "@mui/material";
import equal from "fast-deep-equal";
import React from "react";
import { ValueLabel } from "../value-label";

export interface CmpSystemOperationTimeProps {
    run_time_current: number;
    run_time_last: number;
    run_time_total: number;
    onReset?: () => void;
}

const areEqual = (prev: CmpSystemOperationTimeProps, next: CmpSystemOperationTimeProps) =>
    equal(prev.run_time_current, next.run_time_current) && equal(prev.run_time_last, next.run_time_last) && equal(prev.run_time_total, next.run_time_total);

export function formatDuration(totalSeconds: number): string {
    const rounded = Math.round(totalSeconds);
    const days = Math.floor(rounded / 86400);
    const hours = Math.floor((rounded % 86400) / 3600);
    const minutes = Math.floor((rounded % 3600) / 60);
    const seconds = rounded % 60;

    const pad = (n: number, p: number = 2) => n.toString().padStart(p, "0");

    if (days > 0) return `${pad(days, 4)} d, ${pad(hours)} h, ${pad(minutes)} m, ${pad(seconds)} s`;
    if (days !== 0 && hours >= 0) return `${pad(hours)} h, ${pad(minutes)} m, ${pad(seconds)} s`;
    if (days !== 0 && hours !== 0 && minutes >= 0) return `${pad(minutes)} m, ${pad(seconds)} s`;

    return `${pad(seconds)} s`;
}

export const CmpSystemOperationTime = React.memo(function CmpSystemOperationTime({
    run_time_current,
    run_time_last,
    run_time_total,
    onReset,
}: CmpSystemOperationTimeProps) {
    const current = formatDuration(run_time_current);
    const last = formatDuration(run_time_last);
    const total = formatDuration(run_time_total);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "220px",
                width: "fit-content",
                gap: 1,
            }}
        >
            <Typography variant="body2" sx={{ textAlign: "start", fontWeight: "bold", minWidth: 40 }}>
                Operation Time:
            </Typography>
            <ValueLabel label="Current" value={current} />
            <ValueLabel label="Last" value={last} />
            <ValueLabel label="total" value={total} />
            <Button type="button" onClick={onReset} sx={{ alignSelf: "end" }}>
                Reset
            </Button>
        </Box>
    );
},
areEqual);
