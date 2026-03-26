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

const workerName = 'Rajan Kumar';
const location   = 'Andheri West, Mumbai';

const stats = [
  { id: '1', value: '12',     label: 'Jobs done', primary: true },
  { id: '2', value: '4.8 ⭐', label: 'Your rating', primary: false },
  { id: '3', value: '₹14k',  label: 'Earned', primary: false },
];

const quickActions = [
  { id: 'findwork', icon: '💼', label: 'Find Work', bg: '#E6F1FB', screen: 'HereJob' },
  { id: 'history', icon: '📜', label: 'History',   bg: '#FAECE7', screen: 'JobHistory' },
  { id: 'reviews', icon: '⭐', label: 'Reviews',   bg: '#FAEEDA', screen: 'Review' },
];

// Replace with real data from your database later
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
    statusLabel: 'Ongoing',
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
    statusLabel: 'Scheduled',
    meta: 'Starts: 30th Oct  ·  Time Flexible',
  },
];

const STATUS_STYLE = {
  ongoing:   { bg: '#FFF3E0', text: '#E65100', dot: '#FF8A00', accent: '#FF8A00' },
  scheduled: { bg: '#E8F4FF', text: '#185FA5', dot: '#4A90E2', accent: '#4A90E2' },
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
              <Text style={styles.ongoingJobTitle}>{job.title}</Text>
              <View style={[styles.jobStatusBadge, { backgroundColor: st.bg }]}>
                <View style={[styles.jobStatusDot, { backgroundColor: st.dot }]} />
                <Text style={[styles.jobStatusBadgeText, { color: st.text }]}>{job.statusLabel}</Text>
              </View>
            </View>
            <Text style={styles.ongoingJobLoc}>📍 {job.location}</Text>
          </View>
          <View style={styles.ongoingJobPayCol}>
            <Text style={styles.ongoingJobPay}>{job.payment}</Text>
            <Text style={styles.ongoingJobDur}>{job.duration}</Text>
          </View>
        </View>

        {job.client
          ? <Text style={styles.ongoingJobMeta}>👤 {job.client}  ·  🏢 {job.type}</Text>
          : <Text style={styles.ongoingJobMeta}>🏢 {job.type}</Text>
        }
        <Text style={styles.ongoingJobMeta}>⏱️ {job.meta}</Text>

        <View style={styles.ongoingJobActions}>
          <TouchableOpacity 
            style={styles.jobBtnGhost} 
            onPress={onViewDetail}>
            <Text style={styles.jobBtnGhostText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.jobBtnDone} onPress={onMarkDone}>
            <Text style={styles.jobBtnDoneText}>Update Status</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.homeTopBar}>
        <View style={styles.homeTopBarLeft}>
          <View style={styles.homeAvatar}>
            <Text style={styles.homeAvatarEmoji}>👷</Text>
          </View>
          <View>
            <Text style={styles.homeNamaste}>Namaste,</Text>
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

        <View style={styles.homeStatsRow}>
          {stats.map(item => (
            <View key={item.id} style={[styles.homeStatCard, item.primary && styles.homeStatCardPrimary]}>
              <Text style={[styles.homeStatNum, item.primary ? styles.homeStatNumPrimary : styles.homeStatNumDark]}>
                {item.value}
              </Text>
              <Text style={[styles.homeStatLbl, item.primary ? styles.homeStatLblPrimary : styles.homeStatLblDark]}>
                {item.label}
              </Text>
              <Text style={[styles.homeStatSub, item.primary ? styles.homeStatSubPrimary : styles.homeStatSubDark]}>
                {item.sub}
              </Text>
            </View>
          ))}
        </View>

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
              <Text style={styles.homeQaLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.homeSectionHead}>
          <Text style={styles.sectionTitle}>Ongoing Jobs</Text>
          <View style={styles.homeCountBadge}>
            <Text style={styles.homeCountBadgeText}>{ongoingJobs.length} active</Text>
          </View>
        </View>

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