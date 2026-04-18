import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { useApp } from '../../context/AppContext';

const OVEN_MS = 40000;
const PAN_MS = 30000;

function iconForItem(sub) {
  if (sub === 'meat' || sub === 'fish' || sub === 'fish_giant') return '🥩';
  if (sub.includes('fish')) return '🐟';
  return '🥫';
}

export default function KitchenScreen({ navigation }) {
  const { inventory, updateInventoryItem, consumeInventoryItem } = useApp();

  const [zone, setZone] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [ovenOpen, setOvenOpen] = useState(false);
  const [ovenItemId, setOvenItemId] = useState(null);
  const [ovenUntil, setOvenUntil] = useState(null);
  const [panItemId, setPanItemId] = useState(null);
  const [panUntil, setPanUntil] = useState(null);
  const [panStir, setPanStir] = useState(0);
  const [now, setNow] = useState(Date.now());

  const animalItems = useMemo(
    () => inventory.filter((x) => x.category === 'animal'),
    [inventory]
  );

  const ovenTimerRef = useRef(null);
  const panTimerRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => {
      clearInterval(t);
      if (ovenTimerRef.current) clearTimeout(ovenTimerRef.current);
      if (panTimerRef.current) clearTimeout(panTimerRef.current);
    };
  }, []);

  const ovenLeft = ovenUntil ? Math.max(0, ovenUntil - now) : 0;
  const panLeft = panUntil ? Math.max(0, panUntil - now) : 0;

  const giveCooked = useCallback(
    (id) => {
      if (!id) return;
      consumeInventoryItem(id);
      Alert.alert('Питомец ест', 'Приятного аппетита! 🐾');
      navigation.goBack();
    },
    [consumeInventoryItem, navigation]
  );

  const placeInOven = () => {
    if (!selectedId) {
      Alert.alert('Выберите еду', 'Сначала нажмите на ингредиент внизу.');
      return;
    }
    const it = animalItems.find((x) => x.id === selectedId);
    if (!it || !it.requiresCook || it.cooked) {
      Alert.alert('Нельзя', 'Нужно сырое мясо или рыбу.');
      return;
    }
    if (!ovenOpen) {
      Alert.alert('Откройте духовку', 'Нажмите на дверцу.');
      return;
    }
    const id = selectedId;
    if (ovenTimerRef.current) clearTimeout(ovenTimerRef.current);
    setOvenItemId(id);
    setOvenUntil(Date.now() + OVEN_MS);
    setSelectedId(null);
    ovenTimerRef.current = setTimeout(() => {
      updateInventoryItem(id, { cooked: true });
      setOvenUntil(null);
      setOvenItemId(null);
      Alert.alert('Готово', 'Можно вытащить из духовки.', [
        { text: 'Дать питомцу', onPress: () => giveCooked(id) },
        { text: 'Позже', style: 'cancel' },
      ]);
    }, OVEN_MS);
  };

  const placeOnPan = () => {
    if (!selectedId) {
      Alert.alert('Выберите еду', 'Сначала нажмите на ингредиент внизу.');
      return;
    }
    const it = animalItems.find((x) => x.id === selectedId);
    if (!it || !it.requiresCook || it.cooked) {
      Alert.alert('Нельзя', 'Нужно сырое мясо или рыбу.');
      return;
    }
    const id = selectedId;
    if (panTimerRef.current) clearTimeout(panTimerRef.current);
    setPanItemId(id);
    setPanUntil(Date.now() + PAN_MS);
    setPanStir(0);
    setSelectedId(null);
    panTimerRef.current = setTimeout(() => {
      updateInventoryItem(id, { cooked: true });
      setPanUntil(null);
      setPanItemId(null);
      Alert.alert('Готово', 'Сковорода: еда готова.', [
        { text: 'Дать питомцу', onPress: () => giveCooked(id) },
        { text: 'Позже', style: 'cancel' },
      ]);
    }, PAN_MS);
  };

  const cutAtKnives = () => {
    if (!selectedId) {
      Alert.alert('Выберите продукт');
      return;
    }
    updateInventoryItem(selectedId, { cut: true });
    Alert.alert('Нарезано', 'Можно жарить.');
  };

  const takeFromFridge = (id) => {
    setSelectedId(id);
    Alert.alert('Взято', 'Продукт в инвентаре внизу. Нажмите на плиту или духовку.');
  };

  if (!animalItems.some((x) => x.requiresCook && !x.cooked)) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Кухня</Text>
        <Text style={styles.warn}>Купите в магазине мясо или рыбу.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PetShop')}>
          <Text style={styles.btnText}>В магазин</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Кухня</Text>
        <Text style={styles.sub}>
          Холодильник, ножи, плита (сковорода 30 с), духовка (40 с). Нажмите зону — список ниже. Инвентарь внизу
          — выберите продукт, затем место.
        </Text>

        <View style={styles.zones}>
          <TouchableOpacity style={styles.zoneTab} onPress={() => setZone('fridge')}>
            <Text style={styles.zoneTitle}>Холодильник</Text>
            <Text style={styles.zoneChev}>⌄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoneTab} onPress={() => setZone('knives')}>
            <Text style={styles.zoneTitle}>Ножи и доска</Text>
            <Text style={styles.zoneChev}>⌄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoneTab} onPress={() => setZone('stove')}>
            <Text style={styles.zoneTitle}>Плита / сковорода</Text>
            <Text style={styles.zoneChev}>⌄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoneTab} onPress={() => setZone('oven')}>
            <Text style={styles.zoneTitle}>Духовка</Text>
            <Text style={styles.zoneChev}>⌄</Text>
          </TouchableOpacity>
        </View>

        {zone === 'fridge' ? (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Холодильник</Text>
            {animalItems.map((it) => (
              <TouchableOpacity key={it.id} style={styles.fridgeRow} onPress={() => takeFromFridge(it.id)}>
                <Text>
                  {iconForItem(it.sub)} {it.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        {zone === 'knives' ? (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Ножи</Text>
            <Text style={styles.muted}>Можно порезать продукт перед жаркой.</Text>
            <TouchableOpacity style={styles.act} onPress={cutAtKnives}>
              <Text style={styles.actText}>Порезать выбранное</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {zone === 'stove' ? (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Сковорода — 30 сек</Text>
            <View style={styles.pan}>
              <Pressable style={styles.panInner} onPress={() => setPanStir((s) => s + 1)}>
                <Text style={styles.panTxt}>
                  {panItemId ? `Жарится… ${Math.ceil(panLeft / 1000)} с · перемешиваний: ${panStir}` : 'Положите еду'}
                </Text>
              </Pressable>
            </View>
            <TouchableOpacity style={styles.act} onPress={placeOnPan}>
              <Text style={styles.actText}>Положить выбранное на сковороду</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {zone === 'oven' ? (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Духовка — 40 сек</Text>
            <TouchableOpacity onPress={() => setOvenOpen((o) => !o)}>
              <Text style={styles.ovenDoor}>{ovenOpen ? 'Дверца открыта' : 'Нажмите, чтобы открыть дверцу'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ovenInside} onPress={placeInOven} disabled={!ovenOpen}>
              <Text style={styles.muted}>
                {ovenItemId
                  ? `Готовится… ${Math.ceil(ovenLeft / 1000)} с`
                  : ovenOpen
                    ? 'Нажмите, чтобы положить внутрь выбранный продукт'
                    : 'Откройте дверцу'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOvenOpen(false)}>
              <Text style={styles.link}>Закрыть дверцу</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <Text style={styles.invTitle}>Инвентарь (нажмите, чтобы взять)</Text>
        <View style={styles.invRow}>
          {animalItems.map((it) => (
            <TouchableOpacity
              key={it.id}
              style={[styles.invSlot, selectedId === it.id && styles.invSel]}
              onPress={() => setSelectedId(it.id)}
            >
              <Text style={styles.invIcon}>{iconForItem(it.sub)}</Text>
              <Text style={styles.invTiny} numberOfLines={1}>
                {it.label}
              </Text>
              {it.cooked ? <Text style={styles.ok}>✓</Text> : null}
            </TouchableOpacity>
          ))}
        </View>

        {selectedId ? (
          <Text style={styles.hint}>Выбрано. Откройте зону плиты или духовки.</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  sub: { fontSize: 14, color: '#555', marginBottom: 12, lineHeight: 20 },
  warn: { fontSize: 16, color: '#b91c1c', marginBottom: 12 },
  btn: { backgroundColor: '#2563eb', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '800' },
  zones: { marginBottom: 12 },
  zoneTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
  },
  zoneTitle: { fontWeight: '700' },
  zoneChev: { fontSize: 18, color: '#2563eb' },
  panel: {
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  panelTitle: { fontSize: 17, fontWeight: '800', marginBottom: 8 },
  muted: { fontSize: 13, color: '#64748b', marginBottom: 8 },
  fridgeRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  act: { backgroundColor: '#0f172a', padding: 12, borderRadius: 10, marginTop: 8 },
  actText: { color: '#fff', fontWeight: '800', textAlign: 'center' },
  pan: { backgroundColor: '#e2e8f0', borderRadius: 12, overflow: 'hidden', marginVertical: 8 },
  panInner: { padding: 24, alignItems: 'center' },
  panTxt: { fontWeight: '700', color: '#0f172a' },
  ovenDoor: { fontWeight: '700', color: '#2563eb', marginBottom: 8 },
  ovenInside: {
    minHeight: 80,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  link: { marginTop: 8, color: '#2563eb', fontWeight: '700' },
  invTitle: { fontWeight: '800', marginTop: 8, marginBottom: 8 },
  invRow: { flexDirection: 'row', flexWrap: 'wrap' },
  invSlot: {
    width: 76,
    minHeight: 76,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },
  invSel: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  invIcon: { fontSize: 28 },
  invTiny: { fontSize: 10, textAlign: 'center' },
  ok: { color: '#16a34a', fontWeight: '900' },
  hint: { marginTop: 8, color: '#2563eb', fontWeight: '600' },
});
