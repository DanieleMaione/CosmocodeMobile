/** @format */

import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  onPress: (tabSelected: string) => void;
  selected: string;
  options: Array<{name: string}>;
}

export const UITabs = memo(({onPress, selected, options}: Props) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scrollView}>
    {options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={stylesProps(index, selected, option).touchableOpacity}
        onPress={() => onPress(option.name)}>
        <Text style={stylesProps(index, selected, option).text}>
          {option.name}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
));

const stylesProps = (index: number, selected: string, option: {name: string}) =>
  StyleSheet.create({
    touchableOpacity: {
      paddingHorizontal: 10,
      marginLeft: index === 0 ? 16 : 4,
      marginRight: 4,
      paddingVertical: 6,
      borderRadius: 27,
      display: 'flex',
      borderBottomWidth: selected === option.name ? 1 : 0,
      borderBottomColor: selected === option.name ? '#4e57ef' : '#b5b7b8c4',
    },
    text: {
      height: 20,
      marginBottom: 10,
      fontSize: 15,
      fontWeight: '500',
      color: selected === option.name ? '#4e57ef' : '#b5b7b8c4',
    },
  });

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'rgb(15, 23, 36)',
    paddingVertical: 20,
  },
});
