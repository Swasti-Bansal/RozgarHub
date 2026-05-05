// src/components/SideDrawer.js
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useUser } from '../context/UserContext';
import LanguagePicker from './LanguagePicker';
import T from './T';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

const ROLE_META = {
  employer: { emoji: '🏗️', label: 'Employer' },
  worker:   { emoji: '👷', label: 'Worker'   },
  '':       { emoji: '👤', label: ''          },
};

const SideDrawer = ({ visible, onClose, navigation }) => {
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  // ── Pull real user data instead of hardcoded strings ─────────────
  const { profile, updateProfile } = useUser();
  const roleMeta  = ROLE_META[profile.role] || ROLE_META[''];
  const userName  = profile.name         || 'User';
  const userLoc   = profile.locationLabel || '';
  const roleLabel = roleMeta.label;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0,           duration: 280, useNativeDriver: true }),
        Animated.timing(fadeAnim,  { toValue: 1,           duration: 280, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: DRAWER_WIDTH, duration: 220, useNativeDriver: true }),
        Animated.timing(fadeAnim,  { toValue: 0,            duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            onClose();
            // Clear the in-memory profile so next login starts fresh
            updateProfile({
              name: '', role: '', age: '',
              location: null, locationLabel: '',
            });
            await auth().signOut();
            navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
          },
        },
      ]
    );
  };

  // ── Menu items — only show screens relevant to the role ──────────
  const menuItems = profile.role === 'employer'
    ? [
        { icon: '🔍', label: 'Find Workers', screen: 'FindWorkers', bg: '#EBF3FD' },
        { icon: '📋', label: 'Job History',  screen: 'JobHistory',  bg: '#FFF3DC' },
      ]
    : [
        { icon: '💼', label: 'Find Work',   screen: 'HereJob',     bg: '#EBF3FD' },
        { icon: '📋', label: 'Job History', screen: 'JobHistory',  bg: '#FFF3DC' },
        { icon: '⭐', label: 'Reviews',     screen: 'Review',      bg: '#FFF9E6' },
      ];

  const handleNavigate = (screen) => {
    if (!screen) {
      Alert.alert('Coming soon', 'This feature is under development.');
      return;
    }
    onClose();
    navigation.navigate(screen);
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      {/* Dim overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[s.overlay, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Drawer panel */}
      <Animated.View style={[s.drawer, { transform: [{ translateX: slideAnim }] }]}>

        {/* ── Header ── */}
        <View style={s.drawerHeader}>
          <View style={s.drawerAvatar}>
            <Text style={s.drawerAvatarEmoji}>{roleMeta.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.drawerName}>{userName}</Text>
            {roleLabel ? <Text style={s.drawerSub}>{roleLabel}</Text> : null}
            {userLoc   ? <Text style={s.drawerSub}>📍 {userLoc}</Text> : null}
          </View>
          <TouchableOpacity onPress={onClose} style={s.closeBtn} accessibilityLabel="Close menu">
            <Text style={s.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={s.divider} />

        {/* ── Nav items ── */}
        <View style={s.menuList}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.label}
              style={s.menuItem}
              onPress={() => handleNavigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={[s.menuIconBox, { backgroundColor: item.bg }]}>
                <Text style={s.menuIcon}>{item.icon}</Text>
              </View>
              <T style={s.menuLabel}>{item.label}</T>
              <Text style={s.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.divider} />

        {/* ── Language ── */}
        <View style={s.languageSection}>
          <View style={s.menuIconBox}>
            <Text style={s.menuIcon}>🌐</Text>
          </View>
          <T style={s.languageLabel}>Language</T>
          <LanguagePicker />
        </View>

        <View style={s.divider} />
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
          <View style={[s.menuIconBox, { backgroundColor: '#FEECEC' }]}>
            <Text style={s.menuIcon}>🚪</Text>
          </View>
          <T style={s.logoutText}>Logout</T>
        </TouchableOpacity>

        {/* ── Footer ── */}
        <View style={s.drawerFooter}>
          <T style={s.versionText}>RozgarHub</T>
        </View>

      </Animated.View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  drawer: {
    position: 'absolute',
    right: 0, top: 0, bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 20,
  },

  // Header
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
    paddingTop: 56,
    backgroundColor: '#F5F7FA',
  },
  drawerAvatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#EBF3FD',
    alignItems: 'center', justifyContent: 'center',
  },
  drawerAvatarEmoji: { fontSize: 26 },
  drawerName: { fontSize: 18, fontWeight: '700', color: '#1A1F36' },
  drawerSub:  { fontSize: 13, color: '#6B7280', marginTop: 2 },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#E5EAF2',
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 14, color: '#1A1F36', fontWeight: '700' },

  divider: { height: 0.5, backgroundColor: '#E5EAF2' },

  // Menu
  menuList:    { paddingVertical: 8 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  menuIconBox: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  menuIcon:  { fontSize: 22 },
  menuLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1A1F36' },
  menuArrow: { fontSize: 22, color: '#9CA3AF' },

  // Language
  languageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  languageLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1A1F36' },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#C0392B' },

  // Footer
  drawerFooter: {
    position: 'absolute',
    bottom: 30, left: 0, right: 0,
    alignItems: 'center',
  },
  versionText: { fontSize: 13, color: '#9CA3AF' },
});

export default SideDrawer;