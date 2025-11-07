import { BaseDto } from "./base-dto";

export interface AppEventDto extends BaseDto {
    message: string;
    code?: string;
    extra?: any;
}
