// src/components/Header.js - Reusable Header Component
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ leftText, leftIcon, onLeftPress, rightIcon, onRightPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onLeftPress} style={styles.headerLeft}>
        {leftIcon && <Text style={styles.icon}>{leftIcon}</Text>}
        {leftText && <Text style={styles.headerText}>{leftText}</Text>}
      </TouchableOpacity>
      {rightIcon && (
        <TouchableOpacity onPress={onRightPress}>
          <Text style={styles.icon}>{rightIcon}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: 24, marginRight: 8 },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },
});

export default Header;
