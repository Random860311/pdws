import { Box } from "@mui/material";
import { useStation } from "src/hooks/station-service";
import { AnalogListStatus, DigitalListStatus } from "./io";

export const StatusScreen: React.FC = () => {
    const { station } = useStation();
    return (
        <Box
            sx={{
                display: "flex",
                gap: 4,
                flexDirection: "row",
                width: "100%",
                height: "100%",
                justifyContent: "space-evenly",
            }}
        >
            <AnalogListStatus label="Analog inputs:" list={station?.io_status?.ai} />
            <AnalogListStatus label="Analog outputs:" list={station?.io_status?.ao} />
            <DigitalListStatus label="Digital inputs:" list={station?.io_status?.di} />
            <DigitalListStatus label="Digital outputs:" list={station?.io_status?.do} />
        </Box>
    );
};
