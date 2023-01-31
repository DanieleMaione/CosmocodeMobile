import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DeveloperDetail} from './components/DeveloperDetail';
import Developers from './components/Developers';

const Stack = createNativeStackNavigator();
export const DeveloperScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Developers"
      screenOptions={() => ({
        gestureEnabled: true,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {color: 'white'},
        headerStyle: {
          backgroundColor: 'rgb(32, 38, 49)',
        },
      })}>
      <Stack.Screen name="Developers" component={Developers} />
      <Stack.Screen name="DeveloperDetail" component={DeveloperDetail} />
    </Stack.Navigator>
  );
};
