import createContextHook from "@nkzw/create-context-hook";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useStorage } from "@/providers/storage";

export type Theme = "light" | "dark" | "highContrast";

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  warning: string;
}

const themes: Record<Theme, ThemeColors> = {
  light: {
    background: "#FFFFFF",
    surface: "#F8F9FA",
    primary: "#007AFF",
    secondary: "#5856D6",
    text: "#000000",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
  },
  dark: {
    background: "#000000",
    surface: "#1C1C1E",
    primary: "#0A84FF",
    secondary: "#5E5CE6",
    text: "#FFFFFF",
    textSecondary: "#8E8E93",
    border: "#38383A",
    success: "#30D158",
    error: "#FF453A",
    warning: "#FF9F0A",
  },
  highContrast: {
    background: "#FFFFFF",
    surface: "#F0F0F0",
    primary: "#0000FF",
    secondary: "#800080",
    text: "#000000",
    textSecondary: "#333333",
    border: "#000000",
    success: "#008000",
    error: "#FF0000",
    warning: "#FF8C00",
  },
};

export const [ThemeProvider, useTheme] = createContextHook(() => {
  const { getItem, setItem } = useStorage();
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");
  const [isLoading, setIsLoading] = useState(true);

  const loadTheme = useCallback(async () => {
    try {
      const savedTheme = await getItem("app-theme");
      if (
        savedTheme &&
        (savedTheme === "light" ||
          savedTheme === "dark" ||
          savedTheme === "highContrast")
      ) {
        setCurrentTheme(savedTheme as Theme);
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getItem]);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const changeTheme = useCallback(
    async (theme: Theme) => {
      if (!theme || typeof theme !== "string") return;
      if (!["light", "dark", "highContrast"].includes(theme)) return;

      try {
        await setItem("app-theme", theme);
        setCurrentTheme(theme);
      } catch (error) {
        console.log("Error saving theme:", error);
      }
    },
    [setItem]
  );

  const colors = useMemo(() => themes[currentTheme], [currentTheme]);

  return useMemo(
    () => ({
      theme: currentTheme,
      colors,
      changeTheme,
      isLoading,
    }),
    [currentTheme, colors, changeTheme, isLoading]
  );
});
