import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';
import BackButton from '@/components/BackButton';
import axios from 'axios';
import OTPVerification from './OTPVerification';
// import * as SecureStore from 'expo-secure-store';



const SignIn = ({ navigation, route }) => {

  const [verificationId, setVerificationId] = useState(null) 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');




  const BASE_CUSTOMER_URL = "https://shuttle-backend-0.onrender.com";


  const SignIn = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await fetch(`${BASE_CUSTOMER_URL}/AUTH/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.message || 'Registration failed.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Could not register.');
    }
  };
  

  return (
    <View style={styles.container}>
       {/* <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View> */}

      <View style={{
        marginTop : 30,
        gap : 12
      }}>

        <View style ={{
          gap : 4
        }}>
            <Text style={{
              fontSize : 24,
              fontWeight : '700'
            }}>Welcome Back To The Shuttle Driver App</Text>
    
            <Text style={{
              fontSize : 16,
              color : 'rgba(0,0,0,0.6)'
            }}>Enter Your Details To Register </Text>
        </View>
          
       

          <View style={{
            display : 'flex',
            gap : 16
          }}>

            <View style={{
            display : 'flex',
            gap : 8
          }}>
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
            </View>

             
            <View style={{
            display : 'flex',
            gap : 8
          }}>
                <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={[styles.input,
                      {
                        borderColor: password ? '#000' : 'rgba(0, 0, 0, 0.20)',
                        backgroundColor: password ? '#fff' : '#F4F4F4',
                      }
                    ]}
                    value={password}
                    onChangeText={setPassword} 
                    // keyboardType='numeric'
                    autoCapitalize="none"
                    placeholder='Enter password'
                    placeholderTextColor={'rgba(0,0,0,.5)'}
                    returnKeyType="done"
                    maxLength={10}
                    secureTextEntry={true}
                  />
            </View>
            
              <PrimaryButton title='Sign In' onPress={SignIn} />
              <View>
              </View>

              <View style={{
                display : 'flex',
                flexDirection : 'row',
                gap : 8
              }}>
                  <Text style={{
                  fontSize : 16,
                  color : 'rgba(0,0,0,1)'
                }}>Are you new here?</Text>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Register')}
                >
                    <Text style={{
                      fontSize : 16,
                      // color : 'rgba(0,0,0,0.6)',
                      fontWeight : '700'
                    }}>Sign Up</Text>
                </TouchableOpacity>
               
              </View >
           
            
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
    // gap: '110%',
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

export default SignIn;
