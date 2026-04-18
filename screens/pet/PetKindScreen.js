import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { useApp } from '../../context/AppContext';
import { reasonCannotOpenAnimalSpecies, reasonCannotOpenPlantSpecies } from '../../utils/petSelectionGuards';

export default function PetKindScreen({ navigation }) {
  const { animalSpecies, animalGrowth, plantSpecies, plantGrowth } = useApp();
  const ctx = { animalSpecies, animalGrowth, plantSpecies, plantGrowth };

  const showBlocked = (msg) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.alert(`Питомец\n\n${msg}`);
      return;
    }
    Alert.alert('Питомец', msg);
  };

  const openAnimals = () => {
    const r = reasonCannotOpenAnimalSpecies(ctx);
    if (r) {
      showBlocked(r);
      return;
    }
    navigation.navigate('PetSpecies', { kind: 'animal' });
  };

  const openPlants = () => {
    const r = reasonCannotOpenPlantSpecies(ctx);
    if (r) {
      showBlocked(r);
      return;
    }
    navigation.navigate('PetSpecies', { kind: 'plant' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <BackButton
        onPress={() =>
          navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Pet')
        }
      />
      <Text style={styles.title}>Выберите тип питомца</Text>
      <Text style={styles.sub}>
        В первый раз можно выбрать любой тип и любое животное или растение из списка. Нового питомца
        можно будет выбрать только после того, как текущий вырастет до 100% и вы нажмёте «Новый
        питомец» в экране ухода.
      </Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.square} onPress={openAnimals} activeOpacity={0.9}>
          <Text style={styles.squareEmoji}>🐾</Text>
          <Text style={styles.squareLabel}>Питомец</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.square, styles.squareRight]} onPress={openPlants} activeOpacity={0.9}>
          <Text style={styles.squareEmoji}>🌱</Text>
          <Text style={styles.squareLabel}>Растение</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: '800', color: '#111', marginBottom: 8 },
  sub: { fontSize: 15, color: '#555', marginBottom: 24, lineHeight: 22 },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  square: {
    width: '42%',
    maxWidth: 168,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  squareRight: { marginLeft: 16 },
  squareEmoji: { fontSize: 56, marginBottom: 12 },
  squareLabel: { fontSize: 17, fontWeight: '800', color: '#000' },
});
