import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOTAL_TASKS_ESTIMATE, TOPIC_IDS } from '../data/algebraTopics';
import { ANIMAL_TIERS, PLANT_TIERS } from '../data/petShop';
import { isAnimalSpecies, isPlantSpecies } from '../data/petSpeciesData';

const STORAGE_KEY = '@olimpiad_family_app_v3';

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const defaultState = () => ({
  /** После первого входа на главный экран — при следующем запуске сразу Main (AsyncStorage). */
  hasCompletedRegistration: false,
  coins: 0,
  /** @type {null | string} */
  animalSpecies: null,
  /** @type {null | string} */
  plantSpecies: null,
  animalGrowth: 0,
  plantGrowth: 0,
  progressByTopic: Object.fromEntries(TOPIC_IDS.map((id) => [id, { solved: 0, correct: 0, attempted: 0 }])),
  solvedTaskKeys: {},
  olympiadProgress: { o1: {}, o2: {} },
  /** @type {Array<{ id: string, sub: string, tier: number, growth: number, requiresCook: boolean, cooked: boolean, label: string, category: 'animal'|'plant' }>} */
  inventory: [],
});

/** Для старых сохранений без флага — не показывать Welcome, если уже есть прогресс. */
function inferHasCompletedRegistration(raw) {
  if (!raw || typeof raw !== 'object') return false;
  if (raw.hasCompletedRegistration === true) return true;
  if (Object.keys(raw.solvedTaskKeys || {}).length > 0) return true;
  if ((raw.coins ?? 0) > 0) return true;
  if (raw.animalSpecies || raw.plantSpecies || raw.petSpecies) return true;
  const ag = typeof raw.animalGrowth === 'number' ? raw.animalGrowth : 0;
  const pg = typeof raw.plantGrowth === 'number' ? raw.plantGrowth : 0;
  const leg = typeof raw.petGrowth === 'number' ? raw.petGrowth : 0;
  if (ag > 0.001 || pg > 0.001 || leg > 0.001) return true;
  const p = raw.progressByTopic || {};
  if (Object.values(p).some((x) => x && ((x.attempted ?? 0) > 0 || (x.solved ?? 0) > 0))) return true;
  const o = raw.olympiadProgress || {};
  for (const k of Object.keys(o)) {
    const bucket = o[k];
    if (bucket && typeof bucket === 'object' && Object.keys(bucket).length > 0) return true;
  }
  if (Array.isArray(raw.inventory) && raw.inventory.length > 0) return true;
  return false;
}

