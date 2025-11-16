import { Box, Typography } from "@mui/material";
import equal from "fast-deep-equal";
import React from "react";
import { LedLabel } from "../led-label";

export interface SystemAlarm {
    label: string;
    value: boolean;
}

export interface CmpSystemAlarmProps {
    alarms: SystemAlarm[];
}

const areEqual = (prev: CmpSystemAlarmProps, next: CmpSystemAlarmProps) => equal(prev, next);

export const CmpSystemAlarm = React.memo(function CmpSystemAlarm({ alarms }: CmpSystemAlarmProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 1,
            }}
        >
            <Typography variant="body2" sx={{ textAlign: "start", fontWeight: "bold", minWidth: 30 }}>
                Alarms:
            </Typography>
            {alarms.map((a, i) => (
                <LedLabel key={i} label={a.label} color={a.value ? "red" : "gray"} />
            ))}
        </Box>
    );
}, areEqual);
