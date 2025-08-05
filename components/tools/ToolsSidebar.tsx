import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { 
  BookOpen, 
  MessageSquare, 
  Clock, 
  BookMarked, 
  HelpCircle, 
  FileText,
  ChevronLeft,
  Loader
} from "lucide-react-native";
import WordTool from "@/components/tools/WordTool";
import SentenceTool from "@/components/tools/SentenceTool";
import TimelineTool from "@/components/tools/TimelineTool";
import NarrativeInsightsTool from "@/components/tools/NarrativeInsightsTool";
import ComprehensionQuestionsTool from "@/components/tools/ComprehensionQuestionsTool";
import SummaryTool from "@/components/tools/SummaryTool";

export default function ToolsSidebar() {
  const { 
    activeTool, 
    setActiveTool,
    handleTimelineAnalysis,
    handleNarrativeInsights,
    handleComprehensionQuestions,
    handleSummary,
    isLoading,
    clearText
  } = useReaderContext();
  
  const renderToolContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Loader size={24} color="#3b82f6" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }
    
    switch (activeTool) {
      case "wordLookup":
        return <WordTool />;
      case "sentenceParaphrase":
        return <SentenceTool />;
      case "timeline":
        return <TimelineTool />;
      case "narrativeInsights":
        return <NarrativeInsightsTool />;
      case "comprehensionQuestions":
        return <ComprehensionQuestionsTool />;
      case "summary":
        return <SummaryTool />;
      default:
        return (
          <View style={styles.toolsListContainer}>
            <Text style={styles.toolsTitle}>Reading Tools</Text>
            <Text style={styles.toolsDescription}>
              Click on any word to see its definition or long-press a sentence for paraphrasing.
              Use the tools below for deeper analysis.
            </Text>
            
            <View style={styles.toolsList}>
              <TouchableOpacity 
                style={styles.toolButton}
                onPress={() => handleTimelineAnalysis()}
                testID="timeline-tool-button"
              >
                <Clock size={20} color="#3b82f6" />
                <Text style={styles.toolButtonText}>Timeline Analysis</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.toolButton}
                onPress={() => handleNarrativeInsights()}
                testID="narrative-insights-tool-button"
              >
                <BookMarked size={20} color="#3b82f6" />
                <Text style={styles.toolButtonText}>Narrative Insights</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.toolButton}
                onPress={() => handleComprehensionQuestions()}
                testID="comprehension-questions-tool-button"
              >
                <HelpCircle size={20} color="#3b82f6" />
                <Text style={styles.toolButtonText}>Comprehension Questions</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.toolButton}
                onPress={() => handleSummary()}
                testID="summary-tool-button"
              >
                <FileText size={20} color="#3b82f6" />
                <Text style={styles.toolButtonText}>Text Summary</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={clearText}
              testID="back-button"
            >
              <ChevronLeft size={16} color="#6b7280" />
              <Text style={styles.backButtonText}>Back to Text Input</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };
  
  const handleBackToTools = () => {
    setActiveTool("none");
  };
  
  return (
    <View style={styles.container}>
      {activeTool !== "none" && !isLoading && (
        <TouchableOpacity 
          style={styles.backToToolsButton}
          onPress={handleBackToTools}
          testID="back-to-tools-button"
        >
          <ChevronLeft size={16} color="#6b7280" />
          <Text style={styles.backToToolsText}>Back to Tools</Text>
        </TouchableOpacity>
      )}
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {renderToolContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    backgroundColor: "#f8f9fa",
    borderLeftWidth: 1,
    borderLeftColor: "#e5e7eb",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  toolsListContainer: {
    flex: 1,
  },
  toolsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  toolsDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
    lineHeight: 20,
  },
  toolsList: {
    marginBottom: 16,
  },
  toolButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  toolButtonText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "500",
    color: "#4b5563",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  backButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#6b7280",
  },
  backToToolsButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backToToolsText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#6b7280",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6b7280",
  },
});