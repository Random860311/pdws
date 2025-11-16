import { Box, Typography } from "@mui/material";
import equal from "fast-deep-equal";
import React from "react";
import { SystemDto } from "src/api/dto";
import { PipeHorizontal, PipeTeeRight } from "src/assets";
import { renderSystemPump, CmpSystem } from "src/components";

export interface HomeSystemProps {
    sys: SystemDto;
    onSetHand?: () => void;
    onSetAuto?: () => void;
    onSetOff?: () => void;
}

const areEqual = (prev: HomeSystemProps, next: HomeSystemProps) => equal(prev.sys, next.sys);

export const CmpHomeSystem = React.memo(function CmpHomeSystem({ sys, onSetHand, onSetOff, onSetAuto }: HomeSystemProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                paddingTop: 1,
                paddingBottom: 1,
                gap: 1,
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: "1fr",
                    gridTemplateColumns: "1fr 50px 40px",
                    alignContent: "center",
                }}
            >
                <Box sx={{ gridColumn: "1 / span 2", gridRow: 1, alignContent: "center" }}>
                    <PipeHorizontal height={17} width="100%" />
                </Box>

                <Box sx={{ gridColumn: 1, gridRow: 1, alignContent: "center" }}>
                    <PipeTeeRight height={32} width={32} />
                </Box>

                <Box sx={{ gridColumn: 3, gridRow: 1, alignContent: "start" }}>{renderSystemPump(sys)}</Box>
            </Box>
            <CmpSystem sys={sys} onSetAuto={onSetAuto} onSetHand={onSetHand} onSetOff={onSetOff} />
        </Box>
    );
}, areEqual);
