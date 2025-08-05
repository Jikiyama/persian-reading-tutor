import React from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";

export default function SentenceTool() {
  const { sentenceInfo, showEnglishTranslations } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  
  if (!sentenceInfo) return null;
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sentence Paraphrase</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Original Sentence</Text>
        <Text style={[styles.persianText, getDirectionStyle(sentenceInfo.original_sentence)]}>
          {sentenceInfo.original_sentence}
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Simplified Persian</Text>
        <Text style={[styles.persianText, getDirectionStyle(sentenceInfo.paraphrase_persian)]}>
          {sentenceInfo.paraphrase_persian}
        </Text>
      </View>
      
      {showEnglishTranslations && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>English Translation</Text>
          <Text style={styles.englishText}>{sentenceInfo.paraphrase_english}</Text>
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explanation</Text>
        <Text style={[styles.explanationText, getDirectionStyle(sentenceInfo.explanation)]}>
          {sentenceInfo.explanation}
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
  persianText: {
    fontSize: 16,
    color: "#1f2937",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  englishText: {
    fontSize: 14,
    color: "#4b5563",
  },
  explanationText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
});