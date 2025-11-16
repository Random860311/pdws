import { Box, Typography } from "@mui/material";
import equal from "fast-deep-equal";
import React from "react";
import { SystemDto } from "src/api";
import { CmpSystemStatus } from "./cmp-system-status";
import { renderSystemPriority } from "./utils";
import { CmpSystemActions } from "./cmp-system-actions";

export interface CmpSystemProps {
    sys: SystemDto;
    onSetHand?: () => void;
    onSetAuto?: () => void;
    onSetOff?: () => void;
}

const areEqual = (prev: CmpSystemProps, next: CmpSystemProps) => equal(prev.sys, next.sys);

export const CmpSystem = React.memo(function CmpSystem({ sys, onSetHand, onSetOff, onSetAuto }: CmpSystemProps) {
    const disabled = sys.emergency_stop === true || sys.remote_mode !== 2;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                gap: 1,
                justifyContent: "space-between",
                width: "100%",
                heigh: "fit-content",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    gap: 2,
                    width: "100%",
                    height: "fit-content",
                }}
            >
                <CmpSystemStatus call_to_run={sys.call_to_run} has_alarm={sys.has_alarm} remote_mode={sys.remote_mode} status={sys.status} />

                <Typography variant="body2" sx={{ textAlign: "center", fontWeight: "bold", minWidth: 40, alignSelf: "center" }}>
                    {renderSystemPriority(sys)}
                </Typography>
            </Box>
            <CmpSystemActions mode={sys.mode} disabled={disabled} onSetAuto={onSetAuto} onSetHand={onSetHand} onSetOff={onSetOff} />
        </Box>
    );
}, areEqual);
