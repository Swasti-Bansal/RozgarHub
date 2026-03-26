// src/screens/HomeScreen.js  — PATCH NOTES
// Replace the two hardcoded constants at the top of HomeScreen.js:
//
//   BEFORE (lines ~7-8):
//     const workerName = 'Rajan Kumar';
//     const location   = 'Andheri West, Mumbai';
//
//   AFTER — add this import at the top of HomeScreen.js:
//     import { useUser } from '../context/UserContext';
//
//   Then inside the HomeScreen component function, replace the constants with:
//     const { profile } = useUser();
//     const workerName  = profile.name        || 'Welcome';
//     const location    = profile.locationLabel || 'Location not set';
//
// That's the only change needed — every tx(workerName) and tx(location)
// reference in the JSX will automatically use the real user name from context.
//
// Do the same in SideDrawer.js — replace:
//     <Text style={s.drawerName}>Rajan Kumar</Text>
//     <Text style={s.drawerSub}>Painter · 4.8 ⭐</Text>
//     <Text style={s.drawerSub}>Andheri West, Mumbai</Text>
// with:
//     import { useUser } from '../context/UserContext';
//     const { profile } = useUser();
//     ...
//     <Text style={s.drawerName}>{profile.name || 'User'}</Text>
//     <Text style={s.drawerSub}>{profile.role === 'employer' ? 'Employer' : 'Worker'}</Text>
//     <Text style={s.drawerSub}>{profile.locationLabel || ''}</Text>
//
// And in DashboardScreen.js — replace:
//     <Text style={s.name}>Rajan Kumar</Text>
//     <Text style={s.location}>Andheri West, Mumbai</Text>
// with:
//     import { useUser } from '../context/UserContext';
//     const { profile } = useUser();
//     ...
//     <Text style={s.name}>{profile.name || 'Welcome'}</Text>
//     <Text style={s.location}>{profile.locationLabel || 'Location not set'}</Text>

// ─────────────────────────────────────────────────────────────────
// Full updated HomeScreen.js with the patch applied:
// ─────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import SideDrawer from '../components/SideDrawer';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';
import { useTranslation, _cache } from '../context/TranslationContext';
import { useUser } from '../context/UserContext';   // ← NEW

const STATS = [
  { id: '1', value: '12',    label: 'Jobs done',   primary: true  },
  { id: '2', value: '4.8 ⭐', label: 'Your rating', primary: false },
  { id: '3', value: '₹14k',  label: 'Earned',      primary: false },
];

const QUICK_ACTIONS = [
  { id: 'findwork', icon: '💼', label: 'Find Work', bg: '#E6F1FB', screen: 'HereJob'    },
  { id: 'history',  icon: '📜', label: 'History',   bg: '#FAECE7', screen: 'JobHistory' },
  { id: 'reviews',  icon: '⭐', label: 'Reviews',   bg: '#FAEEDA', screen: 'Review'     },
];

const ONGOING_JOBS = [
  {
    id: '1', title: 'Painter', location: 'Vasarae, Mumbai',
    client: 'C3 Construction', type: 'Workshop',
    payment: '₹5000', duration: '7 hrs',
    status: 'ongoing', statusLabel: 'Ongoing', meta: 'Started 2 hours ago',
  },
  {
    id: '2', title: 'Painter', location: 'Chembur, Mumbai',
    client: null, type: 'Residential',
    payment: '₹3500', duration: '5 hrs',
    status: 'scheduled', statusLabel: 'Scheduled',
    meta: 'Starts: 30th Oct  ·  Time Flexible',
  },
];

const STATUS_STYLE = {
  ongoing:   { bg: '#FFF3E0', text: '#E65100', dot: '#FF8A00', accent: '#FF8A00' },
  scheduled: { bg: '#E8F4FF', text: '#185FA5', dot: '#4A90E2', accent: '#4A90E2' },
};

