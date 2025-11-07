import { Box } from "@mui/material";
import { useStation } from "src/hooks/station-service";

export const StatusScreen: React.FC = () => {
    const { station } = useStation();
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
