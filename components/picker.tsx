import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from "react-native";
import { ChevronDown } from "lucide-react-native";
import { useTheme } from "@/context/theme-context";

interface PickerOption {
  label: string;
  value: string;
}

interface PickerProps {
  options: PickerOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  testID?: string;
}

export default function Picker({
  options,
  selectedValue,
  onValueChange,
  placeholder,
  testID,
}: PickerProps) {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = React.useState(false);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  const handleSelect = (value: string) => {
    if (!value || typeof value !== "string") return;
    onValueChange(value);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.picker,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
        onPress={() => setIsVisible(true)}
        testID={testID}
      >
        <Text
          style={[
            styles.pickerText,
            { color: selectedOption ? colors.text : colors.textSecondary },
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <ChevronDown size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            <ScrollView style={styles.optionsList}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.option,
                    { borderBottomColor: colors.border },
                    selectedValue === option.value && {
                      backgroundColor: colors.surface,
                    },
                  ]}
                  onPress={() => handleSelect(option.value)}
                >
                  <Text style={[styles.optionText, { color: colors.text }]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  picker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 48,
  },
  pickerText: {
    fontSize: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxHeight: "60%",
    borderRadius: 12,
    overflow: "hidden",
  },
  optionsList: {
    maxHeight: 300,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});
