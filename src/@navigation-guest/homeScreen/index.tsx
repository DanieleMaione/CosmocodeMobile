import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './components/Login';
import {HomeScreen} from './components/HomeScreen';
import {GistDetail} from './components/GistDetail';
import {DeveloperDetail} from '../developerScreen/components/DeveloperDetail';

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
          backgroundColor: 'rgb(15, 23, 36)',
        },
      })}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'HomePage', headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
      <Stack.Screen
        name="GistDetail"
        component={GistDetail}
        options={{title: 'Gist'}}
      />
      <Stack.Screen
        name="DeveloperDetail"
        component={DeveloperDetail}
        options={{title: 'DeveloperDetail'}}
      />
    </Stack.Navigator>
  );
}
