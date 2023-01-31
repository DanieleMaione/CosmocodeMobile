/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Developers from './@navigation-guest/developerScreen/components/Developers';
import Screen from './@navigation-guest/homeScreen';
import {Provider} from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {store} from '../store';
import StackScreen from './@navigation-guest/stackScreen/StackScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgb(32, 38, 49)',
            },
          }}>
          <Tab.Screen
            name="Home"
            component={Screen}
            options={{
              title: 'HomePage',
              headerTintColor: 'white',
              tabBarIcon: () => (
                <IconFontAwesome name="home" size={30} color="white" />
              ),
            }}
          />
          <Tab.Screen
            name="Developers"
            component={Developers}
            options={{
              title: 'Developers',
              headerTintColor: 'white',
              tabBarIcon: () => (
                <IconFontAwesome name="users" size={25} color="white" />
              ),
            }}
          />
          <Tab.Screen
            name="StackScreen"
            component={StackScreen}
            options={{
              title: 'Stacks',
              headerTintColor: 'white',
              tabBarIcon: () => (
                <IconOcticons name="stack" size={30} color="white" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
