import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import equal from "fast-deep-equal";
import React from "react";
import { renderSystemMode } from "./utils";

export interface CmpSystemActionsProps {
    disabled: boolean;
    mode: number;
    onSetHand?: () => void;
    onSetAuto?: () => void;
    onSetOff?: () => void;
}

const areEqual = (prev: CmpSystemActionsProps, next: CmpSystemActionsProps) => equal(prev.disabled, next.disabled) && equal(prev.mode, next.mode);

export const CmpSystemActions = React.memo(function CmpSystemActions({ disabled, mode, onSetHand, onSetAuto, onSetOff }: CmpSystemActionsProps) {
    return (
        <ToggleButtonGroup
            orientation="vertical"
            exclusive
            value={renderSystemMode(mode)}
            disabled={disabled}
            sx={{
                paddingLeft: "8px",
                "& .MuiToggleButton-root": { width: "100%", height: "32px", fontSize: "12px" },
                "& .MuiToggleButton-root.Mui-selected": disabled
                    ? {}
                    : {
                          backgroundColor: "primary.main",
                          color: "white",
                      },
                "& .MuiToggleButton-root.Mui-selected:hover": {
                    backgroundColor: "primary.dark",
                },
                gap: 1,
                pl: 1,
            }}
        >
            <ToggleButton value="Hand" onClick={onSetHand ?? undefined}>
                Hand
            </ToggleButton>
            <ToggleButton value="Auto" onClick={onSetAuto ?? undefined}>
                Auto
            </ToggleButton>
            <ToggleButton value="Off" onClick={onSetOff ?? undefined}>
                Off
            </ToggleButton>
        </ToggleButtonGroup>
    );
}, areEqual);
