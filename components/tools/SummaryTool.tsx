import React from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";

export default function SummaryTool() {
  const { summary, showEnglishTranslations } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  
  if (!summary) return null;
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Text Summary</Text>
      <Text style={styles.description}>
        A concise summary of the main points in the text.
      </Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Full Summary</Text>
        <Text style={[styles.summaryText, getDirectionStyle(summary.full_summary)]}>
          {summary.full_summary}
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Points</Text>
        {summary.key_points.map((point, index) => (
          <View key={index} style={styles.pointItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={[styles.pointText, getDirectionStyle(point)]}>
              {point}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>
          Summary Length: <Text style={styles.metaValue}>{summary.length}</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#1f2937",
    lineHeight: 20,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  pointItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#4b5563",
    marginRight: 8,
  },
  pointText: {
    flex: 1,
    fontSize: 14,
    color: "#1f2937",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  metaContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  metaText: {
    fontSize: 14,
    color: "#6b7280",
  },
  metaValue: {
    fontWeight: "500",
    color: "#4b5563",
  },
});