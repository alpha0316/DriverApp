import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const checkUserData = async () => {
      try {
     
        const timer = setTimeout(async () => {
          
          const userDataString = await AsyncStorage.getItem('userData');
          console.log('User Data (String):', userDataString);

          if (userDataString) {
            
            const userData = JSON.parse(userDataString);
            console.log('User Data (Parsed):', userData);

          
            if (userData) {
              navigation.navigate('Home'); // Navigate to Home if user ID exists
            } else {
              // navigation.navigate('Register'); // Navigate to Register if no user ID
            }
          } else {
            navigation.navigate('Register'); // Navigate to Register if no data found
          }

          setIsLoading(false); // Stop loading
        }, 2000);

       
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error checking user data:', error);
        setIsLoading(false); // Stop loading in case of error
        navigation.navigate('Register'); // Fallback to Register screen
      }
    };

    checkUserData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shuttle</Text>
      <Text style={[styles.text, { color: 'rgba(0, 0, 0, 0.50)' }]}>DriverApp</Text>

      {/* Show loading indicator while checking user data */}
      {isLoading && <ActivityIndicator size="small" color="#000" style={styles.loader} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '700',
    fontSize: 40,
  },
  loader: {
    marginTop: 20, // Add some spacing
  },
});