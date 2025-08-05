import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";
import { X } from "lucide-react-native";

type SentencePopoverProps = {
  position: { x: number; y: number };
};

export default function SentencePopover({ position }: SentencePopoverProps) {
  const { sentenceInfo, setActiveTool, showEnglishTranslations } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  
  if (!sentenceInfo) return null;
  
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
        <Text style={styles.title}>Sentence Paraphrase</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Original</Text>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
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
  },
  explanationText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
});