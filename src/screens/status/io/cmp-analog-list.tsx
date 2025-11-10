import { Box, Typography } from "@mui/material";
import { AnalogIODto } from "src/api";
import { AnalogIoStatus } from "./cmp-analog";
import { Outlet } from "react-router-dom";
import equal from "fast-deep-equal";
import React from "react";

export interface AnalogListProps {
    label: String;
    list: AnalogIODto[] | undefined;
}

const areEqual = (prev: AnalogListProps, next: AnalogListProps) => prev.label === next.label && equal(prev.list, next.list);

export const AnalogListStatus = React.memo(function AnalogListStatus({ label, list }: AnalogListProps) {
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
}, areEqual);
