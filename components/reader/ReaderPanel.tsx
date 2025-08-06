import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";
import WordPopover from "@/components/reader/WordPopover";
import SentencePopover from "@/components/reader/SentencePopover";

export default function ReaderPanel() {
  const { 
    text, 
    handleWordLookup, 
    handleSentenceParaphrase,
    selectedWord,
    selectedSentence
  } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  
  const [selectedWordPosition, setSelectedWordPosition] = useState({ x: 0, y: 0 });
  const [selectedSentencePosition, setSelectedSentencePosition] = useState({ x: 0, y: 0 });
  
  // Split text into sentences
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  const handleWordPress = (word: string, event: any) => {
    console.log("Word pressed:", word);
    // Get the position of the pressed word for the popover
    const { pageX, pageY } = event.nativeEvent;
    console.log("Word position:", { x: pageX, y: pageY });
    setSelectedWordPosition({ x: pageX, y: pageY });
    handleWordLookup(word);
  };
  
  const handleSentencePress = (sentence: string, event: any) => {
    console.log("Sentence pressed:", sentence);
    // Get the position of the pressed sentence for the popover
    const { pageX, pageY } = event.nativeEvent;
    console.log("Sentence position:", { x: pageX, y: pageY });
    setSelectedSentencePosition({ x: pageX, y: pageY });
    handleSentenceParaphrase(sentence);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {sentences.map((sentence, index) => {
          // Split sentence into words
          const words = sentence.split(/\s+/);
          
          return (
            <View key={index} style={styles.sentenceContainer}>
              <TouchableOpacity 
                onLongPress={(e) => handleSentencePress(sentence, e)}
                delayLongPress={500}
                activeOpacity={0.7}
                style={[
                  styles.sentence,
                  selectedSentence === sentence && styles.selectedSentence
                ]}
              >
                <View style={styles.wordsContainer}>
                  {words.map((word, wordIndex) => (
                    <TouchableOpacity
                      key={`${index}-${wordIndex}`}
                      onPress={(e) => handleWordPress(word, e)}
                      style={[
                        styles.wordContainer,
                        selectedWord === word && styles.selectedWord
                      ]}
                    >
                      <Text 
                        style={[
                          styles.word, 
                          getDirectionStyle(word),
                          selectedWord === word && styles.selectedWordText
                        ]}
                      >
                        {word}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      
      {selectedWord && (
        <WordPopover position={selectedWordPosition} />
      )}
      
      {selectedSentence && (
        <SentencePopover position={selectedSentencePosition} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  sentenceContainer: {
    marginBottom: 16,
  },
  sentence: {
    padding: 8,
    borderRadius: 8,
  },
  selectedSentence: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  wordContainer: {
    marginHorizontal: 2,
    marginVertical: 2,
    padding: 2,
    borderRadius: 4,
  },
  word: {
    fontSize: 18,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
    color: "#1f2937",
  },
  selectedWord: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
  },
  selectedWordText: {
    color: "#2563eb",
  },
});