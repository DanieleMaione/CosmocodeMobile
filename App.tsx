/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Stacks from './src/@navigation-guest/stackScreen/components/Stacks';
import Developers from './src/@navigation-guest/developerScreen/components/Developers';
import Screen from './src/@navigation-guest/homeScreen';
import {Provider} from 'react-redux';
import {store} from './store';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconOcticons from 'react-native-vector-icons/Octicons';

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
            name="Stacks"
            component={Stacks}
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
