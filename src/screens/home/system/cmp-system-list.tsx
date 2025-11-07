import { Box } from "@mui/material";
import { SystemDto } from "src/api/dto";
import { PipeVertical } from "src/assets";
import { System } from ".";

export interface SystemListProps {
    systems: SystemDto[];
}

export const CmpSystemList: React.FC<SystemListProps> = ({ systems }) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateRows: "1fr",
                gridTemplateColumns: "1fr",
                alignContent: "center",
                backgroundColor: "aqua",
            }}
        >
            <Box sx={{ gridColumn: 1, gridRow: "1 / -1", alignSelf: "stretch", height: "100%" }}>
                <PipeVertical width={16} height="100%" />
            </Box>

            <Box sx={{ gridColumn: 1, gridRow: 1, alignSelf: "stretch" }}>
                {systems.map((sys, i) => (
                    <System key={i} sys={sys} />
                ))}
            </Box>
        </Box>
    );
};
