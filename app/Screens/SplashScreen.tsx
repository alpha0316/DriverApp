import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';



export default function SplashScreen() {
 const navigation = useNavigation();

 useEffect(() => {
  const timer = setTimeout(() => {
    // const getToken=async()=>{
    //   let result=await SecureStore.getItemAsync("token")
    //   console.log(result)
    //   if(result){
    //     navigation.navigate("Home");
    //   }
    //   else{
    //     navigation.navigate('PhoneNumber');
    //   }

    // }
    // getToken()
    navigation.navigate('Register'); 
  }, 2000);

  return () => clearTimeout(timer);
}, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shuttle</Text>
      <Text style={[styles.text, { color: 'rgba(0, 0, 0, 0.50)' }]}>DriverApp</Text>
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
});
