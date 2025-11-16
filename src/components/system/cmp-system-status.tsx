import { Box } from "@mui/material";
import equal from "fast-deep-equal";
import React from "react";
import { LedLabel } from "../led-label";

export interface CmpSystemStatusProps {
    call_to_run: boolean;
    status: number;
    has_alarm: boolean;
    remote_mode: number;
}

const areEqual = (prev: CmpSystemStatusProps, next: CmpSystemStatusProps) => equal(prev, next);

export const CmpSystemStatus = React.memo(function CmpSystemStatus({ call_to_run, status, has_alarm, remote_mode }: CmpSystemStatusProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 1,
            }}
        >
            <LedLabel label="Call to Run:" color={call_to_run ? "green" : "gray"} />
            <LedLabel label="Running:" color={status === 1 ? "green" : "gray"} />
            <LedLabel label="Faulted:" color={has_alarm ? "red" : "gray"} />
            <LedLabel label="Remote in Auto:" color={remote_mode === 2 ? "green" : "gray"} />
        </Box>
    );
}, areEqual);
