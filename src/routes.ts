export function isSameRoute(pathname: string, route: string): boolean {
    const normalize = (p: string) => p.replace(/\/+$/, "");
    return normalize(pathname) === normalize(route);
}

export const routes = {
    home: "/",
    status: "/status",
} as const;
