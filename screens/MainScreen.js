import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function MainScreen({ navigation }) {
  const { t } = useLanguage();
  const { markSessionStarted } = useApp();

  useEffect(() => {
    markSessionStarted();
  }, [markSessionStarted]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <LanguageSwitcher />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{t('mainTitle')}</Text>
        <Text style={styles.sub}>{t('mainSubtitle')}</Text>

        <TouchableOpacity
          style={styles.algebraBtn}
          onPress={() => navigation.navigate('AlgebraMenu')}
          activeOpacity={0.9}
        >
          <Text style={styles.algebraText}>{t('menuAlgebra')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
  },
  sub: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 24,
    lineHeight: 22,
  },
  algebraBtn: {
    backgroundColor: '#38bdf8',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  algebraText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});
