import { BaseDto } from "../base-dto";
import { AnalogIODto } from "./analog-io-dto";
import { DigitalIODto } from "./digital-io-dto";

export interface IOStatusDto extends BaseDto {
    di: DigitalIODto[];
    do: DigitalIODto[];
    ai: AnalogIODto[];
    ao: AnalogIODto[];
}
