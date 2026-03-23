// src/components/LanguagePicker.js
import React, { useState } from 'react';
import {
  Modal, View, Text, TouchableOpacity,
  FlatList, ActivityIndicator, StyleSheet,
} from 'react-native';
import { useTranslation } from '../context/TranslationContext';
const LanguagePicker = () => {
  const { currentLang, switchLanguage, isTranslating, LANGUAGES } = useTranslation();
  const [visible, setVisible] = useState(false);
  const currentInfo = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <>
      <TouchableOpacity
        style={s.btn}
        onPress={() => setVisible(true)}
        disabled={isTranslating}
      >
        {isTranslating ? (
          <ActivityIndicator size="small" color="#4A90E2" />
        ) : (
          <View style={s.btnInner}>
            <Text style={s.globe}>🌐</Text>
            <Text style={s.langName}>{currentInfo.native}</Text>
            <Text style={s.arrow}>▾</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={s.backdrop}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        />

        <View style={s.sheet}>
          <View style={s.handle} />

          <View style={s.sheetHeader}>
            <Text style={s.sheetTitle}>Select Language</Text>
            <TouchableOpacity style={s.closeBtn} onPress={() => setVisible(false)}>
              <Text style={s.closeTxt}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={LANGUAGES}
            keyExtractor={item => item.code}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const active = currentLang === item.code;
              return (
                <TouchableOpacity
                  style={[s.row, active && s.rowActive]}
                  onPress={() => {
                    switchLanguage(item.code);
                    setVisible(false);
                  }}
                >
                  <View style={[s.avatar, active && s.avatarActive]}>
                    <Text style={[s.avatarTxt, active && { color: '#fff' }]}>
                      {item.native.charAt(0)}
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={[s.native, active && { color: '#4A90E2' }]}>
                      {item.native}
                    </Text>
                    <Text style={s.english}>{item.label}</Text>
                  </View>
                  {active && (
                    <View style={s.tick}>
                      <Text style={{ color: '#fff', fontSize: 12, fontWeight: '800' }}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </>
  );
};

const s = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF2FB',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8DDF5',
    minWidth: 44,
    justifyContent: 'center',
  },
  btnInner:  { flexDirection: 'row', alignItems: 'center' },
  globe:     { fontSize: 15, marginRight: 5 },
  langName:  { fontSize: 13, color: '#4A90E2', fontWeight: '600', marginRight: 3 },
  arrow:     { fontSize: 10, color: '#4A90E2' },
  backdrop:  { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '72%',
    paddingBottom: 34,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: '#DDD',
    alignSelf: 'center',
    marginTop: 12, marginBottom: 4,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sheetTitle: { fontSize: 17, fontWeight: '800', color: '#2C3E50' },
  closeBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#F0F0F0',
    alignItems: 'center', justifyContent: 'center',
  },
  closeTxt:     { fontSize: 13, color: '#555', fontWeight: '700' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  rowActive:    { backgroundColor: '#EAF2FB' },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#F0F4FF',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarActive: { backgroundColor: '#4A90E2' },
  avatarTxt:    { fontSize: 16, fontWeight: '700', color: '#4A90E2' },
  native:       { fontSize: 15, fontWeight: '700', color: '#2C3E50' },
  english:      { fontSize: 12, color: '#999', marginTop: 2 },
  tick: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#4A90E2',
    alignItems: 'center', justifyContent: 'center',
  },
});

export default LanguagePicker;
