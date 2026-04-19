/**
 * Виды питомцев и стадии роста (шкала 0–100%, пороги 5, 30, 50, 70, 90, 100).
 */

import {
  PLANT_SPECIES_STAGES,
  PLANT_DEFAULT_STAGES,
  growthStageIndex,
  getAnimalStageVisual,
  getPlantVisualScale,
} from './petGrowthStages';
import { localizeAnimalStage, getSpeciesLabel, localizedPlantMature } from '../i18n/petLocale';
import { mergePlantStage } from '../i18n/petPlantStagesI18n';

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

/** Стадии растения: пороги 5%, 30%, 50%, 70%, 90%, 100%; у каждого вида свои тексты и эмодзи. */
export function getPlantStageInfo(growthPct, speciesId, lang = 'ru') {
  const g = Math.min(100, Math.max(0, growthPct));
  const meta = speciesMeta(speciesId);
  if (g >= 100) {
    const mature = localizedPlantMature(speciesId, meta, lang);
    return {
      stage: 6,
      title: mature.title,
      detail: mature.detail,
      emoji: meta.emoji,
      growthVisualScale: 1.42,
    };
  }
  const idx = growthStageIndex(g);
  const rows = PLANT_SPECIES_STAGES[speciesId] || PLANT_DEFAULT_STAGES;
  const row = rows[Math.min(idx, rows.length - 1)];
  const merged = mergePlantStage(speciesId, idx, row, lang);
  return {
    stage: idx,
    title: merged.title,
    detail: merged.detail,
    emoji: row.emoji,
    growthVisualScale: getPlantVisualScale(g),
  };
}

/** Стадии животного: яйцо → вылупление → малыш → после 50% тот же вид, растёт масштаб. */
export function getAnimalStageInfo(growthPct, speciesId, lang = 'ru') {
  const meta = speciesMeta(speciesId);
  const v = getAnimalStageVisual(growthPct, meta);
  const labelI18n = getSpeciesLabel(speciesId, lang) || meta.label;
  let title = v.title;
  let detail = v.detail;
  if (lang !== 'ru') {
    const loc = localizeAnimalStage(v.stageIndex, labelI18n, lang);
    if (loc) {
      title = loc.title;
      detail = loc.detail;
    }
  }
  return {
    title,
    detail,
    emoji: v.emoji,
    growthVisualScale: v.visualScale,
    stageIndex: v.stageIndex,
  };
}

export { GROWTH_THRESHOLDS } from './petGrowthStages';

export function computeTopicStarTotal(solvedTaskKeys) {
  if (!solvedTaskKeys || typeof solvedTaskKeys !== 'object') return 0;
  return Object.entries(solvedTaskKeys).reduce((sum, [key, val]) => {
    if (!key.startsWith('topic:')) return sum;
    const score = val && typeof val.rubricScore === 'number' ? val.rubricScore : 0;
    return sum + score;
  }, 0);
}
