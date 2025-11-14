import { Box } from "@mui/material";
import { useStation } from "src/hooks";
import { CmpAppSettingsForm } from "./cmp-app-settings-form";
import { AppSettingsDto } from "src/api";

export const AppSettingsScreen: React.FC = () => {
    const { station, setStationConfig } = useStation();

    const handleAppSubmit = async (dto: AppSettingsDto): Promise<void> => {
        console.log(JSON.stringify(dto));
        await setStationConfig(dto);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
                height: "100%",
                overflowY: "auto",
                p: 1,
                pt: 11,
            }}
        >
            <CmpAppSettingsForm defaultValues={station?.app_settings} onSubmit={handleAppSubmit} />
        </Box>
    );
};
//
