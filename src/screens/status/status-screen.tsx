import { Box } from "@mui/material";

export const StatusScreen: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 4,
                flexDirection: "column",
                p: 2,
                height: "100%",
                alignItems: "center",
            }}
        >
            Status Screen
        </Box>
    );
};
