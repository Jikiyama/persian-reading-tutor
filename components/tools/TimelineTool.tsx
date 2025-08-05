import React from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { useReaderContext } from "@/hooks/reader-context";
import { useI18n } from "@/hooks/i18n-context";
import { Clock, ChevronRight } from "lucide-react-native";

export default function TimelineTool() {
  const { timelineEvents } = useReaderContext();
  const { getDirectionStyle } = useI18n();
  
  if (!timelineEvents || timelineEvents.length === 0) return null;
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Timeline Analysis</Text>
      <Text style={styles.description}>
        Key events extracted from the text in chronological order.
      </Text>
      
      <View style={styles.timeline}>
        {timelineEvents.map((event, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={[
              styles.timelineDot,
              event.importance === "high" && styles.timelineDotHigh,
              event.importance === "medium" && styles.timelineDotMedium,
              event.importance === "low" && styles.timelineDotLow,
            ]}>
              <Clock size={12} color="#ffffff" />
            </View>
            
            {index < timelineEvents.length - 1 && (
              <View style={styles.timelineLine} />
            )}
            
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>{event.date}</Text>
              <View style={styles.timelineCard}>
                <Text style={[styles.timelineEvent, getDirectionStyle(event.event)]}>
                  {event.event}
                </Text>
                <Text style={[styles.timelineDescription, getDirectionStyle(event.description)]}>
                  {event.description}
                </Text>
                
                {event.entities.length > 0 && (
                  <View style={styles.entitiesContainer}>
                    <Text style={styles.entitiesTitle}>Entities:</Text>
                    <View style={styles.entitiesList}>
                      {event.entities.map((entity, entityIndex) => (
                        <View key={entityIndex} style={styles.entityTag}>
                          <Text style={[styles.entityText, getDirectionStyle(entity)]}>
                            {entity}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
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
    marginBottom: 24,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    position: "relative",
    paddingLeft: 24,
    marginBottom: 16,
  },
  timelineDot: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#9ca3af",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  timelineDotHigh: {
    backgroundColor: "#ef4444",
  },
  timelineDotMedium: {
    backgroundColor: "#f59e0b",
  },
  timelineDotLow: {
    backgroundColor: "#3b82f6",
  },
  timelineLine: {
    position: "absolute",
    left: 12,
    top: 24,
    bottom: -16,
    width: 2,
    backgroundColor: "#e5e7eb",
    zIndex: 1,
  },
  timelineContent: {
    paddingLeft: 12,
  },
  timelineDate: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  timelineCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  timelineEvent: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  timelineDescription: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 8,
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
  entitiesContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  entitiesTitle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  entitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  entityTag: {
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    margin: 2,
  },
  entityText: {
    fontSize: 12,
    color: "#4b5563",
    fontFamily: Platform.OS === "web" ? "Noto Sans Arabic, sans-serif" : undefined,
  },
});