import { Box, Typography, Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AppEvent, AppEventDto, subscribe, unsubscribe } from "src/api";

interface GlobalErrorContextType {
    error: string | null;
    setErrorAndTitle: (error: string | null, title?: string | null) => void;
}

const GlobalErrorContext = createContext<GlobalErrorContextType>({
    error: null,
    setErrorAndTitle: (error: string | null, title: string | null = null) => {},
});

export const useGlobalError = () => useContext(GlobalErrorContext);

export const GlobalErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);

    const setErrorAndTitle = useCallback(
        (error: string | null, title: string | null = "Error") => {
            setError(error);
            setTitle(title);
        },
        [setError, setTitle]
    );

    useEffect(() => {
        const handleGlobalWarning = (event: AppEventDto) => {
            console.log("Warning handled globally");
            setErrorAndTitle(event.message, "Warning");
        };

        const handleGlobalError = (event: AppEventDto) => {
            console.log("Error handled globally");
            setErrorAndTitle(event.message, "Error");
        };

        subscribe(AppEvent.ApplicationWarning, handleGlobalWarning);
        subscribe(AppEvent.ApplicationError, handleGlobalError);

        return () => {
            unsubscribe(AppEvent.ApplicationWarning, handleGlobalWarning);
            unsubscribe(AppEvent.ApplicationError, handleGlobalError);
        };
    });

    return (
        <GlobalErrorContext.Provider value={{ error, setErrorAndTitle }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                {children}
                {error && (
                    <Dialog open={!!error} onClose={() => setError(null)}>
                        <DialogTitle>{title ?? "Error"}</DialogTitle>
                        <DialogContent>
                            <Typography>{error}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setError(null)}>Dismiss</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Box>
        </GlobalErrorContext.Provider>
    );
};
