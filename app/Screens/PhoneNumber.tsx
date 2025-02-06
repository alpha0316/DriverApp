import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';
import BackButton from '@/components/BackButton';
import axios from 'axios';
import OTPVerification from './OTPVerification';
// import * as SecureStore from 'expo-secure-store';



const Username = ({ navigation, route }) => {

  const [verificationId, setVerificationId] = useState(null) 
  const [phoneNumber, setPhoneNumber] = useState('');




  const BASE_CUSTOMER_URL = "https://backend-node-0kx8.onrender.com";


  // const requestOTP = async () => {
  //   if (!phoneNumber || phoneNumber.length < 10) {
  //     alert("Please enter a valid phone number.");
  //     return;
  //   }
  

  //     const response = await fetch(`${BASE_CUSTOMER_URL}/api/auth/sendOTP`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         phoneNumber: phoneNumber,
  //         account_type: "rider",
   
  //       }),
  //     });

  //     // const data = await response.json();

  //     const data = await response.json();
  //     const userExists = data.userExists
  //     const { prefix, requestId } = data.data.data || {};

      
  //     navigation.navigate('OTPVerification', { verificationId: phoneNumber, prefix, requestId, userExists });
  //     setVerificationId(data.verificationId);
  //     // console.log(userExists) 

      
  //     // console.error('Error requesting OTP:', error);
  //     Alert.alert('Error', error.message || 'Could not send OTP.');


  
  // };
  

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <View style={{
        marginTop : 64,
        gap : 12
      }}>

        <View style ={{
          gap : 4
        }}>
            <Text style={{
              fontSize : 24,
              fontWeight : '700'
            }}>Welcome To The Rider App</Text>
    
            <Text style={{
              fontSize : 16,
              color : 'rgba(0,0,0,0.6)'
            }}>Enter your phone number to start!</Text>
        </View>



          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input,
              {
                borderColor: phoneNumber ? '#000' : 'rgba(0, 0, 0, 0.20)',
                backgroundColor: phoneNumber ? '#fff' : '#F4F4F4',
              }
            ]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType='numeric'
            autoCapitalize="none"
            placeholder='Enter your phone number'
            placeholderTextColor={'rgba(0,0,0,.5)'}
            returnKeyType="done"
            maxLength={10}
          />
          <PrimaryButton title='Sign In'   onPress={ navigation.navigate('OTPVerification')} />
          <View>
            <Text style={{
                fontSize : 16,
                color : 'rgba(0,0,0,0.6)',
                textAlign : 'center'
            }}>An OTP code will be sent to your number for verification</Text>
          </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor : 'white'
  },
  label: {
    fontSize: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: '110%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    height: 50,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
  },
  text : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    gap : 4,
  }

});

export default Username;
