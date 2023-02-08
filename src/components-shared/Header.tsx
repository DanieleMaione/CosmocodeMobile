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
        paddingVertical: '5%',
        backgroundColor: 'rgb(15, 23, 36)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 17,
          color: 'white',
          textTransform: 'capitalize',
        }}
        accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
});
