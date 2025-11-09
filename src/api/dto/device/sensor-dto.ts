import { DeviceDto } from "./device-dto";

export interface SensorConfigDto extends DeviceDto {
    value_scaled_max: number;
    value_scaled_min: number;

    ai_max: number;
    ai_min: number;

    need_alarm_reset: boolean;

    alarm_start_delay: number;
    alarm_stop_delay: number;

    alarm_start_high: number;
    alarm_stop_high: number;

    alarm_start_high_high: number;
    alarm_stop_high_high: number;

    alarm_start_low: number;
    alarm_stop_low: number;

    alarm_start_low_low: number;
    alarm_stop_low_low: number;

    is_high_high_critical: boolean;
    is_low_low_critical: boolean;
}

export interface SensorDto extends SensorConfigDto {
    value_scaled: number;
    value_ai: number;
    value_ma: number;

    is_high_active: boolean;
    is_high_high_active: boolean;
    is_low_active: boolean;
    is_low_low_active: boolean;
}
