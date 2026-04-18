import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { useApp } from '../../context/AppContext';
import { safeBackTo } from '../../utils/navigationSafeBack';

/**
 * «Назад» — на предыдущий экран в стеке; если стек пуст, открываем меню алгебры.
 */
export default function PetEntryScreen({ navigation }) {
  const { hasAnyPet, ready } = useApp();

  if (!ready) {
    return (
      <View style={styles.box}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <BackButton onPress={() => safeBackTo(navigation, 'AlgebraMenu')} />
      <Text style={styles.title}>Питомец</Text>
      <Text style={styles.sub}>
        Дальше можно выбрать вида питомца. Если питомец уже есть — откройте экран ухода.
      </Text>

      <TouchableOpacity style={styles.primary} onPress={() => navigation.navigate('PetKind')} activeOpacity={0.9}>
        <Text style={styles.primaryText}>Выбрать питомца</Text>
      </TouchableOpacity>

      {hasAnyPet ? (
        <TouchableOpacity style={styles.secondary} onPress={() => navigation.navigate('PetHub')} activeOpacity={0.9}>
          <Text style={styles.secondaryText}>К моему питомцу</Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 26, fontWeight: '800', color: '#111', marginBottom: 10 },
  sub: { fontSize: 15, color: '#64748b', lineHeight: 22, marginBottom: 24 },
  primary: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  primaryText: { color: '#fff', fontWeight: '800', fontSize: 17 },
  secondary: {
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  secondaryText: { color: '#0f172a', fontWeight: '800', fontSize: 16 },
});
