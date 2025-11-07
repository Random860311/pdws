import { Box } from "@mui/material";
import { SystemDto } from "src/api/dto";
import { PipeHorizontal, PipeTeeRight, PumpDefault, PumpError, PumpRunning } from "src/assets";

function renderPump(sys: SystemDto) {
    if (sys.has_alarm) return <PumpError height={100} width={40} />;
    if (sys.status === 1) {
        console.log(sys.device_id);
        return <PumpRunning height={100} width={40} />;
    }
    return <PumpDefault height={100} width={40} />;
}

export interface SystemProps {
    sys: SystemDto;
}

export const CmpSystem: React.FC<SystemProps> = ({ sys }) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateRows: "1fr",
                gridTemplateColumns: "1fr 50px 40px",
                alignContent: "center",
                paddingTop: 1,
                paddingBottom: 1,
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
    );
};
