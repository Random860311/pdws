import { DeviceDto } from "./device-dto";

export interface SensorConfigDto extends DeviceDto {
    value_scaled_max: number;
    value_scaled_min: number;

    ai_max: number;
    ai_min: number;

    need_alarm_reset: boolean;

    alarm_start_delay: boolean;
    alarm_stop_delay: boolean;

    alarm_start_high: number;
    alarm_stop_high: number;

    alarm_start_high_high: number;
    alarm_stop_high_high: number;
}

export interface SensorDto extends SensorConfigDto {
    value_scaled: number;
    value_ai: number;
    value_ma: number;
}
