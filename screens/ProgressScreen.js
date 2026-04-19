import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useApp } from '../context/AppContext';
import { TOPIC_IDS, topicTitle, countTasksInTopic } from '../data/algebraTopics';
import { useLanguage } from '../context/LanguageContext';
import { safeBackTo } from '../utils/navigationSafeBack';

export default function ProgressScreen({ navigation }) {
  const { progressByTopic } = useApp();
  const { currentLang, t } = useLanguage();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => safeBackTo(navigation, 'AlgebraMenu')} />
        <Text style={styles.title}>{t('progressTitle')}</Text>
        <Text style={styles.sub}>{t('progressSub')}</Text>

        {TOPIC_IDS.map((id) => {
          const total = countTasksInTopic(id);
          const p = progressByTopic[id] || { solved: 0, correct: 0, attempted: 0 };
          const solvedPct = total ? Math.round((p.solved / total) * 100) : 0;
          const accPct = p.attempted ? Math.round((p.correct / p.attempted) * 100) : 0;

          return (
            <View key={id} style={styles.card}>
              <Text style={styles.topic}>{topicTitle(id, currentLang)}</Text>
              <Text style={styles.line}>
                {t('progressSolvedLine')} {solvedPct}% ({p.solved} / {total})
              </Text>
              <Text style={styles.lineMuted}>
                {t('progressAccLine')} {accPct}% ({p.correct} / {p.attempted})
              </Text>
            </View>
          );
        })}

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('AlgebraTopics')}>
          <Text style={styles.linkText}>{t('progressLinkTasks')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: '#111', marginBottom: 8 },
  sub: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#f8fafc',
  },
  topic: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  line: { fontSize: 14, color: '#334155', marginBottom: 4 },
  lineMuted: { fontSize: 13, color: '#64748b' },
  link: { marginTop: 16, alignItems: 'center' },
  linkText: { color: '#2563eb', fontWeight: '700', fontSize: 16 },
});
