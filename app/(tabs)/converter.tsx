import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Calculator, ArrowRight } from "lucide-react-native";
import { useTheme } from "@/context/theme-context";
import {
  convertNumber,
  numberSystems,
  NumberSystem,
  ConversionResult,
} from "@/utils/number-converter";
import Picker from "@/components/Picker";

export default function ConverterScreen() {
  const { colors } = useTheme();
  const [input, setInput] = useState("");
  const [fromSystem, setFromSystem] = useState<NumberSystem>("decimal");
  const [toSystem, setToSystem] = useState<NumberSystem>("binary");

  const pickerOptions = numberSystems.map((system) => ({
    label: system.label,
    value: system.value,
  }));

  const conversionResult: ConversionResult = useMemo(() => {
    if (!input.trim()) {
      return { result: "", steps: [], isValid: false };
    }
    return convertNumber(input, fromSystem, toSystem);
  }, [input, fromSystem, toSystem]);

  const handleSwapSystems = () => {
    const temp = fromSystem;
    setFromSystem(toSystem);
    setToSystem(temp);
    if (conversionResult.isValid) {
      setInput(conversionResult.result.toLowerCase());
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Calculator size={32} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>
          Number System Converter
        </Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={[styles.label, { color: colors.text }]}>Enter Number</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: conversionResult.error
                ? colors.error
                : colors.border,
              color: colors.text,
            },
          ]}
          value={input}
          onChangeText={setInput}
          placeholder="Enter a number (e.g., -10, 10.5, -1A.F)..."
          placeholderTextColor={colors.textSecondary}
          testID="number-input"
        />
        {conversionResult.error && (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {conversionResult.error}
          </Text>
        )}
      </View>

      <View style={styles.systemsSection}>
        <View style={styles.systemPicker}>
          <Text style={[styles.label, { color: colors.text }]}>From</Text>
          <Picker
            options={pickerOptions}
            selectedValue={fromSystem}
            onValueChange={(value) => setFromSystem(value as NumberSystem)}
            testID="from-system-picker"
          />
        </View>

        <TouchableOpacity
          style={[styles.swapButton, { backgroundColor: colors.primary }]}
          onPress={handleSwapSystems}
          testID="swap-button"
        >
          <ArrowRight size={20} color="white" />
        </TouchableOpacity>

        <View style={styles.systemPicker}>
          <Text style={[styles.label, { color: colors.text }]}>To</Text>
          <Picker
            options={pickerOptions}
            selectedValue={toSystem}
            onValueChange={(value) => setToSystem(value as NumberSystem)}
            testID="to-system-picker"
          />
        </View>
      </View>

      {conversionResult.isValid && (
        <View style={styles.resultSection}>
          <Text style={[styles.label, { color: colors.text }]}>Result</Text>
          <View
            style={[
              styles.resultBox,
              { backgroundColor: colors.surface, borderColor: colors.success },
            ]}
          >
            <Text
              style={[styles.resultText, { color: colors.success }]}
              testID="conversion-result"
            >
              {conversionResult.result}
            </Text>
          </View>
        </View>
      )}

      {conversionResult.steps.length > 0 && (
        <View style={styles.stepsSection}>
          <Text style={[styles.label, { color: colors.text }]}>
            Step-by-Step Calculation
          </Text>
          <View
            style={[
              styles.stepsContainer,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            {conversionResult.steps.map((step, index) => (
              <View key={`step-${index}`} style={styles.step}>
                <Text style={[styles.stepTitle, { color: colors.primary }]}>
                  Step {index + 1}: {step.step}
                </Text>
                <Text style={[styles.stepCalculation, { color: colors.text }]}>
                  {step.calculation}
                </Text>
                <Text
                  style={[styles.stepResult, { color: colors.textSecondary }]}
                >
                  = {step.result}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
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
    marginBottom: 30,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    fontFamily: "monospace",
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
  systemsSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 24,
    gap: 12,
  },
  systemPicker: {
    flex: 1,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  resultSection: {
    marginBottom: 24,
  },
  resultBox: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  stepsSection: {
    marginBottom: 24,
  },
  stepsContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  step: {
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  stepCalculation: {
    fontSize: 14,
    fontFamily: "monospace",
    marginBottom: 2,
  },
  stepResult: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
