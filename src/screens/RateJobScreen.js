// src/screens/RateJobScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/commonStyles';
import Header from '../components/Header';

const RateJobScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [experience, setExperience] = useState('');

  const experienceOptions = ['Poor', 'Okay', 'Good', 'Great'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.screenContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Rate the Job" navigation={navigation} />

        {/* ── Job summary card ── */}
        <View style={styles.ongoingJobCard}>
          <View style={[styles.ongoingJobAccent, { backgroundColor: '#4A90E2' }]} />
          <View style={styles.ongoingJobBody}>
            <View style={styles.ongoingJobTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.ongoingJobTitle}>Electrician</Text>
                <Text style={styles.ongoingJobLoc}>📍 Bandra, Mumbai</Text>
              </View>
              <View style={styles.ongoingJobPayCol}>
                <Text style={styles.ongoingJobPay}>₹700</Text>
                <Text style={styles.ongoingJobDur}>9 hrs</Text>
              </View>
            </View>
            <Text style={styles.ongoingJobMeta}>🕒 Project Manager</Text>
          </View>
        </View>

        {/* ── Job progress tracker ── */}
        <Text style={[styles.inputLabel, { marginTop: 8 }]}>Job Progress</Text>
        <View style={styles.rateProgressRow}>

          <View style={styles.rateStepCol}>
            <View style={[styles.rateCircle, styles.rateCircleDone]}>
              <Text style={styles.rateCircleCheckText}>✓</Text>
            </View>
            <Text style={styles.rateStepLabel}>Accepted</Text>
          </View>

          <View style={[styles.rateProgressLine, { backgroundColor: '#5CB85C' }]} />

          <View style={styles.rateStepCol}>
            <View style={[styles.rateCircle, styles.rateCircleDone]}>
              <Text style={styles.rateCircleCheckText}>✓</Text>
            </View>
            <Text style={styles.rateStepLabel}>In Progress</Text>
          </View>

          <View style={[styles.rateProgressLine, { backgroundColor: '#E0E0E0' }]} />

          <View style={styles.rateStepCol}>
            <View style={styles.rateCircle}>
              <View style={styles.rateCircleInner} />
            </View>
            <Text style={styles.rateStepLabel}>Completed</Text>
          </View>

        </View>

        {/* ── Star rating ── */}
        <Text style={[styles.inputLabel, { marginTop: 24 }]}>Rate this job</Text>
        <View style={styles.rateStarsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.rateStar,
                star <= rating ? styles.rateStarActive : styles.rateStarInactive,
              ]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Experience ── */}
        <Text style={[styles.inputLabel, { marginTop: 24 }]}>How was your experience?</Text>
        <View style={styles.rateExpRow}>
          {experienceOptions.map((exp) => (
            <TouchableOpacity
              key={exp}
              style={[
                styles.rateExpBtn,
                experience === exp ? styles.rateExpBtnActive : null,
              ]}
              onPress={() => setExperience(exp)}
              activeOpacity={0.75}
            >
              <Text style={[
                styles.rateExpBtnText,
                experience === exp ? styles.rateExpBtnTextActive : null,
              ]}>
                {exp}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Submit button ── */}
        <TouchableOpacity
          style={[
            styles.finishButton,
            { marginTop: 32 },
            (!rating || !experience) ? { opacity: 0.5 } : null,
          ]}
          activeOpacity={rating && experience ? 0.85 : 1}
          onPress={() => (rating && experience) && navigation.navigate('Home')}
        >
          <Text style={styles.finishButtonText}>Submit Rating  →</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RateJobScreen;