function migrate(raw) {
  const d = defaultState();
  if (!raw) return d;

  let animalSpecies = raw.animalSpecies ?? null;
  let plantSpecies = raw.plantSpecies ?? null;
  let animalGrowth = typeof raw.animalGrowth === 'number' ? raw.animalGrowth : 0;
  let plantGrowth = typeof raw.plantGrowth === 'number' ? raw.plantGrowth : 0;

  const legacySpecies = raw.petSpecies ?? null;
  const legacyGrowth = typeof raw.petGrowth === 'number' ? raw.petGrowth : 0;

  if (legacySpecies && !animalSpecies && !plantSpecies) {
    if (isAnimalSpecies(legacySpecies)) {
      animalSpecies = legacySpecies;
      animalGrowth = legacyGrowth;
    } else if (isPlantSpecies(legacySpecies)) {
      plantSpecies = legacySpecies;
      plantGrowth = legacyGrowth;
    }
  }
  if (!animalSpecies && raw.petType === 'dog') animalSpecies = 'dog';
  if (!plantSpecies && raw.petType === 'tree') plantSpecies = 'oak';
  if (legacySpecies === 'tree' && !plantSpecies) plantSpecies = 'oak';
  if (legacySpecies === 'flower' && !plantSpecies) plantSpecies = 'tulip';

  const inv = Array.isArray(raw.inventory) ? [...raw.inventory] : [];
  const coins = raw.coins ?? 0;
  if (raw.foodInventory > 0 && inv.length === 0) {
    for (let i = 0; i < raw.foodInventory; i += 1) {
      inv.push({
        id: uid(),
        sub: 'dry',
        tier: 7,
        growth: 1,
        requiresCook: false,
        cooked: true,
        label: 'Корм (из старого сохранения)',
        category: 'animal',
      });
    }
  }

  const invNorm = inv.map((x) => ({
    ...x,
    category: x.category || 'animal',
  }));

  const hasCompletedRegistration =
    inferHasCompletedRegistration(raw) || raw.hasCompletedRegistration === true;

  return {
    ...d,
    hasCompletedRegistration,
    coins,
    animalSpecies,
    plantSpecies,
    animalGrowth,
    plantGrowth,
    progressByTopic: { ...d.progressByTopic, ...(raw.progressByTopic || {}) },
    solvedTaskKeys: { ...(raw.solvedTaskKeys || {}) },
    olympiadProgress: {
      o1: { ...(raw.olympiadProgress?.o1 || {}) },
      o2: { ...(raw.olympiadProgress?.o2 || {}) },
    },
    inventory: invNorm,
  };
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState(defaultState);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (next === 'background' || next === 'inactive') {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stateRef.current)).catch(() => {});
      }
    });
    return () => sub.remove();
  }, []);

  /** Одна запись после коммита — избегает гонок setItem при быстрых обновлениях. */
  useEffect(() => {
    if (!ready) return;
    stateRef.current = state;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [ready, state]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const v2 = await AsyncStorage.getItem('@olimpiad_family_app_v2');
        const legacy = await AsyncStorage.getItem('@olimpiad_family_app_v1');
        if (raw) setState(migrate(JSON.parse(raw)));
        else if (v2) {
          const merged = migrate(JSON.parse(v2));
          setState(merged);
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged)).catch(() => {});
        } else if (legacy) {
          const merged = migrate(JSON.parse(legacy));
          setState(merged);
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged)).catch(() => {});
        }
      } catch (_) {
        /* ignore */
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const persist = useCallback((updater) => {
    setState((s) => (typeof updater === 'function' ? updater(s) : updater));
  }, []);

  const markSessionStarted = useCallback(() => {
    persist((s) => (s.hasCompletedRegistration ? s : { ...s, hasCompletedRegistration: true }));
  }, [persist]);

  /** kind: 'animal' | 'plant' — один активный питомец, второй вид сбрасывается */
  const setSpeciesForKind = useCallback((kind, speciesId) => {
    persist((s) =>
      kind === 'animal'
        ? {
            ...s,
            animalSpecies: speciesId,
            animalGrowth: s.animalSpecies === speciesId ? s.animalGrowth : 0,
            plantSpecies: null,
            plantGrowth: 0,
          }
        : {
            ...s,
            plantSpecies: speciesId,
            plantGrowth: s.plantSpecies === speciesId ? s.plantGrowth : 0,
            animalSpecies: null,
            animalGrowth: 0,
          }
    );
  }, [persist]);

  /** Сброс одного вида после полного роста */
  const beginNewPetCycle = useCallback((kind) => {
    persist((s) =>
      kind === 'animal'
        ? { ...s, animalSpecies: null, animalGrowth: 0 }
        : { ...s, plantSpecies: null, plantGrowth: 0 }
    );
  }, [persist]);

  /** Собака или дуб: один активный питомец, второй вид очищается */
  const selectBasicPet = useCallback((kind) => {
    persist((s) =>
      kind === 'dog'
        ? {
            ...s,
            animalSpecies: 'dog',
            animalGrowth: s.animalSpecies === 'dog' ? s.animalGrowth : 0,
            plantSpecies: null,
            plantGrowth: 0,
          }
        : {
            ...s,
            plantSpecies: 'oak',
            plantGrowth: s.plantSpecies === 'oak' ? s.plantGrowth : 0,
            animalSpecies: null,
            animalGrowth: 0,
          }
    );
  }, [persist]);

  const addGrowth = useCallback((amount) => {
    persist((s) => ({
      ...s,
      animalGrowth: Math.min(100, Math.round((s.animalGrowth + amount) * 10) / 10),
      plantGrowth: Math.min(100, Math.round((s.plantGrowth + amount) * 10) / 10),
    }));
  }, [persist]);

  const purchaseAnimalFood = useCallback(
    (tier) => {
      persist((s) => {
        const spec = ANIMAL_TIERS[tier];
        if (!spec) return s;
        if (s.coins < spec.price) return s;
        const item = {
          id: uid(),
          sub: spec.kind,
          tier,
          growth: spec.growth,
          requiresCook: spec.requiresCook ?? false,
          cooked: spec.requiresCook ? false : true,
          label: spec.label,
          category: 'animal',
        };
        return {
          ...s,
          coins: s.coins - spec.price,
          inventory: [...s.inventory, item],
        };
      });
    },
    [persist]
  );

  const purchasePlantSupply = useCallback(
    (tier) => {
      persist((s) => {
        const spec = PLANT_TIERS[tier];
        if (!spec || s.coins < spec.price) return s;
        const item = {
          id: uid(),
          sub: spec.kind,
          tier,
          growth: spec.growth,
          requiresCook: false,
          cooked: true,
          label: spec.label,
          category: 'plant',
        };
        return {
          ...s,
          coins: s.coins - spec.price,
          inventory: [...s.inventory, item],
        };
      });
    },
    [persist]
  );

  const consumeInventoryItem = useCallback(
    (itemId) => {
      persist((s) => {
        const it = s.inventory.find((x) => x.id === itemId);
        if (!it) return s;
        if (it.category === 'animal' && it.requiresCook && !it.cooked) return s;
        const inv = s.inventory.filter((x) => x.id !== itemId);
        if (it.category === 'animal') {
          if (!s.animalSpecies) return { ...s, inventory: inv };
          const animalGrowth = Math.min(
            100,
            Math.round((s.animalGrowth + it.growth) * 10) / 10
          );
          return { ...s, inventory: inv, animalGrowth };
        }
        if (it.category === 'plant') {
          if (!s.plantSpecies) return { ...s, inventory: inv };
          const plantGrowth = Math.min(
            100,
            Math.round((s.plantGrowth + it.growth) * 10) / 10
          );
          return { ...s, inventory: inv, plantGrowth };
        }
        return s;
      });
    },
    [persist]
  );

  const addInventoryItem = useCallback(
    (item) => {
      persist((s) => ({ ...s, inventory: [...s.inventory, { ...item, id: item.id || uid() }] }));
    },
    [persist]
  );

  const removeInventoryItem = useCallback((id) => {
    persist((s) => ({ ...s, inventory: s.inventory.filter((x) => x.id !== id) }));
  }, [persist]);

  const updateInventoryItem = useCallback((id, patch) => {
    persist((s) => ({
      ...s,
      inventory: s.inventory.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));
  }, [persist]);

  const recordTaskOutcome = useCallback((topicId, taskKey, difficulty, rubricScore) => {
    persist((s) => {
      const prev = s.solvedTaskKeys[taskKey];
      const isFirstTime = !prev;

      let animalGrowth = s.animalGrowth;
      let plantGrowth = s.plantGrowth;
      let coins = s.coins;
      const topic = { ...(s.progressByTopic[topicId] || { solved: 0, correct: 0, attempted: 0 }) };

      const growthBase = difficulty === 'easy' ? 0.5 : difficulty === 'medium' ? 1 : 1.5;
      let growthAdd = 0;
      if (rubricScore > 5) growthAdd = growthBase;
      else if (rubricScore >= 3) growthAdd = growthBase * 0.45;
      else if (rubricScore >= 1) growthAdd = growthBase * 0.2;
      else growthAdd = growthBase * 0.08;

      if (isFirstTime) {
        if (s.animalSpecies) {
          animalGrowth = Math.min(100, Math.round((animalGrowth + growthAdd) * 10) / 10);
        }
        if (s.plantSpecies) {
          plantGrowth = Math.min(100, Math.round((plantGrowth + growthAdd) * 10) / 10);
        }
        coins += Math.round(rubricScore * 2);
        topic.attempted += 1;
        if (rubricScore > 5) topic.solved += 1;
        if (rubricScore >= 5) topic.correct += 1;
      } else {
        const old = prev.rubricScore;
        if (old <= 5 && rubricScore > 5) topic.solved += 1;
        if (old > 5 && rubricScore <= 5) topic.solved = Math.max(0, topic.solved - 1);
        if (old < 5 && rubricScore >= 5) topic.correct += 1;
        if (old >= 5 && rubricScore < 5) topic.correct = Math.max(0, topic.correct - 1);

        const oldG =
          old > 5
            ? growthBase
            : old >= 3
              ? growthBase * 0.45
              : old >= 1
                ? growthBase * 0.2
                : growthBase * 0.08;
        const delta = growthAdd - oldG;
        if (Math.abs(delta) > 0.001) {
          if (s.animalSpecies) {
            animalGrowth = Math.min(100, Math.max(0, Math.round((animalGrowth + delta) * 10) / 10));
          }
          if (s.plantSpecies) {
            plantGrowth = Math.min(100, Math.max(0, Math.round((plantGrowth + delta) * 10) / 10));
          }
        }
      }

      const solvedTaskKeys = {
        ...s.solvedTaskKeys,
        [taskKey]: { rubricScore, difficulty, topicId },
      };

      return {
        ...s,
        animalGrowth,
        plantGrowth,
        coins,
        progressByTopic: { ...s.progressByTopic, [topicId]: topic },
        solvedTaskKeys,
      };
    });
  }, [persist]);

  const recordOlympiadScore = useCallback((olympiadId, problemId, rubricScore, aiScore) => {
    persist((s) => {
      const bucket = { ...(s.olympiadProgress[olympiadId] || {}) };
      const prev = bucket[problemId] || {};
      const hadRubric = prev.rubricScore != null;
      bucket[problemId] = { ...prev, rubricScore, aiScore };
      let coins = s.coins;
      if (!hadRubric) coins += rubricScore * 2;
      return {
        ...s,
        olympiadProgress: { ...s.olympiadProgress, [olympiadId]: bucket },
        coins,
      };
    });
  }, [persist]);

  /** Сохраняет результат автопроверки ответа (true/false) для итогов олимпиады */
  const recordOlympiadAnswerCheck = useCallback((olympiadId, problemId, answerCorrect) => {
    persist((s) => {
      const bucket = { ...(s.olympiadProgress[olympiadId] || {}) };
      const prev = bucket[problemId] || {};
      bucket[problemId] = { ...prev, answerCorrect };
      return {
        ...s,
        olympiadProgress: { ...s.olympiadProgress, [olympiadId]: bucket },
      };
    });
  }, [persist]);

  const clearOlympiadProgress = useCallback((olympiadId) => {
    persist((s) => ({
      ...s,
      olympiadProgress: { ...s.olympiadProgress, [olympiadId]: {} },
    }));
  }, [persist]);

  /** После регистрации: чистый питомец, но задачи/монеты/темы не трогаем. */
  const resetPetStateAfterRegistration = useCallback(() => {
    persist((s) => ({
      ...s,
      animalSpecies: null,
      plantSpecies: null,
      animalGrowth: 0,
      plantGrowth: 0,
      inventory: [],
    }));
  }, [persist]);

  const value = useMemo(
    () => ({
      ready,
      ...state,
      totalTasksEstimate: TOTAL_TASKS_ESTIMATE,
      setSpeciesForKind,
      selectBasicPet,
      beginNewPetCycle,
      addGrowth,
      purchaseAnimalFood,
      purchasePlantSupply,
      consumeInventoryItem,
      addInventoryItem,
      removeInventoryItem,
      updateInventoryItem,
      recordTaskOutcome,
      recordOlympiadScore,
      recordOlympiadAnswerCheck,
      clearOlympiadProgress,
      resetPetStateAfterRegistration,
      markSessionStarted,
      hasAnyPet: !!(state.animalSpecies || state.plantSpecies),
      isAnimalSpecies: (id) => isAnimalSpecies(id),
      isPlantSpecies: (id) => isPlantSpecies(id),
    }),
    [
      ready,
      state,
      setSpeciesForKind,
      selectBasicPet,
      beginNewPetCycle,
      addGrowth,
      purchaseAnimalFood,
      purchasePlantSupply,
      consumeInventoryItem,
      addInventoryItem,
      removeInventoryItem,
      updateInventoryItem,
      recordTaskOutcome,
      recordOlympiadScore,
      recordOlympiadAnswerCheck,
      clearOlympiadProgress,
      resetPetStateAfterRegistration,
      markSessionStarted,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
