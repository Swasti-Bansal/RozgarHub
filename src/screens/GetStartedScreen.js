// src/screens/GetStartedScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';
import T from '../components/T';
import { useTranslation, _cache } from '../context/TranslationContext';

const translateString = async (text, lang) => {
  if (lang === 'en' || !text) return text;
  const key = `${text}__${lang}`;
  if (_cache[key]) return _cache[key];
  try {
    const res  = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`
    );
    const data = await res.json();
    if (data.responseStatus === 200) {
      const clean = data.responseData.translatedText
        .replace(/@\s*\w+\s*:\s*\w+/g, '')  // strip @action:button
        .trim();
      _cache[key] = clean;
      return clean;
    }
  } catch {}
  return text;
};

// Age buttons extracted — fixes Rules of Hooks in .map()
const AgeButton = ({ age, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.ageButton, isActive && styles.ageButtonActive]}
    onPress={onPress}
  >
    <Text style={[styles.ageButtonText, isActive && styles.ageButtonTextActive]}>
      {age}
    </Text>
  </TouchableOpacity>
);

const AGE_OPTIONS = ['18-25', '26-40', '41+'];
const SCREEN_TITLE = 'Let us get started';

const GetStartedScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ age: '' });
  const { currentLang }         = useTranslation();

  useEffect(() => {
    // ── Set title immediately (English), then update when translation ready ──
    navigation.setOptions({ title: SCREEN_TITLE });

    if (currentLang === 'en') return;

    translateString(SCREEN_TITLE, currentLang).then(title => {
      navigation.setOptions({ title });
    });
  }, [currentLang]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>

        <T style={styles.screenTitle}>Let us get started</T>
        <T style={styles.screenSubtitle}>Fill in your details</T>

        <View style={styles.formContainer}>
          <T style={styles.inputLabel}>Where do you work from?</T>

          <TouchableOpacity style={styles.inputButton}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.inputButtonText}>📍 </Text>
              <T style={styles.inputButtonText}>Use current location</T>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.inputButtonOutline, { marginTop: 10 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.inputButtonOutlineText}>📍 </Text>
              <T style={styles.inputButtonOutlineText}>Select your area</T>
            </View>
          </TouchableOpacity>

          <T style={[styles.inputLabel, { marginTop: 20 }]}>How old are you?</T>
          <View style={styles.ageButtonContainer}>
            {AGE_OPTIONS.map((age) => (
              <AgeButton
                key={age}
                age={age}
                isActive={userData.age === age}
                onPress={() => setUserData({ ...userData, age })}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('AboutWork')}
        >
          <T style={styles.primaryButtonText}>Continue</T>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default GetStartedScreen;
