import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function SelfAssessmentRubric({ onSelect, title }) {
  const { t } = useLanguage();
  const OPTIONS = useMemo(
    () => [
      { score: 7, labelKey: 'rubricScore7', short: '+7' },
      { score: 5, labelKey: 'rubricScore5', short: '+5' },
      { score: 3, labelKey: 'rubricScore3', short: '+3' },
      { score: 1, labelKey: 'rubricScore1', short: '+1' },
      { score: 0, labelKey: 'rubricScore0', short: '0' },
    ],
    []
  );

  return (
    <View style={styles.wrap}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.hint}>{t('rubricHint')}</Text>
      {OPTIONS.map((o) => (
        <TouchableOpacity
          key={o.score}
          style={styles.row}
          onPress={() => onSelect(o.score)}
          accessibilityRole="button"
        >
          <Text style={styles.badge}>{o.short}</Text>
          <Text style={styles.label}>{t(o.labelKey)}</Text>
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
