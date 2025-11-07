import { IODto } from "./io-dto";

export interface AnalogIODto extends IODto {
    raw_value: number;
    ma_value: number;
}
