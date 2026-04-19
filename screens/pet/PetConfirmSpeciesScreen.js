import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { speciesMeta } from '../../data/petSpeciesData';
import { localizedSpeciesMeta } from '../../i18n/petLocale';
import {
  reasonCannotOpenAnimalSpecies,
  reasonCannotOpenPlantSpecies,
} from '../../utils/petSelectionGuards';

export default function PetConfirmSpeciesScreen({ navigation, route }) {
  const kind = route.params?.kind === 'plant' ? 'plant' : 'animal';
  const speciesId = route.params?.speciesId;
  const { setSpeciesForKind, animalSpecies, animalGrowth, plantSpecies, plantGrowth } = useApp();
  const { t, currentLang } = useLanguage();

  const metaRaw = speciesId ? speciesMeta(speciesId) : null;
  const meta = metaRaw ? localizedSpeciesMeta(metaRaw, speciesId, currentLang) : null;

  const onConfirm = () => {
    if (!speciesId) return;
    const ctx = { animalSpecies, animalGrowth, plantSpecies, plantGrowth };
    const reason =
      kind === 'animal' ? reasonCannotOpenAnimalSpecies(ctx, t) : reasonCannotOpenPlantSpecies(ctx, t);
    if (reason) {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.alert(`${t('petAlertTitle')}\n\n${reason}`);
      } else {
        Alert.alert(t('petAlertTitle'), reason);
      }
      return;
    }
    setSpeciesForKind(kind, speciesId);
    navigation.reset({
      index: 1,
      routes: [{ name: 'Main' }, { name: 'PetHub' }],
    });
  };

  if (!meta || !speciesId) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.err}>{t('petConfirmErr')}</Text>
      </SafeAreaView>
    );
  }

  const emoji = kind === 'plant' ? '🌰' : meta.emoji;
  const kindWord = t(kind === 'animal' ? 'petKindAnimal' : 'petKindPlant');
  const sub = t('petConfirmBody').replace('{kind}', kindWord);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{t('petConfirmTitle')}</Text>
        <Text style={styles.sub}>{sub}</Text>

        <View style={styles.card}>
          <Text style={styles.bigEmoji}>{emoji}</Text>
          <Text style={styles.name}>{meta.label}</Text>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm} activeOpacity={0.9}>
          <Text style={styles.confirmBtnText}>{t('petConfirmBtn')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.9}>
          <Text style={styles.backBtnText}>{t('petBackBtn')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 8 },
  sub: { fontSize: 14, color: '#555', marginBottom: 20, lineHeight: 20 },
  card: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#f8fafc',
  },
  bigEmoji: { fontSize: 88, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '800', color: '#0f172a' },
  confirmBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#14532d',
  },
  confirmBtnText: { color: '#fff', fontWeight: '900', fontSize: 17 },
  backBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#64748b',
    backgroundColor: '#f1f5f9',
  },
  backBtnText: { color: '#334155', fontWeight: '800', fontSize: 16 },
  err: { padding: 20, fontSize: 16 },
});
