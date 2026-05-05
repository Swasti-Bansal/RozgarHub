// src/screens/EmployerHomeScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TouchableOpacity,
  ScrollView, StyleSheet, StatusBar, Alert,
} from 'react-native';
import { useUser } from '../context/UserContext';
import SideDrawer from '../components/SideDrawer';
import T from '../components/T';

// ── Mock data ────────────────────────────────────────────────────
const ACTIVE_JOBS = [
  {
    id: 'j1',
    title: 'House Cleaning',
    time: 'Today, 2:00 PM',
    status: 'Active',
    statusColor: '#27AE60',
    statusBg: '#E8F8EF',
    accentColor: '#27AE60',
    applicants: [
      { id: 'a1', initials: 'RJ', color: '#1A6BCC' },
      { id: 'a2', initials: 'SK', color: '#27AE60' },
    ],
    extraCount: 3,
  },
  {
    id: 'j2',
    title: 'Plumbing Work',
    time: 'Tomorrow, 10:00 AM',
    status: 'Pending',
    statusColor: '#F5A623',
    statusBg: '#FFF3DC',
    accentColor: '#F5A623',
    applicants: [],
    extraCount: 0,
    waitingText: 'Waiting for applicants...',
  },
];

const BOTTOM_TABS = [
  { id: 'home',    icon: '⌂',  label: 'Home',    active: true  },
  { id: 'explore', icon: '⊙',  label: 'Explore', active: false },
  { id: 'post',    icon: '+',  label: '',         active: false, isFab: true },
  { id: 'chats',   icon: '☐',  label: 'Chats',   active: false },
  { id: 'profile', icon: '○',  label: 'Profile',  active: false },
];

// ── Quick actions — all have real screens now ─────────────────────
const QUICK_ACTIONS = [
  { icon: '🔍', label: 'Find Workers', screen: 'FindWorkers' },
  { icon: '📋', label: 'Job History',  screen: 'JobHistory'  },
  { icon: '⭐', label: 'Reviews',      screen: 'Review'      },
];

// ── Applicant avatar stack ────────────────────────────────────────
const AvatarStack = ({ applicants, extraCount }) => (
  <View style={s.avatarStack}>
    {applicants.map((a, i) => (
      <View
        key={a.id}
        style={[
          s.avatar,
          { backgroundColor: a.color, marginLeft: i === 0 ? 0 : -8, zIndex: applicants.length - i },
        ]}
      >
        <Text style={s.avatarText}>{a.initials}</Text>
      </View>
    ))}
    {extraCount > 0 && (
      <View style={[s.avatar, s.avatarExtra, { marginLeft: -8 }]}>
        <Text style={s.avatarExtraText}>+{extraCount}</Text>
      </View>
    )}
  </View>
);

// ── Job card ──────────────────────────────────────────────────────
const JobCard = ({ job, onViewApplications }) => (
  <View style={[s.jobCard, { borderLeftColor: job.accentColor }]}>
    <View style={s.jobCardTop}>
      <View style={{ flex: 1 }}>
        {/* DB data — plain Text */}
        <Text style={s.jobTitle}>{job.title}</Text>
        <Text style={s.jobTime}>{job.time}</Text>
      </View>
      <View style={[s.statusBadge, { backgroundColor: job.statusBg }]}>
        <Text style={[s.statusText, { color: job.statusColor }]}>{job.status}</Text>
      </View>
    </View>

    <View style={s.jobCardBottom}>
      {job.applicants.length > 0 ? (
        <>
          <AvatarStack applicants={job.applicants} extraCount={job.extraCount} />
          <TouchableOpacity
            style={s.viewApplicationsBtn}
            onPress={onViewApplications}
            activeOpacity={0.8}
          >
            <T style={s.viewApplicationsText}>View Applications</T>
            <Text style={s.viewApplicationsText}>  →</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={s.waitingRow}>
          <Text style={s.clockIcon}>🕐</Text>
          <T style={s.waitingText}>{job.waitingText}</T>
        </View>
      )}
    </View>
  </View>
);

