/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './@navigation-guest/homeScreen/components/Login';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconOcticons from 'react-native-vector-icons/Octicons';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {TLogin} from '../slice/loginSlice';
import {HomeScreen} from './@navigation-guest/homeScreen/components/HomeScreen';
import {DeveloperDetail} from './@navigation-guest/developerScreen/components/DeveloperDetail';
import {GistDetail} from './@navigation-guest/homeScreen/components/GistDetail';
import {DeveloperInfo} from './@navigation-guest/developerScreen/components/DeveloperInfo';
import {Stacks} from './@navigation-guest/stackScreen/components/Stacks';
import {StackDetail} from './@navigation-guest/stackScreen/components/StackDetail';
import {DeveloperList} from './@navigation-guest/developerScreen/components/DeveloperList';

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
            options={{
              title: 'Home Page',
              headerTintColor: 'white',
              tabBarIcon: () => (
                <IconFontAwesome name="home" size={30} color="white" />
              ),
            }}>
            {() => (
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
                  name="Home Page"
                  component={HomeScreen}
                  options={{title: 'Home Page'}}
                />
                <Stack.Screen
                  name="DeveloperDetail"
                  component={DeveloperDetail}
                />
                <Stack.Screen name="GistDetail" component={GistDetail} />
                <Stack.Screen name="DeveloperInfo" component={DeveloperInfo} />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Developers"
            options={{
              title: 'Developers',
              headerTintColor: 'white',
              tabBarIcon: () => (
                <IconFontAwesome name="users" size={25} color="white" />
              ),
            }}>
            {() => (
              <Stack.Navigator
                initialRouteName="Developers"
                screenOptions={() => ({
                  gestureEnabled: true,
                  headerTintColor: 'white',
                  headerTitleAlign: 'center',
                  headerTitleStyle: {color: 'white'},
                  headerStyle: {
                    backgroundColor: 'rgb(15, 23, 36)',
                  },
                })}>
                <Stack.Screen name="Developers" component={DeveloperList} />
                <Stack.Screen
                  name="DeveloperDetail"
                  component={DeveloperDetail}
                />
                <Stack.Screen name="DeveloperInfo" component={DeveloperInfo} />
                <Stack.Screen name="GistDetail" component={GistDetail} />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Stack"
            options={{
              title: 'Stacks',
              headerTintColor: 'white',
              tabBarIcon: () => (
                <IconOcticons name="stack" size={30} color="white" />
              ),
            }}>
            {() => (
              <Stack.Navigator
                initialRouteName="Stack"
                screenOptions={() => ({
                  gestureEnabled: true,
                  headerTintColor: 'white',
                  headerTitleAlign: 'center',
                  headerTitleStyle: {color: 'white'},
                  headerStyle: {
                    backgroundColor: 'rgb(15, 23, 36)',
                  },
                })}>
                <Stack.Screen name="Stack" component={Stacks} />
                <Stack.Screen name="StackDetail" component={StackDetail} />
                <Stack.Screen
                  name="DeveloperDetail"
                  component={DeveloperDetail}
                />
                <Stack.Screen name="GistDetail" component={GistDetail} />
                <Stack.Screen name="DeveloperInfo" component={DeveloperInfo} />
              </Stack.Navigator>
            )}
          </Tab.Screen>
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
