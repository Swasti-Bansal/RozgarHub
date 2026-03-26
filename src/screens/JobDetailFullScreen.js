// src/screens/JobDetailFullScreen.js
// Job detail screen — content adapts based on who is viewing (worker or employer)

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styles from '../styles/commonStyles';
import Header from '../components/Header';

// Mock job data — replace with real navigation params or API call
const JOB = {
  id: 'job_001',
  title: 'Mason',
  subtype: 'Construction',
  location: 'Andheri West, Mumbai',
  payment: '₹8,500',
  paymentType: 'Fixed',
  duration: '9 hrs',
  date: '27 Jul 2025',
  timing: '9:00 AM – 6:00 PM',
  status: 'Completed',
  rating: 4.8,
  skills: ['Bricklaying', 'New Cement', 'Plastering'],
  description:
    'Looking for an experienced mason for a residential building project. Work involves laying bricks, plastering walls, and minor structural repairs. Safety gear will be provided on site.',
  employer: {
    name: 'C3 Construction Pvt Ltd',
    contact: 'Rajesh Mehta',
    phone: '+91 98765 43210',
    rating: 4.6,
    totalJobs: 38,
    verified: true,
  },
  worker: {
    name: 'Aukshan Patil',
    role: 'Mason – Masonry Expert',
    experience: '5+ years',
    rating: 4.8,
    completedJobs: 112,
  },
  worksite: 'Building A, Plot 14, MIDC Road',
};

// Tabs differ by perspective
const WORKER_TABS   = ['Overview', 'Employer'];
const EMPLOYER_TABS = ['Overview', 'Workers'];

