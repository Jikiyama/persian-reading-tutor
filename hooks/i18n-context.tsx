import createContextHook from "@nkzw/create-context-hook";
import { useState } from "react";
import { I18nManager } from "react-native";

// Enable RTL layout for the app
I18nManager.allowRTL(true);
I18nManager.forceRTL(false); // We'll handle RTL manually for specific components

type Direction = "ltr" | "rtl";

export const [I18nProvider, useI18n] = createContextHook(() => {
  const [direction, setDirection] = useState<Direction>("ltr");
  
  const getTextDirection = (text: string): Direction => {
    // Simple detection of RTL script - checks if the text contains Persian/Arabic characters
    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return rtlRegex.test(text) ? "rtl" : "ltr";
  };
  
  const getDirectionStyle = (text: string) => {
    const dir = getTextDirection(text);
    return {
      textAlign: dir === "rtl" ? "right" as const : "left" as const,
      writingDirection: dir as "rtl" | "ltr",
    };
  };
  
  return {
    direction,
    setDirection,
    getTextDirection,
    getDirectionStyle,
  };
});