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

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

const SideDrawer = ({ visible, onClose, navigation }) => {
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
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
            await auth().signOut();
            navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
          },
        },
      ]
    );
  };

  const handleNavigate = (screen) => {
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
      {/* Dim overlay — tap to close */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[s.overlay, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Drawer panel */}
      <Animated.View style={[s.drawer, { transform: [{ translateX: slideAnim }] }]}>

        {/* Header */}
        <View style={s.drawerHeader}>
          <View style={s.drawerAvatar}>
            <Text style={s.drawerAvatarEmoji}>👷</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.drawerName}>Rajan Kumar</Text>
            <Text style={s.drawerSub}>Painter · 4.8 ⭐</Text>
            <Text style={s.drawerSub}>Andheri West, Mumbai</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={s.closeBtn}>
            <Text style={s.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>


        <View style={s.divider} />

        {/* Logout */}
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
          <View style={[s.menuIconBox, { backgroundColor: '#FEECEC' }]}>
            <Text style={s.menuIcon}>🚪</Text>
          </View>
          <Text style={s.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App version at bottom */}
        <View style={s.drawerFooter}>
          <Text style={s.versionText}>RozgarHub</Text>
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
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
    paddingTop: 56,
    backgroundColor: '#F5F7FA',
  },
  drawerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E8F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerAvatarEmoji: { fontSize: 26 },
  drawerName: { fontSize: 18, fontWeight: '700', color: '#2C3E50' },
  drawerSub: { fontSize: 13, color: '#7F8C8D', marginTop: 2 },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { fontSize: 14, color: '#2C3E50', fontWeight: '700' },
  divider: {
    height: 0.5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 0,
  },
  menuList: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: { fontSize: 22 },
  menuLabel: { fontSize: 16, fontWeight: '600', color: '#2C3E50' },
  menuSub: { fontSize: 13, color: '#7F8C8D', marginTop: 2 },
  menuArrow: { fontSize: 22, color: '#B0B0B0', fontWeight: '300' },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#C0392B' },
  drawerFooter: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  versionText: { fontSize: 13, color: '#B0B0B0' },
});

export default SideDrawer;