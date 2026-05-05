// src/screens/HomeScreen.js
import React, { useState } from 'react';
import SideDrawer from '../components/SideDrawer';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/commonStyles';
import T from '../components/T';
import { useUser } from '../context/UserContext';

// ✅ Only data values — no display labels
const stats = [
  { id: '1', value: '12',     primary: true },
  { id: '2', value: '4.8 ⭐', primary: false },
  { id: '3', value: '₹14k',  primary: false },
];

const quickActions = [
  { id: 'findwork', icon: '💼', bg: '#E6F1FB', screen: 'HereJob' },
  { id: 'history',  icon: '📜', bg: '#FAECE7', screen: 'JobHistory' },
  { id: 'reviews',  icon: '⭐', bg: '#FAEEDA', screen: 'Review' },
];

const ongoingJobs = [
  {
    id: '1',
    title: 'Painter',
    location: 'Vasarae, Mumbai',
    client: 'C3 Construction',
    type: 'Workshop',
    payment: '₹5000',
    duration: '7 hrs',
    status: 'ongoing',
    meta: 'Started 2 hours ago',
  },
  {
    id: '2',
    title: 'Painter',
    location: 'Chembur, Mumbai',
    client: null,
    type: 'Residential',
    payment: '₹3500',
    duration: '5 hrs',
    status: 'scheduled',
    meta: 'Starts: 30th Oct  ·  Time Flexible',
  },
];

const STATUS_STYLE = {
  ongoing:   { bg: '#FFF3E0', text: '#E65100', dot: '#FF8A00', accent: '#FF8A00' },
  scheduled: { bg: '#E8F4FF', text: '#185FA5', dot: '#4A90E2', accent: '#4A90E2' },
};

// ✅ Stat labels — plain literal strings
const StatLabel = ({ id, primary }) => {
  const labelStyle = [
    styles.homeStatLbl,
    primary ? styles.homeStatLblPrimary : styles.homeStatLblDark,
  ];
  if (id === '1') return <T style={labelStyle}>Jobs done</T>;
  if (id === '2') return <T style={labelStyle}>Your rating</T>;
  if (id === '3') return <T style={labelStyle}>Earned</T>;
  return null;
};

// ✅ Quick action labels — plain literal strings
const QuickActionLabel = ({ id }) => {
  if (id === 'findwork') return <T style={styles.homeQaLabel}>Find Work</T>;
  if (id === 'history')  return <T style={styles.homeQaLabel}>History</T>;
  if (id === 'reviews')  return <T style={styles.homeQaLabel}>Reviews</T>;
  return null;
};

// ✅ Status badge label — plain literal strings
const StatusLabel = ({ status, style }) => {
  if (status === 'ongoing')   return <T style={style}>Ongoing</T>;
  if (status === 'scheduled') return <T style={style}>Scheduled</T>;
  return null;
};


const OngoingJobCard = ({ job, onViewDetail, onMarkDone }) => {
  const st = STATUS_STYLE[job.status] || STATUS_STYLE.scheduled;

  return (
    <View style={styles.ongoingJobCard}>
      <View style={[styles.ongoingJobAccent, { backgroundColor: st.accent }]} />
      <View style={styles.ongoingJobBody}>

        <View style={styles.ongoingJobTop}>
          <View style={{ flex: 1 }}>
            <View style={styles.ongoingJobTitleRow}>
              {/* job.title is DB data — stays as Text */}
              <Text style={styles.ongoingJobTitle}>{job.title}</Text>
              <View style={[styles.jobStatusBadge, { backgroundColor: st.bg }]}>
                <View style={[styles.jobStatusDot, { backgroundColor: st.dot }]} />
                <StatusLabel
                  status={job.status}
                  style={[styles.jobStatusBadgeText, { color: st.text }]}
                />
              </View>
            </View>
            {/* job.location is DB data — stays as Text */}
            <Text style={styles.ongoingJobLoc}>📍 {job.location}</Text>
          </View>
          <View style={styles.ongoingJobPayCol}>
            {/* payment & duration are DB data — stays as Text */}
            <Text style={styles.ongoingJobPay}>{job.payment}</Text>
            <Text style={styles.ongoingJobDur}>{job.duration}</Text>
          </View>
        </View>

        {/* job.client, job.type, job.meta are DB data — stays as Text */}
        {job.client
          ? <Text style={styles.ongoingJobMeta}>👤 {job.client}  ·  🏢 {job.type}</Text>
          : <Text style={styles.ongoingJobMeta}>🏢 {job.type}</Text>
        }
        <Text style={styles.ongoingJobMeta}>⏱️ {job.meta}</Text>

        <View style={styles.ongoingJobActions}>
          <TouchableOpacity style={styles.jobBtnGhost} onPress={onViewDetail}>
            <T style={styles.jobBtnGhostText}>View Details</T>
          </TouchableOpacity>
          <TouchableOpacity style={styles.jobBtnDone} onPress={onMarkDone}>
            <T style={styles.jobBtnDoneText}>Update Status</T>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};


const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { profile } = useUser();

  const workerName = profile.name          || 'Welcome';
  const location   = profile.locationLabel || '';

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.homeTopBar}>
        <View style={styles.homeTopBarLeft}>
          <View style={styles.homeAvatar}>
            <Text style={styles.homeAvatarEmoji}>👷</Text>
          </View>
          <View>
            <T style={styles.homeNamaste}>Namaste,</T>
            {/* workerName & location are dynamic data — stays as Text */}
            <Text style={styles.homeWorkerName}>{workerName}</Text>
            <Text style={styles.homeLocation}>📍 {location}</Text>
          </View>
        </View>
        <View style={styles.homeTopBarRight}>
          <TouchableOpacity
            style={styles.homeIconBtn}
            onPress={() => setDrawerOpen(true)}
          >
            <Text style={styles.homeIconBtnText}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>

        {/* Stats Row */}
        <View style={styles.homeStatsRow}>
          {stats.map(item => (
            <View
              key={item.id}
              style={[styles.homeStatCard, item.primary && styles.homeStatCardPrimary]}
            >
              <Text style={[
                styles.homeStatNum,
                item.primary ? styles.homeStatNumPrimary : styles.homeStatNumDark,
              ]}>
                {item.value}
              </Text>
              <StatLabel id={item.id} primary={item.primary} />
            </View>
          ))}
        </View>

        {/* Quick Actions Row */}
        <View style={styles.homeQaRow}>
          {quickActions.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.homeQaCard}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.75}
            >
              <View style={[styles.homeQaIcon, { backgroundColor: item.bg }]}>
                <Text style={styles.homeQaIconText}>{item.icon}</Text>
              </View>
              <QuickActionLabel id={item.id} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Section Header */}
        <View style={styles.homeSectionHead}>
          <T style={styles.sectionTitle}>Ongoing Jobs</T>
          <View style={styles.homeCountBadge}>
            {/* ✅ number is dynamic, "active" word is wrapped in T */}
            <Text style={styles.homeCountBadgeText}>
              {ongoingJobs.length} <T>active</T>
            </Text>
          </View>
        </View>

        {/* Job Cards */}
        {ongoingJobs.map(job => (
          <OngoingJobCard
            key={job.id}
            job={job}
            onViewDetail={() => navigation.navigate('JobDetailFull', { jobId: job.id })}
            onMarkDone={() => navigation.navigate('RateJob', { jobId: job.id })}
          />
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>

      <SideDrawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;