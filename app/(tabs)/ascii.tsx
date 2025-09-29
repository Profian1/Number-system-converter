import React, { useState, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Hash, Search } from "lucide-react-native";
import { useTheme } from "@/context/theme-context";
import { asciiData, ASCIICharacter } from "@/data/ascii-data";

export default function ASCIIScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return asciiData;

    const query = searchQuery.toLowerCase();
    return asciiData.filter(
      (item) =>
        item.character.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.decimal.toString().includes(query) ||
        item.hex.toLowerCase().includes(query) ||
        item.binary.includes(query) ||
        item.octal.includes(query)
    );
  }, [searchQuery]);

  const renderTableHeader = () => (
    <View
      style={[
        styles.tableRow,
        styles.headerRow,
        { backgroundColor: colors.primary },
      ]}
    >
      <Text style={[styles.headerCell, styles.decimalColumn]}>Dec</Text>
      <Text style={[styles.headerCell, styles.binaryColumn]}>Binary</Text>
      <Text style={[styles.headerCell, styles.octalColumn]}>Oct</Text>
      <Text style={[styles.headerCell, styles.hexColumn]}>Hex</Text>
      <Text style={[styles.headerCell, styles.charColumn]}>Char</Text>
      <Text style={[styles.headerCell, styles.descColumn]}>Description</Text>
    </View>
  );

  const renderTableRow = (item: ASCIICharacter, index: number) => (
    <View
      key={`ascii-${item.decimal}`}
      style={[
        styles.tableRow,
        {
          backgroundColor: index % 2 === 0 ? colors.surface : colors.background,
        },
      ]}
    >
      <Text style={[styles.cell, styles.decimalColumn, { color: colors.text }]}>
        {item.decimal}
      </Text>
      <Text
        style={[
          styles.cell,
          styles.binaryColumn,
          styles.monospace,
          { color: colors.text },
        ]}
      >
        {item.binary}
      </Text>
      <Text
        style={[
          styles.cell,
          styles.octalColumn,
          styles.monospace,
          { color: colors.text },
        ]}
      >
        {item.octal}
      </Text>
      <Text
        style={[
          styles.cell,
          styles.hexColumn,
          styles.monospace,
          { color: colors.text },
        ]}
      >
        {item.hex}
      </Text>
      <Text
        style={[
          styles.cell,
          styles.charColumn,
          styles.monospace,
          { color: colors.primary },
        ]}
      >
        {item.character === " " ? "SPC" : item.character}
      </Text>
      <Text
        style={[
          styles.cell,
          styles.descColumn,
          { color: colors.textSecondary },
        ]}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Hash size={32} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>ASCII Table</Text>
      </View>

      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search ASCII characters..."
            placeholderTextColor={colors.textSecondary}
            testID="ascii-search"
          />
        </View>
      </View>

      <ScrollView
        style={styles.tableContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.table}>
          {renderTableHeader()}
          <ScrollView style={styles.tableBody}>
            {filteredData.map((item, index) => renderTableRow(item, index))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.surface }]}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Showing {filteredData.length} of {asciiData.length} characters
        </Text>
      </View>
    </View>
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
    marginBottom: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  tableContainer: {
    flex: 1,
  },
  table: {
    minWidth: 600,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerRow: {
    paddingVertical: 12,
  },
  headerCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  cell: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 13,
    textAlign: "center",
  },
  monospace: {
    fontFamily: "monospace",
  },
  decimalColumn: {
    width: 50,
  },
  binaryColumn: {
    width: 80,
  },
  octalColumn: {
    width: 50,
  },
  hexColumn: {
    width: 50,
  },
  charColumn: {
    width: 50,
  },
  descColumn: {
    width: 170,
    textAlign: "left",
  },
  tableBody: {
    maxHeight: 400,
  },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
});
