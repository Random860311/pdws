import { Box } from "@mui/material";
import equal from "fast-deep-equal";
import React from "react";
import { AppSettingsDto } from "src/api/dto";
import { ValueLabel } from "src/components";

export interface CmpSettingsProps {
    settings: AppSettingsDto;
}

const areEqual = (prev: CmpSettingsProps, next: CmpSettingsProps) => equal(prev.settings, next.settings);

export const CmpSettings = React.memo(function CmpSettings({ settings }: CmpSettingsProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                height: "fit-content",
            }}
        >
            <ValueLabel label="Set Point" value={String(settings.level_set_point) + " psi"} />
            <ValueLabel label="Offset" value={String(settings.level_offset) + " psi"} />
            <ValueLabel label="Start point" value={String(settings.level_set_point - settings.level_offset) + " psi"} />
            <ValueLabel label="Stop point" value={String(settings.level_set_point + settings.level_offset) + " psi"} />
            <ValueLabel label="Start delay" value={String(settings.start_pump_delay) + " s"} />
            <ValueLabel label="Stop delay" value={String(settings.stop_pump_delay) + " s"} />
        </Box>
    );
}, areEqual);
