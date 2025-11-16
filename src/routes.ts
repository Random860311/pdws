export function isSameRoute(pathname: string, route: string): boolean {
    const normalize = (p: string) => p.replace(/\/+$/, "");
    return normalize(pathname) === normalize(route);
}

export const routes = {
    home: "/",
    status: "/status",

    systemsRoot: "/systems",
    systems: {
        path: "/systems/:id",
        build: (id: number) => `/systems/${id}`,
    },

    settingsRoot: "/settings",
    settings: {
        path: "/settings/:type", // used in <Route>
        build: (type: "app" | "pressure" | "additional") => `/settings/${type}`, // used in navigate()
    },
} as const;
