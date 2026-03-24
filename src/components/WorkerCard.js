import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkerCard = ({ worker }) => {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>👷</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{worker.name}</Text>
        <Text style={styles.role}>{worker.role}</Text>
      </View>
      {worker.rating && (
        <View style={styles.badge}>
          <Text>⭐ {worker.rating}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E8F4F8', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { fontSize: 24 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  role: { fontSize: 14, color: '#7F8C8D' },
  badge: { backgroundColor: '#FFF9E6', padding: 5, borderRadius: 8, borderWidth: 1, borderColor: '#FFD700' },
});

export default WorkerCard;
