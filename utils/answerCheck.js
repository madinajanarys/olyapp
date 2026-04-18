/**
 * Нормализация ответа для сравнения (кириллица/латиница, пробелы, запятые).
 */
export function normalizeAnswer(s) {
  if (s == null) return '';
  let t = String(s).trim().toLowerCase();
  t = t.replace(/\u2212/g, '-').replace(/−/g, '-');
  t = t.replace(/,/g, '.');
  t = t.replace(/\s+/g, '');
  t = t.replace(/^x=/, '').replace(/^y=/, '').replace(/^z=/, '');
  t = t.replace(/^ответ[:=]?/, '').replace(/^answer[:=]?/, '');
  t = t.replace(/да/g, 'yes').replace(/нет/g, 'no');
  return t;
}

/**
 * @param {string} userInput
 * @param {string[] | null | undefined} correctAnswers
 * @returns {boolean | null} true/false или null если автопроверка недоступна
 */
export function matchesAnyCorrectAnswer(userInput, correctAnswers) {
  if (!correctAnswers || !correctAnswers.length) return null;
  const u = normalizeAnswer(userInput);
  if (!u) return false;
  return correctAnswers.some((a) => {
    const c = normalizeAnswer(a);
    if (!c) return false;
    if (u === c) return true;
    if (u.includes(c) && c.length >= 4) return true;
    return false;
  });
}
