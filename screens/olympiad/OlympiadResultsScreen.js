import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { getOlympiad } from '../../data/olympiads';
import { safeBackTo } from '../../utils/navigationSafeBack';
import { useApp } from '../../context/AppContext';

export default function OlympiadResultsScreen({ navigation, route }) {
  const { olympiadId } = route.params;
  const olympiad = getOlympiad(olympiadId);
  const { olympiadProgress } = useApp();

  const stats = useMemo(() => {
    if (!olympiad) return null;
    const bucket = olympiadProgress[olympiadId] || {};
    const items = olympiad.problems.map((p) => {
      const st = bucket[p.id];
      let status = '—';
      if (st?.answerCorrect === true) status = 'ok';
      else if (st?.answerCorrect === false) status = 'bad';
      return { ...p, status };
    });
    const correct = items.filter((x) => x.status === 'ok').length;
    const wrong = items.filter((x) => x.status === 'bad').length;
    const unchecked = items.filter((x) => x.status === '—').length;
    const total = items.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    return { items, correct, wrong, unchecked, total, pct };
  }, [olympiad, olympiadId, olympiadProgress]);

  if (!olympiad || !stats) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text>Олимпиада не найдена</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => safeBackTo(navigation, 'AlgebraMenu')} />
        <Text style={styles.title}>Итоги</Text>
        <Text style={styles.sub}>{olympiad.title}</Text>

        <View style={styles.pctCard}>
          <Text style={styles.pctLabel}>Результат</Text>
          <Text style={styles.pctValue}>{stats.pct}%</Text>
          <Text style={styles.pctHint}>
            Верно: {stats.correct} из {stats.total}
            {stats.wrong > 0 ? ` · неверно: ${stats.wrong}` : ''}
            {stats.unchecked > 0 ? ` · без проверки: ${stats.unchecked}` : ''}
          </Text>
        </View>

        <Text style={styles.h2}>Задачи</Text>
        {stats.items.map((it, i) => (
          <View key={it.id} style={styles.row}>
            <Text style={styles.badge}>
              {it.status === 'ok' ? '✓' : it.status === 'bad' ? '✗' : '○'}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{it.shortLabel || `Задача ${i + 1}`}</Text>
              <Text style={styles.rowSub} numberOfLines={2}>
                {it.text}
              </Text>
              <Text style={styles.rowStat}>
                {it.status === 'ok'
                  ? 'Верно'
                  : it.status === 'bad'
                    ? 'Неверно'
                    : 'Ответ не проверялся'}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('OlympiadList')}>
          <Text style={styles.btnText}>К списку олимпиад</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 4 },
  sub: { fontSize: 15, color: '#64748b', marginBottom: 16 },
  pctCard: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#166534',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    alignItems: 'center',
  },
  pctLabel: { fontSize: 14, color: '#166534', fontWeight: '700', marginBottom: 4 },
  pctValue: { fontSize: 42, fontWeight: '900', color: '#14532d' },
  pctHint: { fontSize: 14, color: '#475569', marginTop: 8, textAlign: 'center', lineHeight: 20 },
  h2: { fontSize: 18, fontWeight: '800', marginBottom: 10, color: '#111' },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  badge: { fontSize: 22, marginRight: 10, width: 28, textAlign: 'center' },
  rowTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  rowSub: { fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 18 },
  rowStat: { fontSize: 13, fontWeight: '700', color: '#334155', marginTop: 6 },
  btn: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
