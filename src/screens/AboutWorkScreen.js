// src/screens/AboutWorkScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';

const AboutWorkScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ workType: '', experience: '' });

  const workTypes = [
    { id: 'construction', label: 'Construction', icon: '🏗️', color: '#FF8A65' },
    { id: 'plumbing', label: 'Plumbing', icon: '🔧', color: '#9575CD' },
    { id: 'electrical', label: 'Electrical', icon: '⚡', color: '#4DB6AC' },
    { id: 'painting', label: 'Painting', icon: '🎨', color: '#FFB74D' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>About your work</Text>
        <Text style={styles.screenSubtitle}>Tell us more</Text>

        <Text style={styles.inputLabel}>What kind of work do you do?</Text>
        <View style={styles.workTypeGrid}>
          {workTypes.map((work) => (
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
              <Text style={styles.workTypeLabel}>{work.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.inputLabel, { marginTop: 20 }]}>Your experience</Text>
        <View style={styles.ageButtonContainer}>
          {['New (0-1 yr)', '1-3 yrs', '3+ yrs'].map((exp) => (
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
              ]}>{exp}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomButtonRow}>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.finishButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutWorkScreen;
