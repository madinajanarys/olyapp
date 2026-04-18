/** Товары для животных и растений (готовая еда — кормление через мини-игру). */

export const ANIMAL_TIERS = {
  3: {
    price: 3,
    growth: 1,
    label: 'Упаковка сухого корма',
    kind: 'dry',
    requiresCook: false,
  },
  7: {
    price: 7,
    growth: 2,
    label: 'Кусок рыбы',
    kind: 'fish_piece',
    requiresCook: false,
  },
  14: {
    price: 14,
    growth: 3,
    label: 'Стейк',
    kind: 'meat_steak',
    requiresCook: false,
  },
  35: {
    price: 35,
    growth: 5,
    label: 'Огромная рыба и мясо',
    kind: 'mega_feast',
    requiresCook: false,
  },
};

export const PLANT_TIERS = {
  3: { price: 3, growth: 1, label: 'Вода (бутылка)', kind: 'water_small' },
  7: { price: 7, growth: 2, label: 'Вода (больше)', kind: 'water_large' },
  14: { price: 14, growth: 3, label: 'Удобрение в мешке', kind: 'fertilizer_bag' },
  35: { price: 35, growth: 5, label: 'Огромное удобрение + вода', kind: 'fertilizer_mega' },
};

export { isAnimalSpecies, isPlantSpecies } from './petSpeciesData';
