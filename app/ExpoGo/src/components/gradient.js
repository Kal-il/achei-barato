import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackground({ children }) {
    return (
    <LinearGradient
        colors={['#A9C6FC', '#F67235']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  )}