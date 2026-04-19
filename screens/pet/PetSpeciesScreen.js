import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { ANIMAL_LIST, PLANT_LIST } from '../../data/petSpeciesData';
import { getSpeciesLabel } from '../../i18n/petLocale';
import {
  reasonCannotOpenAnimalSpecies,
  reasonCannotOpenPlantSpecies,
} from '../../utils/petSelectionGuards';

function SpeciesCard({ emoji, title, onSelect, pickLabel }) {
  return (
    <View style={styles.card}>
      <Text style={styles.bigEmoji}>{emoji}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <TouchableOpacity style={styles.pickBtn} onPress={onSelect} activeOpacity={0.9}>
        <Text style={styles.pickBtnText}>{pickLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function PetSpeciesScreen({ navigation, route }) {
  /** Явно «animal» | «plant» — если params потерялись, не путаем список и проверки. */
  const kind = route.params?.kind === 'plant' ? 'plant' : 'animal';
  const { animalSpecies, animalGrowth, plantSpecies, plantGrowth } = useApp();
  const { t, currentLang } = useLanguage();
  const list = kind === 'animal' ? ANIMAL_LIST : PLANT_LIST;

  const choose = (id) => {
    const ctx = { animalSpecies, animalGrowth, plantSpecies, plantGrowth };
    const reason =
      kind === 'animal'
        ? reasonCannotOpenAnimalSpecies(ctx, t)
        : reasonCannotOpenPlantSpecies(ctx, t);
    if (reason) {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.alert(`${t('petAlertTitle')}\n\n${reason}`);
      } else {
        Alert.alert(t('petAlertTitle'), reason);
      }
      return;
    }
    navigation.navigate('PetConfirmSpecies', { kind, speciesId: id });
  };

  const subBase = t('petSpeciesSub');
  const subExtra = kind === 'plant' ? t('petSpeciesSubPlantExtra') : t('petSpeciesSubAnimalExtra');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>
          {kind === 'animal' ? t('petSpeciesTitleAnimal') : t('petSpeciesTitlePlant')}
        </Text>
        <Text style={styles.sub}>
          {subBase} {subExtra}
        </Text>
        {list.map((item) => (
          <SpeciesCard
            key={item.id}
            emoji={kind === 'plant' ? '🌰' : item.emoji}
            title={getSpeciesLabel(item.id, currentLang) || item.label}
            pickLabel={t('petSpeciesPick')}
            onSelect={() => choose(item.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8, color: '#111' },
  sub: { fontSize: 14, color: '#555', marginBottom: 16, lineHeight: 20 },
  card: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  bigEmoji: { fontSize: 72, marginBottom: 8 },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginBottom: 14, textAlign: 'center' },
  pickBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    minWidth: 160,
    alignItems: 'center',
  },
  pickBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
