import React, { createContext, useContext, useState, useEffect } from "react";

// ----- Context Types -----
interface LoadingContextType {
    loading: boolean;
    setLoading: (isLoading: boolean) => void;
}

// ----- React Context -----
const LoadingContext = createContext<LoadingContextType>({
    loading: false,
    setLoading: () => {},
});

export const useGlobalLoading = () => useContext(LoadingContext);

// ----- Global Setter -----
let globalSetLoading: (isLoading: boolean) => void;
let loadingQueue = 0;

export const setGlobalLoading = (isLoading: boolean) => {
    if (isLoading) loadingQueue++;
    else if (loadingQueue > 0) loadingQueue--;
    if (globalSetLoading) {
        globalSetLoading(loadingQueue > 0);
    }
};

export async function withLoading<T>(work: () => Promise<T>): Promise<T> {
    setGlobalLoading(true);
    try {
        return await work();
    } finally {
        setGlobalLoading(false);
    }
}

// ----- Provider Component -----
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Set global handler once mounted
        globalSetLoading = setLoading;

        if (loadingQueue !== null) setLoading(loadingQueue > 0);
    }, []);

    return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
};
