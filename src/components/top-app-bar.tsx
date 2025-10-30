import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import { CCTLogo } from "src/assets";

interface TopAppBarProps {
    onMenuClick: () => void;
    title?: string | null;
    actions?: React.ReactNode;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onMenuClick, actions, title = "Demo Web" }) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onMenuClick} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title ?? "Demo Web"}
                </Typography>
                <CCTLogo />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{actions}</Box>
            </Toolbar>
        </AppBar>
    );
};
