import { ContactorDto } from "./contactor-dto";
import { PumpDto } from "./pump-dto";
import { RunnableDto } from "./runnable-dto";

export interface SystemDto extends RunnableDto {
    mode: number;
    priority: number;
    priority_auto: number;
    priority_hand: number;

    contactor?: ContactorDto;
    pump?: PumpDto;
}
