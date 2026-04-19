/**
 * EN/KK для подписей видов и стадий животного (RU — исходные данные в data/).
 */

const SPECIES = {
  dog: { en: 'Dog', kk: 'Ит' },
  cat: { en: 'Cat', kk: 'Мысық' },
  owl: { en: 'Owl', kk: 'Жапалақ' },
  dolphin: { en: 'Dolphin', kk: 'Дельфин' },
  horse: { en: 'Horse', kk: 'Жылқы' },
  rabbit: { en: 'Rabbit', kk: 'Қоян' },
  hamster: { en: 'Hamster', kk: 'Хомяк' },
  fox: { en: 'Fox', kk: 'Түлкі' },
  penguin: { en: 'Penguin', kk: 'Пингвин' },
  turtle: { en: 'Turtle', kk: 'Тасбақа' },
  tulip: { en: 'Tulip', kk: 'Қызғалдақ' },
  apple: { en: 'Apple tree', kk: 'Алма ағашы' },
  sunflower: { en: 'Sunflower', kk: 'Күнбағыс' },
  rose: { en: 'Rose', kk: 'Роза' },
  cactus: { en: 'Cactus', kk: 'Кактус' },
  bamboo: { en: 'Bamboo', kk: 'Бамбук' },
  oak: { en: 'Oak', kk: 'Емен' },
  cherry: { en: 'Cherry / sakura', kk: 'Шие / сакура' },
  lavender: { en: 'Lavender', kk: 'Лаванда' },
  fern: { en: 'Fern', kk: 'Папоротник' },
};

const ANIMAL = {
  en: [
    { title: 'Egg', detail: 'Just an egg — life will appear soon.' },
    {
      title: 'Egg: baby visible',
      detail: 'From the shell you can see a {labelLower} — already recognizable.',
    },
    {
      title: 'Small animal',
      detail: '{label} is tiny — the shape is clear.',
    },
    {
      title: 'Growing animal',
      detail: '{label} is getting stronger; size grows noticeably.',
    },
    {
      title: 'Almost adult',
      detail: 'Almost full size — finishing touches left.',
    },
    {
      title: 'At the adult threshold',
      detail: 'Adult shape — a little left until 100%.',
    },
    {
      title: 'Fully grown animal',
      detail: '{label} is fully grown! You can start with a new pet.',
    },
  ],
  kk: [
    { title: 'Жұмыртқа', detail: 'Әзірге жұмыртқа — жақында өмір пайда болады.' },
    {
      title: 'Жұмыртқа: баласы көрінеді',
      detail: 'Қабықтан {labelLower} силуэті көрінеді — тануға болады.',
    },
    {
      title: 'Кіші жануар',
      detail: '{label} өте кішкентай — пішіні айқын.',
    },
    {
      title: 'Өсіп жатқан жануар',
      detail: '{label} нығаяды; өлшемі байқалады.',
    },
    {
      title: 'Дәл ересек емес',
      detail: 'Мөлшері дерлік толық, соңғы қадамдар қалды.',
    },
    {
      title: 'Ересек шекте',
      detail: 'Ересек пішін — 100%-ға аз қалды.',
    },
    {
      title: 'Толық ересек жануар',
      detail: '{label} толық өсті! Жаңа питомецті бастауға болады.',
    },
  ],
};

export const PLANT_MATURE = {
  en: {
    title: 'Fully grown plant',
    detail: '{label} is mature! You can pick a new plant.',
  },
  kk: {
    title: 'Толық өскен өсімдік',
    detail: '{label} пісіп жетілді! Жаңа өсімдікті таңдауға болады.',
  },
};

export function applyTemplate(str, label) {
  const lower = (label || '').toLowerCase();
  return str.replace(/\{label\}/g, label).replace(/\{labelLower\}/g, lower);
}

/** Финальный экран растения 100% */
export function localizedPlantMature(speciesId, meta, lang) {
  if (lang === 'ru') {
    return {
      title: 'Полностью выросшее растение',
      detail: `${meta.label} созрело! Можно выбрать новое растение.`,
    };
  }
  const lab = getSpeciesLabel(speciesId, lang) || meta.label;
  const P = PLANT_MATURE[lang === 'en' ? 'en' : 'kk'];
  return {
    title: P.title,
    detail: applyTemplate(P.detail, lab),
  };
}

export function getSpeciesLabel(speciesId, lang) {
  if (lang === 'ru' || !speciesId) return null;
  const row = SPECIES[speciesId];
  if (!row) return null;
  return lang === 'en' ? row.en : row.kk;
}

export function localizedSpeciesMeta(meta, speciesId, lang) {
  const lab = getSpeciesLabel(speciesId, lang);
  if (!lab) return meta;
  return { ...meta, label: lab };
}

/** stageIndex 0–6 из getAnimalStageVisual */
export function localizeAnimalStage(stageIndex, labelForI18n, lang) {
  if (lang === 'ru') return null;
  const pack = ANIMAL[lang === 'en' ? 'en' : 'kk'];
  const row = pack[stageIndex];
  if (!row) return null;
  const L = labelForI18n || '';
  return {
    title: applyTemplate(row.title, L),
    detail: applyTemplate(row.detail, L),
  };
}
