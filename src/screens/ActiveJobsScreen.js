// src/screens/ActiveJobsScreen.js
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';

const ActiveJobsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.tabRow}>
          <TouchableOpacity style={styles.tabItemActive}>
            <Text style={styles.tabItemActiveText}>My Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabItemText}>Searches</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Active Job</Text>
        <Text style={styles.subTitle}>Currently ongoing</Text>

        <TouchableOpacity 
          style={styles.activeJobCard}
          // onPress={() => navigation.navigate('JobDetail')}
        >
          <View style={styles.activeJobHeader}>
            <Text style={styles.activeJobTitle}>Painter</Text>
            <Text style={styles.activeJobStatus}>🕐 Ongoing</Text>
          </View>
          <Text style={styles.activeJobLocation}>at Vasarae</Text>
          <View style={styles.activeJobDetails}>
            <Text>🏢 Workshop</Text>
            <Text>👤 Client: C3 Construction</Text>
            <Text>⏱️ Started: 2 hours ago</Text>
          </View>
          <Text style={styles.activeJobPayment}>₹5000/7hrs</Text>
        </TouchableOpacity>

        <View style={styles.illustrationContainer}>
          <Text style={styles.illustrationIcon}>👷‍♂️</Text>
          <Text style={styles.illustrationIcon}>👷</Text>
        </View>

        <Text style={styles.sectionTitle}>Active Jobs</Text>

        <TouchableOpacity style={styles.activeJobCard}>
          <View style={styles.activeJobHeader}>
            <Text style={styles.activeJobTitle}>Painter</Text>
            <Text style={styles.activeJobStatus}>🕐 Scheduled</Text>
          </View>
          <Text style={styles.activeJobLocation}>at Chembur</Text>
          <View style={styles.activeJobDetails}>
            <Text>🏢 Residential</Text>
            <Text>⏱️ Starts: 30th Oct</Text>
          </View>
          <Text style={styles.activeJobPayment}>₹3500/5hrs</Text>
          <View style={styles.jobCardFooter}>
            <Text>⏰ Time Flexible</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkButtonText}>Continue similarly →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActiveJobsScreen;
