import { Box, FormLabel } from "@mui/material";
import { Led } from "./led";

export interface LedLabelProps {
    color: "green" | "red" | "yellow" | "gray";
    label?: string;
    size?: number;
}

export const LedLabel: React.FC<LedLabelProps> = ({ color, size = 16, label = "" }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, width: "fit-content" }}>
            <FormLabel component="legend">{label}</FormLabel>
            <Led color={color} size={size} />
        </Box>
    );
};
