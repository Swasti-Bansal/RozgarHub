// src/screens/JobDetailScreen.js
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';

const JobDetailScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Mason at Andheri West</Text>
        <Text style={styles.subTitle}>⭐ 4.8 | ₹ 8,500</Text>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>📍 Mumbai - Andheri West</Text>
          <Text style={styles.detailLabel}>👤 Construction Project</Text>
          <View style={styles.ratingStars}>
            <Text>⭐⭐⭐⭐⭐</Text>
          </View>
        </View>

        <View style={styles.workerCard}>
          <View style={styles.workerAvatar}>
            <Text style={styles.avatarText}>👷</Text>
          </View>
          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>Work Site: Building A</Text>
            <Text style={styles.workerRole}>At: Construction Site</Text>
            <Text style={styles.workerExp}>📋 27 Jul - Duration: 9-6</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text>⭐ 4.5</Text>
          </View>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>Available Workers</Text>
          <TouchableOpacity style={styles.shortlistButton}>
            <Text style={styles.shortlistButtonText}>📋 Shortlist</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.workerCard}>
          <View style={styles.workerAvatar}>
            <Text style={styles.avatarText}>👷</Text>
          </View>
          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>Aukshan</Text>
            <Text style={styles.workerRole}>Python, Masonry Expert</Text>
            <Text style={styles.workerExp}>📋 Experience: 5+ years</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text>⭐ 4.8</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailScreen;
