import { SystemDto } from "src/api";
import { PumpDefault, PumpError, PumpRunning } from "src/assets";

export function renderSystemPump(sys: SystemDto) {
    if (sys.has_alarm) return <PumpError height={100} width={40} />;
    if (sys.status === 1) {
        return <PumpRunning height={100} width={40} />;
    }
    return <PumpDefault height={100} width={40} />;
}

export function renderSystemPriority(sys: SystemDto): "Lead" | "Lag" | "Lag 2" | "Lag 3" | "Out" {
    switch (sys.priority) {
        case 0:
            return "Lead";
        case 1:
            return "Lag";
        case 2:
            return "Lag 2";
        case 3:
            return "Lag 3";
        default:
            return "Out";
    }
}

export function renderSystemMode(mode: number): "Hand" | "Auto" | "Off" {
    switch (mode) {
        case 1:
            return "Hand";
        case 2:
            return "Auto";
        default:
            return "Off";
    }
}
