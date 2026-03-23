// src/screens/RateJobScreen.js
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';

const RateJobScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Rate the job</Text>
        <Text style={styles.jobLocation}>🔥 Andheri West, Mumbai</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingItem}>
            <View style={[styles.ratingCircle, styles.ratingCircleActive]} />
            <Text style={styles.ratingLabel}>Accepted</Text>
          </View>
          <View style={styles.ratingLine} />
          <View style={styles.ratingItem}>
            <View style={[styles.ratingCircle, styles.ratingCircleActive]} />
            <Text style={styles.ratingLabel}>In progress</Text>
          </View>
          <View style={styles.ratingLine} />
          <View style={styles.ratingItem}>
            <View style={styles.ratingCircle} />
            <Text style={styles.ratingLabel}>Completed</Text>
          </View>
        </View>

        <Text style={[styles.inputLabel, { marginTop: 30 }]}>Your experience</Text>
        <View style={styles.ageButtonContainer}>
          {['New (0-1 yr)', '1-3 yrs', '3+ yrs'].map((exp) => (
            <TouchableOpacity key={exp} style={styles.ageButton}>
              <Text style={styles.ageButtonText}>{exp}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.jobCard}>
          <Text style={styles.jobTitle}>Electrician</Text>
          <Text style={styles.jobLocation}>at Bandra</Text>
          <Text style={styles.jobPayment}>₹700</Text>
          <View style={styles.jobCardFooter}>
            <Text>🕒 Project Manager</Text>
            <Text>9hrs</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RateJobScreen;
