import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { routes } from "src/routes";

interface DrawerMenuProps {
    open: boolean;
    onClose: () => void;
    onNavigate: (route: string) => void;
}

type MenuItem = { label: string; route: string } | { label: string; children: { label: string; route: string }[] };

const menuItems: MenuItem[] = [
    { label: "Home", route: routes.home },
    {
        label: "Systems",
        children: [
            { label: "Pump 1", route: routes.systems.build(1) },
            { label: "Pump 2", route: routes.systems.build(2) },
            { label: "Pump 3", route: routes.systems.build(3) },
        ],
    },
    {
        label: "Settings",
        children: [
            { label: "App Settings", route: routes.settings.build("app") },
            { label: "Pressure sensor", route: routes.settings.build("pressure") },
            { label: "Additional sensor", route: routes.settings.build("additional") },
        ],
    },
    { label: "Status", route: routes.status },
];

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose, onNavigate }) => {
    const handleClick = (route?: string) => {
        if (!route) return;
        onNavigate(route);
        onClose();
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <List sx={{ width: 250 }}>
                {menuItems.map((item, index) => {
                    // Simple item (clickable)
                    if ("route" in item) {
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => handleClick(item.route)}>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        );
                    }

                    // Item with children: header + clickable children
                    return (
                        <React.Fragment key={index}>
                            <ListItem>
                                {/* Not clickable: just a label */}
                                <Typography sx={{ fontWeight: "bold" }}>{item.label}</Typography>
                            </ListItem>
                            {item.children.map((child, childIndex) => (
                                <ListItem key={`${index}-${childIndex}`} disablePadding>
                                    <ListItemButton
                                        sx={{ pl: 4 }} // indent children
                                        onClick={() => handleClick(child.route)}
                                    >
                                        <ListItemText primary={child.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </React.Fragment>
                    );
                })}
                <Divider />
            </List>
        </Drawer>
    );
};
