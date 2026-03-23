// src/components/JobCard.js - Reusable Job Card (Optional)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const JobCard = ({ job, onAccept }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.location}>{job.location}</Text>
      <Text style={styles.payment}>{job.payment}</Text>
      {onAccept && (
        <TouchableOpacity style={styles.button} onPress={onAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 15 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  location: { fontSize: 14, color: '#7F8C8D' },
  payment: { fontSize: 16, fontWeight: 'bold', color: '#5CB85C', marginTop: 5 },
  button: { backgroundColor: '#5CB85C', padding: 10, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold', textAlign: 'center' },
});

export default JobCard;
