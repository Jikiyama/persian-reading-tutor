import React from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";

export default function WordTool() {
  const { wordInfo, isHeritageMode, showEnglishTranslations } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  
  if (!wordInfo) return null;
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Word Lookup</Text>
      
      <View style={styles.wordHeader}>
        <Text style={[styles.word, getDirectionStyle(wordInfo.word)]}>
          {wordInfo.word}
        </Text>
        <Text style={styles.pronunciation}>{wordInfo.pronunciation}</Text>
        <Text style={styles.partOfSpeech}>{wordInfo.part_of_speech}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Definition</Text>
        <Text style={[styles.persianText, getDirectionStyle(wordInfo.definition_persian)]}>
          {wordInfo.definition_persian}
        </Text>
        {showEnglishTranslations && (
          <Text style={styles.englishText}>{wordInfo.translation_english}</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Example</Text>
        <Text style={[styles.persianText, getDirectionStyle(wordInfo.example_sentence_persian)]}>
          {wordInfo.example_sentence_persian}
        </Text>
        {showEnglishTranslations && (
          <Text style={styles.englishText}>{wordInfo.example_translation_english}</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Synonyms</Text>
        <View style={styles.tagsContainer}>
          {wordInfo.synonyms.map((synonym, index) => (
            <View key={index} style={styles.tag}>
              <Text style={[styles.tagText, getDirectionStyle(synonym)]}>
                {synonym}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Antonyms</Text>
        <View style={styles.tagsContainer}>
          {wordInfo.antonyms.map((antonym, index) => (
            <View key={index} style={styles.tag}>
              <Text style={[styles.tagText, getDirectionStyle(antonym)]}>
                {antonym}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      {isHeritageMode && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultural Note</Text>
          <Text style={[styles.persianText, getDirectionStyle(wordInfo.cultural_note)]}>
            {wordInfo.cultural_note}
          </Text>
        </View>
      )}
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
  wordHeader: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  word: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  pronunciation: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: "monospace",
    marginBottom: 4,
  },
  partOfSpeech: {
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
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
    marginBottom: 4,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  englishText: {
    fontSize: 14,
    color: "#4b5563",
    fontStyle: "italic",
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
});