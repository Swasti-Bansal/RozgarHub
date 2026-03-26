// src/components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ title, navigation }) => {
  return (
    <View style={s.row}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={s.backBtn}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={s.backText}>‹</Text>
      </TouchableOpacity>
      <Text style={s.title}>{title}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    marginRight: 12,
    padding: 10,
  },
  backText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});

export default Header;