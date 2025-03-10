import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../Screens/SplashScreen';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import OTPVerification from '../Screens/OTPVerification';
import SignIn from '../Screens/SignIn';

const Stack = createNativeStackNavigator();

export default function MainNav() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}
