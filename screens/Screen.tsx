import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './Login';
import {HomeScreen} from '../HomeScreen';

const Stack = createNativeStackNavigator();
export default function Screen() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={() => ({
        gestureEnabled: true,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {color: 'white'},
        headerStyle: {
          backgroundColor: 'rgb(32, 38, 49)',
        },
      })}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'HomePage', headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
    </Stack.Navigator>
  );
}
