import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { PipeCurveRight, PipeHorizontal, PipeTeeRight, PipeVertical } from "src/assets";
import { useStation } from "src/hooks/station-service";
import { System } from "./system";
import { CmpSystemList } from "./system/cmp-system-list";

export const HomeScreen: React.FC = () => {
    const { station } = useStation();
    if (station == null) return <Outlet />;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: 2,
                height: "100%",
                alignItems: "start",
            }}
        >
            <CmpSystemList systems={station.systems} />
            <Box sx={{ height: "20px", width: "20px", alignItems: "start" }}>
                <PipeCurveRight height="100%" width="100%" />
            </Box>
        </Box>
    );
};
