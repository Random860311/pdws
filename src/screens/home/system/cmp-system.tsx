import { Box, Button } from "@mui/material";
import { SystemDto } from "src/api/dto";
import { PipeHorizontal, PipeTeeRight, PumpDefault, PumpError, PumpRunning } from "src/assets";
import { LedLabel, ValueLabel } from "src/components";

function renderPump(sys: SystemDto) {
    if (sys.has_alarm) return <PumpError height={100} width={40} />;
    if (sys.status === 1) {
        return <PumpRunning height={100} width={40} />;
    }
    return <PumpDefault height={100} width={40} />;
}

function renderPriority(sys: SystemDto) {
    switch (sys.priority) {
        case 0:
            return "Lead";
        case 1:
            return "Lag";
        case 2:
            return "Lag 2";
        case 3:
            return "Lag 3";
        default:
            return "Out";
    }
}

function renderMode(sys: SystemDto) {
    switch (sys.mode) {
        case 1:
            return "Hand";
        case 2:
            return "Auto";
        default:
            return "Off";
    }
}

export interface SystemProps {
    sys: SystemDto;
    onSetHand?: () => void;
    onSetAuto?: () => void;
    onSetOff?: () => void;
}

export const CmpSystem: React.FC<SystemProps> = ({ sys, onSetHand, onSetOff, onSetAuto }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                paddingTop: 1,
                paddingBottom: 1,
                gap: 2,
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

                <Box sx={{ gridColumn: 3, gridRow: 1, alignContent: "start" }}>{renderPump(sys)}</Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 1,
                }}
            >
                <LedLabel label="Call to Run:" color={sys.call_to_run ? "green" : "gray"} />
                <LedLabel label="Running:" color={sys.status === 1 ? "green" : "gray"} />
                <LedLabel label="Faulted:" color={sys.has_alarm ? "red" : "gray"} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 1,
                }}
            >
                <ValueLabel label="Priority" value={renderPriority(sys)} />
                <ValueLabel label="Mode" value={renderMode(sys)} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 1,
                }}
            >
                <Button type="button" variant="outlined" onClick={onSetHand ?? undefined} sx={{ width: "100%" }}>
                    Hand
                </Button>
                <Button type="button" variant="outlined" onClick={onSetAuto ?? undefined} sx={{ width: "100%" }}>
                    Auto
                </Button>
                <Button type="button" variant="outlined" onClick={onSetOff ?? undefined} sx={{ width: "100%" }}>
                    Off
                </Button>
            </Box>
        </Box>
    );
};
