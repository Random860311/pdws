import { BaseDto } from "../base-dto";

export interface AppSettingsDto extends BaseDto {
    level_set_point: number;
    level_offset: number;
    system_count: number;
    start_pump_delay: number;
    stop_pump_delay: number;
    system_fail_to_start_delay: number;
}
