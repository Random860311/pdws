import { Box } from "@mui/material";

export interface LedProps {
    color: "green" | "red" | "yellow" | "gray";
    size?: number;
}
export const Led: React.FC<LedProps> = ({ color, size = 16 }) => {
    const colorMap: Record<string, string> = {
        green: "#4caf50",
        red: "#f44336",
        yellow: "#ffeb3b",
        gray: "#9e9e9e",
    };

    return (
        <Box
            sx={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: colorMap[color],
                boxShadow: `0 0 6px ${colorMap[color]}`,
            }}
        />
    );
};
