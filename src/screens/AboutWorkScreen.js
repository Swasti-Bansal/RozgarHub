// src/screens/AboutWorkScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';
import { useTranslation, _cache } from '../context/TranslationContext';

const WORK_TYPES = [
  { id: 'construction', label: 'Construction', icon: '🏗️', color: '#FF8A65' },
  { id: 'plumbing',     label: 'Plumbing',     icon: '🔧', color: '#9575CD' },
  { id: 'electrical',   label: 'Electrical',   icon: '⚡', color: '#4DB6AC' },
  { id: 'painting',     label: 'Painting',     icon: '🎨', color: '#FFB74D' },
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

const AboutWorkScreen = ({ navigation }) => {
  const [userData, setUserData]         = useState({ workType: '', experience: '' });
  const [translatedLabels, setLabels]   = useState({});
  const [translatedStrings, setStrings] = useState({
    headerTitle: 'About Your Work',
    pageTitle:   'About your work',
    subtitle:    'Tell us more',
    workQuestion:'What kind of work do you do?',
    experience:  'Your experience',
    skip:        'Skip for now',
    finish:      'Finish',
  });

  const { currentLang } = useTranslation();

  useEffect(() => {
    let cancelled = false;

    const translateAll = async () => {
      // Translate all static strings + work type labels + exp options in parallel
      const staticKeys = [
        'About Your Work',
        'About your work',
        'Tell us more',
        'What kind of work do you do?',
        'Your experience',
        'Skip for now',
        'Finish',
      ];

      const workLabels  = WORK_TYPES.map(w => w.label);
      const expLabels   = EXP_OPTIONS;
      const allStrings  = [...staticKeys, ...workLabels, ...expLabels];

      const results = await Promise.all(
        allStrings.map(s => translateString(s, currentLang))
      );

      if (cancelled) return;

      const [
        headerTitle, pageTitle, subtitle,
        workQuestion, experience, skip, finish,
        ...rest
      ] = results;

      // Map work type labels
      const labelMap = {};
      WORK_TYPES.forEach((w, i) => { labelMap[w.id] = rest[i]; });

      // Map exp options
      const expMap = {};
      EXP_OPTIONS.forEach((e, i) => { expMap[e] = rest[WORK_TYPES.length + i]; });

      setStrings({ headerTitle, pageTitle, subtitle, workQuestion, experience, skip, finish });
      setLabels({ ...labelMap, ...expMap });
      navigation.setOptions({ title: headerTitle });
    };

    translateAll();
    return () => { cancelled = true; };
  }, [currentLang]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>

        <Text style={styles.screenTitle}>{translatedStrings.pageTitle}</Text>
        <Text style={styles.screenSubtitle}>{translatedStrings.subtitle}</Text>

        <Text style={styles.inputLabel}>{translatedStrings.workQuestion}</Text>
        <View style={styles.workTypeGrid}>
          {WORK_TYPES.map((work) => (
            <TouchableOpacity
              key={work.id}
              style={[
                styles.workTypeCard,
                { backgroundColor: work.color },
                userData.workType === work.id && styles.workTypeCardActive,
              ]}
              onPress={() => setUserData({ ...userData, workType: work.id })}
            >
              <Text style={styles.workTypeIcon}>{work.icon}</Text>
              <Text style={styles.workTypeLabel}>
                {translatedLabels[work.id] || work.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.inputLabel, { marginTop: 20 }]}>
          {translatedStrings.experience}
        </Text>
        <View style={styles.ageButtonContainer}>
          {EXP_OPTIONS.map((exp) => (
            <TouchableOpacity
              key={exp}
              style={[
                styles.ageButton,
                userData.experience === exp && styles.ageButtonActive,
              ]}
              onPress={() => setUserData({ ...userData, experience: exp })}
            >
              <Text style={[
                styles.ageButtonText,
                userData.experience === exp && styles.ageButtonTextActive,
              ]}>
                {translatedLabels[exp] || exp}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomButtonRow}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.skipButtonText}>{translatedStrings.skip}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.finishButtonText}>{translatedStrings.finish}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default AboutWorkScreen;