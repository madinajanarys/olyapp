/**
 * Переводы текстов задач и разборов (en / kk). Русский остаётся в data/topicLessons/*.js
 */
import { gcdProblemsI18n } from './problemPatches/gcd';
import { divisibilityProblemsI18n } from './problemPatches/divisibility';
import { shortMultiplyProblemsI18n } from './problemPatches/shortMultiply';
import { equationsProblemsI18n } from './problemPatches/equations';
import { inequalitiesProblemsI18n } from './problemPatches/inequalities';

export const PROBLEM_I18N = {
  ...gcdProblemsI18n,
  ...divisibilityProblemsI18n,
  ...shortMultiplyProblemsI18n,
  ...equationsProblemsI18n,
  ...inequalitiesProblemsI18n,
};
