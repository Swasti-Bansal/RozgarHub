import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, SafeAreaView, Alert,
} from 'react-native';

const ONGOING_JOBS = [
  {
    id: '1', title: 'Painter', status: 'Ongoing', statusColor: '#F5A623',
    statusBg: '#FFF3DC', borderColor: '#F5A623',
    location: 'Vasarae, Mumbai', pay: 5000, hours: 7,
    company: 'C3 Construction', type: 'Workshop',
    time: 'Started 2 hours ago',
  },
  {
    id: '2', title: 'Painter', status: 'Scheduled', statusColor: '#4A90E2',
    statusBg: '#EBF5FB', borderColor: '#4A90E2',
    location: 'Chembur, Mumbai', pay: 3500, hours: 5,
    company: 'Residential', type: null,
    time: 'Starts: 30th Oct · Time Flexible',
  },
];

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={s.header}>
        <View style={s.avatarBox}>
          <Text style={s.avatarEmoji}>👷</Text>
        </View>
        <View style={s.headerText}>
          <Text style={s.namaste}>Namaste,</Text>
          <Text style={s.name}>Rajan Kumar</Text>
          <View style={s.locationRow}>
            <Text style={s.locationPin}>📍</Text>
            <Text style={s.location}>Andheri West, Mumbai</Text>
          </View>
        </View>
        <TouchableOpacity style={s.menuBtn}>
          <Text style={s.menuIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={s.container}>

          {/* STATS GRID */}
          <View style={s.statsGrid}>
            <View style={[s.statCard, s.statCardBlue]}>
              <Text style={s.statNumWhite}>12</Text>
              <Text style={s.statLabelWhite}>Jobs done</Text>
            </View>
            <View style={s.statCard}>
              <Text style={s.statNum}>4.8 ⭐</Text>
              <Text style={s.statLabel}>Your rating</Text>
            </View>
            <View style={s.statCard}>
              <Text style={s.statNum}>₹14k</Text>
              <Text style={s.statLabel}>Earned</Text>
            </View>
          </View>

          {/* QUICK ACTIONS */}
          <View style={s.actionsGrid}>
            <TouchableOpacity
              style={s.actionCard}
              onPress={() => navigation.navigate('FindWorkers')}>
              <View style={[s.actionIconBox, { backgroundColor: '#EBF5FB' }]}>
                <Text style={s.actionIcon}>💼</Text>
              </View>
              <Text style={s.actionLabel}>Find Work</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.actionCard}
              onPress={() => Alert.alert('📜 History', 'Job history coming soon!')}>
              <View style={[s.actionIconBox, { backgroundColor: '#FFF3DC' }]}>
                <Text style={s.actionIcon}>📜</Text>
              </View>
              <Text style={s.actionLabel}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.actionCard}
              onPress={() => Alert.alert('⭐ Reviews', 'Reviews coming soon!')}>
              <View style={[s.actionIconBox, { backgroundColor: '#FFF9E6' }]}>
                <Text style={s.actionIcon}>⭐</Text>
              </View>
              <Text style={s.actionLabel}>Reviews</Text>
            </TouchableOpacity>
          </View>

          {/* ONGOING JOBS */}
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Ongoing Jobs</Text>
            <View style={s.activeBadge}>
              <Text style={s.activeBadgeText}>2 active</Text>
            </View>
          </View>

          {ONGOING_JOBS.map(job => (
            <View key={job.id} style={[s.jobCard, { borderLeftColor: job.borderColor }]}>

              {/* TOP ROW */}
              <View style={s.jobTopRow}>
                <View style={s.jobTitleRow}>
                  <Text style={s.jobTitle}>{job.title}</Text>
                  <View style={[s.statusBadge, { backgroundColor: job.statusBg }]}>
                    <View style={[s.statusDot, { backgroundColor: job.statusColor }]} />
                    <Text style={[s.statusText, { color: job.statusColor }]}>{job.status}</Text>
                  </View>
                </View>
                <View style={s.jobPayCol}>
                  <Text style={s.jobPay}>₹{job.pay.toLocaleString()}</Text>
                  <Text style={s.jobHours}>{job.hours} hrs</Text>
                </View>
              </View>

              {/* DETAILS */}
              <Text style={s.jobDetail}>📍 {job.location}</Text>
              <Text style={s.jobDetail}>
                👤 {job.company}{job.type ? ` · 🏢 ${job.type}` : ''}
              </Text>
              <Text style={s.jobDetail}>⏱ {job.time}</Text>

              {/* BUTTONS */}
              <View style={s.jobBtnRow}>
                <TouchableOpacity
                  style={s.viewBtn}
                  onPress={() => Alert.alert(
                    '📋 Job Details',
                    `Job: ${job.title}\nLocation: ${job.location}\nPay: ₹${job.pay}\nHours: ${job.hours} hrs\nStatus: ${job.status}`,
                    [{ text: 'OK' }]
                  )}>
                  <Text style={s.viewBtnText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.updateBtn}
                  onPress={() => Alert.alert(
                    '🔄 Update Status',
                    `Update status for ${job.title}?`,
                    [
                      { text: 'Mark Complete ✅', onPress: () => Alert.alert('✅ Done!', 'Job marked as complete!') },
                      { text: 'Cancel', style: 'cancel' },
                    ]
                  )}>
                  <Text style={s.updateBtnText}>Update Status</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* POST JOB BUTTON */}
          <TouchableOpacity
            style={s.postJobBtn}
            onPress={() => navigation.navigate('PostJobTab')}>
            <Text style={s.postJobBtnText}>📋  Post a New Job</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  avatarBox: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: '#EBF5FB',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  avatarEmoji: { fontSize: 28 },
  headerText: { flex: 1 },
  namaste: { fontSize: 13, color: '#7F8C8D' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  locationPin: { fontSize: 11, marginRight: 3 },
  location: { fontSize: 13, color: '#7F8C8D' },
  menuBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#F5F7FA',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  menuIcon: { fontSize: 22, color: '#2C3E50', fontWeight: 'bold' },
  container: { padding: 20 },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statCard: {
    flex: 1, backgroundColor: '#FFF', borderRadius: 12,
    padding: 14, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
    minHeight: 80,
  },
  statCardBlue: { backgroundColor: '#4A90E2' },
  statNum: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },
  statNumWhite: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  statLabel: { fontSize: 12, color: '#7F8C8D', marginTop: 4 },
  statLabelWhite: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  actionsGrid: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  actionCard: {
    flex: 1, backgroundColor: '#FFF', borderRadius: 12,
    padding: 14, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  actionIconBox: {
    width: 46, height: 46, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  actionIcon: { fontSize: 22 },
  actionLabel: { fontSize: 12, color: '#7F8C8D', fontWeight: '600' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  activeBadge: {
    backgroundColor: '#EBF5FB', paddingHorizontal: 12,
    paddingVertical: 5, borderRadius: 999,
  },
  activeBadgeText: { fontSize: 13, color: '#4A90E2', fontWeight: '700' },
  jobCard: {
    backgroundColor: '#FFF', borderRadius: 12,
    padding: 16, marginBottom: 14,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  jobTopRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8,
  },
  jobTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  jobTitle: { fontSize: 17, fontWeight: 'bold', color: '#2C3E50' },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 999, gap: 4,
  },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: '700' },
  jobPayCol: { alignItems: 'flex-end' },
  jobPay: { fontSize: 17, fontWeight: 'bold', color: '#27AE60' },
  jobHours: { fontSize: 12, color: '#7F8C8D' },
  jobDetail: { fontSize: 13, color: '#7F8C8D', marginBottom: 4 },
  jobBtnRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  viewBtn: {
    flex: 1, paddingVertical: 11, borderRadius: 10,
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  viewBtnText: { fontSize: 14, fontWeight: '700', color: '#2C3E50' },
  updateBtn: {
    flex: 1, paddingVertical: 11, borderRadius: 10,
    backgroundColor: '#E8F8EF', alignItems: 'center',
  },
  updateBtnText: { fontSize: 14, fontWeight: '700', color: '#27AE60' },
  postJobBtn: {
    backgroundColor: '#4A90E2', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
    shadowColor: '#4A90E2', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  postJobBtnText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});