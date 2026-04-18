/**
 * Виды питомцев и стадии роста (шкала 0–100%, пороги 5, 30, 50, 70, 90, 100).
 */

export const ANIMAL_LIST = [
  { id: 'dog', label: 'Собака', emoji: '🐕' },
  { id: 'cat', label: 'Кошка', emoji: '🐈' },
  { id: 'owl', label: 'Сова', emoji: '🦉' },
  { id: 'dolphin', label: 'Дельфин', emoji: '🐬' },
  { id: 'horse', label: 'Лошадь', emoji: '🐴' },
  { id: 'rabbit', label: 'Кролик', emoji: '🐰' },
  { id: 'hamster', label: 'Хомяк', emoji: '🐹' },
  { id: 'fox', label: 'Лиса', emoji: '🦊' },
  { id: 'penguin', label: 'Пингвин', emoji: '🐧' },
  { id: 'turtle', label: 'Черепаха', emoji: '🐢' },
];

export const PLANT_LIST = [
  { id: 'tulip', label: 'Тюльпан', emoji: '🌷' },
  { id: 'apple', label: 'Яблоня', emoji: '🍎' },
  { id: 'sunflower', label: 'Подсолнух', emoji: '🌻' },
  { id: 'rose', label: 'Роза', emoji: '🌹' },
  { id: 'cactus', label: 'Кактус', emoji: '🌵' },
  { id: 'bamboo', label: 'Бамбук', emoji: '🎋' },
  { id: 'oak', label: 'Дуб', emoji: '🌳' },
  { id: 'cherry', label: 'Сакура / вишня', emoji: '🍒' },
  { id: 'lavender', label: 'Лаванда', emoji: '🪻' },
  { id: 'fern', label: 'Папоротник', emoji: '🌿' },
];

const ANIMAL_IDS = new Set(ANIMAL_LIST.map((x) => x.id));
const PLANT_IDS = new Set(PLANT_LIST.map((x) => x.id));

export function isAnimalSpecies(id) {
  return id != null && ANIMAL_IDS.has(id);
}

export function isPlantSpecies(id) {
  return id != null && PLANT_IDS.has(id);
}

export function speciesMeta(id) {
  const a = ANIMAL_LIST.find((x) => x.id === id);
  if (a) return a;
  const p = PLANT_LIST.find((x) => x.id === id);
  return p || { id, label: 'Питомец', emoji: '❓' };
}

/** Устаревшая константа (совместимость) */
export const ANIMAL_STAR_THRESHOLD = 30;

/** Стадии растения по порогам роста % */
export function getPlantStageInfo(growthPct, speciesId) {
  const g = Math.min(100, Math.max(0, growthPct));
  const meta = speciesMeta(speciesId);
  if (g <= 5) {
    return {
      stage: 0,
      title: 'Семечко',
      detail: 'Зерно в земле — полив и удобрения помогут прорасти.',
      emoji: '🌰',
    };
  }
  if (g <= 30) {
    return {
      stage: 1,
      title: 'Росток',
      detail: 'Появился небольшой росток.',
      emoji: '🌱',
    };
  }
  if (g <= 50) {
    return {
      stage: 2,
      title: 'Цветок',
      detail: 'Уже виден цветок.',
      emoji: '🌸',
    };
  }
  if (g <= 70) {
    return {
      stage: 3,
      title: 'Много цветов',
      detail: 'Растение цветёт обильно.',
      emoji: '💐',
    };
  }
  if (g <= 90) {
    return {
      stage: 4,
      title: 'Появляется дерево',
      detail: 'Формируется дерево.',
      emoji: '🌳',
    };
  }
  if (g < 100) {
    return {
      stage: 5,
      title: 'Дерево и цветы',
      detail: 'Дерево рядом с цветами и травой.',
      emoji: '🌳',
    };
  }
  return {
    stage: 6,
    title: 'Полностью выросло',
    detail: `${meta.label} выросло! Можно выбрать новое растение.`,
    emoji: meta.emoji,
  };
}

/** Стадии собаки (и др. животных) по порогам % */
export function getAnimalStageInfo(growthPct, speciesId) {
  const g = Math.min(100, Math.max(0, growthPct));
  const meta = speciesMeta(speciesId);
  const isDog = speciesId === 'dog';

  if (g <= 5) {
    return {
      title: isDog ? 'Яйцо / зародыш' : 'Самое начало',
      emoji: isDog ? '🥚' : meta.emoji,
      detail: isDog ? 'Пока как яйцо — скоро появится малыш.' : 'Малыш только появился.',
    };
  }
  if (g <= 30) {
    return {
      title: isDog ? 'Маленький щенок' : 'Малыш',
      emoji: meta.emoji,
      detail: isDog
        ? 'Крошечный щенок, почти без шерсти — как чихуахуа.'
        : 'Питомец совсем маленький.',
    };
  }
  if (g <= 50) {
    return {
      title: isDog ? 'Пушистый шпиц' : 'Подрастает',
      emoji: meta.emoji,
      detail: isDog ? 'Стал больше и пушистым, как померанский шпиц.' : 'Заметно подрос.',
    };
  }
  if (g <= 70) {
    return {
      title: isDog ? 'Собака больше' : 'Почти взрослый',
      emoji: meta.emoji,
      detail: isDog ? 'Размер увеличивается.' : 'Уже почти взрослый.',
    };
  }
  if (g <= 90) {
    return {
      title: 'Ещё больше',
      emoji: meta.emoji,
      detail: 'Продолжает расти.',
    };
  }
  if (g < 100) {
    return {
      title: 'Почти максимум',
      emoji: meta.emoji,
      detail: 'Осталось совсем чуть-чуть.',
    };
  }
  return {
    title: 'Полностью вырос',
    emoji: meta.emoji,
    detail: 'Можно начать заново с новым питомцем.',
  };
}

export function computeTopicStarTotal(solvedTaskKeys) {
  if (!solvedTaskKeys || typeof solvedTaskKeys !== 'object') return 0;
  return Object.entries(solvedTaskKeys).reduce((sum, [key, val]) => {
    if (!key.startsWith('topic:')) return sum;
    const score = val && typeof val.rubricScore === 'number' ? val.rubricScore : 0;
    return sum + score;
  }, 0);
}
