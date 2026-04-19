/**
 * Первый раз в разделе питомца: ученик ещё ни животное, ни растение не выбирал —
 * можно открыть список животных или растений на выбор.
 *
 * После того как что-то выбрано и начато выращивание — до 100% нового не выбрать;
 * после 100% — сначала «Новый питомец» в хабе, потом снова можно выбрать вид.
 * Нельзя переключиться с растения на животное и наоборот, пока активен другой тип.
 *
 * Второй аргумент `t` — функция перевода из useLanguage(); без неё возвращаются русские строки (совместимость).
 */

/** Ещё ни одного питомца не выбрано — разрешён любой первый выбор (животное или растение). */
export function isFirstPetChoice({ animalSpecies, plantSpecies }) {
  return !animalSpecies && !plantSpecies;
}

export function reasonCannotOpenAnimalSpecies(a, t) {
  if (isFirstPetChoice(a)) return null;

  const { animalSpecies, animalGrowth, plantSpecies } = a;
  if (plantSpecies) {
    return t ? t('petGuardPlantBlocksAnimal') : 'Сначала завершите уход за растением и нажмите «Новый питомец», затем можно выбрать животное.';
  }
  if (animalSpecies && animalGrowth < 100) {
    return t ? t('petGuardAnimalMustGrow') : 'Сначала вырастите текущее животное до 100%. Нового можно выбрать только после этого.';
  }
  if (animalSpecies && animalGrowth >= 100) {
    return t ? t('petGuardAnimalNeedNewPet') : 'Нажмите «Новый питомец» на экране питомца — тогда можно будет выбрать другое животное.';
  }
  return null;
}

export function reasonCannotOpenPlantSpecies(a, t) {
  if (isFirstPetChoice(a)) return null;

  const { animalSpecies, plantSpecies, plantGrowth } = a;
  if (animalSpecies) {
    return t ? t('petGuardAnimalBlocksPlant') : 'Сначала завершите уход за животным и нажмите «Новый питомец», затем можно выбрать растение.';
  }
  if (plantSpecies && plantGrowth < 100) {
    return t ? t('petGuardPlantMustGrow') : 'Сначала вырастите текущее растение до 100%. Новое можно выбрать только после этого.';
  }
  if (plantSpecies && plantGrowth >= 100) {
    return t ? t('petGuardPlantNeedNewPet') : 'Нажмите «Новый питомец» на экране питомца — тогда можно будет выбрать другое растение.';
  }
  return null;
}
