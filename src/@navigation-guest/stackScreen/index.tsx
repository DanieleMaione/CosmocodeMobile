import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StackDetail} from './components/StackDetail';
import {Stacks} from './components/Stacks';

const Stack = createNativeStackNavigator();

export default function StackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Stacks"
      screenOptions={() => ({
        gestureEnabled: true,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {color: 'white'},
        headerStyle: {
          backgroundColor: 'rgb(15, 23, 36)',
        },
      })}>
      <Stack.Screen
        name="Stacks"
        component={Stacks}
        options={{title: 'Stacks', headerShown: false}}
      />
      <Stack.Screen
        name="StackDetail"
        component={StackDetail}
        options={{title: 'StackDetail'}}
      />
    </Stack.Navigator>
  );
}
