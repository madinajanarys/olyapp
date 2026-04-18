import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { speciesMeta, getPlantStageInfo, getAnimalStageInfo } from '../../data/petSpeciesData';

function GrowthBar({ pct }) {
  return (
    <View style={styles.barBg}>
      <View style={[styles.barFill, { width: `${pct}%` }]} />
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

  const isDog = !!animalSpecies;
  const isPlant = !!plantSpecies;
  const growthPct = Math.min(100, Math.round(isDog ? animalGrowth : plantGrowth));
  const meta = isDog ? speciesMeta(animalSpecies) : speciesMeta(plantSpecies);
  const stage = isDog
    ? getAnimalStageInfo(growthPct, animalSpecies)
    : getPlantStageInfo(growthPct, plantSpecies);

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
      Alert.alert(
        'Питомец',
        'Сначала вырастите текущего питомца до 100%. До этого другого выбрать нельзя.'
      );
      return;
    }
    Alert.alert(
      'Питомец',
      'Чтобы выбрать другого питомца, нажмите кнопку «Новый питомец» выше.'
    );
  };

  const openFeedGame = () => {
    if (readyFood.length === 0) {
      Alert.alert(
        'Нет еды',
        'Вы не можете играть, потому что у вас нет еды. Купите её в магазине.'
      );
      return;
    }
    const first = readyFood[0];
    navigation.navigate('PetFlappy', { itemId: first.id });
  };

  if (!isDog && !isPlant) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.topBtn}
            onPress={() => navigation.navigate('Pet')}
            accessibilityLabel="Назад к экрану Питомец"
          >
            <Text style={styles.topArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>Питомец</Text>
          <TouchableOpacity style={styles.topBtn} onPress={() => navigation.navigate('AlgebraMenu')}>
            <Text style={styles.homeBtn}>⌂</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={goChangePetKind} style={styles.changePetLink}>
          <Text style={styles.changePetText}>Сменить питомца →</Text>
        </TouchableOpacity>

        <View style={styles.coinRow}>
          <Text style={styles.coinLabel}>Монеты</Text>
          <Text style={styles.coinVal}>{coins}</Text>
        </View>
        <Text style={styles.coinHint}>~{totalTasksEstimate} задач — решайте и зарабатывайте монеты</Text>

        <View style={styles.upper}>
          <Text style={styles.bigEmoji}>{stage.emoji}</Text>
          <Text style={styles.name}>{meta.label}</Text>
          <Text style={styles.stage}>{stage.title}</Text>
          <Text style={styles.detail}>{stage.detail}</Text>
        </View>

        <GrowthBar pct={growthPct} />
        <Text style={styles.pct}>Рост: {growthPct}%</Text>

        <Text style={styles.foodCount}>
          Количество еды: {readyFood.length}{' '}
          {isDog ? '(для собаки)' : '(для растения)'}
        </Text>

        {growthPct >= 100 ? (
          <TouchableOpacity style={styles.newBtn} onPress={startNewCycle}>
            <Text style={styles.newBtnText}>Новый питомец</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.bigSq} onPress={() => navigation.navigate('PetShop')} activeOpacity={0.9}>
            <Text style={styles.bigSqEmoji}>🏪</Text>
            <Text style={styles.bigSqTitle}>Магазин</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigSq} onPress={openFeedGame} activeOpacity={0.9}>
            <Text style={styles.bigSqEmoji}>🥩</Text>
            <Text style={styles.bigSqTitle}>Кормить</Text>
          </TouchableOpacity>
        </View>

        {readyFood.length === 0 ? (
          <Text style={styles.hintFeedRed}>Купите еду и нажмите «Кормить»</Text>
        ) : (
          <Text style={styles.hintFeedBlue}>Нажмите кнопку «Кормить»</Text>
        )}

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('AlgebraTopics')}>
          <Text style={styles.linkText}>Решать задачи →</Text>
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
  homeBtn: { fontSize: 26, color: '#2563eb' },
  topTitle: { fontSize: 20, fontWeight: '700', color: '#111' },
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
  bigEmoji: { fontSize: 72, marginBottom: 8 },
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
