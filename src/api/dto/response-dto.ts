export interface ResponseDto<T = any> {
    status: string;
    message?: string;
    obj_id?: number;
    obj?: T;
    list_obj?: T[];
}
