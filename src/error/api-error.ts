export class ApiError<T = unknown> extends Error {
    code?: string | number;
    cause: T; // keep full server payload

    constructor(message: string, cause: T, code?: string | number) {
        super(message);
        this.name = "ApiError";
        this.code = code;
        this.cause = cause;
    }
}
