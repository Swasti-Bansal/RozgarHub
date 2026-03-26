import React from 'react';
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius, Shadow } from '../theme';

export function PrimaryButton({ title, onPress, loading, style, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.primaryBtn, disabled && styles.primaryBtnDisabled, style]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}>
      {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.primaryBtnText}>{title}</Text>}
    </TouchableOpacity>
  );
}

export function OutlineButton({ title, onPress, style, color }) {
  const c = color || Colors.primary;
  return (
    <TouchableOpacity style={[styles.outlineBtn, { borderColor: c }, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.outlineBtnText, { color: c }]}>{title}</Text>
    </TouchableOpacity>
  );
}

export function InputField({ label, value, onChangeText, placeholder, keyboardType, multiline, numberOfLines, style }) {
  return (
    <View style={[styles.inputWrapper, style]}>
      {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
      <TextInput
        style={[styles.input, multiline && { height: (numberOfLines || 3) * 44, textAlignVertical: 'top' }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        keyboardType={keyboardType || 'default'}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}

export function Tag({ label, color, bgColor, style }) {
  return (
    <View style={[styles.tag, { backgroundColor: bgColor || Colors.primaryBg }, style]}>
      <Text style={[styles.tagText, { color: color || Colors.primary }]}>{label}</Text>
    </View>
  );
}

export function Avatar({ name, size = 40, bgColor }) {
  const initials = name ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : '?';
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor || Colors.primaryLight }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

export function Stars({ rating = 0, size = 14 }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Text key={i} style={{ fontSize: size, color: i <= rating ? Colors.accent : Colors.border }}>★</Text>
      ))}
    </View>
  );
}

export function EmptyState({ emoji, title, subtitle }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyEmoji}>{emoji || '📭'}</Text>
      <Text style={styles.emptyTitle}>{title || 'Nothing here yet'}</Text>
      {subtitle ? <Text style={styles.emptySubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingVertical: 14,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  primaryBtnDisabled: { backgroundColor: Colors.textMuted },
  primaryBtnText: { color: Colors.white, fontSize: Fonts.sizes.md, fontWeight: '700', letterSpacing: 0.3 },
  outlineBtn: {
    borderWidth: 1.5,
    borderRadius: Radius.full,
    paddingVertical: 12,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  outlineBtnText: { fontSize: Fonts.sizes.base, fontWeight: '600' },
  inputWrapper: { marginBottom: Spacing.base },
  inputLabel: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: 13,
    fontSize: Fonts.sizes.base,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tag: { paddingHorizontal: Spacing.sm, paddingVertical: 3, borderRadius: Radius.full },
  tagText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  avatar: { alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: Colors.white, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: Spacing.xxl * 2 },
  emptyEmoji: { fontSize: 48, marginBottom: Spacing.base },
  emptyTitle: { fontSize: Fonts.sizes.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  emptySubtitle: { fontSize: Fonts.sizes.base, color: Colors.textSecondary, textAlign: 'center', paddingHorizontal: Spacing.xl, lineHeight: 22 },
});