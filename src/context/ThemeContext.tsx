import React, { createContext, useContext, useEffect, useMemo } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeProviderState>({
    theme: "dark",
    setTheme: () => null,
});

export function ThemeProvider({ children, ..._ }: { children: React.ReactNode; defaultTheme?: string; storageKey?: string }) {
    useEffect(() => {
        // Always dark — no theme switching
        const root = window.document.documentElement;
        root.classList.remove("light");
        root.classList.add("dark");
        localStorage.removeItem("vite-ui-theme");
    }, []);

    const value = useMemo(() => ({ theme: "dark" as const, setTheme: () => {} }), []);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
