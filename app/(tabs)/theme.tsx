import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Palette, Check } from "lucide-react-native";
import { useTheme, Theme } from "@/context/theme-context";

const themeOptions: { value: Theme; label: string; description: string }[] = [
  {
    value: "light",
    label: "Light Theme",
    description: "Clean and bright interface perfect for daytime use",
  },
  {
    value: "dark",
    label: "Dark Theme",
    description:
      "Easy on the eyes with dark backgrounds for low-light environments",
  },
  {
    value: "highContrast",
    label: "High Contrast",
    description: "Maximum contrast for better accessibility and readability",
  },
];

export default function ThemeScreen() {
  const { theme, colors, changeTheme } = useTheme();

  const handleThemeChange = (newTheme: Theme) => {
    if (!newTheme || typeof newTheme !== "string") return;
    changeTheme(newTheme);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Palette size={32} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>
          Theme Settings
        </Text>
      </View>

      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Choose your preferred theme for the best viewing experience
      </Text>

      <View style={styles.themeOptions}>
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.themeOption,
              {
                backgroundColor: colors.surface,
                borderColor:
                  theme === option.value ? colors.primary : colors.border,
                borderWidth: theme === option.value ? 2 : 1,
              },
            ]}
            onPress={() => handleThemeChange(option.value)}
            testID={`theme-${option.value}`}
          >
            <View style={styles.themeContent}>
              <View style={styles.themeInfo}>
                <Text style={[styles.themeLabel, { color: colors.text }]}>
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.themeDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  {option.description}
                </Text>
              </View>

              {theme === option.value && (
                <View
                  style={[
                    styles.checkIcon,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Check size={16} color="white" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={[
          styles.previewSection,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.previewTitle, { color: colors.text }]}>
          Theme Preview
        </Text>

        <View style={styles.previewContent}>
          <View style={styles.previewRow}>
            <Text
              style={[styles.previewLabel, { color: colors.textSecondary }]}
            >
              Primary Color:
            </Text>
            <View
              style={[styles.colorSwatch, { backgroundColor: colors.primary }]}
            />
          </View>

          <View style={styles.previewRow}>
            <Text
              style={[styles.previewLabel, { color: colors.textSecondary }]}
            >
              Secondary Color:
            </Text>
            <View
              style={[
                styles.colorSwatch,
                { backgroundColor: colors.secondary },
              ]}
            />
          </View>

          <View style={styles.previewRow}>
            <Text
              style={[styles.previewLabel, { color: colors.textSecondary }]}
            >
              Success Color:
            </Text>
            <View
              style={[styles.colorSwatch, { backgroundColor: colors.success }]}
            />
          </View>

          <View style={styles.previewRow}>
            <Text
              style={[styles.previewLabel, { color: colors.textSecondary }]}
            >
              Error Color:
            </Text>
            <View
              style={[styles.colorSwatch, { backgroundColor: colors.error }]}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  themeOptions: {
    gap: 16,
    marginBottom: 32,
  },
  themeOption: {
    borderRadius: 12,
    padding: 16,
  },
  themeContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeInfo: {
    flex: 1,
  },
  themeLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  checkIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  previewSection: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  previewContent: {
    gap: 12,
  },
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  previewLabel: {
    fontSize: 16,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
