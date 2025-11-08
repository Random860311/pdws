import { Box, FormLabel } from "@mui/material";

export interface LedIndicatorProps {
    color: "green" | "red" | "yellow" | "gray";
    label?: string;
    size?: number;
}

export const LedIndicator: React.FC<LedIndicatorProps> = ({ color, size = 16, label = "" }) => {
    const colorMap: Record<string, string> = {
        green: "#4caf50",
        red: "#f44336",
        yellow: "#ffeb3b",
        gray: "#9e9e9e",
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, width: "fit-content" }}>
            <FormLabel component="legend">{label}</FormLabel>
            <Box
                sx={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    backgroundColor: colorMap[color],
                    boxShadow: `0 0 6px ${colorMap[color]}`,
                }}
            />
        </Box>
    );
};
