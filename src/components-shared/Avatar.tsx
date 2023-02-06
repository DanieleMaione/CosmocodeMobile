/* eslint-disable react-native/no-inline-styles */
/** @format */

import {memo} from 'react';
import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';

interface Props {
  alt: string;
  srcImage: string;
  onPress?: () => void;
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
  isCapitalize?: boolean;
  isBordered?: boolean;
}

export const UIAvatar = memo(
  ({
    onPress,
    srcImage,
    alt,
    title,
    subtitle,
    width,
    height,
    isCapitalize,
    isBordered,
  }: Props) => (
    <TouchableOpacity style={styles.outer} onPress={onPress}>
      {srcImage.includes('.svg') ? (
        <SvgUri
          width={width ? width : 70}
          height={height ? height : 70}
          uri={srcImage}
        />
      ) : (
        <Image
          alt={alt}
          style={{
            width: width ? width : 70,
            height: height ? height : 70,
            borderRadius: 100,
            borderWidth: isBordered ? 2 : 0,
            borderColor: isBordered ? '#4e57ef' : 'transparent',
          }}
          source={{
            uri: srcImage,
          }}
        />
      )}
      {(title || subtitle) && (
        <View style={styles.container}>
          {title && (
            <Text
              style={{
                textTransform: isCapitalize ? 'capitalize' : 'none',
                color: 'white',
                fontSize: 15,
                fontWeight: '700',
              }}>
              {title}
            </Text>
          )}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
    </TouchableOpacity>
  ),
);

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 15,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
  },
  subtitle: {
    color: '#b5b7b8d3',
    fontSize: 15,
    paddingTop: 5,
    overflow: 'hidden',
  },
});
