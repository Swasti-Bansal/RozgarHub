// src/components/WorkTypeCard.js - Work Type Card (Optional)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WorkTypeCard = ({ work, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: work.color }, isActive && styles.cardActive]}
      onPress={onPress}
    >
      <Text style={styles.icon}>{work.icon}</Text>
      <Text style={styles.label}>{work.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { width: '48%', aspectRatio: 1, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  cardActive: { borderWidth: 3, borderColor: '#2C3E50' },
  icon: { fontSize: 40, marginBottom: 10 },
  label: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default WorkTypeCard;
