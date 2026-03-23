// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';

const LoginScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Login</Text>
        
        <View style={styles.locationDisplay}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>Bandra East, Mumbai</Text>
        </View>

        <View style={styles.otpContainer}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <TextInput
              key={num}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
            />
          ))}
          <TouchableOpacity style={styles.otpCheckButton}>
            <Text style={styles.otpCheckText}>✓</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.otpHelperText}>Resend OTP in 00:42</Text>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('GetStarted')}
        >
          <Text style={styles.primaryButtonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
