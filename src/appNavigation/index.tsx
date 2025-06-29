import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '@src/screens';
import { get } from 'lodash';

export type RootStackParamList = {
  Main: undefined;
  Team: {
    id: number;
    title: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type TeamRouteProp = RouteProp<RootStackParamList, 'Team'>;
type Route = TeamRouteProp;

const headerOptions = ({ route }: { route: Route }) => ({
  title: get(route, ['params', 'title'], ''),
});

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        // headerShown: false,
        animation: 'slide_from_right',
        orientation: 'portrait',
      }}
    >
      <Stack.Screen
        name="Main"
        component={Screens.MainScreen}
        options={{ title: 'Teams List' }}
      />
      <Stack.Screen
        name="Team"
        component={Screens.TeamScreen}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
