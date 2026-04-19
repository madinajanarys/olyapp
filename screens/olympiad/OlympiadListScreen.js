import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { OLYMPIADS } from '../../data/olympiads';
import { safeBackTo } from '../../utils/navigationSafeBack';
import { useLanguage } from '../../context/LanguageContext';
import { getOlympiadTitle } from '../../i18n/olympiadI18n';

function OlympiadRowIcon() {
  return (
    <View style={styles.iconOuter}>
      <Text style={styles.iconPencil}>✎</Text>
    </View>
  );
}

export default function OlympiadListScreen({ navigation }) {
  const { t, currentLang } = useLanguage();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => safeBackTo(navigation, 'AlgebraMenu')} />
        <Text style={styles.title}>{t('olympiadListTitle')}</Text>
        <Text style={styles.sub}>{t('olympiadListSub')}</Text>
        {OLYMPIADS.map((o) => (
          <TouchableOpacity
            key={o.id}
            style={styles.row}
            onPress={() => navigation.navigate('OlympiadSession', { olympiadId: o.id })}
            activeOpacity={0.9}
          >
            <View style={styles.leftSlot}>
              <OlympiadRowIcon />
            </View>
            <View style={styles.mid}>
              <Text style={styles.rowTitle}>{getOlympiadTitle(o.id, currentLang, o.title)}</Text>
              <Text style={styles.rowSub}>
                {o.problems.length} {t('olympiadProblemsCount')}
              </Text>
            </View>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: '#111', marginBottom: 8 },
  sub: { fontSize: 15, color: '#555', marginBottom: 18, lineHeight: 22 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  leftSlot: { width: 56, alignItems: 'center', justifyContent: 'center' },
  iconOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPencil: { color: '#fff', fontSize: 22, fontWeight: '700' },
  mid: { flex: 1, paddingHorizontal: 8 },
  rowTitle: { fontSize: 16, fontWeight: '700', color: '#000' },
  rowSub: { fontSize: 13, color: '#64748b', marginTop: 2 },
  chev: { fontSize: 28, fontWeight: '300', color: '#000' },
});
