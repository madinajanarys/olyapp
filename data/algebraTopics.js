/** Алгебра: темы, уроки и задачи */

import { divisibilityLesson } from './topicLessons/divisibility';
import { gcdLesson } from './topicLessons/gcd';
import { shortMultiplyLesson } from './topicLessons/shortMultiply';
import { equationsLesson } from './topicLessons/equations';
import { inequalitiesLesson } from './topicLessons/inequalities';

export const TOPIC_IDS = [
  'divisibility',
  'gcd',
  'short-multiply',
  'equations',
  'inequalities',
];

export const topicMeta = {
  divisibility: {
    title: 'Делимость и остаток',
    titleKk: 'Бөлінгіштік және қалдық',
    titleEn: 'Divisibility and remainders',
  },
  gcd: {
    title: 'НОД и алгоритм Евклида',
    titleKk: 'ЕҮОБ және Евклид алгоритмі',
    titleEn: 'GCD and Euclidean algorithm',
  },
  'short-multiply': {
    title: 'Формулы сокращённого умножения',
    titleKk: 'Қысқартылған көбейту формулалары',
    titleEn: 'Short multiplication formulas',
  },
  equations: {
    title: 'Уравнения',
    titleKk: 'Теңдеулер',
    titleEn: 'Equations',
  },
  inequalities: {
    title: 'Неравенства',
    titleKk: 'Теңсіздіктер',
    titleEn: 'Inequalities',
  },
};

const lessons = {
  divisibility: divisibilityLesson,
  gcd: gcdLesson,
  'short-multiply': shortMultiplyLesson,
  equations: equationsLesson,
  inequalities: inequalitiesLesson,
};

export function getTopicLesson(topicId) {
  return lessons[topicId];
}

export function countTasksInTopic(topicId) {
  const L = lessons[topicId];
  if (!L) return 0;
  return ['easy', 'medium', 'hard'].reduce(
    (acc, d) => acc + (L.problems[d]?.length || 0),
    0
  );
}

export const TOTAL_TASKS_ESTIMATE = TOPIC_IDS.reduce((s, id) => s + countTasksInTopic(id), 0);

export function topicTitle(topicId, lang) {
  const m = topicMeta[topicId];
  if (!m) return topicId;
  if (lang === 'kk') return m.titleKk;
  if (lang === 'en') return m.titleEn;
  return m.title;
}
