/**
 * Пороги роста % (как в ТЗ): до 5, 30, 50, 70, 90, затем до 100.
 * Индекс стадии 0..5 для полосы < 100; 100% — отдельное завершение.
 */

export const GROWTH_THRESHOLDS = [5, 30, 50, 70, 90, 100];

/** Индекс стадии 0..5 по текущему % (для < 100). */
export function growthStageIndex(growthPct) {
  const g = Math.min(100, Math.max(0, growthPct));
  if (g <= 5) return 0;
  if (g <= 30) return 1;
  if (g <= 50) return 2;
  if (g <= 70) return 3;
  if (g <= 90) return 4;
  return 5;
}

/**
 * Растения: у каждого вида свои подписи и эмодзи по стадиям (0..5) и финал (100%).
 * Стадии: семечко → росток → молодое → почти взрослое → цветение/почти зрелое → перед сбором.
 */
export const PLANT_SPECIES_STAGES = {
  tulip: [
    { title: 'Семечко', detail: 'Луковица тюльпана в земле.', emoji: '🌰' },
    { title: 'Росток', detail: 'Тонкий стебель и первый лист.', emoji: '🌱' },
    { title: 'Молодой тюльпан', detail: 'Бутон уже заметен.', emoji: '🌷' },
    { title: 'Почти цветение', detail: 'Бутон раскрывается.', emoji: '🌷' },
    { title: 'Цветущий тюльпан', detail: 'Яркий цветок в полном расцвете.', emoji: '🌷' },
    { title: 'Полное цветение', detail: 'Тюльпан в лучшем виде перед увяданием.', emoji: '💐' },
  ],
  apple: [
    { title: 'Семечко', detail: 'Семечко яблони в почве.', emoji: '🌰' },
    { title: 'Росток', detail: 'Тонкий саженец с ростками.', emoji: '🌱' },
    { title: 'Молодое деревце', detail: 'Ствол утолщается, появляются веточки.', emoji: '🌿' },
    { title: 'Почти дерево', detail: 'Крона формируется, листья густые.', emoji: '🌳' },
    { title: 'Цветущая яблоня', detail: 'Цветёт — скоро завяжутся плоды.', emoji: '🌸' },
    { title: 'Плоды завязываются', detail: 'Зелёные яблочки растут.', emoji: '🍏' },
  ],
  sunflower: [
    { title: 'Семечко', detail: 'Семечко подсолнуха в земле.', emoji: '🌰' },
    { title: 'Росток', detail: 'Два семядольных листа.', emoji: '🌱' },
    { title: 'Молодой подсолнух', detail: 'Стебель тянется вверх.', emoji: '🌻' },
    { title: 'Высокий стебель', detail: 'Бутон наверху крупнеет.', emoji: '🌻' },
    { title: 'Бутон созревает', detail: 'Лепестки скоро раскроются.', emoji: '🌻' },
    { title: 'Цветущий подсолнух', detail: 'Большая «шапка» с семечками.', emoji: '🌻' },
  ],
  rose: [
    { title: 'Семечко / черенок', detail: 'Закладка будущего куста розы.', emoji: '🌰' },
    { title: 'Росток', detail: 'Побеги и шипы.', emoji: '🌱' },
    { title: 'Молодой куст', detail: 'Первые бутоны.', emoji: '🥀' },
    { title: 'Куст с бутонами', detail: 'Розы почти раскрылись.', emoji: '🌹' },
    { title: 'Цветущая роза', detail: 'Насыщенный цвет и аромат.', emoji: '🌹' },
    { title: 'Пышное цветение', detail: 'Много бутонов на ветках.', emoji: '💐' },
  ],
  cactus: [
    { title: 'Семечко', detail: 'Крошечное семя кактуса.', emoji: '🌰' },
    { title: 'Росток', detail: 'Первые колючки на подушечке.', emoji: '🌵' },
    { title: 'Молодой кактус', detail: 'Форма стала заметной.', emoji: '🌵' },
    { title: 'Подросший кактус', detail: 'Рёбра и колючки чётче.', emoji: '🌵' },
    { title: 'Почти взрослый', detail: 'Может появиться отросток.', emoji: '🌵' },
    { title: 'Крупный кактус', detail: 'Сильный, устойчивый.', emoji: '🌵' },
  ],
  bamboo: [
    { title: 'Семечко / росток', detail: 'Первый побег бамбука.', emoji: '🌱' },
    { title: 'Росток', detail: 'Стебель тянется вверх.', emoji: '🎋' },
    { title: 'Молодой бамбук', detail: 'Стебли ещё тонкие.', emoji: '🎋' },
    { title: 'Заросль', detail: 'Несколько стеблей, листья шелестят.', emoji: '🎋' },
    { title: 'Густой бамбук', detail: 'Высокие стебли.', emoji: '🎋' },
    { title: 'Зрелый бамбук', detail: 'Плотная зелёная стена.', emoji: '🎋' },
  ],
  oak: [
    { title: 'Жёлудь', detail: 'Жёлудь дуба в земле.', emoji: '🌰' },
    { title: 'Росток', detail: 'Саженец с несколькими листьями.', emoji: '🌱' },
    { title: 'Молодой дубок', detail: 'Ствол толще, крона начинается.', emoji: '🌿' },
    { title: 'Дуб растёт', detail: 'Мощный ствол, тень шире.', emoji: '🌳' },
    { title: 'Взрослый дуб', detail: 'Развесистая крона.', emoji: '🌳' },
    { title: 'Старый дуб', detail: 'Могучее дерево.', emoji: '🌳' },
  ],
  cherry: [
    { title: 'Косточка', detail: 'Семя сакуры / вишни.', emoji: '🌰' },
    { title: 'Росток', detail: 'Нежные ростки.', emoji: '🌱' },
    { title: 'Молодое дерево', detail: 'Ствол тонкий, листва нежная.', emoji: '🌸' },
    { title: 'Перед цветением', detail: 'Бутоны набухают.', emoji: '🌸' },
    { title: 'Цветение сакуры', detail: 'Облако нежно-розовых цветов.', emoji: '🌸' },
    { title: 'Ягоды завязываются', detail: 'После цвета — завязь вишни.', emoji: '🍒' },
  ],
  lavender: [
    { title: 'Семечко', detail: 'Мелкие семена лаванды.', emoji: '🌰' },
    { title: 'Росток', detail: 'Тонкие побеги, аромат слабый.', emoji: '🌱' },
    { title: 'Кустик', detail: 'Серовато-зелёные листочки.', emoji: '🪻' },
    { title: 'Подросшая лаванда', detail: 'Форма куста плотнее.', emoji: '🪻' },
    { title: 'Бутоны', detail: 'Фиолетовые колоски наливаются.', emoji: '🪻' },
    { title: 'Цветущая лаванда', detail: 'Полоса ароматного цвета.', emoji: '🪻' },
  ],
  fern: [
    { title: 'Спора / зародыш', detail: 'Зарождение папоротника.', emoji: '🌰' },
    { title: 'Росток', detail: 'Первые завитки «улиток».', emoji: '🌿' },
    { title: 'Молодой папоротник', detail: 'Листья расправляются.', emoji: '🌿' },
    { title: 'Куст', detail: 'Пышная зелень.', emoji: '🌿' },
    { title: 'Зрелый папоротник', detail: 'Крупные вайи.', emoji: '🌿' },
    { title: 'Пышный папоротник', detail: 'Густой зелёный ковёр.', emoji: '🌿' },
  ],
};

