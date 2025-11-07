import { DeviceDto } from "./device-dto";

export interface RunnableDto extends DeviceDto {
    status: number;
    can_run: boolean;
    can_run_auto: boolean;
    call_to_run: boolean;
    alarm_fail_to_start: boolean;
}
