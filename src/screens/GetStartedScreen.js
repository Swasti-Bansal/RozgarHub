// src/screens/GetStartedScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView, View, Text, TouchableOpacity,
  TextInput, ScrollView, ActivityIndicator,
  PermissionsAndroid, Platform, Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import styles from '../styles/commonStyles';
import T from '../components/T';
import { useTranslation, _cache } from '../context/TranslationContext';
import { useUser } from '../context/UserContext';

// ── We re-use the same translation utility already in the project ──
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
        .replace(/@\s*\w+\s*:\s*\w+/g, '')
        .trim();
      _cache[key] = clean;
      return clean;
    }
  } catch {}
  return text;
};

// ── Role cards ────────────────────────────────────────────────────
const ROLES = [
  {
    id: 'worker',
    icon: '👷',
    title: 'I am a Worker',
    subtitle: 'Find daily jobs near me',
    accent: '#4A90E2',
    bg: '#EBF3FD',
    border: '#B5D4F4',
  },
  {
    id: 'employer',
    icon: '🏗️',
    title: 'I am an Employer',
    subtitle: 'Hire skilled workers',
    accent: '#27AE60',
    bg: '#E8F8EF',
    border: '#A8DFB8',
  },
];

const AGE_OPTIONS = ['18-25', '26-40', '41+'];
const SCREEN_TITLE = 'Let us get started';

// ── Small reusable age button (avoids hook-in-map) ────────────────
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

