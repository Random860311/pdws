import { useCallback } from "react";
import { useGlobalError } from "src/context";
import { ApiError } from "src/error";

/** Runs an async action, routes ApiError to the global error UI, logs, then rethrows. */
export function useApiRunner() {
    const { setErrorAndTitle } = useGlobalError();

    return useCallback(
        async <T>(errorMessage: string, action: () => Promise<T>, rethrows: boolean = false): Promise<T | undefined> => {
            try {
                return await action();
            } catch (err) {
                if (err instanceof ApiError) setErrorAndTitle(err.message, "Info");
                console.error(errorMessage, err);
                if (rethrows) throw err; // keep behavior consistent for callers
            }
        },
        [setErrorAndTitle]
    );
}

/** Curry-friendly: turns any async fn into a wrapped version with shared handling. */
export function useApiCall<A extends any[], R>(label: string, fn: (...args: A) => Promise<R>) {
    const run = useApiRunner();
    return useCallback((...args: A) => run(label, () => fn(...args)), [label, fn, run]);
}
