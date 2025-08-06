import createContextHook from "@nkzw/create-context-hook";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Platform } from "react-native";
import * as mockData from "@/data";

export type WordInfo = {
  word: string;
  definition: string;
  translation: string;
  pronunciation: string;
  partOfSpeech: string;
  example: string;
  exampleTranslation: string;
  synonyms: string[];
  antonyms: string[];
};

export type SentenceInfo = {
  original_sentence: string;
  paraphrase_persian: string;
  paraphrase_english: string;
  explanation: string;
};

export type TimelineEvent = {
  event: string;
  description: string;
  date: string;
  entities: string[];
  importance: "low" | "medium" | "high";
};

export type NarrativeInsights = {
  narrative_structure: {
    beginning: string;
    middle: string;
    end: string;
  };
  themes: string[];
  tone: string;
  key_insights: string[];
  symbolism: string;
};

export type ComprehensionQuestion = {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
};

export type Summary = {
  full_summary: string;
  key_points: string[];
  length: "short" | "medium" | "long";
};

export type ActiveTool = 
  | "none" 
  | "wordLookup" 
  | "sentenceParaphrase" 
  | "timeline" 
  | "narrativeInsights" 
  | "comprehensionQuestions"
  | "summary";

export const [ReaderProvider, useReaderContext] = createContextHook(() => {
  // Text state
  const [text, setText] = useState<string>("");
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [selectedSentence, setSelectedSentence] = useState<string>("");
  
  // UI state
  const [activeTool, setActiveTool] = useState<ActiveTool>("none");
  const [isHeritageMode, setIsHeritageMode] = useState<boolean>(false);
  const [showEnglishTranslations, setShowEnglishTranslations] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Data state
  const [wordInfo, setWordInfo] = useState<WordInfo | null>(null);
  const [sentenceInfo, setSentenceInfo] = useState<SentenceInfo | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [narrativeInsights, setNarrativeInsights] = useState<NarrativeInsights | null>(null);
  const [comprehensionQuestions, setComprehensionQuestions] = useState<ComprehensionQuestion[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  
  // Load settings from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const heritageMode = await AsyncStorage.getItem("isHeritageMode");
        const englishTranslations = await AsyncStorage.getItem("showEnglishTranslations");
        
        if (heritageMode !== null) {
          setIsHeritageMode(heritageMode === "true");
        }
        
        if (englishTranslations !== null) {
          setShowEnglishTranslations(englishTranslations === "true");
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    
    loadSettings();
  }, []);
  
  // Save settings to AsyncStorage
  const saveSettings = async (key: string, value: boolean) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };
  
  const toggleHeritageMode = () => {
    const newValue = !isHeritageMode;
    setIsHeritageMode(newValue);
    saveSettings("isHeritageMode", newValue);
  };
  
  const toggleEnglishTranslations = () => {
    const newValue = !showEnglishTranslations;
    setShowEnglishTranslations(newValue);
    saveSettings("showEnglishTranslations", newValue);
  };
  
  // Tool handlers
  const handleWordLookup = (word: string) => {
    console.log("handleWordLookup invoked for word:", word);
    setIsLoading(true);
    setSelectedWord(word);
    setActiveTool("wordLookup");

    const apiBase = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";
    const payload = { word, context: text, heritage_mode: isHeritageMode };

    console.log("Sending lookup request to", `${apiBase}/api/lookup`, "with payload:", payload);

    fetch(`${apiBase}/api/lookup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        console.log("Received response from backend with status:", res.status);
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: WordInfo) => {
        console.log("Word lookup data received:", data);
        setWordInfo(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Word lookup failed:", err);
        setIsLoading(false);
        Alert.alert("Error", "Failed to lookup word");
      });
  };
  
  const handleSentenceParaphrase = (sentence: string) => {
    setIsLoading(true);
    setSelectedSentence(sentence);
    setActiveTool("sentenceParaphrase");
    
    // Simulate API call with mock data
    setTimeout(() => {
      setSentenceInfo(mockData.sentenceParaphraseExample);
      setIsLoading(false);
    }, 500);
  };
  
  const handleTimelineAnalysis = () => {
    setIsLoading(true);
    setActiveTool("timeline");
    
    // Simulate API call with mock data
    setTimeout(() => {
      setTimelineEvents(mockData.timelineExample);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleNarrativeInsights = () => {
    setIsLoading(true);
    setActiveTool("narrativeInsights");
    
    // Simulate API call with mock data
    setTimeout(() => {
      setNarrativeInsights(mockData.narrativeInsightsExample);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleComprehensionQuestions = () => {
    setIsLoading(true);
    setActiveTool("comprehensionQuestions");
    
    // Simulate API call with mock data
    setTimeout(() => {
      setComprehensionQuestions(mockData.comprehensionQuestionsExample);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSummary = () => {
    setIsLoading(true);
    setActiveTool("summary");
    
    // Simulate API call with mock data
    setTimeout(() => {
      setSummary(mockData.summaryExample);
      setIsLoading(false);
    }, 1000);
  };
  
  const clearText = () => {
    setText("");
    setSelectedWord("");
    setSelectedSentence("");
    setActiveTool("none");
    setWordInfo(null);
    setSentenceInfo(null);
    setTimelineEvents([]);
    setNarrativeInsights(null);
    setComprehensionQuestions([]);
    setSummary(null);
  };
  
  return {
    // State
    text,
    setText,
    selectedWord,
    selectedSentence,
    activeTool,
    isHeritageMode,
    showEnglishTranslations,
    isLoading,
    wordInfo,
    sentenceInfo,
    timelineEvents,
    narrativeInsights,
    comprehensionQuestions,
    summary,
    
    // Actions
    setActiveTool,
    toggleHeritageMode,
    toggleEnglishTranslations,
    handleWordLookup,
    handleSentenceParaphrase,
    handleTimelineAnalysis,
    handleNarrativeInsights,
    handleComprehensionQuestions,
    handleSummary,
    clearText,
  };
});