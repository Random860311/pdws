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
    { label: "Status", route: routes.status },
    {
        label: "Settings",
        children: [
            { label: "App Settings", route: routes.appSettings },
            { label: "Pressure sensor", route: routes.pressureSettings },
            { label: "Additional sensor", route: routes.additionalSettings },
        ],
    },
];

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose, onNavigate }) => {
    return (
        <Drawer open={open} onClose={onClose}>
            <List sx={{ width: 250 }}>
                {menuItems.map((item, index) => {
                    // Simple item (clickable)
                    if ("route" in item) {
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        onNavigate(item.route);
                                        onClose();
                                    }}
                                >
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
                                        onClick={() => {
                                            onNavigate(child.route);
                                            onClose();
                                        }}
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
