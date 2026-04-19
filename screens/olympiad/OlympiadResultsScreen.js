import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { getOlympiad } from '../../data/olympiads';
import { safeBackTo } from '../../utils/navigationSafeBack';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedOlympiadProblem, getOlympiadTitle } from '../../i18n/olympiadI18n';

export default function OlympiadResultsScreen({ navigation, route }) {
  const { olympiadId } = route.params;
  const olympiad = getOlympiad(olympiadId);
  const { olympiadProgress } = useApp();
  const { t, currentLang } = useLanguage();

  const stats = useMemo(() => {
    if (!olympiad) return null;
    const bucket = olympiadProgress[olympiadId] || {};
    const items = olympiad.problems.map((p) => {
      const lp = getLocalizedOlympiadProblem(p, currentLang);
      const st = bucket[p.id];
      let status = '—';
      if (st?.answerCorrect === true) status = 'ok';
      else if (st?.answerCorrect === false) status = 'bad';
      return { ...lp, status, origId: p.id };
    });
    const correct = items.filter((x) => x.status === 'ok').length;
    const wrong = items.filter((x) => x.status === 'bad').length;
    const unchecked = items.filter((x) => x.status === '—').length;
    const total = items.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    return { items, correct, wrong, unchecked, total, pct };
  }, [olympiad, olympiadId, olympiadProgress, currentLang]);

  if (!olympiad || !stats) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text>{t('olympiadNotFound')}</Text>
      </SafeAreaView>
    );
  }

  const title = getOlympiadTitle(olympiad.id, currentLang, olympiad.title);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => safeBackTo(navigation, 'AlgebraMenu')} />
        <Text style={styles.title}>{t('resultsTitle')}</Text>
        <Text style={styles.sub}>{title}</Text>

        <View style={styles.pctCard}>
          <Text style={styles.pctLabel}>{t('resultsResult')}</Text>
          <Text style={styles.pctValue}>{stats.pct}%</Text>
          <Text style={styles.pctHint}>
            {t('resultsCorrect')} {stats.correct} {t('resultsOf')} {stats.total}
            {stats.wrong > 0 ? `${t('resultsWrong')}${stats.wrong}` : ''}
            {stats.unchecked > 0 ? `${t('resultsUnchecked')}${stats.unchecked}` : ''}
          </Text>
        </View>

        <Text style={styles.h2}>{t('olympProblems')}</Text>
        {stats.items.map((it, i) => (
          <View key={it.origId} style={styles.row}>
            <Text style={styles.badge}>
              {it.status === 'ok' ? '✓' : it.status === 'bad' ? '✗' : '○'}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>
                {it.shortLabel || `${t('resultsProblem')} ${i + 1}`}
              </Text>
              <Text style={styles.rowSub} numberOfLines={2}>
                {it.text}
              </Text>
              <Text style={styles.rowStat}>
                {it.status === 'ok'
                  ? t('resultsStatusOk')
                  : it.status === 'bad'
                    ? t('resultsStatusBad')
                    : t('resultsStatusNone')}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('OlympiadList')}>
          <Text style={styles.btnText}>{t('resultsToList')}</Text>
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
