import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { routes } from "src/routes";

interface DrawerMenuProps {
    open: boolean;
    onClose: () => void;
    onNavigate: (route: string) => void;
}

const menuItems = [
    { label: "Home", route: routes.home },
    { label: "Status", route: routes.status },
];

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose, onNavigate }) => {
    return (
        <Drawer open={open} onClose={onClose}>
            <List sx={{ width: 250 }}>
                {menuItems.map((item, index) => (
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
                ))}
                <Divider />
            </List>
        </Drawer>
    );
};
