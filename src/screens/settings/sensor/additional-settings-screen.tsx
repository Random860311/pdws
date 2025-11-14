import { Box } from "@mui/material";
import { useStation } from "src/hooks";
import { SensorConfigDto } from "src/api";
import { CmpSensorSettingsForm } from "../sensor/cmp-sensor-settings-form";

export const AdditionalSensorSettingsScreen: React.FC = () => {
    const { station, setSensorConfig } = useStation();

    const handleAdditionalSensorSubmit = async (dto: SensorConfigDto): Promise<void> => {
        console.log(JSON.stringify(dto));
        return setSensorConfig(dto);
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
            <CmpSensorSettingsForm defaultValues={station?.additional_sensor} title="Additional Sensor" onSubmit={handleAdditionalSensorSubmit} />
        </Box>
    );
};
//
