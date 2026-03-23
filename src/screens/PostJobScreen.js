import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, SafeAreaView, Alert, Switch, TextInput,
} from 'react-native';

const JOB_CATEGORIES = [
  { label: 'Mason', icon: '🧱', color: '#FF6B6B' },
  { label: 'Electrician', icon: '⚡', color: '#F5A623' },
  { label: 'Plumber', icon: '🔧', color: '#4A90E2' },
  { label: 'Painter', icon: '🖌', color: '#9B59B6' },
  { label: 'Carpenter', icon: '🪚', color: '#27AE60' },
  { label: 'Helper', icon: '🙌', color: '#E67E22' },
  { label: 'Welder', icon: '🔩', color: '#E74C3C' },
  { label: 'Driver', icon: '🚗', color: '#2C3E50' },
];

const DURATION_OPTIONS = ['1 day', '2-3 days', '1 week', '2 weeks', '1 month', 'Ongoing'];

const URGENCY_OPTIONS = [
  { label: 'Not urgent', color: '#27AE60', bg: '#E8F8EF' },
  { label: 'Within a week', color: '#F5A623', bg: '#FFF3DC' },
  { label: 'Urgent (today)', color: '#E74C3C', bg: '#FDECEA' },
];

function StepDots({ current, total }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 8 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[
          s.dot,
          i === current && s.dotActive,
          i < current && s.dotDone,
        ]} />
      ))}
    </View>
  );
}

