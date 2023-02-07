/** @format */

import React, {memo, useState} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  colors?: Array<string>;
  style?: StyleProp<ViewStyle>;
}

export const UIDivider = memo(({colors, style}: Props) => {
  const defaultColor = colors ? colors : ['#645e5e', '#ffffff', '#645e5e'];
  const defaultStyle = style ? style : styles.linearGradient;

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={defaultStyle}
      colors={defaultColor}
    />
  );
});

const styles = StyleSheet.create({
  linearGradient: {marginHorizontal: 25, height: 1.25, opacity: 0.7},
});
