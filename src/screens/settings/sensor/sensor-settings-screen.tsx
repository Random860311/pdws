import { Box } from "@mui/material";
import { useStation } from "src/hooks";
import { SensorConfigDto } from "src/api";
import { CmpSensorSettingsForm } from "../sensor/cmp-sensor-settings-form";
import { useParams } from "react-router-dom";
import { useAppLayout } from "src/context";
import { useEffect } from "react";

export const SensorSettingsScreen: React.FC = () => {
    const { station, setSensorConfig } = useStation();
    const { type } = useParams<{ type: "pressure" | "additional" }>();

    const sensor = type === "pressure" ? station?.pressure_sensor : station?.additional_sensor;
    const label = type === "pressure" ? "Pressure sensor" : "Additional Sensor";

    const { setTitle } = useAppLayout();

    useEffect(() => {
        setTitle(label);
        return () => setTitle(null);
    }, [setTitle, label]);

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
            <CmpSensorSettingsForm defaultValues={sensor} title={label} onSubmit={handleAdditionalSensorSubmit} />
        </Box>
    );
};
//
