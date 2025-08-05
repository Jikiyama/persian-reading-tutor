import { StyleSheet, Text, View, Switch, ScrollView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useReaderContext } from "@/hooks/reader-context";
import { Card } from "@/components/ui/Card";

export default function SettingsScreen() {
  const { 
    isHeritageMode, 
    toggleHeritageMode,
    showEnglishTranslations,
    toggleEnglishTranslations
  } = useReaderContext();

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Settings" }} />
      
      <Card style={styles.card}>
        <Text style={styles.title}>Learner Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Heritage Learner Mode</Text>
            <Text style={styles.settingDescription}>
              More nuanced explanations with cultural context. Turn off for simpler second-language learner mode.
            </Text>
          </View>
          <Switch
            value={isHeritageMode}
            onValueChange={toggleHeritageMode}
            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
            thumbColor={isHeritageMode ? "#3b82f6" : "#f4f3f4"}
            testID="heritage-mode-switch"
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Show English Translations</Text>
            <Text style={styles.settingDescription}>
              Display English translations alongside Persian text.
            </Text>
          </View>
          <Switch
            value={showEnglishTranslations}
            onValueChange={toggleEnglishTranslations}
            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
            thumbColor={showEnglishTranslations ? "#3b82f6" : "#f4f3f4"}
            testID="english-translations-switch"
          />
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.aboutText}>
          Persian Reading Tutor is an AI-powered application designed to help intermediate to advanced Persian language learners improve their reading comprehension skills.
        </Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1f2937",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  aboutText: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 12,
    lineHeight: 20,
  },
  versionText: {
    fontSize: 12,
    color: "#9ca3af",
  },
});