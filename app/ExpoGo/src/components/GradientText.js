import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Mask, Rect, Text as SvgText, Stop } from 'react-native-svg';

const GradientText = ({ children, style, ...props }) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 200 200">
      <Defs>
        <SvgLinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#4c669f" />
          <Stop offset="100%" stopColor="#192f6a" />
        </SvgLinearGradient>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Text {...props} style={style}>
            {children}
          </Text>
        </Mask>
      </Defs>
      <Rect height="100%" width="100%" mask="url(#mask)" fill="url(#gradient)" />
    </Svg>
  );
};

export default GradientText;