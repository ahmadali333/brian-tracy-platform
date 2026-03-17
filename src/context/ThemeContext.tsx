import React, { createContext, useContext, useEffect } from "react";

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

    return (
        <ThemeContext.Provider value={{ theme: "dark", setTheme: () => {} }}>
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
