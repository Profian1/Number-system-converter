import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useMemo } from "react";

export const [StorageProvider, useStorage] = createContextHook(() => {
  const getItem = useCallback(async (key: string): Promise<string | null> => {
    if (!key || typeof key !== "string" || !key.trim()) return null;
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log("Error getting item from storage:", error);
      return null;
    }
  }, []);

  const setItem = useCallback(
    async (key: string, value: string): Promise<void> => {
      if (!key || typeof key !== "string" || !key.trim()) return;
      if (!value || typeof value !== "string") return;
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log("Error setting item in storage:", error);
      }
    },
    []
  );

  const removeItem = useCallback(async (key: string): Promise<void> => {
    if (!key || typeof key !== "string" || !key.trim()) return;
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error removing item from storage:", error);
    }
  }, []);

  return useMemo(
    () => ({
      getItem,
      setItem,
      removeItem,
    }),
    [getItem, setItem, removeItem]
  );
});
