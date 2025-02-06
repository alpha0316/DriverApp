import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';
import BackButton from '@/components/BackButton';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';
import SplashScreen from './SplashScreen';

const OTPVerification = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const inputsRef = useRef([]);
  const { verificationId, prefix, requestId, userExists } = route.params || {};

  // const saveToken = async (token) => {
  //   try {
  //     // Convert token to a string if it isn't already
  //     const tokenString = typeof token === "string" ? token : JSON.stringify(token);
  
  //     await SecureStore.setItemAsync("token", tokenString);
  //     console.log("Token saved securely!");
  //   } catch (error) {
  //     console.error("Error saving token:", error);
  //     Alert.alert("Error", "Failed to save token securely.");
  //   }
  // };
  
  
  
  
  
  const BASE_CUSTOMER_URL = "https://backend-node-0kx8.onrender.com";

  // const handleInputChange = (value, index) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);


  //   if (value && index < inputsRef.current.length - 1) {
  //     inputsRef.current[index + 1].focus();
  //   }

  //   else if (!value && index > 0) {
  //     inputsRef.current[index - 1].focus();
  //   }
  // };

  // const handleContinue = async () => {
  //   try {
  //     const response = await fetch(`${BASE_CUSTOMER_URL}/api/auth/verifyOTP`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         code: otp,
  //         requestId: requestId,
  //         prefix: prefix,
  //       }),
  //     });
  
  //     const { token, user } = await response.json();
  
  //     if (response.ok) {
  //       await saveToken(token);
  //       // await saveToken(token, userExists, requestId); 
  //       Alert.alert("Success", "Phone number verified!");
  //       navigation.navigate("Home");
  //       console.log("token")
  //     }
  //   } catch (error) {
  //     console.error("Verification Error:", error);
  //     const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
  //     Alert.alert("Error", errorMessage);
  //   }
  // };
  

  // const handleResendOTP = async () => {
  //   try {
  //     console.log(`Sending request to resend OTP with verification ID: ${verificationId} ` );
  
  //     const response = await axios.post(`${BASE_CUSTOMER_URL}/resend-otp/`, {
  //       verificationId,
  //     });
  
  //     console.log('Resend OTP Response:', response.data);
  //     Alert.alert('OTP Resent', 'A new verification code has been sent to your phone.');
  //   } catch (error) {
  //     console.error('Error Response:', error.response);
  
  //     const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
  //     Alert.alert('Error', errorMessage);
  //   }
  // };


  const isButtonDisabled = !otp

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>OTP Verification</Text>
      </View>
      <Text style={styles.label}>Enter OTP Code</Text>
      <Text style={styles.subtitle}>
        Enter the verification code we just sent to your mobile number.
      </Text>


      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        maxLength={4} // Adjust based on OTP length
        keyboardType="numeric"
        // placeholder="Enter OTP"
        placeholderTextColor="rgba(0, 0, 0, 0.1)"
      />

      <PrimaryButton title="Verify" disabled={isButtonDisabled} onPress={navigation.navigate('Home')} />

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn’t receive a code? </Text>
        <TouchableOpacity  onPress={ navigation.navigate('Home')} >
          <Text style={styles.resendLink}>Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    marginTop: 50,
    fontWeight: '600',
  },
  subtitle: {
    marginBottom: 24,
    color: 'rgba(0, 0, 0, 0.60)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingLeft : '20%'
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent : 'space-around'
  },
  input: {
    height: 50,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 16,
    width: "100%",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: 'rgba(0, 0, 0, 0.60)',
    fontSize: 14,
  },
  resendLink: {
    fontWeight: '700',
    color: '#000',
  },
});

export default OTPVerification;
