import { Box } from "@mui/material";
import { DigitalIODto } from "src/api";
import { LedLabel } from "src/components";

export interface DigitalIoProps {
    io: DigitalIODto;
}
export const DigitalIoStatus: React.FC<DigitalIoProps> = ({ io }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                border: "1px solid gray",
                borderRadius: 2,
                p: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <LedLabel label={String(io.io_id) + ":"} color={io.value ? "green" : "gray"} />
        </Box>
    );
};
