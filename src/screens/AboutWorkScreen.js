// src/screens/AboutWorkScreen.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from '../styles/commonStyles';
import Header from '../components/Header';
import { useTranslation, _cache } from '../context/TranslationContext';
import { useUser } from '../context/UserContext';

const WORK_TYPES = [
  { id: 'construction', label: 'Construction', icon: '🏗️', color: '#FF8A65' },
  { id: 'plumbing',     label: 'Plumbing',     icon: '🔧', color: '#9575CD' },
  { id: 'electrical',  label: 'Electrical',   icon: '⚡', color: '#4DB6AC' },
  { id: 'painting',    label: 'Painting',     icon: '🎨', color: '#FFB74D' },
  { id: 'carpentry',   label: 'Carpentry',    icon: '🪚', color: '#8D6E63' },
  { id: 'welding',     label: 'Welding',      icon: '🔥', color: '#EF5350' },
  { id: 'cleaning',    label: 'Cleaning',     icon: '🧹', color: '#26A69A' },
  { id: 'security',    label: 'Security',     icon: '🛡️', color: '#5C6BC0' },
  { id: 'driving',     label: 'Driving',      icon: '🚗', color: '#42A5F5' },
  { id: 'gardening',   label: 'Gardening',    icon: '🌿', color: '#66BB6A' },
  { id: 'other',       label: 'Other',        icon: '➕', color: '#90A4AE' },
];

const EXP_OPTIONS = ['New (0-1 yr)', '1-3 yrs', '3+ yrs'];

const translateString = async (text, lang) => {
  if (lang === 'en' || !text) return text;
  const key = `${text}__${lang}`;
  if (_cache[key]) return _cache[key];
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`
    );
    const data = await res.json();
    if (data.responseStatus === 200) {
      const clean = data.responseData.translatedText
        .replace(/@\s*\w+\s*:\s*\w+/g, '').trim();
      _cache[key] = clean;
      return clean;
    }
  } catch {}
  return text;
};

const AboutWorkScreen = ({ navigation, route }) => {
  const incomingUserData = route?.params?.userData ?? {};
  const { updateProfile } = useUser();
  const { currentLang } = useTranslation();

  // ── UI state — multi select ──
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [otherWork, setOtherWork]         = useState('');
  const [experience, setExperience]       = useState('');

  // ── Translation state ──
  const [translatedLabels, setLabels]   = useState({});
  const [translatedStrings, setStrings] = useState({
    headerTitle:  'About Your Work',
    subtitle:     'Select all work types that apply',
    workQuestion: 'What kind of work do you do?',
    otherLabel:   'Describe your work',
    experience:   'Your experience',
    skip:         'Skip for now',
    finish:       'Finish',
  });

  const toggleWork = (id) => {
    setSelectedWorks(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const showOtherInput = selectedWorks.includes('other');

  const canContinue =
    selectedWorks.length > 0 &&
    (!showOtherInput || otherWork.trim().length > 0) &&
    experience !== '';

  // ── Translation effect ──
  useEffect(() => {
    let cancelled = false;

    const translateAll = async () => {
      const staticKeys = [
        'About Your Work',
        'Select all work types that apply',
        'What kind of work do you do?',
        'Describe your work',
        'Your experience',
        'Skip for now',
        'Finish',
      ];
      const workLabels = WORK_TYPES.map(w => w.label);
      const expLabels  = EXP_OPTIONS;
      const allStrings = [...staticKeys, ...workLabels, ...expLabels];

      const results = await Promise.all(
        allStrings.map(s => translateString(s, currentLang))
      );
      if (cancelled) return;

      const [
        headerTitle, subtitle, workQuestion,
        otherLabel, experience, skip, finish,
        ...rest
      ] = results;

      const labelMap = {};
      WORK_TYPES.forEach((w, i) => { labelMap[w.id] = rest[i]; });
      const expMap = {};
      EXP_OPTIONS.forEach((e, i) => { expMap[e] = rest[WORK_TYPES.length + i]; });

      setStrings({ headerTitle, subtitle, workQuestion, otherLabel, experience, skip, finish });
      setLabels({ ...labelMap, ...expMap });
      navigation.setOptions({ title: headerTitle });
    };

    translateAll();
    return () => { cancelled = true; };
  }, [currentLang]);

  // ── Save to UserContext ──
  const handleFinish = () => {
    updateProfile({
      ...incomingUserData,
      workTypes:  selectedWorks,
      otherWork:  showOtherInput ? otherWork : '',
      experience: experience,
    });
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  const handleSkip = () => {
    updateProfile(incomingUserData);
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.screenContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header title={translatedStrings.headerTitle} navigation={navigation} />
        <Text style={styles.screenSubtitle}>{translatedStrings.subtitle}</Text>

        {/* ── Work type grid — multi select ── */}
        <Text style={styles.inputLabel}>{translatedStrings.workQuestion}</Text>
        <View style={[styles.workTypeGrid, { marginBottom: -10 }]}>
          {WORK_TYPES.map((work) => {
            const isActive = selectedWorks.includes(work.id);
            return (
              <TouchableOpacity
                key={work.id}
                style={[
                  styles.workTypeCard,
                  { backgroundColor: work.color },
                  isActive ? styles.workTypeCardActive : null,
                ]}
                onPress={() => toggleWork(work.id)}
                activeOpacity={0.75}
              >
                {isActive && (
                  <View style={styles.workTypeCheckBadge}>
                    <Text style={styles.workTypeCheckText}>✓</Text>
                  </View>
                )}
                <Text style={styles.workTypeIcon}>{work.icon}</Text>
                <Text style={styles.workTypeLabel}>
                  {translatedLabels[work.id] || work.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Other input ── */}
        {showOtherInput && (
          <TextInput
            style={[styles.otherWorkInput, { marginBottom: 16, marginTop: -8 }]}
            placeholder="e.g. Tiling, Waterproofing, AC Repair..."
            placeholderTextColor="#AAB0B7"
            value={otherWork}
            onChangeText={setOtherWork}
            maxLength={80}
          />
        )}

        {/* ── Experience ── */}
        <Text style={[styles.inputLabel, { marginTop: 8 }]}>
          {translatedStrings.experience}
        </Text>
        <View style={styles.ageButtonContainer}>
          {EXP_OPTIONS.map((exp) => (
            <TouchableOpacity
              key={exp}
              style={[
                styles.ageButton,
                experience === exp ? styles.ageButtonActive : null,
              ]}
              onPress={() => setExperience(exp)}
            >
              <Text style={[
                styles.ageButtonText,
                experience === exp ? styles.ageButtonTextActive : null,
              ]}>
                {translatedLabels[exp] || exp}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Bottom buttons ── */}
        <View style={styles.bottomButtonRow}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>{translatedStrings.skip}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.finishButton, { opacity: canContinue ? 1 : 0.5 }]}
            onPress={handleFinish}
            activeOpacity={canContinue ? 0.8 : 1}
          >
            <Text style={styles.finishButtonText}>{translatedStrings.finish} →</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutWorkScreen;