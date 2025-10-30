import { useOutletContext } from "react-router-dom";

export type LayoutCtx = {
    setActions: (nodes: React.ReactNode) => void;
    clearActions: () => void;
    setTitle: (title: string | null) => void;
};

export const useAppLayout = () => useOutletContext<LayoutCtx>();
