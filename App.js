import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import Feed from './screens/Feed';
import Start from './screens/Start';
import MembersScreen from './screens/MembersScreen';
import MemberDetailsScreen from './screens/MemberDetailsScreen'; // Import MemberDetailsScreen
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Splash');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const phoneNumber = await SecureStore.getItemAsync('phoneNumber');
      const password = await SecureStore.getItemAsync('password');
      if (phoneNumber && password) {
        setInitialRoute('Feed');
      } else {
        setInitialRoute('Splash');
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Members"
          component={MembersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MemberDetails" // Define MemberDetailsScreen
          component={MemberDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
