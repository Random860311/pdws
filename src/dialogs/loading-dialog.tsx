import React from "react";
import { useGlobalLoading } from "src/context/loading-context";
import { Dialog, CircularProgress, Box } from "@mui/material";
import "./loading-dialog.css";

export const LoadingDialog: React.FC = () => {
    const { loading } = useGlobalLoading();
    return (
        <Dialog
            open={loading}
            slotProps={{
                paper: {
                    className: "loading-dialog-paper",
                },
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center" p={4}>
                <CircularProgress />
            </Box>
        </Dialog>
    );
};