// ── Main screen ───────────────────────────────────────────────────
const EmployerHomeScreen = ({ navigation }) => {
  const { profile }                 = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab]   = useState('home');

  // ── Use real name from UserContext ───────────────────────────────
  const displayName = profile.name || 'Employer';

  const handlePostJob = () => {
    navigation.navigate('PostJob');
  };

  const handleViewApplications = (job) => {
    Alert.alert(
      `Applications — ${job.title}`,
      `${job.applicants.length + job.extraCount} applicants have applied.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6FF" />

      {/* ── Top bar ── */}
      <View style={s.topBar}>
        <View>
          {/*
            "Welcome," is a static UI string → wrapped in T for translation.
            displayName is user data (their typed name) → kept as plain Text.
            We render them together in one Text to keep the same font/style.
          */}
          <Text style={s.topBarTitle}>
            <T>Welcome,</T>{' '}{displayName}
          </Text>
        </View>
        <TouchableOpacity
          style={s.topBarIconBtn}
          onPress={() => setDrawerOpen(true)}
          accessibilityLabel="Open menu"
        >
          <Text style={s.topBarIconText}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.container}>

          {/* ── Hero banner ── */}
          <View style={s.heroBanner}>
            <View style={s.heroCircle1} />
            <View style={s.heroCircle2} />

            <View style={s.heroContent}>
              <T style={s.heroTitle}>Need a Worker?</T>
              <T style={s.heroSubtitle}>
                Post a job requirement and find skilled workers nearby in minutes.
              </T>
              <TouchableOpacity
                style={s.heroBtn}
                onPress={handlePostJob}
                activeOpacity={0.88}
              >
                <Text style={s.heroBtnIcon}>＋</Text>
                <T style={s.heroBtnText}>Post New Job</T>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Active jobs section ── */}
          <View style={s.sectionHeader}>
            <T style={s.sectionTitle}>Your Active Jobs</T>
            <TouchableOpacity
              onPress={() => Alert.alert('View All', 'All jobs screen coming soon!')}
              activeOpacity={0.7}
            >
              <T style={s.viewAllText}>View All</T>
            </TouchableOpacity>
          </View>

          {ACTIVE_JOBS.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onViewApplications={() => handleViewApplications(job)}
            />
          ))}

          {/* ── Quick actions row ── */}
          <T style={[s.sectionTitle, { marginTop: 8, marginBottom: 14 }]}>
            Quick Actions
          </T>
          <View style={s.quickRow}>
            {QUICK_ACTIONS.map(item => (
              <TouchableOpacity
                key={item.label}
                style={s.quickCard}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={s.quickIconBox}>
                  <Text style={s.quickIcon}>{item.icon}</Text>
                </View>
                <T style={s.quickLabel}>{item.label}</T>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* ── Bottom tab bar ── */}
      <View style={s.tabBar}>
        {BOTTOM_TABS.map(tab => {
          if (tab.isFab) {
            return (
              <TouchableOpacity
                key={tab.id}
                style={s.fab}
                onPress={handlePostJob}
                activeOpacity={0.85}
                accessibilityLabel="Post a new job"
              >
                <Text style={s.fabIcon}>＋</Text>
              </TouchableOpacity>
            );
          }
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={s.tabItem}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
            >
              <Text style={[s.tabIcon, isActive && s.tabIconActive]}>{tab.icon}</Text>
              {tab.label ? (
                <T style={[s.tabLabel, isActive && s.tabLabelActive]}>{tab.label}</T>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>

      <SideDrawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F6FF' },

  // ── Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#F4F6FF',
  },
  topBarTitle: { fontSize: 24, fontWeight: '800', color: '#1A1F36' },
  topBarIconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#1A6BCC', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  topBarIconText: { fontSize: 22, color: '#1A1F36' },

  container: { paddingHorizontal: 20 },

  // ── Hero banner
  heroBanner: {
    backgroundColor: '#1A6BCC',
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#1A6BCC',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  heroCircle1: {
    position: 'absolute',
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: '#3D8EE8', opacity: 0.45,
    top: -40, right: -30,
  },
  heroCircle2: {
    position: 'absolute',
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#0F4A99', opacity: 0.4,
    bottom: -20, right: 60,
  },
  heroContent: { position: 'relative', zIndex: 1 },
  heroTitle: {
    fontSize: 26, fontWeight: '800', color: '#FFFFFF',
    marginBottom: 8, lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 14, color: 'rgba(255,255,255,0.88)',
    lineHeight: 20, marginBottom: 20,
  },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#27AE60', borderRadius: 999,
    paddingVertical: 14, paddingHorizontal: 28, alignSelf: 'stretch',
    shadowColor: '#27AE60', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 5,
  },
  heroBtnIcon: { fontSize: 18, color: '#FFFFFF', marginRight: 8, fontWeight: '700' },
  heroBtnText: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.2 },

  // ── Section header
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1F36' },
  viewAllText:  { fontSize: 14, fontWeight: '600', color: '#1A6BCC' },

  // ── Job cards
  jobCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, borderLeftWidth: 4,
    padding: 16, marginBottom: 14,
    shadowColor: '#1A6BCC', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  jobCardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 14,
  },
  jobTitle: { fontSize: 17, fontWeight: '800', color: '#1A1F36', marginBottom: 4 },
  jobTime:  { fontSize: 13, color: '#6B7280' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  statusText: { fontSize: 12, fontWeight: '700' },
  jobCardBottom: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },

  // Avatar stack
  avatarStack:    { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
  },
  avatarText:      { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  avatarExtra:     { backgroundColor: '#E5EAF2' },
  avatarExtraText: { color: '#6B7280', fontSize: 11, fontWeight: '700' },

  viewApplicationsBtn: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#1A1F36',
    borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8,
  },
  viewApplicationsText: { fontSize: 13, fontWeight: '700', color: '#1A1F36' },

  waitingRow:  { flexDirection: 'row', alignItems: 'center' },
  clockIcon:   { fontSize: 14, marginRight: 6 },
  waitingText: { fontSize: 13, color: '#9CA3AF', fontStyle: 'italic' },

  // ── Quick actions
  quickRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  quickCard: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14,
    padding: 14, alignItems: 'center',
    shadowColor: '#1A6BCC', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  quickIconBox: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#EBF3FD',
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  quickIcon:  { fontSize: 22 },
  quickLabel: { fontSize: 12, fontWeight: '600', color: '#6B7280', textAlign: 'center' },

  // ── Bottom tab bar
  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 72, backgroundColor: '#FFFFFF',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
    borderTopWidth: 1, borderTopColor: '#E5EAF2', paddingBottom: 8,
    shadowColor: '#1A6BCC', shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06, shadowRadius: 10, elevation: 10,
  },
  tabItem:       { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 8 },
  tabIcon:       { fontSize: 20, color: '#9CA3AF', marginBottom: 3 },
  tabIconActive: { color: '#1A6BCC' },
  tabLabel:      { fontSize: 11, color: '#9CA3AF' },
  tabLabelActive:{ color: '#1A6BCC', fontWeight: '600' },

  // FAB
  fab: {
    width: 56, height: 56, borderRadius: 16, backgroundColor: '#1A6BCC',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
    shadowColor: '#1A6BCC', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
  },
  fabIcon: { fontSize: 28, color: '#FFFFFF', fontWeight: '300', lineHeight: 32 },
});

export default EmployerHomeScreen;