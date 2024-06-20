import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackground({ children }) {
    return (
    <LinearGradient
        colors={["#FF0F7B", "#F89B29"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  )}