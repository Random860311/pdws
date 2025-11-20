import { io } from "socket.io-client";
import { ResponseDto } from "./dto";
import { MOCK } from "./mock";
import { ApiError } from "src/error";
import { AppEvent } from "./socket-events";

/* const socket = io("http://192.168.0.104:8443", {
    transports: ["websocket"],
}); */

const socket = io("http://192.168.11.143:8443", {
    transports: ["websocket"],
});

type Callback<T = any> = (data: T) => void;

const keyListeners: Map<string, Set<Callback>> = new Map();

export type AppEventKey = keyof typeof AppEvent;
export type AppEventValue = (typeof AppEvent)[AppEventKey];

export function emitAsync<T = any>(event: AppEventValue, data?: any): Promise<ResponseDto<T>> {
    console.log("Emit event: ", event);
    return new Promise((resolve, reject) => {
        socket.emit(event, data, (response: ResponseDto) => {
            if (response?.status_code !== "success") {
                console.log(JSON.stringify(response));
                //const msg = response.message || "Unknown error";
                reject(new ApiError("Unknown error", response, response?.status_code));
            } else {
                resolve(response);
            }
        });
    });
}

export function subscribe<T = any>(key: AppEventValue, callback: Callback<T>) {
    if (MOCK) return;
    if (!keyListeners.has(key)) {
        keyListeners.set(key, new Set());

        socket.on(key, (event: T) => {
            //console.log("Socket event received: ", key);
            const listeners = keyListeners.get(key);
            if (listeners) {
                try {
                    listeners.forEach((cb) => cb(event));
                } catch {
                    console.log("Error calling listener");
                }
            }
        });
    }

    keyListeners.get(key)!.add(callback);
}

export function unsubscribe<T = any>(key: AppEventValue, callback: Callback<T>) {
    if (MOCK) return;
    const listeners = keyListeners.get(key);
    if (!listeners) return;

    listeners.delete(callback);

    if (listeners.size === 0) {
        socket.off(key);
        keyListeners.delete(key);
    }
}
