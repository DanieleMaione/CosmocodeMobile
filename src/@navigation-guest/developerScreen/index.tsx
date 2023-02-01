import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DeveloperDetail} from './components/DeveloperDetail';
import {DeveloperInfo} from './components/DeveloperInfo';
import {DeveloperList} from './components/DeveloperList';

const Stack = createNativeStackNavigator();
export const DeveloperScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="DeveloperList"
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
        name="DeveloperList"
        component={DeveloperList}
        options={{title: 'Developers', headerShown: false}}
      />
      <Stack.Screen
        name="DeveloperDetail"
        component={DeveloperDetail}
        options={{title: 'DeveloperDetail'}}
      />
      <Stack.Screen
        name="DeveloperInfo"
        component={DeveloperInfo}
        options={{title: 'DeveloperInfo'}}
      />
    </Stack.Navigator>
  );
};
