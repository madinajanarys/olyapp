import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';

export default function PetShopScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Магазин</Text>
        <Text style={styles.sub}>
          Покупайте за монеты, которые вы получаете за самооценку при решении задач. Еда для животных и вода /
          удобрения для растений — разные отделы.
        </Text>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PetAnimalFood')}>
          <Text style={styles.cardEmoji}>🥫</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Еда для животных</Text>
            <Text style={styles.cardSub}>Корм, рыба, мясо</Text>
          </View>
          <Text style={styles.chev}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PetPlantShop')}>
          <Text style={styles.cardEmoji}>💧</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Удобрения и вода</Text>
            <Text style={styles.cardSub}>Для растений</Text>
          </View>
          <Text style={styles.chev}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 8, color: '#111' },
  sub: { fontSize: 14, color: '#555', marginBottom: 16, lineHeight: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardEmoji: { fontSize: 40, marginRight: 12 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  cardSub: { fontSize: 13, color: '#64748b', marginTop: 2 },
  chev: { fontSize: 24, color: '#000' },
});
