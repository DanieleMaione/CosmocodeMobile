import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Stacks from './Stacks';
import Developers from './Developers';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Developers" component={Developers} />
        <Tab.Screen name="Stacks" component={Stacks} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
