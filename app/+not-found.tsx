import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Home, AlertTriangle } from "lucide-react-native";
import { router } from "expo-router";
import { useTheme } from "@/context/theme-context";

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <AlertTriangle size={80} color={colors.warning} />
        <Text style={[styles.title, { color: colors.text }]}>
          Page Not Found
        </Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          The page you're looking for doesn't exist.
        </Text>
        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: colors.primary }]}
          onPress={() => router.replace("(tabs)")}
        >
          <Home size={20} color="white" />
          <Text style={styles.homeButtonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: { alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  message: { fontSize: 16, textAlign: "center", marginBottom: 30 },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  homeButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