const JobDetailFullScreen = ({ navigation, route }) => {
  const perspective = route?.params?.perspective ?? 'worker';
  const TABS = perspective === 'worker' ? WORKER_TABS : EMPLOYER_TABS;
  const [activeTab, setActiveTab] = useState('Overview');

  const statusColor =
    JOB.status === 'Ongoing'   ? '#FF9800' :
    JOB.status === 'Completed' ? '#5CB85C' : '#4A90E2';

  // ── Shared: Schedule block ───────────────────────────────────────────────────
  const ScheduleBlock = () => (
    <View style={localStyles.section}>
      <Text style={styles.sectionTitle}>Schedule</Text>
      <View style={styles.detailCard}>
        {[
          { icon: '🗓️', label: 'Date',      value: JOB.date },
          { icon: '⏰', label: 'Timing',    value: JOB.timing },
          { icon: '📍', label: 'Work Site', value: JOB.worksite },
        ].map((row) => (
          <View key={row.label} style={localStyles.scheduleRow}>
            <Text style={localStyles.scheduleIcon}>{row.icon}</Text>
            <View>
              <Text style={localStyles.scheduleLabel}>{row.label}</Text>
              <Text style={localStyles.scheduleValue}>{row.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  // ── Shared: Description + Skills ────────────────────────────────────────────
  const JobInfo = () => (
    <>
      <View style={localStyles.section}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={localStyles.descriptionText}>{JOB.description}</Text>
      </View>
      <View style={localStyles.section}>
        <Text style={styles.sectionTitle}>Required Skills</Text>
        <View style={localStyles.skillsRow}>
          {JOB.skills.map((skill) => (
            <View key={skill} style={localStyles.skillChip}>
              <Text style={localStyles.skillChipText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );

  // ── WORKER — Overview tab ────────────────────────────────────────────────────
  // Shows: job info + schedule + employer card + rate actions
  const WorkerOverview = () => (
    <>
      <JobInfo />
      <ScheduleBlock />

      {/* Employer Card — name only in overview, full details in Employer tab */}
      <View style={localStyles.section}>
        <Text style={styles.sectionTitle}>Posted By</Text>
        <View style={styles.detailCard}>
          <View style={localStyles.employerRow}>
            <View style={localStyles.employerAvatar}>
              <Text style={localStyles.employerAvatarText}>🏢</Text>
            </View>
            <Text style={styles.workerName}>{JOB.employer.name}</Text>
            <View style={styles.ratingBadge}>
              <Text>⭐ {JOB.employer.rating}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Worker action buttons */}
      <View style={localStyles.section}>
        {JOB.status === 'Completed' && (
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: '#5CB85C' }]}
            onPress={() => navigation.navigate('RateJob')}
          >
            <Text style={styles.primaryButtonText}>⭐ Rate This Job</Text>
          </TouchableOpacity>
        )}
        {JOB.status === 'Ongoing' && (
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: '#5CB85C' }]}>
            <Text style={styles.primaryButtonText}>✅ Mark as Completed</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  // ── WORKER — Employer tab (full employer details) ────────────────────────────
  const WorkerEmployerTab = () => (
    <>
      <View style={localStyles.section}>
        <Text style={styles.sectionTitle}>Employer Details</Text>
        <View style={styles.detailCard}>
          <View style={localStyles.employerRow}>
            <View style={localStyles.employerAvatar}>
              <Text style={localStyles.employerAvatarText}>🏢</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={localStyles.employerNameRow}>
                <Text style={styles.workerName}>{JOB.employer.name}</Text>
                {JOB.employer.verified && (
                  <View style={localStyles.verifiedBadge}>
                    <Text style={localStyles.verifiedText}>✅ Verified</Text>
                  </View>
                )}
              </View>
              <Text style={styles.workerRole}>Contact: {JOB.employer.contact}</Text>
              <Text style={styles.workerExp}>📞 {JOB.employer.phone}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text>⭐ {JOB.employer.rating}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={localStyles.section}>
        <Text style={styles.sectionTitle}>Employer Stats</Text>
        <View style={localStyles.statsGrid}>
          {[
            { value: JOB.employer.totalJobs,      label: 'Jobs Posted' },
            { value: `⭐ ${JOB.employer.rating}`, label: 'Avg Rating' },
            { value: '✅ Yes',                    label: 'Verified' },
          ].map((s) => (
            <View key={s.label} style={localStyles.statsCard}>
              <Text style={localStyles.statsCardValue}>{s.value}</Text>
              <Text style={localStyles.statsCardLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={localStyles.section}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: '#5CB85C' }]}
          onPress={() => navigation.navigate('RateJob')}
        >
          <Text style={styles.primaryButtonText}>🏢 Rate Employer</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  // ── EMPLOYER — Overview tab ──────────────────────────────────────────────────
  const EmployerOverview = () => (
    <>
      <JobInfo />
      <ScheduleBlock />

      <View style={localStyles.section}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>✏️ Edit Job Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[localStyles.dangerButton, { marginTop: 10 }]}>
          <Text style={localStyles.dangerButtonText}>🗑️ Cancel Job</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  // ── EMPLOYER — Workers tab ───────────────────────────────────────────────────
  const EmployerWorkersTab = () => (
    <>
      <View style={localStyles.section}>
        <Text style={styles.sectionTitle}>Assigned Worker</Text>
        <View style={styles.workerCard}>
          <View style={styles.workerAvatar}>
            <Text style={styles.avatarText}>👷</Text>
          </View>
          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>{JOB.worker.name}</Text>
            <Text style={styles.workerRole}>{JOB.worker.role}</Text>
            <Text style={styles.workerExp}>📋 {JOB.worker.experience}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text>⭐ {JOB.worker.rating}</Text>
          </View>
        </View>
      </View>

      <View style={localStyles.section}>
        <Text style={styles.sectionTitle}>Worker Stats</Text>
        <View style={localStyles.statsGrid}>
          {[
            { value: JOB.worker.completedJobs,    label: 'Jobs Done' },
            { value: `⭐ ${JOB.worker.rating}`,   label: 'Avg Rating' },
            { value: JOB.worker.experience,        label: 'Experience' },
          ].map((s) => (
            <View key={s.label} style={localStyles.statsCard}>
              <Text style={localStyles.statsCardValue}>{s.value}</Text>
              <Text style={localStyles.statsCardLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={localStyles.section}>
        <TouchableOpacity style={styles.shortlistButton}>
          <Text style={styles.shortlistButtonText}>📋 Shortlist Worker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.primaryButton, { marginTop: 10 }]}>
          <Text style={styles.primaryButtonText}>📞 Contact Worker</Text>
        </TouchableOpacity>
        {JOB.status === 'Completed' && (
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: '#5CB85C', marginTop: 10 }]}
            onPress={() => navigation.navigate('RateJob')}
          >
            <Text style={styles.primaryButtonText}>⭐ Rate Worker</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Job Detail" navigation={navigation} />

      {/* ── Top Bar ── */}
      <View style={localStyles.topBar}>
        <View style={[
          localStyles.perspectiveBadge,
          perspective === 'employer' && localStyles.perspectiveBadgeEmployer,
        ]}>
          <Text style={localStyles.perspectiveBadgeText}>
            {perspective === 'worker' ? '👷 Worker View' : '🏢 Employer View'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>

        {/* ── Hero Card ── */}
        <View style={localStyles.heroCard}>
          <View style={localStyles.heroTop}>
            <View>
              <Text style={localStyles.heroTitle}>{JOB.title}</Text>
              <Text style={localStyles.heroSubtype}>{JOB.subtype}</Text>
            </View>
            <View style={[localStyles.statusPill, { backgroundColor: statusColor + '22', borderColor: statusColor }]}>
              <Text style={[localStyles.statusPillText, { color: statusColor }]}>
                🕐 {JOB.status}
              </Text>
            </View>
          </View>

          <View style={localStyles.heroMeta}>
            <Text style={localStyles.heroMetaItem}>📍 {JOB.location}</Text>
            <Text style={localStyles.heroMetaItem}>📅 {JOB.date}</Text>
          </View>

          <View style={localStyles.heroStats}>
            {[
              { value: JOB.payment,       label: JOB.paymentType },
              { value: JOB.duration,      label: 'Duration' },
              { value: `⭐ ${JOB.rating}`, label: 'Rating' },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <View style={localStyles.statBox}>
                  <Text style={localStyles.statValue}>{s.value}</Text>
                  <Text style={localStyles.statLabel}>{s.label}</Text>
                </View>
                {i < arr.length - 1 && <View style={localStyles.statDivider} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ── Tab Switcher ── */}
        <View style={localStyles.tabRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[localStyles.tabBtn, activeTab === tab && localStyles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[localStyles.tabBtnText, activeTab === tab && localStyles.tabBtnTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Content by perspective + tab ── */}
        {perspective === 'worker'   && activeTab === 'Overview'  && <WorkerOverview />}
        {perspective === 'worker'   && activeTab === 'Employer'  && <WorkerEmployerTab />}
        {perspective === 'employer' && activeTab === 'Overview'  && <EmployerOverview />}
        {perspective === 'employer' && activeTab === 'Workers'   && <EmployerWorkersTab />}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  backBtn:  { padding: 4 },
  backText: { fontSize: 16, color: '#4A90E2', fontWeight: '600' },
  perspectiveBadge: {
    backgroundColor: '#EEF4FF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  perspectiveBadgeEmployer: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF9800',
  },
  perspectiveBadgeText: { fontSize: 12, color: '#2C3E50', fontWeight: '600' },

  heroCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  heroTitle:      { fontSize: 22, fontWeight: 'bold', color: '#2C3E50' },
  heroSubtype:    { fontSize: 13, color: '#7F8C8D', marginTop: 2 },
  statusPill:     { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  statusPillText: { fontSize: 12, fontWeight: '600' },
  heroMeta:       { marginBottom: 16 },
  heroMetaItem:   { fontSize: 13, color: '#7F8C8D', marginBottom: 3 },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    paddingVertical: 12,
  },
  statBox:     { alignItems: 'center', flex: 1 },
  statValue:   { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  statLabel:   { fontSize: 11, color: '#7F8C8D', marginTop: 3 },
  statDivider: { width: 1, backgroundColor: '#E0E0E0' },

  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tabBtn:           { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabBtnActive:     { backgroundColor: '#4A90E2' },
  tabBtnText:       { fontSize: 14, color: '#7F8C8D', fontWeight: '500' },
  tabBtnTextActive: { color: '#FFF', fontWeight: 'bold' },

  section:         { marginBottom: 20 },
  descriptionText: { fontSize: 14, color: '#2C3E50', lineHeight: 22 },

  skillsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  skillChip: {
    backgroundColor: '#EEF4FF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  skillChipText: { fontSize: 13, color: '#4A90E2', fontWeight: '500' },

  scheduleRow:   { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  scheduleIcon:  { fontSize: 20, marginRight: 12 },
  scheduleLabel: { fontSize: 12, color: '#7F8C8D' },
  scheduleValue: { fontSize: 14, color: '#2C3E50', fontWeight: '600' },

  employerRow:     { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  employerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  employerAvatarText: { fontSize: 24 },
  employerNameRow:    { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  verifiedBadge: {
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  verifiedText: { fontSize: 11, color: '#5CB85C', fontWeight: '600' },
  employerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 4,
  },
  employerStatItem:  { alignItems: 'center', flex: 1 },
  employerStatValue: { fontSize: 14, fontWeight: 'bold', color: '#2C3E50' },
  employerStatLabel: { fontSize: 11, color: '#7F8C8D', marginTop: 3 },

  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statsCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  statsCardValue: { fontSize: 15, fontWeight: 'bold', color: '#2C3E50', marginBottom: 4 },
  statsCardLabel: { fontSize: 11, color: '#7F8C8D', textAlign: 'center' },

  dangerButton: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E74C3C',
  },
  dangerButtonText: { color: '#E74C3C', fontSize: 16, fontWeight: 'bold' },
});

export default JobDetailFullScreen;