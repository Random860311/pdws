import { useParams } from "react-router-dom";
import { AppSettingsScreen } from "./app";
import { SensorSettingsScreen } from "./sensor";

export function SettingsScreen() {
    const { type } = useParams<{ type: "app" | "pressure" | "additional" }>();

    if (type === "app") return <AppSettingsScreen />;
    if (type === "pressure" || type === "additional") return <SensorSettingsScreen />;

    return <div>Unknown settings type</div>;
}
