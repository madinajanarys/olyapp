/** EN/KK для олимпиадных задач и названий вариантов (RU в data/olympiads.js) */

export const OLYMPIAD_META_I18N = {
  o1: {
    en: 'Variant 1 — Republican junior olympiad',
    kk: '1-нұсқа — Республикалық жас олимпиада',
  },
  o2: {
    en: 'Variant 2 — Sh. Smagulov olympiad',
    kk: '2-нұсқа — Ш. Смағұлов олимпиадасы',
  },
};

export const OLYMPIAD_PROBLEM_I18N = {
  'o1-p1': {
    en: {
      shortLabel: '1.1 Minimum A',
      text: 'Problem 1.1 (Algebra). Let x, y > 0 and x² + y² = 1. Find the minimum of A = (x + y + 1)/(xy).',
      solution:
        'At x = y = 1/√2 we get xy = 1/2, x+y = √2, hence A = 2(√2+1) — the minimum.',
      hint: 'Relate x+y and xy using x²+y² = 1.',
    },
    kk: {
      shortLabel: '1.1 A минимумы',
      text: '1.1 есебі. x, y > 0 және x² + y² = 1. A = (x + y + 1)/(xy) минимумын табыңыз.',
      solution: 'x = y = 1/√2 нүктесінде минимум 2(√2+1).',
      hint: 'x+y және xy байланысы.',
    },
  },
  'o1-p2': {
    en: {
      shortLabel: '1.2 Roots',
      text: 'Problem 1.2. Solve √(x²−8x+41) + √(y²+6y+25) = 9 in real numbers.',
      solution: 'Complete squares: minima 5 and 4 at x=4, y=−3; sum equals 9 only there.',
      hint: 'Minima under the roots.',
    },
    kk: {
      shortLabel: '1.2 Түбірлер',
      text: '1.2. Теңдеуді нақты сандарда шешіңіз.',
      solution: 'x = 4, y = −3.',
      hint: 'Толық квадраттар.',
    },
  },
  'o1-p3': {
    en: {
      shortLabel: '1.3 Divisors',
      text: 'Problem 1.3. Find all naturals divisible by 5 and 9 with exactly 10 positive divisors.',
      solution: 'N must be multiple of 45 = 3²·5; τ(N)=10 forces N = 405.',
      hint: 'Use τ(p^a q^b)=(a+1)(b+1).',
    },
    kk: {
      shortLabel: '1.3 Бөлгіштер',
      text: '1.3. 5 және 9-ға бөлінетін, дәл 10 бөлгіші бар табиғи сандар.',
      solution: '405.',
      hint: 'Бөлгіштер саны формуласы.',
    },
  },
  'o1-p4': {
    en: {
      shortLabel: '1.4 System',
      text: 'Problem 1.4. Solve x+y+xy=5, x²+y²=5.',
      solution: 'S=x+y, P=xy → S+P=5, S²−2P=5; solutions (1,2) and (2,1).',
      hint: 'Use S and P.',
    },
    kk: {
      shortLabel: '1.4 Жүйе',
      text: '1.4. x+y+xy=5, x²+y²=5 жүйесін шешіңіз.',
      solution: '(1,2) және (2,1).',
      hint: 'S және P алмастыруы.',
    },
  },
  'o2-p1': {
    en: {
      shortLabel: '2.1 Series',
      text: 'Problem 2.1. Compute 870·A if A = Σ 1/(n²−1) from n=2 to 29.',
      solution: 'Telescoping gives A = 623/870, hence 870A = 623.',
      hint: 'Partial fractions.',
    },
    kk: {
      shortLabel: '2.1 Қатар',
      text: '2.1. A = Σ 1/(n²−1) (n=2..29) болса 870·A табыңыз.',
      solution: '623.',
      hint: 'Бөлшектерді жіктеу.',
    },
  },
  'o2-p2': {
    en: {
      shortLabel: '2.2 Last digits',
      text: 'Problem 2.2. Find the last two digits of 7^2013.',
      solution: 'Cycle mod 100 has period 4; answer 07.',
      hint: 'Cycle mod 100.',
    },
    kk: {
      shortLabel: '2.2 Соңғы цифрлар',
      text: '2.2. 7^2013 соңғы екі цифры.',
      solution: '07.',
      hint: 'mod 100 циклі.',
    },
  },
  'o2-p3': {
    en: {
      shortLabel: '2.3 Cube of sum',
      text: 'Problem 2.3. If x + 1/x = 3, find x³ + 1/x³.',
      solution: '(x+1/x)³ = x³+1/x³ + 3(x+1/x) ⇒ 27 = x³+1/x³ + 9 ⇒ answer 18.',
      hint: 'Cube of sum formula.',
    },
    kk: {
      shortLabel: '2.3 Куб',
      text: '2.3. x + 1/x = 3 болса x³ + 1/x³.',
      solution: '18.',
      hint: 'Куб формуласы.',
    },
  },
  'o2-p4': {
    en: {
      shortLabel: '2.4 Parameter',
      text: 'Problem 2.4. Find all integers a such that x⁴+2x³+ax²+2x+1=0 has an integer root.',
      solution: 'x≠0; substitution t=x+1/x gives a = −6 or a = 2.',
      hint: 'Symmetry t = x + 1/x.',
    },
    kk: {
      shortLabel: '2.4 Параметр',
      text: '2.4. Бүтін a: теңдеудің бүтін түбірі болсын.',
      solution: 'a = −6 немесе a = 2.',
      hint: 't = x + 1/x.',
    },
  },
};

export function getOlympiadTitle(olympiadId, lang, ruTitle) {
  if (lang === 'ru') return ruTitle;
  const m = OLYMPIAD_META_I18N[olympiadId];
  if (!m) return ruTitle;
  return lang === 'en' ? m.en : m.kk;
}

export function getLocalizedOlympiadProblem(problem, lang) {
  if (lang === 'ru' || !problem) return problem;
  const p = OLYMPIAD_PROBLEM_I18N[problem.id];
  if (!p) return problem;
  const tr = lang === 'en' ? p.en : p.kk;
  if (!tr) return problem;
  return {
    ...problem,
    shortLabel: tr.shortLabel ?? problem.shortLabel,
    text: tr.text ?? problem.text,
    solution: tr.solution ?? problem.solution,
    hint: tr.hint ?? problem.hint,
  };
}
