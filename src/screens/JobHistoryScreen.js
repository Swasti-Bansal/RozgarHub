// src/screens/JobHistoryScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import styles from '../styles/commonStyles';
import T from '../components/T';
import useTranslatedText from '../hooks/useTranslatedText';
import Header from '../components/Header';

const FILTER_TABS = ['All', 'Completed', 'Cancelled'];

const JOB_HISTORY = [
  {
    id: 'h1', title: 'Painter', employer: 'C3 Construction',
    location: 'Borivali, Mumbai', date: '15 Jul 2025',
    payment: '₹2,700', duration: '12 hrs',
    status: 'Completed', workerRating: 5,
  },
  {
    id: 'h2', title: 'Mason', employer: 'BuildRight Pvt Ltd',
    location: 'Andheri West, Mumbai', date: '20 Jun 2025',
    payment: '₹8,500', duration: '9 hrs',
    status: 'Completed', workerRating: 4,
  },
  {
    id: 'h3', title: 'Electrician', employer: 'Spark Solutions',
    location: 'Bandra, Mumbai', date: '10 Jun 2025',
    payment: '₹1,400', duration: '4 hrs',
    status: 'Cancelled', workerRating: null,
  },
  {
    id: 'h4', title: 'Plumber', employer: 'HomeServe India',
    location: 'Chembur, Mumbai', date: '02 Jun 2025',
    payment: '₹3,500', duration: '5 hrs',
    status: 'Completed', workerRating: 5,
  },
  {
    id: 'h5', title: 'Carpenter', employer: 'WoodCraft Co.',
    location: 'Thane, Mumbai', date: '18 May 2025',
    payment: '₹5,000', duration: '8 hrs',
    status: 'Cancelled', workerRating: null,
  },
];

const STATUS_COLORS = {
  Completed: { bg: '#E8F5E9', border: '#5CB85C', text: '#5CB85C' },
  Cancelled:  { bg: '#FFEBEE', border: '#E74C3C', text: '#E74C3C' },
};

const SUMMARY = {
  totalJobs: 18,
  totalEarned: '₹52,400',
  avgRating: 4.7,
};

// ── Single job card — uses useTranslatedText for dynamic job fields ──
const HistoryCard = ({ job, onPress, onRate }) => {
  const sc = STATUS_COLORS[job.status];

  // Translate all dynamic per-job strings in one hook call
  const [title, employer, location, status, duration] = useTranslatedText(
    job.title,
    job.employer,
    job.location,
    job.status,
    job.duration,
  );

  return (
    <TouchableOpacity
      style={localStyles.historyCard}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Card Header */}
      <View style={localStyles.cardHeader}>
        <View style={localStyles.cardTitleBlock}>
          <Text style={localStyles.cardTitle}>{title}</Text>
          <Text style={localStyles.cardEmployer}>🏢 {employer}</Text>
        </View>
        <View style={[localStyles.statusTag, { backgroundColor: sc.bg, borderColor: sc.border }]}>
          <Text style={[localStyles.statusTagText, { color: sc.text }]}>{status}</Text>
        </View>
      </View>

      {/* Meta */}
      <View style={localStyles.cardMeta}>
        <Text style={localStyles.cardMetaItem}>📍 {location}</Text>
        <Text style={localStyles.cardMetaItem}>📅 {job.date}</Text>
      </View>

      {/* Footer */}
      <View style={localStyles.cardFooter}>
        <View>
          <Text style={styles.jobPayment}>{job.payment}</Text>
          <Text style={localStyles.cardDuration}>⏱️ {duration}</Text>
        </View>
        {job.workerRating !== null ? (
          <View style={styles.ratingBadge}>
            <Text>⭐ {job.workerRating}/5</Text>
          </View>
        ) : (
          job.status === 'Completed' && (
            <TouchableOpacity style={localStyles.rateNowBtn} onPress={onRate}>
              <T style={localStyles.rateNowText}>Rate Now</T>
            </TouchableOpacity>
          )
        )}
      </View>

      <View style={localStyles.viewDetailRow}>
        <T style={localStyles.viewDetailText}>View Details →</T>
      </View>
    </TouchableOpacity>
  );
};

