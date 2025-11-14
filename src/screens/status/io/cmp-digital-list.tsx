import { Box, Typography } from "@mui/material";
import { DigitalIODto } from "src/api";
import { DigitalIoStatus } from "./cmp-digital";
import { Outlet } from "react-router-dom";
import equal from "fast-deep-equal";
import React from "react";

export interface DigitalListProps {
    label: String;
    list: DigitalIODto[] | undefined;
}

const areEqual = (prev: DigitalListProps, next: DigitalListProps) => prev.label === next.label && equal(prev.list, next.list);

export const DigitalListStatus = React.memo(function DigitalListStatus({ label, list }: DigitalListProps) {
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
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: "1fr 1fr",
                    gridTemplateColumns: "1fr 1fr",
                    width: "100%",
                    gap: 1,
                }}
            >
                {list ? list.map((io, i) => <DigitalIoStatus key={i} io={io} />) : <Outlet />}
            </Box>
        </Box>
    );
}, areEqual);
