import { DeviceDto } from "./device-dto";

export interface RunnableDto extends DeviceDto {
    status: number;
    can_run: boolean;
    can_run_auto: boolean;
    call_to_run: boolean;
    alarm_fail_to_start: boolean;
    emergency_stop: boolean;
    run_time_current: number;
    run_time_last: number;
    run_time_total: number;
}
