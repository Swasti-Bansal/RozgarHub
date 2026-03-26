// src/screens/AboutWorkScreen.js
import React, { useState } from 'react';
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

const AboutWorkScreen = ({ navigation }) => {
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [otherWork, setOtherWork]         = useState('');
  const [experience, setExperience]       = useState('');

  const workTypes = [
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.screenContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header title="About Your Work" navigation={navigation} />
        <Text style={styles.screenSubtitle}>Select all work types that apply</Text>

        {/* ── Work type grid — multi select ── */}
        <Text style={styles.inputLabel}>What kind of work do you do?</Text>
        js<View style={[styles.workTypeGrid, { marginBottom: -10 }]}>
          {workTypes.map((work) => {
            const isActive = selectedWorks.includes(work.id);
            return (
              <TouchableOpacity
                key={work.id}
                style={[
                  styles.workTypeCard,
                  { backgroundColor: work.color },
                  isActive && styles.workTypeCardActive,
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
                <Text style={styles.workTypeLabel}>{work.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Other input ── */}
        {showOtherInput && (
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.inputLabel}>Describe your work</Text>
            <TextInput
              style={styles.otherWorkInput}
              placeholder="e.g. Tiling, Waterproofing, AC Repair..."
              placeholderTextColor="#AAB0B7"
              value={otherWork}
              onChangeText={setOtherWork}
              maxLength={80}
            />
          </View>
        )}

        {/* ── Experience ── */}
        <Text style={[styles.inputLabel, { marginTop: 8 }]}>Your experience</Text>
        <View style={styles.ageButtonContainer}>
          {['New (0-1 yr)', '1-3 yrs', '3+ yrs'].map((exp) => (
            <TouchableOpacity
              key={exp}
              style={[
                styles.ageButton,
                experience === exp && styles.ageButtonActive,
              ]}
              onPress={() => setExperience(exp)}
            >
              <Text style={[
                styles.ageButtonText,
                experience === exp && styles.ageButtonTextActive,
              ]}>
                {exp}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Bottom buttons ── */}
        <View style={styles.bottomButtonRow}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.finishButton,
              { opacity: canContinue ? 1 : 0.5 },
            ]}
            onPress={() => canContinue && navigation.navigate('Home')}
            activeOpacity={canContinue ? 0.8 : 1}
          >
            <Text style={styles.finishButtonText}>Finish →</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutWorkScreen;