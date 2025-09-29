import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { BookOpen, Lightbulb, ChevronRight } from "lucide-react-native";
import { useTheme } from "@/context/theme-context";
import { learningContent } from "@/data/learning-content";

interface AccordionSectionProps {
  section: (typeof learningContent)[0];
  index: number;
}

function AccordionSection({ section, index }: AccordionSectionProps) {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2000], // Large enough to accommodate content
  });

  const iconRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View
      style={[
        styles.accordionCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <Text style={[styles.accordionTitle, { color: colors.text }]}>
          {section.title}
        </Text>
        <Animated.View
          style={[
            styles.iconContainer,
            { transform: [{ rotate: iconRotation }] },
          ]}
        >
          <ChevronRight size={20} color={colors.textSecondary} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.accordionContent, { maxHeight }]}>
        <View style={styles.contentInner}>
          <Text
            style={[styles.sectionDescription, { color: colors.textSecondary }]}
          >
            {section.content}
          </Text>

          {section.methods.map((method, methodIndex) => (
            <View
              key={`method-${method.title}-${methodIndex}`}
              style={[
                styles.methodCard,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.methodTitle, { color: colors.primary }]}>
                {method.title}
              </Text>
              <Text style={[styles.methodDescription, { color: colors.text }]}>
                {method.description}
              </Text>

              <View
                style={[styles.exampleBox, { backgroundColor: colors.surface }]}
              >
                <Text
                  style={[styles.exampleLabel, { color: colors.textSecondary }]}
                >
                  Example:
                </Text>
                <Text style={[styles.exampleText, { color: colors.text }]}>
                  {method.example}
                </Text>
              </View>

              <View style={styles.hintContainer}>
                <Lightbulb size={16} color={colors.warning} />
                <Text
                  style={[styles.hintText, { color: colors.textSecondary }]}
                >
                  {method.hint}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

export default function LearnScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <BookOpen size={32} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>
          Learn Number Systems
        </Text>
      </View>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Tap any section below to expand and learn step-by-step conversion
        methods
      </Text>

      {learningContent.map((section, index) => (
        <AccordionSection
          key={`section-${section.title}-${index}`}
          section={section}
          index={index}
        />
      ))}

      <View style={styles.bottomPadding} />
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
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: "center",
    fontStyle: "italic",
  },
  accordionCard: {
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  accordionContent: {
    overflow: "hidden",
  },
  contentInner: {
    padding: 20,
    paddingTop: 0,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  methodCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  methodDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  exampleBox: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  exampleLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 13,
    fontFamily: "monospace",
    lineHeight: 18,
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 4,
  },
  hintText: {
    fontSize: 14,
    fontStyle: "italic",
    flex: 1,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
  iconContainer: {
    // Container for animated icon
  },
});
