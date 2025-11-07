import { BaseDto } from "./base-dto";
import { SensorDto, SystemDto } from "./device";
import { IOStatusDto } from "./io";

export interface StationDto extends BaseDto {
    systems: SystemDto[];
    pressure_sensor: SensorDto;
    additional_sensor?: SensorDto;
    io_status: IOStatusDto;
}
