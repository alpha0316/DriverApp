import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../Screens/SplashScreen';
import PhoneNumber from '../Screens/PhoneNumber';
import Home from '../Screens/Home';
import FillingProcess from '../Screens/FillingProcess';
import CylinderDelivery from '../Screens/CylinderDelivery';
import OTPVerification from '../Screens/OTPVerification';
import Username from '../Screens/PhoneNumber copy';

const Stack = createNativeStackNavigator();

export default function MainNav() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ headerShown: false }} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}
