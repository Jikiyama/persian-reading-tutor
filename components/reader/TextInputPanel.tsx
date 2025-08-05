import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Alert } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";
import { Card } from "@/components/ui/Card";
import { Upload, FileText } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";

export default function TextInputPanel() {
  const { setText } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  const [inputText, setInputText] = useState<string>("");
  
  const handleTextSubmit = () => {
    if (inputText.trim()) {
      setText(inputText);
    } else {
      Alert.alert("Error", "Please enter some text or upload a file.");
    }
  };
  
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["text/plain", "application/pdf"],
        copyToCacheDirectory: true,
      });
      
      if (result.canceled) {
        return;
      }
      
      // In a real app, we would process the file here
      // For this demo, we'll just use sample text
      const samplePersianText = "جان پرواز کرد و رفت. جان در جامائیکا فرود آمد. جان عشق زندگی‌اش را ملاقات کرد. این یک نمونه خوب است. داستان بر سفر و ملاقات عشقی تمرکز دارد.";
      setInputText(samplePersianText);
      
      // In a real implementation, we would read the file:
      /*
      if (result.assets && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;
        // For text files, we could read directly
        // For PDFs, we would need a PDF parser library
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        setInputText(fileContent);
      }
      */
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to upload file. Please try again.");
    }
  };
  
  const handleSampleText = () => {
    const samplePersianText = "جان پرواز کرد و رفت. جان در جامائیکا فرود آمد. جان عشق زندگی‌اش را ملاقات کرد. این یک نمونه خوب است. داستان بر سفر و ملاقات عشقی تمرکز دارد.";
    setInputText(samplePersianText);
  };
  
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Persian Reading Tutor</Text>
        <Text style={styles.subtitle}>Enter Persian text or upload a file to begin</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.textInput,
              getDirectionStyle(inputText),
              inputText ? { textAlign: "right" } : {}
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter Persian text here..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            testID="persian-text-input"
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={handleFileUpload}
            testID="upload-file-button"
          >
            <Upload size={18} color="#ffffff" />
            <Text style={styles.buttonText}>Upload File</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sampleButton}
            onPress={handleSampleText}
            testID="sample-text-button"
          >
            <FileText size={18} color="#3b82f6" />
            <Text style={styles.sampleButtonText}>Use Sample Text</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.submitButton,
            !inputText.trim() && styles.submitButtonDisabled
          ]}
          onPress={handleTextSubmit}
          disabled={!inputText.trim()}
          testID="submit-text-button"
        >
          <Text style={styles.submitButtonText}>Start Reading</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 600,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1f2937",
    backgroundColor: "#f9fafb",
    minHeight: 160,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "500",
    marginLeft: 8,
  },
  sampleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sampleButtonText: {
    color: "#3b82f6",
    fontWeight: "500",
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 14,
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
});