// ── Main Screen ───────────────────────────────────────────────────
const JobHistoryScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? JOB_HISTORY
      : JOB_HISTORY.filter((j) => j.status === activeFilter);

  // Translate the empty state message dynamically based on active filter
  const [noJobsFound, noPrevJobs] = useTranslatedText(
    'No jobs found',
    `No ${activeFilter.toLowerCase()} jobs in your history.`,
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
        <Header title="Job History" navigation={navigation} />
        <T style={styles.screenSubtitle}>Your previous work</T>

        {/* ── Summary Cards ── */}
        <View style={localStyles.summaryRow}>
          <View style={localStyles.summaryCard}>
            <Text style={localStyles.summaryValue}>{SUMMARY.totalJobs}</Text>
            <T style={localStyles.summaryLabel}>Total Jobs</T>
          </View>
          <View style={[localStyles.summaryCard, localStyles.summaryCardHighlight]}>
            <Text style={[localStyles.summaryValue, { color: '#5CB85C' }]}>{SUMMARY.totalEarned}</Text>
            <T style={localStyles.summaryLabel}>Total Earned</T>
          </View>
          <View style={localStyles.summaryCard}>
            <Text style={localStyles.summaryValue}>⭐ {SUMMARY.avgRating}</Text>
            <T style={localStyles.summaryLabel}>Avg Rating</T>
          </View>
        </View>

        {/* ── Filter Tabs ── */}
        <View style={localStyles.filterRow}>
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[localStyles.filterTab, activeFilter === tab && localStyles.filterTabActive]}
              onPress={() => setActiveFilter(tab)}
            >
              <T style={[localStyles.filterTabText, activeFilter === tab && localStyles.filterTabTextActive]}>
                {tab}
              </T>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Job List / Empty State ── */}
        {filtered.length === 0 ? (
          <View style={localStyles.emptyState}>
            <Text style={localStyles.emptyIcon}>📋</Text>
            <Text style={localStyles.emptyTitle}>{noJobsFound}</Text>
            <Text style={localStyles.emptySubtitle}>{noPrevJobs}</Text>
          </View>
        ) : (
          filtered.map((job) => (
            <HistoryCard
              key={job.id}
              job={job}
              onPress={() => navigation.navigate('JobDetailFull', { perspective: 'worker' })}
              onRate={() => navigation.navigate('RateJob')}
            />
          ))
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  pageHeader:  { marginBottom: 20 },
  backText:    { fontSize: 16, color: '#4A90E2', fontWeight: '600', marginBottom: 10 },

  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,
  },
  summaryCard: {
    flex: 1, backgroundColor: '#FFF', borderRadius: 12, padding: 14,
    alignItems: 'center', marginHorizontal: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 3, elevation: 2,
  },
  summaryCardHighlight: { borderWidth: 1.5, borderColor: '#5CB85C' },
  summaryValue: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 4 },
  summaryLabel: { fontSize: 11, color: '#7F8C8D', textAlign: 'center' },

  filterRow:           { flexDirection: 'row', marginBottom: 16 },
  filterTab: {
    flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: 10,
    backgroundColor: '#FFF', marginHorizontal: 4, borderWidth: 1, borderColor: '#E0E0E0',
  },
  filterTabActive:     { backgroundColor: '#4A90E2', borderColor: '#4A90E2' },
  filterTabText:       { fontSize: 13, color: '#7F8C8D' },
  filterTabTextActive: { color: '#FFF', fontWeight: 'bold' },

  historyCard: {
    backgroundColor: '#FFF', borderRadius: 14, padding: 15, marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 8,
  },
  cardTitleBlock: { flex: 1 },
  cardTitle:      { fontSize: 17, fontWeight: 'bold', color: '#2C3E50' },
  cardEmployer:   { fontSize: 13, color: '#7F8C8D', marginTop: 2 },
  statusTag: {
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3,
    borderWidth: 1, marginLeft: 8,
  },
  statusTagText: { fontSize: 12, fontWeight: '600' },

  cardMeta:     { marginBottom: 10 },
  cardMetaItem: { fontSize: 13, color: '#7F8C8D', marginBottom: 3 },

  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0',
  },
  cardDuration: { fontSize: 13, color: '#7F8C8D', marginTop: 2 },

  rateNowBtn: {
    backgroundColor: '#EEF4FF', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: '#4A90E2',
  },
  rateNowText: { color: '#4A90E2', fontSize: 13, fontWeight: '600' },

  viewDetailRow:  { alignItems: 'flex-end', marginTop: 8 },
  viewDetailText: { color: '#4A90E2', fontSize: 13, fontWeight: '500' },

  emptyState:    { alignItems: 'center', paddingVertical: 60 },
  emptyIcon:     { fontSize: 48, marginBottom: 16 },
  emptyTitle:    { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#7F8C8D', textAlign: 'center' },
});

export default JobHistoryScreen;