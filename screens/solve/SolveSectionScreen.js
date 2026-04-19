import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { safeBackTo } from '../../utils/navigationSafeBack';
import { useLanguage } from '../../context/LanguageContext';

export default function SolveSectionScreen({ navigation }) {
  const { t } = useLanguage();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => safeBackTo(navigation, 'AlgebraMenu')} />
        <Text style={styles.title}>{t('solveSectionTitle')}</Text>
        <Text style={styles.sub}>{t('solveSectionSub')}</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('solveSectionCardAlgebra')}</Text>
          <Text style={styles.cardSub}>{t('solveSectionCardSub')}</Text>
        </View>
        <TouchableOpacity style={styles.primary} onPress={() => navigation.navigate('AlgebraTopics')}>
          <Text style={styles.primaryText}>{t('solveSectionNext')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: '#111', marginBottom: 8 },
  sub: { fontSize: 15, color: '#555', marginBottom: 20, lineHeight: 22 },
  card: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    backgroundColor: '#f8fafc',
  },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  cardSub: { fontSize: 14, color: '#64748b', marginTop: 6 },
  primary: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
