import { Box, Typography } from "@mui/material";
import { DigitalIODto } from "src/api";
import { DigitalIoStatus } from "./cmp-digital";
import { Outlet } from "react-router-dom";

export interface DigitalListProps {
    label: String;
    list: DigitalIODto[] | undefined;
}
export const DigitalListStatus: React.FC<DigitalListProps> = ({ label, list }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
            }}
        >
            <Typography variant="h6" sx={{ width: "fit-content", fontWeight: "bold" }}>
                {label}
            </Typography>
            {list ? list.map((io, i) => <DigitalIoStatus key={i} io={io} />) : <Outlet />}
        </Box>
    );
};
