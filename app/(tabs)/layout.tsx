import { Tabs } from "expo-router";
import { Calculator, BookOpen, Hash, Palette } from "lucide-react-native";
import React from "react";
import { useTheme } from "@/context/theme-context";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="converter"
        options={{
          title: "Convert",
          tabBarIcon: ({ color, size }) => (
            <Calculator color={color} size={size} />
          ),
          headerTitle: "Number Converter",
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} />
          ),
          headerTitle: "Learn Number Systems",
        }}
      />
      <Tabs.Screen
        name="ascii"
        options={{
          title: "ASCII",
          tabBarIcon: ({ color, size }) => <Hash color={color} size={size} />,
          headerTitle: "ASCII Table",
        }}
      />
      <Tabs.Screen
        name="theme"
        options={{
          title: "Theme",
          tabBarIcon: ({ color, size }) => (
            <Palette color={color} size={size} />
          ),
          headerTitle: "Theme Settings",
        }}
      />
    </Tabs>
  );
}
