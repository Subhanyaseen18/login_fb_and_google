import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import Login from '../screens/Auth/Login';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default MainStack;
