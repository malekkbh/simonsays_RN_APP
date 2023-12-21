import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import GameScreen from '../src/screens/GameScreen';
import ScreenNames from './screenNames';
import ScoresScreen from '../src/screens/ScoresScreen';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={GameScreen} name={ScreenNames.gameScreen} />
        <Stack.Screen component={ScoresScreen} name={ScreenNames.scoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
