// src/screens/WelcomeScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from '../styles/commonStyles';
import { sendOTP } from '../services/authService';

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1',  flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
];

// Worker hard-hat logo with wrench inside — SVG


const WelcomeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber]   = useState('');
  const [selectedCode, setSelectedCode] = useState(COUNTRY_CODES[0]);
  const [showPicker, setShowPicker]     = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

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
    <SafeAreaView style={styles.welcomeRoot}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ── Hero ── */}
          <View style={styles.welcomeHero}>

            {/* Decorative shapes */}
            <View style={styles.welcomeDecorCircle1} />
            <View style={styles.welcomeDecorCircle2} />
            <View style={styles.welcomeDecorCircle3} />

            {/* Language button */}
            <TouchableOpacity style={styles.welcomeLangBtn}>
              <Text style={styles.welcomeLangText}>🌐 EN ▾</Text>
            </TouchableOpacity>

            {/* Logo row */}
            <View style={styles.welcomeLogoRow}>
              <View style={styles.welcomeLogoIconBox}>
                <Text style={{ fontSize: 28 }}>👷</Text>
              </View>
              <Text style={styles.welcomeLogoName}>RozgarHub</Text>
            </View>

            {/* Tagline */}
            <Text style={styles.welcomeTagline}>
              Find trusted work{'\n'}near you, instantly
            </Text>
            <Text style={styles.welcomeTaglineSub}>
              Connecting skilled workers with local jobs
            </Text>

            {/* Trust badges row */}
            <View style={styles.welcomeBadgeRow}>
              <View style={styles.welcomeBadge}>
                <Text style={styles.welcomeBadgeText}>✓  Free to join</Text>
              </View>
              <View style={styles.welcomeBadge}>
                <Text style={styles.welcomeBadgeText}>✓  Work on your schedule</Text>
              </View>
            </View>

          </View>

          {/* ── Bottom input panel ── */}
          <View style={styles.welcomeBottom}>

            <Text style={styles.welcomeBottomTitle}>Enter your mobile number</Text>
            <Text style={styles.welcomeBottomSub}>We'll send you a one-time verification code</Text>

            <View style={styles.welcomePhoneRow}>
              <TouchableOpacity
                style={styles.welcomeCodeBox}
                onPress={() => setShowPicker(!showPicker)}
              >
                <Text style={styles.welcomeCodeText}>
                  {selectedCode.flag} {selectedCode.code} ▾
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.welcomePhoneInput}
                placeholder="Mobile number"
                placeholderTextColor="#AAB0B7"
                keyboardType="phone-pad"
                maxLength={13}
                value={phoneNumber}
                onChangeText={(t) => { setError(''); setPhoneNumber(t); }}
              />
            </View>

            {showPicker && (
              <View style={styles.welcomePickerDropdown}>
                {COUNTRY_CODES.map((c) => (
                  <TouchableOpacity
                    key={c.code}
                    style={styles.welcomePickerItem}
                    onPress={() => { setSelectedCode(c); setShowPicker(false); }}
                  >
                    <Text style={styles.welcomePickerItemText}>
                      {c.flag}  {c.name}  ({c.code})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!!error && <Text style={styles.welcomeErrorText}>{error}</Text>}

            <TouchableOpacity
              style={[styles.welcomeOtpBtn, loading ? { opacity: 0.7 } : null]}
              onPress={handleSendOTP}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#FFF" />
                : <Text style={styles.welcomeOtpBtnText}>Send OTP  →</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity style={styles.welcomeWhyLink}>
              <Text style={styles.welcomeWhyLinkText}>Why do we need your number?</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;