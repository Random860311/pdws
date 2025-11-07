import { BaseDto } from "../base-dto";

export interface DeviceDto extends BaseDto {
    device_id: number;
    device_name: string;
    has_critical_alarm: boolean;
    has_alarm: boolean;
}