// ── Main screen ───────────────────────────────────────────────────
const GetStartedScreen = ({ navigation }) => {
  const { currentLang } = useTranslation();
  const { updateProfile } = useUser();

  const [userData, setUserData] = useState({
    name:       '',
    role:       '',   // 'worker' | 'employer'
    age:        '',
    location:   null, // { lat, lng }
    locationLabel: '',
  });

  // GPS state
  const [gpsLoading, setGpsLoading]   = useState(false);
  const [gpsStatus,  setGpsStatus]    = useState('');   // human-readable pill text
  const [gpsIsLive,  setGpsIsLive]    = useState(false);

  // Translated UI strings
  const [ui, setUi] = useState({
    title:          'Let us get started',
    subtitle:       'Fill in your details',
    yourName:       'Your name',
    namePlaceholder:'Enter your full name',
    youAre:         'You are a…',
    whereWork:      'Where do you work from?',
    useLocation:    'Use current location',
    selectArea:     'Enter area manually',
    howOld:         'How old are you?',
    continue:       'Continue',
    locationDenied: 'Location permission was denied. Please enter your area manually.',
    locationError:  'Could not get location. Please try again or enter manually.',
  });

  // Translated role labels
  const [roleLabels, setRoleLabels] = useState({});

  // Translate all UI strings when language changes
  useEffect(() => {
    navigation.setOptions({ title: SCREEN_TITLE });
    if (currentLang === 'en') return;

    let cancelled = false;
    const keys   = Object.values(ui);
    const roleKeys = ROLES.flatMap(r => [r.title, r.subtitle]);

    Promise.all([...keys, ...roleKeys].map(s => translateString(s, currentLang)))
      .then(results => {
        if (cancelled) return;
        const uiKeys = Object.keys(ui);
        const newUi  = {};
        uiKeys.forEach((k, i) => { newUi[k] = results[i]; });
        setUi(newUi);
        navigation.setOptions({ title: newUi.title });

        const rl = {};
        ROLES.forEach((r, i) => {
          rl[r.id + '_title']    = results[keys.length + i * 2];
          rl[r.id + '_subtitle'] = results[keys.length + i * 2 + 1];
        });
        setRoleLabels(rl);
      });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang]);

  // ── GPS helpers (same logic as HereJobScreen) ───────────────────
  const requestLocation = async () => {
    setGpsLoading(true);
    setGpsStatus('');
    setGpsIsLive(false);

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title:           'Location Permission',
            message:         'Needed to set your work location.',
            buttonPositive:  'Allow',
            buttonNegative:  'Deny',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setGpsLoading(false);
          setGpsStatus('Permission denied');
          setGpsIsLive(false);
          Alert.alert('Permission Denied', ui.locationDenied);
          return;
        }
      }

      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude, accuracy } }) => {
          const label = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}  (~${Math.round(accuracy)}m)`;
          setUserData(prev => ({
            ...prev,
            location:      { lat: latitude, lng: longitude },
            locationLabel: label,
          }));
          setGpsStatus('Live GPS  ~' + Math.round(accuracy) + 'm');
          setGpsIsLive(true);
          setGpsLoading(false);
        },
        err => {
          setGpsLoading(false);
          setGpsStatus('GPS error (code ' + err.code + ')');
          setGpsIsLive(false);
          Alert.alert('Location Error', ui.locationError);
        },
        {
          enableHighAccuracy:   true,
          timeout:              15000,
          maximumAge:           0,
          forceRequestLocation: true,
          showLocationDialog:   true,
        }
      );
    } catch {
      setGpsLoading(false);
      setGpsStatus('GPS exception');
      setGpsIsLive(false);
    }
  };

  // ── Validation + continue ────────────────────────────────────────
  const handleContinue = () => {
    if (!userData.name.trim()) {
      Alert.alert('Name required', 'Please enter your name to continue.');
      return;
    }
    if (!userData.role) {
      Alert.alert('Role required', 'Please select whether you are a Worker or an Employer.');
      return;
    }
    // ── Employers skip AboutWork (work-type selection is irrelevant for them)
    //    and go straight to their dashboard, saving profile immediately.
    //    Workers continue to AboutWork to pick their trade & experience.
    if (userData.role === 'employer') {
      // Import updateProfile at the top of the component (already destructured below)
      updateProfile(userData);
      navigation.reset({ index: 0, routes: [{ name: 'EmployerHome' }] });
    } else {
      navigation.navigate('AboutWork', { userData });
    }
  };

  const canContinue = userData.name.trim().length > 0 && userData.role !== '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.screenContainer}
        contentContainerStyle={{ paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page header ── */}
        <T style={styles.screenTitle}>{ui.title}</T>
        <T style={styles.screenSubtitle}>{ui.subtitle}</T>

        {/* ══════════════════════════════════════════
            SECTION 1 — Name
        ══════════════════════════════════════════ */}
        <View style={sectionCard}>
          <View style={sectionIconRow}>
            <Text style={sectionIconText}>✏️</Text>
            <T style={sectionLabel}>{ui.yourName}</T>
          </View>
          <TextInput
            style={nameInput}
            value={userData.name}
            onChangeText={v => setUserData(prev => ({ ...prev, name: v }))}
            placeholder={ui.namePlaceholder}
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            returnKeyType="done"
          />
        </View>

        {/* ══════════════════════════════════════════
            SECTION 2 — Role picker
        ══════════════════════════════════════════ */}
        <View style={sectionCard}>
          <View style={sectionIconRow}>
            <Text style={sectionIconText}>🪪</Text>
            <T style={sectionLabel}>{ui.youAre}</T>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {ROLES.map(role => {
              const active = userData.role === role.id;
              return (
                <TouchableOpacity
                  key={role.id}
                  activeOpacity={0.8}
                  style={[
                    roleCard,
                    { borderColor: active ? role.accent : '#E5EAF2' },
                    active && { backgroundColor: role.bg },
                  ]}
                  onPress={() => setUserData(prev => ({ ...prev, role: role.id }))}
                >
                  {/* Checkmark tick */}
                  {active && (
                    <View style={[tickBadge, { backgroundColor: role.accent }]}>
                      <Text style={tickText}>✓</Text>
                    </View>
                  )}
                  <Text style={roleIconText}>{role.icon}</Text>
                  <Text style={[roleTitleText, active && { color: role.accent }]}>
                    {roleLabels[role.id + '_title'] || role.title}
                  </Text>
                  <Text style={roleSubText}>
                    {roleLabels[role.id + '_subtitle'] || role.subtitle}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ══════════════════════════════════════════
            SECTION 3 — Location (same GPS logic as HereJobScreen)
        ══════════════════════════════════════════ */}
        <View style={sectionCard}>
          <View style={sectionIconRow}>
            <Text style={sectionIconText}>📍</Text>
            <T style={sectionLabel}>{ui.whereWork}</T>
          </View>

          {/* Use current location button */}
          <TouchableOpacity
            style={[styles.inputButton, gpsLoading && { opacity: 0.7 }]}
            onPress={requestLocation}
            disabled={gpsLoading}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {gpsLoading
                ? <ActivityIndicator size="small" color="#FFF" style={{ marginRight: 8 }} />
                : <Text style={[styles.inputButtonText, { marginRight: 4 }]}>📍 </Text>
              }
              <T style={styles.inputButtonText}>{ui.useLocation}</T>
            </View>
          </TouchableOpacity>

          {/* GPS status pill — identical to HereJobScreen's design */}
          {gpsStatus ? (
            <View style={[
              gpsPill,
              { backgroundColor: gpsIsLive ? '#EAF2FB' : '#FFE5E5', marginTop: 10 }
            ]}>
              <View style={[
                gpsDot,
                { backgroundColor: gpsIsLive ? '#4A90E2' : '#FF6B6B' }
              ]} />
              <Text style={[
                gpsPillText,
                { color: gpsIsLive ? '#4A90E2' : '#FF6B6B' }
              ]}>
                {gpsStatus}
              </Text>
            </View>
          ) : null}

          {/* Confirmed location display */}
          {userData.location && (
            <View style={locationConfirmed}>
              <Text style={locationConfirmedText}>
                ✅  Location saved — {userData.locationLabel}
              </Text>
            </View>
          )}

          {/* Manual fallback input */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={[nameInput, { marginTop: 0 }]}
              value={userData.locationLabel.startsWith('1') || userData.locationLabel.startsWith('2') || !userData.location
                ? (!userData.location ? userData.locationLabel : '')
                : ''}
              onChangeText={v => setUserData(prev => ({
                ...prev,
                locationLabel: v,
                location: null,   // clear GPS coords if user types manually
              }))}
              placeholder={ui.selectArea}
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
            />
          </View>
        </View>

        {/* ══════════════════════════════════════════
            SECTION 4 — Age
        ══════════════════════════════════════════ */}
        <View style={sectionCard}>
          <View style={sectionIconRow}>
            <Text style={sectionIconText}>🎂</Text>
            <T style={sectionLabel}>{ui.howOld}</T>
          </View>
          <View style={styles.ageButtonContainer}>
            {AGE_OPTIONS.map(age => (
              <AgeButton
                key={age}
                age={age}
                isActive={userData.age === age}
                onPress={() => setUserData(prev => ({ ...prev, age }))}
              />
            ))}
          </View>
        </View>

        {/* ── Continue button ── */}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            !canContinue && { opacity: 0.45 },
          ]}
          onPress={handleContinue}
          activeOpacity={canContinue ? 0.85 : 1}
        >
          <T style={styles.primaryButtonText}>{ui.continue}</T>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// ── Local style objects (kept as plain objects to avoid StyleSheet
//    overhead for one-off styles, matching the existing file's pattern)
const sectionCard = {
  backgroundColor: '#FFFFFF',
  borderRadius: 14,
  padding: 16,
  marginBottom: 14,
  shadowColor: '#1A6BCC',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
};

const sectionIconRow = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
};

const sectionIconText = {
  fontSize: 16,
  marginRight: 8,
};

const sectionLabel = {
  fontSize: 14,
  fontWeight: '700',
  color: '#1A1F36',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

const nameInput = {
  backgroundColor: '#F4F6FF',
  borderRadius: 10,
  paddingHorizontal: 14,
  paddingVertical: 13,
  fontSize: 16,
  color: '#1A1F36',
  borderWidth: 1,
  borderColor: '#E5EAF2',
  marginTop: 2,
};

const roleCard = {
  flex: 1,
  borderRadius: 14,
  borderWidth: 2,
  padding: 16,
  alignItems: 'center',
  backgroundColor: '#FAFAFA',
  position: 'relative',
};

const tickBadge = {
  position: 'absolute',
  top: 8,
  right: 8,
  width: 20,
  height: 20,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
};

const tickText = {
  color: '#FFF',
  fontSize: 11,
  fontWeight: '800',
};

const roleIconText = {
  fontSize: 32,
  marginBottom: 8,
};

const roleTitleText = {
  fontSize: 13,
  fontWeight: '700',
  color: '#1A1F36',
  textAlign: 'center',
  marginBottom: 4,
};

const roleSubText = {
  fontSize: 11,
  color: '#6B7280',
  textAlign: 'center',
  lineHeight: 15,
};

const gpsPill = {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
};

const gpsDot = {
  width: 7,
  height: 7,
  borderRadius: 4,
  marginRight: 6,
};

const gpsPillText = {
  fontSize: 12,
  fontWeight: '600',
};

const locationConfirmed = {
  backgroundColor: '#E8F8EF',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginTop: 10,
};

const locationConfirmedText = {
  fontSize: 12,
  color: '#1B5E20',
  fontWeight: '500',
};

export default GetStartedScreen;