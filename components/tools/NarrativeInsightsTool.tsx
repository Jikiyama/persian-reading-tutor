import React from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";

export default function NarrativeInsightsTool() {
  const { narrativeInsights } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  
  if (!narrativeInsights) return null;
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Narrative Insights</Text>
      <Text style={styles.description}>
        Analysis of the text's narrative structure, themes, and literary elements.
      </Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Narrative Structure</Text>
        
        <View style={styles.structureItem}>
          <Text style={styles.structureLabel}>Beginning:</Text>
          <Text style={[styles.structureText, getDirectionStyle(narrativeInsights.narrative_structure.beginning)]}>
            {narrativeInsights.narrative_structure.beginning}
          </Text>
        </View>
        
        <View style={styles.structureItem}>
          <Text style={styles.structureLabel}>Middle:</Text>
          <Text style={[styles.structureText, getDirectionStyle(narrativeInsights.narrative_structure.middle)]}>
            {narrativeInsights.narrative_structure.middle}
          </Text>
        </View>
        
        <View style={styles.structureItem}>
          <Text style={styles.structureLabel}>End:</Text>
          <Text style={[styles.structureText, getDirectionStyle(narrativeInsights.narrative_structure.end)]}>
            {narrativeInsights.narrative_structure.end}
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Themes</Text>
        <View style={styles.tagsContainer}>
          {narrativeInsights.themes.map((theme, index) => (
            <View key={index} style={styles.tag}>
              <Text style={[styles.tagText, getDirectionStyle(theme)]}>
                {theme}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tone</Text>
        <Text style={[styles.toneText, getDirectionStyle(narrativeInsights.tone)]}>
          {narrativeInsights.tone}
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Insights</Text>
        {narrativeInsights.key_insights.map((insight, index) => (
          <View key={index} style={styles.insightItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={[styles.insightText, getDirectionStyle(insight)]}>
              {insight}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Symbolism</Text>
        <Text style={[styles.symbolismText, getDirectionStyle(narrativeInsights.symbolism)]}>
          {narrativeInsights.symbolism}
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
  structureItem: {
    marginBottom: 8,
  },
  structureLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4b5563",
    marginBottom: 2,
  },
  structureText: {
    fontSize: 14,
    color: "#1f2937",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 2,
  },
  tagText: {
    fontSize: 14,
    color: "#4b5563",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  toneText: {
    fontSize: 14,
    color: "#1f2937",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  insightItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#4b5563",
    marginRight: 8,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: "#1f2937",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  symbolismText: {
    fontSize: 14,
    color: "#1f2937",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
});