export default function PostJobScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [urgency, setUrgency] = useState('');
  const [workersNeeded, setWorkersNeeded] = useState('1');
  const [dailyBudgetMin, setDailyBudgetMin] = useState('');
  const [dailyBudgetMax, setDailyBudgetMax] = useState('');
  const [provideMeals, setProvideMeals] = useState(false);
  const [provideTransport, setProvideTransport] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const canProceedStep0 = title.trim() && category && location.trim();
  const canProceedStep1 = duration && urgency;
  const canSubmit = contactName.trim() && contactPhone.trim().length >= 10;
  const disabled = step === 0 ? !canProceedStep0 : step === 1 ? !canProceedStep1 : !canSubmit;

  const handleNext = () => { if (step < 2) setStep(s => s + 1); };
  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
    else navigation && navigation.goBack();
  };

  const handleSubmit = () => {
    Alert.alert(
      '🎉 Job Posted!',
      `Your job "${title}" is live! Workers will contact you shortly.`,
      [
        { text: 'Find Workers', onPress: () => navigation && navigation.navigate('FindWorkers') },
        { text: 'OK', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* TOP BAR */}
      <View style={s.topBar}>
        <TouchableOpacity style={s.backBtn} onPress={handleBack}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.topBarTitle}>Post a Job</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}>

        <View style={s.card}>
          <StepDots current={step} total={3} />

          <Text style={s.stepTitle}>
            {['What work do you need?', 'Work requirements', 'Almost done!'][step]}
          </Text>

          {/* ── STEP 0 ── */}
          {step === 0 && (
            <View>
              <Text style={s.fieldLabel}>What's the job?</Text>
              <View style={s.inputBox}>
                <Text style={s.inputIcon}>📝</Text>
                <TextInput
                  style={s.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g. House painting 2BHK"
                  placeholderTextColor="#BDC3C7"
                />
              </View>

              <Text style={s.fieldLabel}>Where do you need the worker?</Text>
              <View style={s.inputBox}>
                <Text style={s.inputIcon}>📍</Text>
                <TextInput
                  style={s.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="e.g. Andheri West, Mumbai"
                  placeholderTextColor="#BDC3C7"
                />
              </View>

              <Text style={s.fieldLabel}>What type of work?</Text>
              <View style={s.categoryGrid}>
                {JOB_CATEGORIES.map(cat => (
                  <TouchableOpacity
                    key={cat.label}
                    style={[
                      s.catCard,
                      { backgroundColor: cat.color + '18' },
                      category === cat.label && { borderColor: cat.color, borderWidth: 2.5 },
                    ]}
                    onPress={() => setCategory(cat.label)}>
                    <Text style={{ fontSize: 26, marginBottom: 4 }}>{cat.icon}</Text>
                    <Text style={[s.catLabel, { color: cat.color }]}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={s.fieldLabel}>Description (optional)</Text>
              <TextInput
                style={s.textArea}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the work in detail..."
                placeholderTextColor="#BDC3C7"
                multiline
                numberOfLines={3}
              />
            </View>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <View>
              <Text style={s.fieldLabel}>How many workers?</Text>
              <View style={s.counterRow}>
                <TouchableOpacity
                  style={s.counterBtn}
                  onPress={() => setWorkersNeeded(w => Math.max(1, +w - 1).toString())}>
                  <Text style={s.counterBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={s.counterVal}>{workersNeeded}</Text>
                <TouchableOpacity
                  style={s.counterBtn}
                  onPress={() => setWorkersNeeded(w => (+w + 1).toString())}>
                  <Text style={s.counterBtnText}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={s.fieldLabel}>Duration</Text>
              <View style={s.pillWrap}>
                {DURATION_OPTIONS.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[s.pill, duration === opt && s.pillActive]}
                    onPress={() => setDuration(opt)}>
                    <Text style={[s.pillText, duration === opt && s.pillTextActive]}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={s.fieldLabel}>Urgency</Text>
              {URGENCY_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={opt.label}
                  style={[
                    s.urgencyCard,
                    urgency === opt.label && { borderColor: opt.color, backgroundColor: opt.bg },
                  ]}
                  onPress={() => setUrgency(opt.label)}>
                  <View style={[s.urgDot, { backgroundColor: opt.color }]} />
                  <Text style={[s.urgLabel, urgency === opt.label && { color: opt.color }]}>
                    {opt.label}
                  </Text>
                  {urgency === opt.label && (
                    <Text style={{ marginLeft: 'auto', color: opt.color, fontWeight: '800' }}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}

              <Text style={s.fieldLabel}>Daily Budget (₹)</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <TextInput
                  style={[s.inputBox, { flex: 1, marginRight: 8, marginBottom: 0 }]}
                  value={dailyBudgetMin}
                  onChangeText={setDailyBudgetMin}
                  placeholder="Min e.g. 800"
                  placeholderTextColor="#BDC3C7"
                  keyboardType="numeric"
                />
                <Text style={{ color: '#BDC3C7', fontSize: 18 }}>—</Text>
                <TextInput
                  style={[s.inputBox, { flex: 1, marginLeft: 8, marginBottom: 0 }]}
                  value={dailyBudgetMax}
                  onChangeText={setDailyBudgetMax}
                  placeholder="Max e.g. 1500"
                  placeholderTextColor="#BDC3C7"
                  keyboardType="numeric"
                />
              </View>

              <Text style={s.fieldLabel}>Perks provided</Text>
              <View style={s.perksCard}>
                <View style={s.perkRow}>
                  <Text style={{ fontSize: 20, marginRight: 10 }}>🍱</Text>
                  <Text style={s.perkLabel}>Meals included</Text>
                  <Switch
                    value={provideMeals}
                    onValueChange={setProvideMeals}
                    trackColor={{ false: '#E0E0E0', true: '#4A90E2' }}
                    thumbColor="#FFF"
                  />
                </View>
                <View style={[s.perkRow, { borderBottomWidth: 0 }]}>
                  <Text style={{ fontSize: 20, marginRight: 10 }}>🚌</Text>
                  <Text style={s.perkLabel}>Transport provided</Text>
                  <Switch
                    value={provideTransport}
                    onValueChange={setProvideTransport}
                    trackColor={{ false: '#E0E0E0', true: '#4A90E2' }}
                    thumbColor="#FFF"
                  />
                </View>
              </View>
            </View>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <View>
              <Text style={s.fieldLabel}>Your name</Text>
              <View style={s.inputBox}>
                <Text style={s.inputIcon}>👤</Text>
                <TextInput
                  style={s.input}
                  value={contactName}
                  onChangeText={setContactName}
                  placeholder="Full name"
                  placeholderTextColor="#BDC3C7"
                />
              </View>

              <Text style={s.fieldLabel}>Phone number</Text>
              <View style={s.inputBox}>
                <Text style={s.inputIcon}>📱</Text>
                <TextInput
                  style={s.input}
                  value={contactPhone}
                  onChangeText={setContactPhone}
                  placeholder="10-digit mobile number"
                  placeholderTextColor="#BDC3C7"
                  keyboardType="phone-pad"
                />
              </View>

              <Text style={s.fieldLabel}>Job Summary</Text>
              <View style={s.summaryCard}>
                {[
                  ['Job', title || '—'],
                  ['Category', category || '—'],
                  ['Location', location || '—'],
                  ['Workers', `${workersNeeded} worker(s)`],
                  ['Duration', duration || '—'],
                  ['Urgency', urgency || '—'],
                  ['Budget', dailyBudgetMin || dailyBudgetMax
                    ? `₹${dailyBudgetMin}–₹${dailyBudgetMax}` : 'Negotiable'],
                ].map(([label, value]) => (
                  <View key={label} style={s.summaryRow}>
                    <Text style={s.summaryLabel}>{label}</Text>
                    <Text style={s.summaryValue}>{value}</Text>
                  </View>
                ))}
              </View>

              <View style={s.noteBox}>
                <Text style={s.noteText}>
                  📢 Your job will be shown to nearby verified workers immediately after posting.
                </Text>
              </View>
            </View>
          )}

          {/* BUTTONS */}
          <View style={s.btnRow}>
            {step > 0 && (
              <TouchableOpacity style={s.backBtnSm} onPress={handleBack}>
                <Text style={s.backBtnSmText}>← Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[s.continueBtn, { flex: 1 }, disabled && s.continueBtnDisabled]}
              onPress={step < 2 ? handleNext : handleSubmit}
              disabled={disabled}>
              <Text style={s.continueBtnText}>
                {step < 2 ? 'Continue →' : '🚀 Post Job'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FA' },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: '#FFF',
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  topBarTitle: { fontSize: 17, fontWeight: '800', color: '#2C3E50' },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#F5F7FA',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  backIcon: { fontSize: 18, color: '#2C3E50' },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16, borderRadius: 16,
    padding: 20, marginTop: 16, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E0E0E0' },
  dotActive: { backgroundColor: '#4A90E2', width: 24 },
  dotDone: { backgroundColor: '#5CB85C' },
  stepTitle: { fontSize: 20, fontWeight: '800', color: '#2C3E50', marginBottom: 20 },
  fieldLabel: { fontSize: 15, fontWeight: '700', color: '#2C3E50', marginBottom: 10 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F7FA', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 13,
    marginBottom: 18, borderWidth: 1, borderColor: '#E0E0E0',
  },
  inputIcon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#2C3E50', padding: 0 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
  catCard: {
    width: '22%', borderRadius: 12, padding: 10,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  catLabel: { fontSize: 11, fontWeight: '700', textAlign: 'center' },
  textArea: {
    backgroundColor: '#F5F7FA', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: '#2C3E50',
    borderWidth: 1, borderColor: '#E0E0E0',
    height: 90, textAlignVertical: 'top', marginBottom: 10,
  },
  counterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  counterBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#EBF5FB',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#4A90E2',
  },
  counterBtnText: { fontSize: 22, color: '#4A90E2', fontWeight: '700' },
  counterVal: {
    fontSize: 24, fontWeight: '800', color: '#2C3E50',
    marginHorizontal: 30, minWidth: 40, textAlign: 'center',
  },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  pill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F7FA', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 9,
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  pillActive: { backgroundColor: '#4A90E2', borderColor: '#4A90E2' },
  pillText: { fontSize: 13, color: '#2C3E50', fontWeight: '600' },
  pillTextActive: { color: '#FFF' },
  urgencyCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#E0E0E0',
    marginBottom: 10, backgroundColor: '#FFF',
  },
  urgDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  urgLabel: { fontSize: 15, color: '#2C3E50', fontWeight: '600' },
  perksCard: {
    backgroundColor: '#F5F7FA', borderRadius: 12,
    borderWidth: 1, borderColor: '#E0E0E0',
    marginBottom: 10, overflow: 'hidden',
  },
  perkRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderBottomWidth: 1, borderBottomColor: '#E0E0E0',
  },
  perkLabel: { flex: 1, fontSize: 15, color: '#2C3E50', fontWeight: '500' },
  summaryCard: {
    backgroundColor: '#F5F7FA', borderRadius: 12,
    padding: 14, marginBottom: 14,
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ECECEC',
  },
  summaryLabel: { fontSize: 13, color: '#7F8C8D', fontWeight: '600' },
  summaryValue: { fontSize: 13, color: '#2C3E50', fontWeight: '700', maxWidth: '60%', textAlign: 'right' },
  noteBox: {
    backgroundColor: '#EBF5FB', borderRadius: 12,
    padding: 12, marginBottom: 10,
    borderLeftWidth: 3, borderLeftColor: '#4A90E2',
  },
  noteText: { fontSize: 13, color: '#1A5276', lineHeight: 20 },
  btnRow: { flexDirection: 'row', marginTop: 20, gap: 10 },
  backBtnSm: {
    flex: 1, paddingVertical: 15, borderRadius: 12,
    backgroundColor: '#F5F7FA', alignItems: 'center',
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  backBtnSmText: { color: '#7F8C8D', fontWeight: '700', fontSize: 15 },
  continueBtn: {
    backgroundColor: '#4A90E2', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: '#4A90E2', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  continueBtnDisabled: { backgroundColor: '#BDC3C7', shadowOpacity: 0 },
  continueBtnText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});