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
import {Image, StyleSheet} from 'react-native';
import {TUser} from '../slice/userSlice';
import {Profile} from './@navigation-guest/ProfileScreen/components/Profile';
import {GistLikes} from './@navigation-main/GistScreen/GistLikes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const NavigatorApp = () => {
  const {login} = useSelector((state: TLogin) => state);
  const {user} = useSelector((state: TUser) => state);

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
              tabBarIcon: ({focused}) => {
                let color = focused ? '#4e57ef' : 'white';

                return <IconFontAwesome name="home" size={30} color={color} />;
              },
              tabBarLabel: () => {
                return null;
              },
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
                  options={{title: 'Home Page', headerShown: false}}
                />
                <Stack.Screen
                  name="DeveloperDetail"
                  component={DeveloperDetail}
                />
                <Stack.Screen name="GistDetail" component={GistDetail} />
                <Stack.Screen name="DeveloperInfo" component={DeveloperInfo} />
                <Stack.Screen name="GistLikes" component={GistLikes} />
                <Stack.Screen name="StackDetail" component={StackDetail} />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Developers Screen"
            options={{
              title: 'Developers',
              headerTintColor: 'white',
              tabBarIcon: ({focused}) => {
                let color = focused ? '#4e57ef' : 'white';

                return <IconFontAwesome name="users" size={25} color={color} />;
              },
              tabBarLabel: () => {
                return null;
              },
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
                <Stack.Screen
                  name="Developers"
                  component={DeveloperList}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="DeveloperDetail"
                  component={DeveloperDetail}
                />
                <Stack.Screen name="StackDetail" component={StackDetail} />
                <Stack.Screen name="DeveloperInfo" component={DeveloperInfo} />
                <Stack.Screen name="GistDetail" component={GistDetail} />
                <Stack.Screen name="GistLikes" component={GistLikes} />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Stack Screen"
            options={{
              tabBarIcon: ({focused}) => {
                let color = focused ? '#4e57ef' : 'white';

                return <IconOcticons name="stack" size={28} color={color} />;
              },
              tabBarLabel: () => {
                return null;
              },
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
                <Stack.Screen
                  name="Stack"
                  component={Stacks}
                  options={{headerShown: false}}
                />
                <Stack.Screen name="StackDetail" component={StackDetail} />
                <Stack.Screen
                  name="DeveloperDetail"
                  component={DeveloperDetail}
                />
                <Stack.Screen name="GistDetail" component={GistDetail} />
                <Stack.Screen name="DeveloperInfo" component={DeveloperInfo} />
                <Stack.Screen name="GistLikes" component={GistLikes} />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Profile Screen"
            options={{
              title: 'Profile',
              headerTintColor: 'white',
              tabBarIcon: ({focused}) => (
                <Image
                  style={styles(focused).userImg}
                  source={{
                    uri: user.avatar_url,
                  }}
                />
              ),
              tabBarLabel: () => {
                return null;
              },
            }}>
            {() => (
              <Stack.Navigator
                initialRouteName="Profile"
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
                  name="Profile"
                  component={Profile}
                  options={{headerShown: false}}
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

const styles = (focused: boolean) =>
  StyleSheet.create({
    userImg: {
      borderRadius: 100,
      height: 35,
      width: 35,
      borderWidth: 4,
      borderColor: focused ? '#4e57ef' : 'black',
    },
  });
