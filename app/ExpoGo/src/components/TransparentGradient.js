import React from "react";
import { LinearGradient } from "expo-linear-gradient";


  export default function TranparentGradientBackground({ children }) {
    return (
    <LinearGradient
        colors={['#A9C6FCc1', '#F67235b1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  )}