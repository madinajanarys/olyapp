import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { getPlantStageInfo, speciesMeta } from '../../data/petSpeciesData';
import { getSpeciesLabel } from '../../i18n/petLocale';

function iconForPlantItem(sub) {
  if (sub.includes('water')) return '💧';
  if (sub.includes('fertilizer')) return '🌿';
  return '🧴';
}

export default function PlantCareScreen({ navigation }) {
  const { inventory, consumeInventoryItem, plantSpecies, plantGrowth } = useApp();
  const { t, currentLang } = useLanguage();
  const [selectedId, setSelectedId] = useState(null);

  const plantItems = inventory.filter((x) => x.category === 'plant');
  const growthPct = Math.min(100, Math.round(plantGrowth));
  const stage = plantSpecies ? getPlantStageInfo(growthPct, plantSpecies, currentLang) : null;
  const meta = speciesMeta(plantSpecies);
  const labelShown = plantSpecies
    ? getSpeciesLabel(plantSpecies, currentLang) || meta.label
    : '';

  const applyLong = () => {
    if (!selectedId) {
      Alert.alert(t('plantSelectTitle'), t('plantAlertPick'));
      return;
    }
    consumeInventoryItem(selectedId);
    setSelectedId(null);
    Alert.alert(t('plantAlertDone'));
  };

  const subText = plantSpecies
    ? `${t('plantCareSub')} (${labelShown})`
    : t('plantCareSub');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{t('plantCareTitle')}</Text>
        <Text style={styles.sub}>{subText}</Text>

        {stage ? (
          <View style={styles.stageCard}>
            <Text
              style={[
                styles.stageEmoji,
                {
                  fontSize: Math.min(
                    72,
                    Math.max(32, Math.round(48 * (stage.growthVisualScale ?? 1)))
                  ),
                },
              ]}
            >
              {stage.emoji}
            </Text>
            <Text style={styles.stageTitle}>{stage.title}</Text>
            <Text style={styles.stageDetail}>{stage.detail}</Text>
            <Text style={styles.stagePct}>
              {t('petGrowth')} {growthPct}%
            </Text>
          </View>
        ) : null}

        <Text style={styles.h2}>{t('plantInventory')}</Text>
        <View style={styles.invRow}>
          {plantItems.map((it) => (
            <TouchableOpacity
              key={it.id}
              style={[styles.slot, selectedId === it.id && styles.slotSel]}
              onPress={() => setSelectedId(it.id)}
            >
              <Text style={styles.slotIcon}>{iconForPlantItem(it.sub)}</Text>
              <Text style={styles.slotTxt} numberOfLines={2}>
                {it.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.h2}>{t('plantSoil')}</Text>
        <Pressable
          style={styles.soil}
          onLongPress={applyLong}
          delayLongPress={500}
        >
          <Text style={styles.soilEmoji}>🟫</Text>
          <Text style={styles.soilHint}>
            {selectedId ? t('plantHoldHint') : t('plantPickFirst')}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  sub: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 16 },
  h2: { fontSize: 16, fontWeight: '800', marginBottom: 8, marginTop: 8 },
  invRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  slot: {
    width: 88,
    minHeight: 88,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: 10,
    marginBottom: 10,
  },
  slotSel: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  slotIcon: { fontSize: 32 },
  slotTxt: { fontSize: 11, textAlign: 'center', marginTop: 4 },
  soil: {
    minHeight: 180,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#78350f',
    backgroundColor: '#92400e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  soilEmoji: { fontSize: 48, marginBottom: 8 },
  soilHint: { color: '#fef3c7', fontWeight: '700', textAlign: 'center', fontSize: 15 },
  stageCard: {
    borderWidth: 2,
    borderColor: '#166534',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
  },
  stageEmoji: { marginBottom: 6 },
  stageTitle: { fontSize: 17, fontWeight: '800', color: '#14532d' },
  stageDetail: { fontSize: 13, color: '#475569', textAlign: 'center', marginTop: 4, lineHeight: 18 },
  stagePct: { fontSize: 14, fontWeight: '700', color: '#166534', marginTop: 8 },
});
