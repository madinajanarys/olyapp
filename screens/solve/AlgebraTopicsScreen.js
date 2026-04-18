import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { TOPIC_IDS, topicTitle } from '../../data/algebraTopics';
import { useLanguage } from '../../context/LanguageContext';

export default function AlgebraTopicsScreen({ navigation }) {
  const { currentLang } = useLanguage();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton
          onPress={() =>
            navigation.canGoBack() ? navigation.goBack() : navigation.navigate('AlgebraMenu')
          }
        />
        <Text style={styles.title}>Темы</Text>
        <Text style={styles.sub}>Выберите тему — откроется урок: сначала объяснение, затем примеры, затем задачи.</Text>
        {TOPIC_IDS.map((id) => (
          <TouchableOpacity
            key={id}
            style={styles.row}
            onPress={() => navigation.navigate('Lesson', { topicId: id })}
          >
            <Text style={styles.rowText}>{topicTitle(id, currentLang)}</Text>
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
  sub: { fontSize: 15, color: '#555', marginBottom: 16, lineHeight: 22 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  rowText: { fontSize: 16, fontWeight: '700', color: '#000', flex: 1, paddingRight: 8 },
  chev: { fontSize: 22, color: '#000', fontWeight: '300' },
});
