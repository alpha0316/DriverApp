import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_CUSTOMER_URL = "http://shuttle-backend-0.onrender.com/api/v1";

  const handleRegister = async () => {
    setIsLoading(true);
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await fetch(`${BASE_CUSTOMER_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          phoneNumber: phoneNumber,
          password: password,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const data = await response.json();
      console.log(data);
      console.log(response);

      if (response.ok) {
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        navigation.navigate("Home");
        setIsLoading(false);
      } else {
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Could not register.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30, gap: 12 }}>
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 24, fontWeight: "700" }}>
            Welcome To The Shuttle Driver App
          </Text>
          <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.6)" }}>
            Enter Your Details To Register
          </Text>
        </View>

        <View style={{ display: "flex", gap: 16 }}>
          <View style={{ display: "flex", gap: 8 }}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    focusedInput === "fullName"
                      ? "#000"
                      : "rgba(0, 0, 0, 0.20)",
                  backgroundColor:
                    focusedInput === "fullName" ? "#fff" : "#F4F4F4",
                },
              ]}
              value={fullName}
              onChangeText={setFullName}
              onFocus={() => setFocusedInput("fullName")}
              onBlur={() => setFocusedInput(null)}
              placeholder="Enter your full name"
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>

          <View style={{ display: "flex", gap: 8 }}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    focusedInput === "phoneNumber"
                      ? "#000"
                      : "rgba(0, 0, 0, 0.20)",
                  backgroundColor:
                    focusedInput === "phoneNumber" ? "#fff" : "#F4F4F4",
                },
              ]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              onFocus={() => setFocusedInput("phoneNumber")}
              onBlur={() => setFocusedInput(null)}
              keyboardType="numeric"
              placeholder="Enter your phone number"
              placeholderTextColor="rgba(0,0,0,0.5)"
              maxLength={10}
            />
          </View>

          <View style={{ display: "flex", gap: 8 }}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  {
                    borderColor:
                      focusedInput === "password"
                        ? "#000"
                        : "rgba(0, 0, 0, 0.20)",
                    backgroundColor:
                      focusedInput === "password" ? "#fff" : "#F4F4F4",
                  },
                ]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter password"
                placeholderTextColor="rgba(0,0,0,0.5)"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 10,
                  padding: 10,
                }}
              >
                <Icon
                  name={showPassword ? "eye-slash" : "eye"}
                  size={20}
                  color="rgba(0,0,0,0.5)"
                />
              </TouchableOpacity>
            </View>
          </View>

          <PrimaryButton
            title="Sign Up"
            onPress={handleRegister}
            disabled={isLoading}
          />

          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.6)" }}>
              Do you already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text
                style={{
                  fontSize: 16,
                  color: "rgba(0,0,0,0.6)",
                  fontWeight: "700",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
});

export default Register;
