export interface ResponseDto<T = any> {
    status_code: string;
    data?: T;
}
