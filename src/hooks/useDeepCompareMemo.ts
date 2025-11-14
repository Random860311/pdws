import { useRef, useMemo } from "react";
import equal from "fast-deep-equal";

export function useDeepCompareMemo<T>(factory: () => T, deps: unknown[]): T {
    const lastRef = useRef<{ deps: unknown[]; value: T }>();

    if (!lastRef.current || !equal(lastRef.current.deps, deps)) {
        // deps changed deeply → recompute
        lastRef.current = {
            deps,
            value: factory(),
        };
    }

    // Always return the last computed value
    return lastRef.current.value;
}
