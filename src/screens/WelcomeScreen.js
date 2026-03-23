// src/screens/WelcomeScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView,
  KeyboardAvoidingView,   // ← add back
  StyleSheet,
} from 'react-native';
import styles from '../styles/commonStyles';
import { sendOTP } from '../services/authService';
import LanguagePicker from '../components/LanguagePicker';
import T from '../components/T';
import useTranslatedText from '../hooks/useTranslatedText';

const COUNTRY_CODES = [
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+1',   flag: '🇺🇸', name: 'USA'   },
  { code: '+44',  flag: '🇬🇧', name: 'UK'    },
  { code: '+971', flag: '🇦🇪', name: 'UAE'   },
];
const WelcomeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber]   = useState('');
  const [selectedCode, setSelectedCode] = useState(COUNTRY_CODES[0]);
  const [showPicker, setShowPicker]     = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [placeholderMobile] = useTranslatedText('Enter mobile number');
  const handleSendOTP = async () => {
    setError('');
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
      navigation.navigate('OTPVerify', { confirmation, phoneNumber: fullNumber });
    } else {
      setError(errMsg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ── KeyboardAvoidingView keeps bottom section above keyboard ── */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.screenContainer}>

            {/* ── Logo — unchanged ── */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoIcon}>🔨</Text>
                <Text style={styles.logoText}>RozgarHub</Text>
              </View>
              <LanguagePicker />
            </View>

            {/* ── Hero — unchanged ── */}
            <View style={styles.contentCenter}>
              <T style={styles.mainTitle}>
                Find trusted local workers or jobs near you
              </T>
              <Text style={{ fontSize: 60, marginVertical: 20 }}>📍</Text>
              <View style={styles.infoBox}>
                <T style={styles.infoLabel}>Workers on platform</T>
                <Text style={styles.infoValue}>⭐ 11,658+</Text>
              </View>
            </View>

            {/* ── Phone Input ── */}
            <View style={styles.bottomSection}>
              <T style={[styles.inputLabel, { marginBottom: 8 }]}>
                Mobile Number
              </T>

              <View style={ws.phoneRow}>
                <TouchableOpacity
                  style={ws.codeBox}
                  onPress={() => setShowPicker(!showPicker)}
                >
                  <Text style={ws.codeText}>
                    {selectedCode.flag} {selectedCode.code} ▾
                  </Text>
                </TouchableOpacity>

                <TextInput
                  style={ws.phoneInput}
                  placeholder={placeholderMobile}
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  maxLength={13}
                  value={phoneNumber}
                  onChangeText={(v) => { setError(''); setPhoneNumber(v); }}
                  // ↓ These two lines fix the invisible text issue
                  color="#2C3E50"
                  selectionColor="#4A90E2"
                />
              </View>

              {showPicker && (
                <View style={ws.pickerDropdown}>
                  {COUNTRY_CODES.map(c => (
                    <TouchableOpacity
                      key={c.code}
                      style={ws.pickerItem}
                      onPress={() => { setSelectedCode(c); setShowPicker(false); }}
                    >
                      <Text style={ws.pickerItemText}>
                        {c.flag}  {c.name}  ({c.code})
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {!!error && <Text style={ws.errorText}>{error}</Text>}

              <TouchableOpacity
                style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                onPress={handleSendOTP}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#FFF" />
                  : <T style={styles.primaryButtonText}>Send OTP</T>
                }
              </TouchableOpacity>

              <TouchableOpacity>
                <T style={styles.linkText}>Why Mobile Number?</T>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const ws = StyleSheet.create({
  phoneRow: { flexDirection: 'row', marginBottom: 12 },
  codeBox: {
    backgroundColor: '#FFF', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 14,
    borderWidth: 1, borderColor: '#E0E0E0',
    marginRight: 8, justifyContent: 'center',
  },
  codeText: { fontSize: 15, color: '#2C3E50', fontWeight: '600' },
  phoneInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#2C3E50',          // ← explicit text color
    minHeight: 50,             // ← ensures input is always visible
  },
  pickerDropdown: {
    backgroundColor: '#FFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E0E0E0',
    marginBottom: 10, elevation: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  pickerItem:     { padding: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  pickerItemText: { fontSize: 15, color: '#2C3E50' },
  errorText:      { color: '#E74C3C', fontSize: 13, marginBottom: 10, marginLeft: 4 },
});

export default WelcomeScreen;
