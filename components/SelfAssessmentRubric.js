import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OPTIONS = [
  { score: 7, label: 'Решила правильно', short: '+7' },
  { score: 5, label: 'Решила с маленькими недочётами', short: '+5' },
  { score: 3, label: 'Не полное решение', short: '+3' },
  { score: 1, label: 'Правильная идея', short: '+1' },
  { score: 0, label: 'Неверно', short: '0' },
];

export default function SelfAssessmentRubric({ onSelect, title }) {
  return (
    <View style={styles.wrap}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.hint}>Оцените свой результат честно — так точнее прогресс.</Text>
      {OPTIONS.map((o) => (
        <TouchableOpacity
          key={o.score}
          style={styles.row}
          onPress={() => onSelect(o.score)}
          accessibilityRole="button"
        >
          <Text style={styles.badge}>{o.short}</Text>
          <Text style={styles.label}>{o.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 12 },
  title: { fontSize: 17, fontWeight: '700', color: '#111', marginBottom: 8 },
  hint: { fontSize: 14, color: '#555', marginBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f4f6fb',
    borderRadius: 10,
    marginBottom: 8,
  },
  badge: {
    width: 40,
    fontWeight: '700',
    color: '#2563eb',
    fontSize: 16,
  },
  label: { flex: 1, fontSize: 15, color: '#222' },
});
