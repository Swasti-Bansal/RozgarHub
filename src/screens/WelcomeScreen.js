// src/screens/WelcomeScreen.js
// Updated — collects mobile number and sends OTP

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from '../styles/commonStyles';
import { sendOTP } from '../services/authService';

// Country codes for the picker (extend as needed)
const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1',  flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
];

const WelcomeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber]     = useState('');
  const [selectedCode, setSelectedCode]   = useState(COUNTRY_CODES[0]);
  const [showPicker, setShowPicker]       = useState(false);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState('');

  const handleSendOTP = async () => {
    setError('');

    // Basic client-side validation
    const cleaned = phoneNumber.replace(/\s/g, '');
    if (cleaned.length < 7 || cleaned.length > 13 || !/^\d+$/.test(cleaned)) {
      setError('Please enter a valid mobile number.');
      return;
    }

    const fullNumber = `${selectedCode.code}${cleaned}`;
    setLoading(true);

    const { success, confirmation, error: errMsg } = await sendOTP(fullNumber);

    setLoading(false);

    if (success) {
      // Pass confirmation object + phone to the OTP screen
      navigation.navigate('OTPVerify', { confirmation, phoneNumber: fullNumber });
    } else {
      setError(errMsg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.screenContainer}>
            {/* ── Logo ── */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoIcon}>🔨</Text>
                <Text style={styles.logoText}>RozgarHub</Text>
              </View>
              <TouchableOpacity style={styles.languageBtn}>
                <Text style={styles.languageText}>🌐 ▼</Text>
              </TouchableOpacity>
            </View>

            {/* ── Hero ── */}
            <View style={styles.contentCenter}>
              <Text style={styles.mainTitle}>
                Find trusted local workers or jobs near you
              </Text>
              <Text style={{ fontSize: 60, marginVertical: 20 }}>📍</Text>

              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Workers on platform</Text>
                <Text style={styles.infoValue}>⭐ 11,658+</Text>
              </View>
            </View>

            {/* ── Phone Input ── */}
            <View style={styles.bottomSection}>
              <Text style={[styles.inputLabel, { marginBottom: 8 }]}>
                Mobile Number
              </Text>

              <View style={welcomeStyles.phoneRow}>
                {/* Country code picker trigger */}
                <TouchableOpacity
                  style={welcomeStyles.codeBox}
                  onPress={() => setShowPicker(!showPicker)}
                >
                  <Text style={welcomeStyles.codeText}>
                    {selectedCode.flag} {selectedCode.code} ▾
                  </Text>
                </TouchableOpacity>

                <TextInput
                  style={welcomeStyles.phoneInput}
                  placeholder="Enter mobile number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  maxLength={13}
                  value={phoneNumber}
                  onChangeText={(t) => {
                    setError('');
                    setPhoneNumber(t);
                  }}
                />
              </View>

              {/* Inline country-code dropdown */}
              {showPicker && (
                <View style={welcomeStyles.pickerDropdown}>
                  {COUNTRY_CODES.map((c) => (
                    <TouchableOpacity
                      key={c.code}
                      style={welcomeStyles.pickerItem}
                      onPress={() => {
                        setSelectedCode(c);
                        setShowPicker(false);
                      }}
                    >
                      <Text style={welcomeStyles.pickerItemText}>
                        {c.flag}  {c.name}  ({c.code})
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Inline error */}
              {!!error && (
                <Text style={welcomeStyles.errorText}>{error}</Text>
              )}

              {/* Send OTP button */}
              <TouchableOpacity
                style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                onPress={handleSendOTP}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#FFF" />
                  : <Text style={styles.primaryButtonText}>Send OTP</Text>
                }
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.linkText}>Why Mobile Number?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Small local styles specific to this screen
import { StyleSheet } from 'react-native';
const welcomeStyles = StyleSheet.create({
  phoneRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  codeBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    justifyContent: 'center',
  },
  codeText: {
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#2C3E50',
  },
  pickerDropdown: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pickerItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pickerItemText: {
    fontSize: 15,
    color: '#2C3E50',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 4,
  },
});

export default WelcomeScreen;
