// src/services/authService.js
// Handles all Firebase Phone Authentication logic

import auth from '@react-native-firebase/auth';

/**
 * Step 1 — Send OTP to the given phone number.
 * @param {string} phoneNumber  E.164 format, e.g. "+919876543210"
 * @returns {object} Firebase confirmation result (store this, you need it to verify)
 */
export const sendOTP = async (phoneNumber) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return { success: true, confirmation };
  } catch (error) {
    return { success: false, error: parseFirebaseError(error) };
  }
};

/**
 * Step 2 — Verify the OTP the user entered.
 * @param {object} confirmation  The object returned by sendOTP
 * @param {string} otp           6-digit code the user typed
 * @returns {object} Firebase user object on success
 */
export const verifyOTP = async (confirmation, otp) => {
  try {
    const result = await confirmation.confirm(otp);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: parseFirebaseError(error) };
  }
};

/**
 * Sign out the current user.
 */
export const signOut = async () => {
  try {
    await auth().signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get the currently signed-in user (or null).
 */
export const getCurrentUser = () => auth().currentUser;

/**
 * Convert Firebase error codes into readable messages.
 */
const parseFirebaseError = (error) => {
  switch (error.code) {
    case 'auth/invalid-phone-number':
      return 'Please enter a valid phone number.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/invalid-verification-code':
      return 'Incorrect OTP. Please try again.';
    case 'auth/code-expired':
      return 'OTP has expired. Please request a new one.';
    case 'auth/session-expired':
      return 'Session expired. Please request a new OTP.';
    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection.';
    default:
      return error.message || 'Something went wrong. Please try again.';
  }
};
