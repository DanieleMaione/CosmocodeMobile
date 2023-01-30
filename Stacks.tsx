import * as React from 'react';
import {View, Text} from 'react-native';
import {Header} from './Header';

export default function Stacks() {
  return (
    <>
      <Header title="Developers" firstPage={true} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Stacks</Text>
      </View>
    </>
  );
}
