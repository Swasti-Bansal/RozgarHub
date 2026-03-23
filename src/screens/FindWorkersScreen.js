import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, SafeAreaView, Alert, TextInput,
} from 'react-native';
import WorkerCard from '../components/WorkerCard';

const MOCK_WORKERS = [
  {
    id: '1', name: 'Rajesh Sharma', category: 'Mason', dailyRate: 1600,
    location: 'Andheri West', experience: '8 yrs exp', jobsDone: 142,
    rating: 4.8, reviews: 56, available: true, verified: true,
    distance: '2.3 km', skills: ['Brickwork', 'Plastering', 'Tile Work'],
  },
  {
    id: '2', name: 'Suresh Patil', category: 'Electrician', dailyRate: 1400,
    location: 'Bandra East', experience: '5 yrs exp', jobsDone: 98,
    rating: 4.5, reviews: 38, available: true, verified: true,
    distance: '1.1 km', skills: ['Wiring', 'Switchboard', 'AC Fitting'],
  },
  {
    id: '3', name: 'Mohan Kumar', category: 'Plumber', dailyRate: 1200,
    location: 'Kurla', experience: '3 yrs exp', jobsDone: 61,
    rating: 4.2, reviews: 22, available: false, verified: false,
    distance: '4.7 km', skills: ['Pipeline', 'Sanitation', 'Tank Fitting'],
  },
  {
    id: '4', name: 'Ravi Tiwari', category: 'Painter', dailyRate: 900,
    location: 'Malad', experience: '6 yrs exp', jobsDone: 210,
    rating: 4.9, reviews: 84, available: true, verified: true,
    distance: '6.0 km', skills: ['Interior', 'Texture', 'Waterproofing'],
  },
  {
    id: '5', name: 'Amit Singh', category: 'Carpenter', dailyRate: 1300,
    location: 'Borivali', experience: '10 yrs exp', jobsDone: 312,
    rating: 4.7, reviews: 102, available: true, verified: true,
    distance: '8.2 km', skills: ['Furniture', 'Doors', 'Modular Kitchen'],
  },
  {
    id: '6', name: 'Dinesh Yadav', category: 'Helper', dailyRate: 700,
    location: 'Dharavi', experience: '1 yr exp', jobsDone: 28,
    rating: 3.9, reviews: 12, available: true, verified: false,
    distance: '3.4 km', skills: ['Loading', 'Cleaning', 'Shifting'],
  },
];

const CATEGORIES = ['All', 'Mason', 'Electrician', 'Plumber', 'Painter', 'Carpenter', 'Helper'];
const SORT_OPTIONS = ['Nearest', 'Rating', 'Price: Low', 'Price: High'];
const CAT_ICONS = {
  All: '👷', Mason: '🧱', Electrician: '⚡',
  Plumber: '🔧', Painter: '🖌', Carpenter: '🪚', Helper: '🙌',
};

