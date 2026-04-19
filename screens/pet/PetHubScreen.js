import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  speciesMeta,
  getPlantStageInfo,
  getAnimalStageInfo,
  GROWTH_THRESHOLDS,
} from '../../data/petSpeciesData';
import { localizedSpeciesMeta } from '../../i18n/petLocale';
import { safeBackTo } from '../../utils/navigationSafeBack';

function GrowthBar({ pct }) {
  return (
    <View style={styles.barBg}>
      <View style={[styles.barFill, { width: `${pct}%` }]} />
    </View>
  );
}

function MilestoneStrip({ pct }) {
  return (
    <View style={styles.milestoneRow}>
      {GROWTH_THRESHOLDS.map((m) => (
        <View key={m} style={styles.milestoneCol}>
          <View style={[styles.milestoneDot, pct >= m && styles.milestoneDotActive]} />
          <Text style={styles.milestonePct}>{m}%</Text>
        </View>
      ))}
    </View>
  );
}

export default function PetHubScreen({ navigation }) {
  const {
    animalSpecies,
    plantSpecies,
    animalGrowth,
    plantGrowth,
    coins,
    inventory,
    totalTasksEstimate,
    beginNewPetCycle,
  } = useApp();
  const { t, currentLang } = useLanguage();

  const isDog = !!animalSpecies;
  const isPlant = !!plantSpecies;
  const growthPct = Math.min(100, Math.round(isDog ? animalGrowth : plantGrowth));
  const speciesId = isDog ? animalSpecies : plantSpecies;
  const metaRaw = speciesMeta(speciesId);
  const meta = localizedSpeciesMeta(metaRaw, speciesId, currentLang);
  const stage = isDog
    ? getAnimalStageInfo(growthPct, animalSpecies, currentLang)
    : getPlantStageInfo(growthPct, plantSpecies, currentLang);

  const emojiFontSize = Math.min(
    120,
    Math.max(36, Math.round(72 * (stage.growthVisualScale ?? 1)))
  );

  const foodItems = useMemo(
    () => inventory.filter((x) => x.category === (isDog ? 'animal' : 'plant')),
    [inventory, isDog]
  );
  const readyFood = useMemo(
    () => foodItems.filter((x) => !x.requiresCook || x.cooked),
    [foodItems]
  );

  const startNewCycle = () => {
    if (isDog) beginNewPetCycle('animal');
    else beginNewPetCycle('plant');
    navigation.replace('PetKind');
  };

  const goChangePetKind = () => {
    if (growthPct < 100) {
      Alert.alert(t('petAlertTitle'), t('petAlertGrowFirst'));
      return;
    }
    Alert.alert(t('petAlertTitle'), t('petAlertNewPet'));
  };

  const openFeedGame = () => {
    if (readyFood.length === 0) {
      Alert.alert(t('petAlertNoFoodTitle'), t('petAlertNoFood'));
      return;
    }
    const first = readyFood[0];
    navigation.navigate('PetFlappy', { itemId: first.id });
  };

  if (!isDog && !isPlant) {
    return null;
  }

  const coinHint = t('petCoinHint').replace('{n}', String(totalTasksEstimate));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.topBtn}
            onPress={() => safeBackTo(navigation, 'AlgebraMenu')}
            accessibilityLabel={t('accessibilityBack')}
          >
            <Text style={styles.topArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.topTitleCenter}>{t('petTitle')}</Text>
          <View style={styles.topBtn} />
        </View>
        <TouchableOpacity onPress={goChangePetKind} style={styles.changePetLink}>
          <Text style={styles.changePetText}>{t('petChangeLink')}</Text>
        </TouchableOpacity>

        <View style={styles.coinRow}>
          <Text style={styles.coinLabel}>{t('petCoins')}</Text>
          <Text style={styles.coinVal}>{coins}</Text>
        </View>
        <Text style={styles.coinHint}>{coinHint}</Text>

        <View style={styles.upper}>
          <Text style={[styles.bigEmoji, { fontSize: emojiFontSize }]}>{stage.emoji}</Text>
          <Text style={styles.name}>{meta.label}</Text>
          <Text style={styles.stage}>{stage.title}</Text>
          <Text style={styles.detail}>{stage.detail}</Text>
        </View>

        <GrowthBar pct={growthPct} />
        <MilestoneStrip pct={growthPct} />
        <Text style={styles.pct}>
          {t('petGrowth')} {growthPct}%
        </Text>

        <Text style={styles.foodCount}>
          {t('petFoodCount')} {readyFood.length}{' '}
          {isDog ? t('petFoodForDog') : t('petFoodForPlant')}
        </Text>

        {growthPct >= 100 ? (
          <TouchableOpacity style={styles.newBtn} onPress={startNewCycle}>
            <Text style={styles.newBtnText}>{t('petNewPet')}</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.bigSq} onPress={() => navigation.navigate('PetShop')} activeOpacity={0.9}>
            <Text style={styles.bigSqEmoji}>🏪</Text>
            <Text style={styles.bigSqTitle}>{t('petShop')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigSq} onPress={openFeedGame} activeOpacity={0.9}>
            <Text style={styles.bigSqEmoji}>🥩</Text>
            <Text style={styles.bigSqTitle}>{t('petFeed')}</Text>
          </TouchableOpacity>
        </View>

        {readyFood.length === 0 ? (
          <Text style={styles.hintFeedRed}>{t('petBuyFoodHint')}</Text>
        ) : (
          <Text style={styles.hintFeedBlue}>{t('petTapFeedHint')}</Text>
        )}

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('AlgebraTopics')}>
          <Text style={styles.linkText}>{t('petSolveTasks')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  topBtn: { padding: 8, minWidth: 44 },
  topArrow: { fontSize: 28, fontWeight: '700', color: '#111' },
  topTitleCenter: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  changePetLink: { alignSelf: 'center', marginBottom: 10, paddingVertical: 4 },
  changePetText: { fontSize: 15, fontWeight: '700', color: '#2563eb' },
  coinRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  coinLabel: { fontSize: 16, color: '#334155' },
  coinVal: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  coinHint: { fontSize: 12, color: '#64748b', marginBottom: 12 },
  upper: {
    minHeight: 200,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigEmoji: { marginBottom: 8 },
  milestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
    marginBottom: 6,
  },
  milestoneCol: { alignItems: 'center', flex: 1 },
  milestoneDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#cbd5e1',
    marginBottom: 4,
  },
  milestoneDotActive: { backgroundColor: '#16a34a', borderWidth: 2, borderColor: '#14532d' },
  milestonePct: { fontSize: 10, fontWeight: '700', color: '#64748b' },
  name: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  stage: { fontSize: 16, fontWeight: '700', color: '#334155', marginTop: 6 },
  detail: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 6, lineHeight: 18 },
  barBg: {
    width: '100%',
    height: 14,
    backgroundColor: '#e2e8f0',
    borderRadius: 7,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000',
  },
  barFill: { height: '100%', backgroundColor: '#22c55e' },
  pct: { fontSize: 15, fontWeight: '700', textAlign: 'center', marginTop: 8, marginBottom: 8 },
  foodCount: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 16, textAlign: 'center' },
  newBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  newBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigSq: {
    flex: 1,
    marginHorizontal: 6,
    minHeight: 120,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  bigSqEmoji: { fontSize: 40, marginBottom: 8 },
  bigSqTitle: { fontSize: 17, fontWeight: '800', color: '#000' },
  hintFeedRed: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b91c1c',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 8,
    lineHeight: 20,
  },
  hintFeedBlue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d4ed8',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 8,
    lineHeight: 20,
  },
  link: { marginTop: 24, alignItems: 'center' },
  linkText: { color: '#2563eb', fontWeight: '700', fontSize: 16 },
});
