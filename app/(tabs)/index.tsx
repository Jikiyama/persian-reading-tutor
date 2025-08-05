import { useReaderContext } from "@/hooks/reader-context";
import { StyleSheet, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import ReaderPanel from "@/components/reader/ReaderPanel";
import ToolsSidebar from "@/components/tools/ToolsSidebar";
import TextInputPanel from "@/components/reader/TextInputPanel";

export default function ReaderScreen() {
  const { text } = useReaderContext();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Persian Reading Tutor" }} />
      
      {!text ? (
        <TextInputPanel />
      ) : (
        <View style={styles.readerContainer}>
          <ReaderPanel />
          <ToolsSidebar />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  readerContainer: {
    flex: 1,
    flexDirection: "row",
  },
});