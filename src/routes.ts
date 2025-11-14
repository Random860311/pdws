export function isSameRoute(pathname: string, route: string): boolean {
    const normalize = (p: string) => p.replace(/\/+$/, "");
    return normalize(pathname) === normalize(route);
}

export const routes = {
    home: "/",
    status: "/status",
    appSettings: "/settings_app",
    pressureSettings: "/settings_pressure",
    additionalSettings: "/settings_additional",
} as const;
