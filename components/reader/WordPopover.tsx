import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";
import { X } from "lucide-react-native";

type WordPopoverProps = {
  position: { x: number; y: number };
};

export default function WordPopover({ position }: WordPopoverProps) {
  const { wordInfo, setActiveTool, showEnglishTranslations } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  
  if (!wordInfo) return null;
  
  const handleClose = () => {
    setActiveTool("none");
  };
  
  return (
    <View 
      style={[
        styles.container,
        { 
          top: position.y + 30,
          left: position.x - 150,
        }
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.word, getDirectionStyle(wordInfo.word)]}>
          {wordInfo.word}
        </Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Definition</Text>
          <Text style={[styles.persianText, getDirectionStyle(wordInfo.definition)]}>
            {wordInfo.definition}
          </Text>
          {showEnglishTranslations && (
            <Text style={styles.englishText}>{wordInfo.translation}</Text>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pronunciation</Text>
          <Text style={styles.pronunciationText}>{wordInfo.pronunciation}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Part of Speech</Text>
          <Text style={styles.partOfSpeechText}>{wordInfo.partOfSpeech}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Example</Text>
          <Text style={[styles.persianText, getDirectionStyle(wordInfo.example)]}>
            {wordInfo.example}
          </Text>
          {showEnglishTranslations && (
            <Text style={styles.englishText}>{wordInfo.exampleTranslation}</Text>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 300,
    maxHeight: 400,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    zIndex: 1000,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  word: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 12,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 4,
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
  pronunciationText: {
    fontSize: 14,
    color: "#4b5563",
    fontFamily: "monospace",
  },
  partOfSpeechText: {
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