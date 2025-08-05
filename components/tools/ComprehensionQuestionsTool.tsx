import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";
import { Check, X } from "lucide-react-native";

export default function ComprehensionQuestionsTool() {
  const { comprehensionQuestions } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  
  if (!comprehensionQuestions || comprehensionQuestions.length === 0) return null;
  
  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    if (showResults) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };
  
  const handleSubmit = () => {
    setShowResults(true);
  };
  
  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };
  
  const getScore = () => {
    let correct = 0;
    comprehensionQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correct++;
      }
    });
    return `${correct}/${comprehensionQuestions.length}`;
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Comprehension Questions</Text>
      <Text style={styles.description}>
        Test your understanding of the text with these questions.
      </Text>
      
      {showResults && (
        <View style={styles.resultsContainer}>
          <Text style={styles.scoreText}>Your Score: {getScore()}</Text>
        </View>
      )}
      
      {comprehensionQuestions.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          <Text style={[styles.questionText, getDirectionStyle(question.question)]}>
            {questionIndex + 1}. {question.question}
          </Text>
          
          <View style={styles.optionsContainer}>
            {question.options.map((option, optionIndex) => {
              const isSelected = selectedAnswers[questionIndex] === option;
              const isCorrect = question.correct_answer === option;
              const showCorrect = showResults && isCorrect;
              const showIncorrect = showResults && isSelected && !isCorrect;
              
              return (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.optionButton,
                    isSelected && styles.selectedOption,
                    showCorrect && styles.correctOption,
                    showIncorrect && styles.incorrectOption,
                  ]}
                  onPress={() => handleSelectAnswer(questionIndex, option)}
                  disabled={showResults}
                >
                  <Text style={[
                    styles.optionText,
                    getDirectionStyle(option),
                    isSelected && styles.selectedOptionText,
                    showCorrect && styles.correctOptionText,
                    showIncorrect && styles.incorrectOptionText,
                  ]}>
                    {option}
                  </Text>
                  
                  {showCorrect && (
                    <View style={styles.resultIcon}>
                      <Check size={16} color="#16a34a" />
                    </View>
                  )}
                  
                  {showIncorrect && (
                    <View style={styles.resultIcon}>
                      <X size={16} color="#dc2626" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          
          {showResults && (
            <View style={styles.explanationContainer}>
              <Text style={[styles.explanationText, getDirectionStyle(question.explanation)]}>
                {question.explanation}
              </Text>
            </View>
          )}
        </View>
      ))}
      
      <View style={styles.buttonContainer}>
        {!showResults ? (
          <TouchableOpacity
            style={[
              styles.submitButton,
              Object.keys(selectedAnswers).length < comprehensionQuestions.length && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < comprehensionQuestions.length}
          >
            <Text style={styles.submitButtonText}>Submit Answers</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}
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
  resultsContainer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  questionContainer: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 12,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  optionsContainer: {
    marginBottom: 8,
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  selectedOption: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },
  correctOption: {
    borderColor: "#16a34a",
    backgroundColor: "#f0fdf4",
  },
  incorrectOption: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  optionText: {
    fontSize: 14,
    color: "#4b5563",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  selectedOptionText: {
    color: "#2563eb",
    fontWeight: "500",
  },
  correctOptionText: {
    color: "#16a34a",
    fontWeight: "500",
  },
  incorrectOptionText: {
    color: "#dc2626",
    fontWeight: "500",
  },
  resultIcon: {
    marginLeft: 8,
  },
  explanationContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  explanationText: {
    fontSize: 14,
    color: "#4b5563",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#93c5fd",
  },
  submitButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  resetButtonText: {
    color: "#4b5563",
    fontWeight: "600",
    fontSize: 16,
  },
});