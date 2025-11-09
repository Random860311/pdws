import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Box, Toolbar } from "@mui/material";
import { DrawerMenu, ErrorBoundary, TopAppBar } from "./components";
import { GlobalErrorProvider, LayoutCtx, LoadingProvider } from "./context";
import { routes } from "./routes";
import { LoadingDialog } from "./dialogs";
import { HomeScreen, StatusScreen } from "./screens";

export const AppContent = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const [actions, setActions] = useState<React.ReactNode>(null);
    const [title, setTitle] = useState<string | null>("Demo Web");

    const ctx: LayoutCtx = useMemo(
        () => ({
            setActions,
            clearActions: () => setActions(null),
            setTitle: (t) => setTitle(t),
        }),
        []
    );

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
            <TopAppBar onMenuClick={() => setDrawerOpen(true)} actions={actions} title={title} />
            <Toolbar /> {/* Spacer to push content below fixed AppBar */}
            <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={(route) => navigate(route)} />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 4,
                        border: "2px solid #1976d2",
                        borderRadius: 2,
                        p: 3,
                        height: "480px",
                        width: "800px",
                    }}
                >
                    <Outlet context={ctx} />
                </Box>
            </Box>
        </Box>
    );
};

function App() {
    return (
        <Box sx={{ height: "100dvh" }}>
            <React.StrictMode>
                <ErrorBoundary fallback={<h1>Fatal app error.</h1>}>
                    <GlobalErrorProvider>
                        <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
                            <LoadingProvider>
                                <Router>
                                    <LoadingDialog />
                                    <Routes>
                                        <Route element={<AppContent />}>
                                            <Route index path={routes.home} element={<HomeScreen />} />
                                            <Route path={routes.status} element={<StatusScreen />} />
                                            {/* Add more routes */}
                                        </Route>
                                    </Routes>
                                </Router>
                            </LoadingProvider>
                        </ErrorBoundary>
                    </GlobalErrorProvider>
                </ErrorBoundary>
            </React.StrictMode>
        </Box>
    );
}

export default App;