const translateString = async (text, lang) => {
  if (lang === 'en' || !text) return text;
  const key = `${text}__${lang}`;
  if (_cache[key]) return _cache[key];
  try {
    const res  = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`
    );
    const data = await res.json();
    if (data.responseStatus === 200) {
      const clean = data.responseData.translatedText
        .replace(/@\s*\w+\s*:\s*\w+/g, '').trim();
      _cache[key] = clean;
      return clean;
    }
  } catch {}
  return text;
};

const STATIC_STRINGS = [
  'Namaste,',
  'Jobs done', 'Your rating', 'Earned',
  'Find Work', 'History', 'Reviews',
  'Ongoing Jobs', 'active',
  'View Details', 'Update Status',
  'Painter', 'Vasarae, Mumbai', 'C3 Construction', 'Workshop',
  'Started 2 hours ago', 'Ongoing',
  'Chembur, Mumbai', 'Residential',
  'Starts: 30th Oct  ·  Time Flexible', 'Scheduled',
];

const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { currentLang }             = useTranslation();
  const { profile }                 = useUser();                // ← NEW
  const [t, setT]                   = useState({});

  // Use real profile data, fall back gracefully if onboarding was skipped
  const workerName = profile.name         || 'Welcome';          // ← NEW
  const location   = profile.locationLabel || 'Location not set'; // ← NEW

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const results = await Promise.all(
        STATIC_STRINGS.map(s => translateString(s, currentLang))
      );
      if (cancelled) return;
      const map = {};
      STATIC_STRINGS.forEach((s, i) => { map[s] = results[i]; });
      setT(map);
    };
    run();
    return () => { cancelled = true; };
  }, [currentLang]);

  const tx = (s) => t[s] || s;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeTopBar}>
        <View style={styles.homeTopBarLeft}>
          <View style={styles.homeAvatar}>
            <Text style={styles.homeAvatarEmoji}>👷</Text>
          </View>
          <View>
            <Text style={styles.homeNamaste}>{tx('Namaste,')}</Text>
            <Text style={styles.homeWorkerName}>{workerName}</Text>
            <Text style={styles.homeLocation}>📍 {location}</Text>
          </View>
        </View>
        <View style={styles.homeTopBarRight}>
          <TouchableOpacity style={styles.homeIconBtn} onPress={() => setDrawerOpen(true)}>
            <Text style={styles.homeIconBtnText}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.homeStatsRow}>
          {STATS.map(item => (
            <View key={item.id} style={[styles.homeStatCard, item.primary && styles.homeStatCardPrimary]}>
              <Text style={[styles.homeStatNum, item.primary ? styles.homeStatNumPrimary : styles.homeStatNumDark]}>
                {item.value}
              </Text>
              <Text style={[styles.homeStatLbl, item.primary ? styles.homeStatLblPrimary : styles.homeStatLblDark]}>
                {tx(item.label)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.homeQaRow}>
          {QUICK_ACTIONS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.homeQaCard}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.75}
            >
              <View style={[styles.homeQaIcon, { backgroundColor: item.bg }]}>
                <Text style={styles.homeQaIconText}>{item.icon}</Text>
              </View>
              <Text style={styles.homeQaLabel}>{tx(item.label)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.homeSectionHead}>
          <Text style={styles.sectionTitle}>{tx('Ongoing Jobs')}</Text>
          <View style={styles.homeCountBadge}>
            <Text style={styles.homeCountBadgeText}>
              {ONGOING_JOBS.length} {tx('active')}
            </Text>
          </View>
        </View>

        {ONGOING_JOBS.map(job => {
          const st = STATUS_STYLE[job.status] || STATUS_STYLE.scheduled;
          return (
            <View key={job.id} style={styles.ongoingJobCard}>
              <View style={[styles.ongoingJobAccent, { backgroundColor: st.accent }]} />
              <View style={styles.ongoingJobBody}>
                <View style={styles.ongoingJobTop}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.ongoingJobTitleRow}>
                      <Text style={styles.ongoingJobTitle}>{tx(job.title)}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: st.bg }]}>
                        <View style={[styles.statusDot, { backgroundColor: st.dot }]} />
                        <Text style={[styles.statusBadgeText, { color: st.text }]}>
                          {tx(job.statusLabel)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.ongoingJobLoc}>📍 {tx(job.location)}</Text>
                  </View>
                  <View style={styles.ongoingJobPayCol}>
                    <Text style={styles.ongoingJobPay}>{job.payment}</Text>
                    <Text style={styles.ongoingJobDur}>{job.duration}</Text>
                  </View>
                </View>
                {job.client
                  ? <Text style={styles.ongoingJobMeta}>👤 {tx(job.client)}  ·  🏢 {tx(job.type)}</Text>
                  : <Text style={styles.ongoingJobMeta}>🏢 {tx(job.type)}</Text>
                }
                <Text style={styles.ongoingJobMeta}>⏱️ {tx(job.meta)}</Text>
                <View style={styles.ongoingJobActions}>
                  <TouchableOpacity
                    style={styles.jobBtnGhost}
                    onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
                  >
                    <Text style={styles.jobBtnGhostText}>{tx('View Details')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.jobBtnDone}
                    onPress={() => navigation.navigate('RateJob', { jobId: job.id })}
                  >
                    <Text style={styles.jobBtnDoneText}>{tx('Update Status')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

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