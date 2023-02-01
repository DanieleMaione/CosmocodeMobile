/** @format */

import {memo} from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  onPress?: () => void;
  srcImage: string;
  title?: string;
  subtitle?: string;
  alt: string;
}

export const UIAvatar = memo(
  ({onPress, srcImage, alt, title, subtitle}: Props) => (
    <TouchableOpacity style={styles.outer} onPress={onPress}>
      <Image style={styles.image} source={{uri: srcImage}} alt={alt} />
      {(title || subtitle) && (
        <View style={styles.container}>
          {title && <Text style={styles.title}>{title}</Text>}
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
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    paddingTop: 5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});
