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
import LanguagePicker from '../components/LanguagePicker';
import T from '../components/T';
import useTranslatedText from '../hooks/useTranslatedText';

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
];

const WelcomeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCode, setSelectedCode] = useState(COUNTRY_CODES[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Translated placeholder from old version ──
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
      navigation.navigate('OTPVerify', {
        confirmation,
        phoneNumber: fullNumber,
      });
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
            <View style={styles.welcomeDecorCircle1} />
            <View style={styles.welcomeDecorCircle2} />
            <View style={styles.welcomeDecorCircle3} />

            {/* LanguagePicker from old version instead of plain button ── */}
            <View style={styles.welcomeLangBtn}>
              <LanguagePicker />
            </View>

            {/* Logo row */}
            <View style={styles.welcomeLogoRow}>
              <View style={styles.welcomeLogoIconBox}>
                <Text style={{ fontSize: 28 }}>👷</Text>
              </View>
              <Text style={styles.welcomeLogoName}>RozgarHub</Text>
            </View>

            {/* Tagline — using T for translation ── */}
            <T style={styles.welcomeTagline}>
              Find trusted work near you, instantly
            </T>
            <T style={styles.welcomeTaglineSub}>
              Connecting skilled workers with local jobs
            </T>

            {/* Trust badges */}
            <View style={styles.welcomeBadgeRow}>
              <View style={styles.welcomeBadge}>
                <T style={styles.welcomeBadgeText}>✓ Free to join</T>
              </View>
              <View style={styles.welcomeBadge}>
                <T style={styles.welcomeBadgeText}>✓ Work on your schedule</T>
              </View>
            </View>
          </View>

          {/* ── Bottom input panel ── */}
          <View style={styles.welcomeBottom}>
            <T style={styles.welcomeBottomTitle}>Enter your mobile number</T>
            <T style={styles.welcomeBottomSub}>
              We'll send you a one-time verification code
            </T>

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
                placeholder={placeholderMobile}
                placeholderTextColor="#AAB0B7"
                keyboardType="phone-pad"
                maxLength={13}
                value={phoneNumber}
                onChangeText={t => {
                  setError('');
                  setPhoneNumber(t);
                }}
                color="#2C3E50"
                selectionColor="#4A90E2"
              />
            </View>

            {showPicker && (
              <View style={styles.welcomePickerDropdown}>
                {COUNTRY_CODES.map(c => (
                  <TouchableOpacity
                    key={c.code}
                    style={styles.welcomePickerItem}
                    onPress={() => {
                      setSelectedCode(c);
                      setShowPicker(false);
                    }}
                  >
                    <Text style={styles.welcomePickerItemText}>
                      {c.flag} {c.name} ({c.code})
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
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <T style={styles.welcomeOtpBtnText}>Send OTP →</T>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.welcomeWhyLink}>
              <T style={styles.welcomeWhyLinkText}>
                Why do we need your number?
              </T>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
