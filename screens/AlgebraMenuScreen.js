import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import MainMenuButton from '../components/MainMenuButton';
import { useLanguage } from '../context/LanguageContext';
import { safeBackTo } from '../utils/navigationSafeBack';

export default function AlgebraMenuScreen({ navigation }) {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => safeBackTo(navigation, 'Main')} />
        <Text style={styles.title}>{t('menuAlgebra')}</Text>
        <Text style={styles.sub}>
          Выберите раздел: задачи по темам, пробные олимпиады, питомец и прогресс по темам.
        </Text>

        <MainMenuButton
          variant="solve"
          title={t('menuSolve')}
          onPress={() => navigation.navigate('AlgebraTopics')}
        />
        <MainMenuButton
          variant="olympiad"
          title={t('menuOlympiad')}
          onPress={() => navigation.navigate('OlympiadList')}
        />
        <MainMenuButton variant="pet" title={t('menuPet')} onPress={() => navigation.navigate('Pet')} />
        <MainMenuButton
          variant="progress"
          title={t('menuProgress')}
          onPress={() => navigation.navigate('Progress')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
  },
  sub: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 20,
    lineHeight: 22,
  },
});
