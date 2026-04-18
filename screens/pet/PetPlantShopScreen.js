import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { useApp } from '../../context/AppContext';
import { PLANT_TIERS } from '../../data/petShop';

const ROWS = [
  { tier: 3, emoji: '💧' },
  { tier: 7, emoji: '💧' },
  { tier: 14, emoji: '🌿' },
  { tier: 35, emoji: '🌳' },
];

export default function PetPlantShopScreen({ navigation }) {
  const { coins, purchasePlantSupply } = useApp();

  const buy = (tier) => {
    const spec = PLANT_TIERS[tier];
    if (!spec) return;
    if (coins < spec.price) {
      Alert.alert('Недостаточно монет');
      return;
    }
    purchasePlantSupply(tier);
    Alert.alert('Куплено', 'Товар в инвентаре. «Кормить» в хабе — мини-игра.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Удобрения и вода</Text>
        <Text style={styles.sub}>У вас {coins} монет.</Text>

        {ROWS.map(({ tier, emoji }) => {
          const spec = PLANT_TIERS[tier];
          if (!spec) return null;
          return (
            <TouchableOpacity key={tier} style={styles.row} onPress={() => buy(tier)} activeOpacity={0.9}>
              <Text style={styles.rowEmoji}>{emoji}</Text>
              <View style={styles.rowBody}>
                <Text style={styles.rowTitle}>{spec.label}</Text>
                <Text style={styles.rowPrice}>{spec.price} монет · +{spec.growth} к росту</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  sub: { fontSize: 14, color: '#555', marginBottom: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  rowEmoji: { fontSize: 36, marginRight: 12 },
  rowBody: { flex: 1 },
  rowTitle: { fontSize: 16, fontWeight: '800', color: '#111' },
  rowPrice: { fontSize: 14, color: '#15803d', fontWeight: '700', marginTop: 4 },
});
