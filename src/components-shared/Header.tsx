/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo} from 'react';
import {View, Text} from 'react-native';

export interface Props {
  title?: string;
  firstPage?: boolean;
}

export const Header: FC<Props> = memo(({title}) => {
  return (
    <View
      style={{
        height: '12%',
        backgroundColor: '#1b212c',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 17,
          color: 'white',
          paddingBottom: 5,
          marginBottom: 8,
          textTransform: 'capitalize',
        }}
        accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
});