/** Универсальные стадии, если вид не задан в таблице */
export const PLANT_DEFAULT_STAGES = [
  { title: 'Семечко', detail: 'Семя в земле.', emoji: '🌰' },
  { title: 'Росток', detail: 'Появился стебель и листья.', emoji: '🌱' },
  { title: 'Молодое растение', detail: 'Заметно подросло.', emoji: '🌿' },
  { title: 'Почти выросшее', detail: 'Форма почти взрослая.', emoji: '🪴' },
  { title: 'Цветущее / почти зрелое', detail: 'Цветение или созревание.', emoji: '🌸' },
  { title: 'Перед полным ростом', detail: 'Осталось совсем немного.', emoji: '🌳' },
];

/**
 * Животные: этапы по ТЗ + эмодзи. После 50% форма та же (эмодзи вида), растёт только масштаб.
 * @param {{ label: string, emoji: string }} meta — из speciesMeta(speciesId)
 */
export function getAnimalStageVisual(growthPct, meta) {
  const g = Math.min(100, Math.max(0, growthPct));
  const label = meta.label || 'Питомец';
  let visualScale = 1;
  let emoji = meta.emoji;

  if (g <= 5) {
    return {
      stageIndex: 0,
      title: 'Яйцо',
      detail: 'Пока только яйцо — скоро появится жизнь.',
      emoji: '🥚',
      visualScale: 0.55,
    };
  }
  if (g <= 30) {
    return {
      stageIndex: 1,
      title: 'Яйцо: видна часть малыша',
      detail: `Из скорлупы проступает силуэт ${label.toLowerCase()} — уже узнаваемо.`,
      emoji,
      visualScale: 0.62,
    };
  }
  if (g <= 50) {
    return {
      stageIndex: 2,
      title: 'Маленькое животное',
      detail: `${label} совсем крошечный — форма уже узнаваема.`,
      emoji,
      visualScale: 0.78 + (g - 30) / 20 * 0.12,
    };
  }
  if (g < 100) {
    const t = (g - 50) / 50;
    visualScale = 0.95 + t * 0.55;
    if (g <= 70) {
      return {
        stageIndex: 3,
        title: 'Подросшее животное',
        detail: `${label} крепнет; размер заметно растёт.`,
        emoji,
        visualScale,
      };
    }
    if (g <= 90) {
      return {
        stageIndex: 4,
        title: 'Почти взрослое',
        detail: 'Почти максимальный размер, остались последние штрихи роста.',
        emoji,
        visualScale,
      };
    }
    return {
      stageIndex: 5,
      title: 'У взрослого порога',
      detail: 'Форма взрослая, осталось немного до 100%.',
      emoji,
      visualScale,
    };
  }

  return {
    stageIndex: 6,
    title: 'Полностью взрослое животное',
    detail: `${label} выросло полностью! Можно начать с новым питомцем.`,
    emoji,
    visualScale: 1.55,
  };
}

/** Плавное увеличение эмодзи растения между порогами (заметнее рост). */
export function getPlantVisualScale(growthPct) {
  const g = Math.min(100, Math.max(0, growthPct));
  const idx = growthStageIndex(g);
  const base = 0.68 + idx * 0.055;
  const within = g / 100;
  return Math.min(1.45, base + within * 0.12);
}