export default function FindWorkersScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState('Nearest');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...MOCK_WORKERS];
    if (activeCategory !== 'All') list = list.filter(w => w.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.location.toLowerCase().includes(q) ||
        w.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    if (showAvailableOnly) list = list.filter(w => w.available);
    if (activeSort === 'Rating') list.sort((a, b) => b.rating - a.rating);
    else if (activeSort === 'Price: Low') list.sort((a, b) => a.dailyRate - b.dailyRate);
    else if (activeSort === 'Price: High') list.sort((a, b) => b.dailyRate - a.dailyRate);
    else list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    return list;
  }, [search, activeCategory, activeSort, showAvailableOnly]);

  const handleHire = (w) => {
    Alert.alert(
      '🎉 Hire Worker',
      `Do you want to hire ${w.name} for ₹${w.dailyRate}/day?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, Hire!', onPress: () => Alert.alert('✅ Hired!', `${w.name} has been hired!`) },
      ]
    );
  };

  const handleShortlist = (w) => {
    Alert.alert('⭐ Shortlisted!', `${w.name} added to your shortlist.`, [{ text: 'OK' }]);
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={s.header}>
        <View style={s.avatarBox}>
          <Text style={s.avatarEmoji}>👷</Text>
        </View>
        <View style={s.headerText}>
          <Text style={s.namaste}>Namaste,</Text>
          <Text style={s.name}>Employer</Text>
          <View style={s.locationRow}>
            <Text style={s.locationPin}>📍</Text>
            <Text style={s.location}>Mumbai</Text>
          </View>
        </View>
        <TouchableOpacity style={s.menuBtn}>
          <Text style={s.menuIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* MAIN CARD */}
        <View style={s.card}>

          <Text style={s.fieldLabel}>What skill do you need?</Text>
          <View style={s.inputBox}>
            <Text style={s.inputIcon}>👷</Text>
            <TextInput
              style={s.input}
              value={search}
              onChangeText={setSearch}
              placeholder="Search workers..."
              placeholderTextColor="#BDC3C7"
            />
          </View>

          <Text style={s.fieldLabel}>Select category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[s.pill, activeCategory === cat && s.pillActive]}
                onPress={() => setActiveCategory(cat)}>
                <Text style={s.pillIcon}>{CAT_ICONS[cat]}</Text>
                <Text style={[s.pillText, activeCategory === cat && s.pillTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={s.fieldLabel}>Sort by</Text>
          <View style={s.pillRow}>
            {SORT_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[s.pill, activeSort === opt && s.pillActive]}
                onPress={() => setActiveSort(opt)}>
                <Text style={[s.pillText, activeSort === opt && s.pillTextActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[s.pill, showAvailableOnly && s.pillActive]}
              onPress={() => setShowAvailableOnly(v => !v)}>
              <Text style={[s.pillText, showAvailableOnly && s.pillTextActive]}>🟢 Available</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={s.continueBtn}
            onPress={() => navigation.navigate('PostJobTab')}>
            <Text style={s.continueBtnText}>Post a Job →</Text>
          </TouchableOpacity>

        </View>

        {/* RESULTS */}
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#7F8C8D' }}>
              {filtered.length} worker{filtered.length !== 1 ? 's' : ''} found
            </Text>
            {activeCategory !== 'All' && (
              <TouchableOpacity onPress={() => setActiveCategory('All')}>
                <Text style={{ color: '#E74C3C', fontWeight: '600', fontSize: 14 }}>Clear ✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {filtered.length === 0 ? (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <Text style={{ fontSize: 48, marginBottom: 12 }}>🔍</Text>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#2C3E50' }}>No workers found</Text>
              <Text style={{ fontSize: 14, color: '#7F8C8D', marginTop: 4 }}>Try a different skill or area</Text>
            </View>
          ) : (
            filtered.map(worker => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                onHire={handleHire}
                onShortlist={handleShortlist}
              />
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  avatarBox: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#EBF5FB',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  avatarEmoji: { fontSize: 26 },
  headerText: { flex: 1 },
  namaste: { fontSize: 13, color: '#7F8C8D' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  locationPin: { fontSize: 11, marginRight: 3 },
  location: { fontSize: 13, color: '#7F8C8D' },
  menuBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#F5F7FA',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  menuIcon: { fontSize: 22, color: '#2C3E50', fontWeight: 'bold' },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16, borderRadius: 16,
    padding: 20, marginTop: 16, marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  fieldLabel: { fontSize: 15, fontWeight: '700', color: '#2C3E50', marginBottom: 10 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F7FA', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    marginBottom: 20, borderWidth: 1, borderColor: '#E0E0E0',
  },
  inputIcon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#2C3E50', padding: 0 },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  pill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F7FA', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 9,
    marginRight: 8, marginBottom: 4,
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  pillActive: { backgroundColor: '#4A90E2', borderColor: '#4A90E2' },
  pillIcon: { fontSize: 13, marginRight: 4 },
  pillText: { fontSize: 13, color: '#2C3E50', fontWeight: '600' },
  pillTextActive: { color: '#FFF' },
  continueBtn: {
    backgroundColor: '#4A90E2', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
    shadowColor: '#4A90E2', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  continueBtnText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});