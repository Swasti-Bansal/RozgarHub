import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CATEGORY_COLORS = {
  Mason: '#FF6B6B',
  Electrician: '#F5A623',
  Plumber: '#4A90E2',
  Carpenter: '#27AE60',
  Painter: '#9B59B6',
  Helper: '#E67E22',
};

export default function WorkerCard({ worker, onHire, onShortlist }) {
  const color = CATEGORY_COLORS[worker.category] || '#4A90E2';
  const initials = worker.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <View style={s.jobCard}>

      {/* TOP ROW */}
      <View style={s.workerCard}>
        <View style={[s.workerAvatar, { backgroundColor: color + '22' }]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color }}>{initials}</Text>
        </View>
        <View style={s.workerInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            <Text style={s.workerName}>{worker.name}</Text>
            {worker.verified && (
              <View style={s.verifiedBadge}>
                <Text style={s.verifiedText}>✓ Verified</Text>
              </View>
            )}
          </View>
          <View style={[s.categoryBadge, { backgroundColor: color + '22' }]}>
            <Text style={[s.categoryText, { color }]}>{worker.category}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={s.jobPayment}>₹{worker.dailyRate}</Text>
          <Text style={s.workerExp}>/day</Text>
        </View>
      </View>

      {/* DETAILS */}
      <View style={s.detailsRow}>
        <Text style={s.detailItem}>📍 {worker.location}</Text>
        <Text style={s.detailItem}>⏱ {worker.experience}</Text>
        <Text style={s.detailItem}>🛠 {worker.jobsDone} jobs</Text>
      </View>

      {/* RATING */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <View style={s.ratingBadge}>
          <Text style={{ color: '#F5A623', fontWeight: 'bold', fontSize: 13 }}>
            ★ {worker.rating.toFixed(1)}
          </Text>
        </View>
        <Text style={s.workerExp}>  ({worker.reviews} reviews)</Text>
        <View style={{ flex: 1 }} />
        <Text style={s.workerExp}>{worker.distance} away</Text>
      </View>

      {/* SKILLS */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
        {worker.skills.map(skill => (
          <View key={skill} style={s.skillChip}>
            <Text style={s.skillText}>{skill}</Text>
          </View>
        ))}
      </View>

      {/* AVAILABILITY */}
      <View style={[
        s.availBadge,
        { backgroundColor: worker.available ? '#E8F8EF' : '#FDECEA' }
      ]}>
        <View style={[
          s.availDot,
          { backgroundColor: worker.available ? '#27AE60' : '#E74C3C' }
        ]} />
        <Text style={[
          s.availText,
          { color: worker.available ? '#27AE60' : '#E74C3C' }
        ]}>
          {worker.available ? 'Available Now' : 'Currently Busy'}
        </Text>
      </View>

      {/* BUTTONS */}
      <View style={s.jobCardFooter}>
        <TouchableOpacity
          style={s.shortlistButton}
          onPress={() => onShortlist && onShortlist(worker)}>
          <Text style={s.shortlistButtonText}>Shortlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.acceptButton}
          onPress={() => onHire && onHire(worker)}>
          <Text style={s.acceptButtonText}>Hire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  jobCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 15,
    marginBottom: 15,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  workerCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  workerAvatar: {
    width: 50, height: 50, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  workerInfo: { flex: 1 },
  workerName: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginRight: 6 },
  workerExp: { fontSize: 13, color: '#7F8C8D' },
  verifiedBadge: {
    backgroundColor: '#E8F8EF', paddingHorizontal: 6,
    paddingVertical: 2, borderRadius: 6,
  },
  verifiedText: { fontSize: 10, color: '#27AE60', fontWeight: '700' },
  categoryBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 8,
    paddingVertical: 3, borderRadius: 6, marginTop: 4,
  },
  categoryText: { fontSize: 12, fontWeight: '700' },
  jobPayment: { fontSize: 18, fontWeight: 'bold', color: '#5CB85C' },
  detailsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  detailItem: { fontSize: 13, color: '#7F8C8D' },
  ratingBadge: {
    backgroundColor: '#FFF9E6', paddingHorizontal: 8,
    paddingVertical: 4, borderRadius: 8,
    borderWidth: 1, borderColor: '#FFD700',
  },
  skillChip: {
    backgroundColor: '#F5F7FA', paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 8, marginRight: 6,
    marginBottom: 4, borderWidth: 1, borderColor: '#E0E0E0',
  },
  skillText: { fontSize: 12, color: '#7F8C8D', fontWeight: '600' },
  availBadge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 8, alignSelf: 'flex-start', marginBottom: 12,
  },
  availDot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  availText: { fontSize: 13, fontWeight: '600' },
  jobCardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  shortlistButton: {
    flex: 1, backgroundColor: '#EBF3FD',
    padding: 12, borderRadius: 8,
    alignItems: 'center', marginRight: 8,
    borderWidth: 1, borderColor: '#4A90E2',
  },
  shortlistButtonText: { color: '#4A90E2', fontWeight: 'bold', fontSize: 14 },
  acceptButton: {
    flex: 1, backgroundColor: '#4A90E2',
    padding: 12, borderRadius: 8, alignItems: 'center',
  },
  acceptButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
});
