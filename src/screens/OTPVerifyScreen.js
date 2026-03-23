// src/screens/OTPVerifyScreen.js
// Receives `confirmation` and `phoneNumber` from WelcomeScreen via navigation params

import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import styles from '../styles/commonStyles';
import { verifyOTP, sendOTP } from '../services/authService';

const OTP_LENGTH = 6;
const RESEND_COUNTDOWN = 30; // seconds

const OTPVerifyScreen = ({ navigation, route }) => {
  const { confirmation: initialConfirmation, phoneNumber } = route.params;

  const [otp, setOtp]                       = useState(Array(OTP_LENGTH).fill(''));
  const [confirmation, setConfirmation]     = useState(initialConfirmation);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');
  const [countdown, setCountdown]           = useState(RESEND_COUNTDOWN);
  const [canResend, setCanResend]           = useState(false);

  // Refs to each OTP input box so we can auto-focus next
  const inputRefs = useRef([]);

  // ── Countdown timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (countdown === 0) { setCanResend(true); return; }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // ── OTP input handling ────────────────────────────────────────────────────────
  const handleOtpChange = (text, index) => {
    setError('');
    const newOtp = [...otp];

    // Allow paste of full code
    if (text.length === OTP_LENGTH) {
      const digits = text.replace(/\D/g, '').split('').slice(0, OTP_LENGTH);
      setOtp(digits);
      inputRefs.current[OTP_LENGTH - 1]?.focus();
      return;
    }

    newOtp[index] = text.replace(/\D/g, '').slice(-1); // only last digit
    setOtp(newOtp);

    // Auto-advance
    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ── Verify ────────────────────────────────────────────────────────────────────
  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    setError('');

    const { success, user, error: errMsg } = await verifyOTP(confirmation, code);
    setLoading(false);

    if (success) {
      // Clear stack so user can't go back to auth screens
      navigation.reset({
        index: 0,
        routes: [{ name: 'GetStarted' }],
      });
    } else {
      setError(errMsg);
      // Clear OTP boxes on wrong code
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  // ── Resend OTP ─────────────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setCountdown(RESEND_COUNTDOWN);
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');

    const { success, confirmation: newConf, error: errMsg } = await sendOTP(phoneNumber);

    if (success) {
      setConfirmation(newConf);
      Alert.alert('OTP Sent', `A new code was sent to ${phoneNumber}`);
    } else {
      setError(errMsg);
      setCanResend(true);
    }
  };

  const maskedPhone = phoneNumber
    ? phoneNumber.slice(0, -4).replace(/\d/g, '*') + phoneNumber.slice(-4)
    : '';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.screenContainer}>
          {/* ── Header ── */}
          <TouchableOpacity
            style={otpStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={otpStyles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.screenTitle}>Verify OTP</Text>
          <Text style={styles.screenSubtitle}>
            Enter the 6-digit code sent to{'\n'}
            <Text style={otpStyles.phoneHighlight}>{maskedPhone}</Text>
          </Text>

          {/* ── OTP Boxes ── */}
          <View style={otpStyles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(ref) => (inputRefs.current[i] = ref)}
                style={[
                  otpStyles.otpBox,
                  digit ? otpStyles.otpBoxFilled : null,
                  error ? otpStyles.otpBoxError : null,
                ]}
                value={digit}
                onChangeText={(t) => handleOtpChange(t, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={OTP_LENGTH} // allows paste
                selectTextOnFocus
                textAlign="center"
              />
            ))}
          </View>

          {/* ── Error ── */}
          {!!error && <Text style={otpStyles.errorText}>{error}</Text>}

          {/* ── Verify Button ── */}
          <TouchableOpacity
            style={[styles.primaryButton, loading && { opacity: 0.7 }]}
            onPress={handleVerify}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#FFF" />
              : <Text style={styles.primaryButtonText}>Verify OTP</Text>
            }
          </TouchableOpacity>

          {/* ── Resend ── */}
          <View style={otpStyles.resendRow}>
            {canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={otpStyles.resendLink}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text style={otpStyles.countdownText}>
                Resend OTP in{' '}
                <Text style={otpStyles.countdownNumber}>
                  {String(Math.floor(countdown / 60)).padStart(2, '0')}:
                  {String(countdown % 60).padStart(2, '0')}
                </Text>
              </Text>
            )}
          </View>

          {/* ── Change number ── */}
          <TouchableOpacity
            style={otpStyles.changeNumber}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.linkText}>Change mobile number</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const otpStyles = StyleSheet.create({
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  phoneHighlight: {
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  otpBoxFilled: {
    borderColor: '#4A90E2',
    backgroundColor: '#EEF4FF',
  },
  otpBoxError: {
    borderColor: '#E74C3C',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  resendRow: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendLink: {
    color: '#4A90E2',
    fontSize: 15,
    fontWeight: '600',
  },
  countdownText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  countdownNumber: {
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  changeNumber: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default OTPVerifyScreen;
