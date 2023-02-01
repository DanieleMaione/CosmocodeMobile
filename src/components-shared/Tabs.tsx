/** @format */

import React, {FC, memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  onPress: (tabSelected: string) => void;
  selected?: string;
  options: Array<{name: string}>;
}

export const UITabs = memo(({onPress, selected, options}: Props) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={{
      backgroundColor: 'rgb(15, 23, 36)',
      paddingVertical: 20,
    }}>
    {options.map((option, index) => (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          marginLeft: index === 0 ? 16 : 4,
          marginRight: 4,
          paddingVertical: 6,
          borderRadius: 27,
          display: 'flex',
          borderBottomWidth: selected === option.name ? 1 : 0,
          borderBottomColor:
            selected === option.name ? 'rgb(17, 236, 229)' : '#b5b7b8c4',
        }}
        onPress={() => onPress(option.name)}>
        <Text
          style={{
            height: 20,
            marginBottom: 10,
            fontSize: 15,
            fontWeight: '500',
            color: selected === option.name ? 'rgb(17, 236, 229)' : '#b5b7b8c4',
          }}>
          {option.name}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
));
