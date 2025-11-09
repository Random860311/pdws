import { Box, Typography } from "@mui/material";
import { AnalogIODto } from "src/api";
import { AnalogIoStatus } from "./cmp-analog";
import { Outlet } from "react-router-dom";

export interface AnalogListProps {
    label: String;
    list: AnalogIODto[] | undefined;
}
export const AnalogListStatus: React.FC<AnalogListProps> = ({ label, list }) => {
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
            {list ? list.map((io, i) => <AnalogIoStatus key={i} io={io} />) : <Outlet />}
        </Box>
    );
};
