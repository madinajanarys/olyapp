/**
 * Многоязычное поле: { ru, en, kk } из L3() или строка (устаревший формат — только ru).
 */
export function loc(value, lang) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if (lang === 'en') return value.en ?? value.ru ?? '';
    if (lang === 'kk') return value.kk ?? value.ru ?? '';
    return value.ru ?? value.en ?? '';
  }
  return String(value);
}
