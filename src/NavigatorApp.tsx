/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DeveloperScreen} from './@navigation-guest/developerScreen';
import StackScreen from './@navigation-guest/stackScreen';
import {Login} from './@navigation-guest/homeScreen/components/Login';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconOcticons from 'react-native-vector-icons/Octicons';
import Screen from './@navigation-guest/homeScreen';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {TLogin} from '../slice/loginSlice';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const NavigatorApp = () => {
  const {login} = useSelector((state: TLogin) => state);

  return (
    <NavigationContainer>
      {login.access_token ? (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgb(15, 23, 36)',
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
            component={DeveloperScreen}
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
      ) : (
        <Stack.Navigator
          initialRouteName="HomeLogin"
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
            name="HomeLogin"
            component={Login}
            options={{title: 'COSMOCODE', headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
