/**
 * Переводы теории, подписей уровней и примеров (en / kk). Русский — в topicLessons.
 */

export const LESSON_FRAME_I18N = {
  gcd: {
    en: {
      levelLabels: {
        easy: 'Easy level',
        medium: 'Medium level',
        hard: 'Hard level',
      },
      explanation: `GCD and the Euclidean algorithm

What is GCD?
The greatest common divisor (GCD) of two numbers is the largest integer that divides both without remainder.

Example: GCD(6, 4)
Divisors of 6 → 1, 2, 3, 6
Divisors of 4 → 1, 2, 4
Common → 1, 2
Largest → 2
GCD(6, 4) = 2

Also: GCD(15, 25) = 5

Euclidean algorithm (fast GCD)
Divide the larger number by the smaller → take the remainder.
Then take the smaller number and this remainder → divide again.
Repeat until the remainder is 0.
When remainder = 0 → the last non-zero divisor is the GCD.

Example: GCD(1234, 123)
1234 ÷ 123 → remainder 4
123 ÷ 4 → remainder 3
4 ÷ 3 → remainder 1
3 ÷ 1 → remainder 0
GCD = 1

Useful facts
1) GCD(a, b) = GCD(b, a mod b)
2) GCD(a, b) = GCD(a, b − ka)
3) GCD(a^m − 1, a^n − 1) = a^GCD(m,n) − 1
4) For repunits: GCD(R_p, R_q) = R_GCD(p,q) where R_k is k ones.`,
      examples: [],
    },
    kk: {
      levelLabels: {
        easy: 'Жеңіл деңгей',
        medium: 'Орта деңгей',
        hard: 'Қиын деңгей',
      },
      explanation: `ЕҮОБ және Евклид алгоритмі

ЕҮОБ деген не?
Екі санның ең үлкен ортақ бөлгіші (ЕҮОБ) — екеуін де қалдықсыз бөлетін ең үлкен бүтін сан.

Мысал: ЕҮОБ(6, 4)
6-ның бөлгіштері → 1, 2, 3, 6
4-тің бөлгіштері → 1, 2, 4
Ортақтары → 1, 2
Ең үлкені → 2
ЕҮОБ(6, 4) = 2

Евклид алгоритмі
Үлкен санды кішіге бөлеміз → қалдық аламыз.
Кіші сан мен қалдықты қайта бөлеміз.
Қалдық 0 болғанша қайталаймыз.
Соңғы нөл емес бөлгіш — ЕҮОБ.

Пайдалы формулалар
1) ЕҮОБ(a, b) = ЕҮОБ(b, a mod b)
2) ЕҮОБ(a^m − 1, a^n − 1) = a^ЕҮОБ(m,n) − 1
3) Бірліктерден тұратын сандар үшін: ЕҮОБ(R_p, R_q) = R_ЕҮОБ(p,q)`,
      examples: [],
    },
  },

  divisibility: {
    en: {
      levelLabels: {
        easy: 'Easy level',
        medium: 'Medium level',
        hard: 'Hard level',
      },
      explanation: `TOPIC: DIVISIBILITY AND REMAINDERS

Divisibility means one natural number divides another without remainder. Formally: b|a if a = b·k for some integer k.

Key ideas:
• Prime: divisible only by 1 and itself (2, 3, 5, 7…).
• Composite: has other divisors (4, 6, 9, 420…).
• Prime factorization: writing a number as a product of primes (e.g. 12 = 2²·3).

Basic divisibility rules:
• By 2: last digit even.
• By 3: sum of digits divisible by 3.
• By 5: ends in 0 or 5.
• By 10: ends in 0.

Congruence: n ≡ x (mod m) means x is the remainder when n is divided by m.

Example 420: even → divisible by 2; digit sum 6 → by 3; factorization 420 = 2²·3·5·7.`,
      examples: [
        {
          text: 'Example. Is 2⁸·3⁴·7²·45² divisible by 343?',
          solution:
            'No: 343 = 7³, but the factorization has only 7² (45² introduces no extra 7 to reach 7³).',
        },
      ],
    },
    kk: {
      levelLabels: {
        easy: 'Жеңіл деңгей',
        medium: 'Орта деңгей',
        hard: 'Қиын деңгей',
      },
      explanation: `ТАҚЫРЫП: БӨЛІНГІШТІК ЖӘНЕ ҚАЛЫҚ

Бөлінгіштік — бүтін сан екіншісін қалдықсыз бөлетіндігі. Формально: b|a, егер a = b·k болса.

Негізгі ұғымдар:
• Жай сан: тек 1 және өзіне бөлінеді.
• Құрама сан: басқа бөлгіштері бар.
• Жай көбейткіштерге жіктеу.

Негізгі ережелер:
• 2-ге: соңғы цифр жұп.
• 3-ке: цифрлар қосындысы 3-ке бөлінеді.
• 5-ке: 0 немесе 5-ке аяқталады.
• 10-ға: 0-мен аяқталады.

Салыстыру: n ≡ x (mod m) — n-ді m-ге бөледі кездегі қалдық x.

420 мысалы: жұп → 2-ге; цифрлар қосындысы 6 → 3-ке; 420 = 2²·3·5·7.`,
      examples: [
        {
          text: 'Мысал. 2⁸·3⁴·7²·45² саны 343-ке бөліне ме?',
          solution:
            'Жоқ: 343 = 7³, бірақ жіктеуде тек 7² бар (45² қосымша 7³ үшін жеткізбейді).',
        },
      ],
    },
  },

  'short-multiply': {
    en: {
      levelLabels: {
        easy: 'Level A (basic)',
        medium: 'Level B (medium)',
        hard: 'Level C (advanced)',
      },
      explanation: `Short multiplication formulas and powers

1. Power rules (a, b ≠ 0):
• a^m · a^n = a^(m+n)
• a^m / a^n = a^(m−n)
• (a^m)^n = a^(mn)
• (ab)^n = a^n b^n

2. Identities:
• (a ± b)² = a² ± 2ab + b²
• a² − b² = (a − b)(a + b)
• (a ± b)³ = a³ ± 3a²b + 3ab² ± b³
• a³ ± b³ = (a ± b)(a² ∓ ab + b²)

Examples below show solution style; problems are levels A, B, C.`,
      examples: [
        {
          text: 'Example 1. Compute: 18⁴ · 3⁷ / (27³ · 2⁵).',
          solution:
            'Prime bases: (2·3²)⁴ · 3⁷ / (3⁹ · 2⁵) = 2^(−1) · 3⁶ = 729/2.',
        },
        {
          text: 'Example 2. If x + 1/x = 4, find x³ + 1/x³.',
          solution:
            '1) x² + 1/x² = (x + 1/x)² − 2 = 14.\n2) x³ + 1/x³ = (x + 1/x)(x² − 1 + 1/x²) = 4 · 13 = 52.',
        },
      ],
    },
    kk: {
      levelLabels: {
        easy: 'A деңгей (негізгі)',
        medium: 'B деңгей (орта)',
        hard: 'C деңгей (жоғары)',
      },
      explanation: `Қысқартылған көбейту формулалары және дәрежелер

1. Дәреже қасиеттері:
• a^m · a^n = a^(m+n)
• (a^m)^n = a^(mn)
• (ab)^n = a^n b^n

2. Формулалар:
• (a ± b)² = a² ± 2ab + b²
• a² − b² = (a − b)(a + b)
• a³ ± b³ = (a ± b)(a² ∓ ab + b²)

Төмендегі мысалдар шешім үлгісін көрсетеді.`,
      examples: [
        {
          text: 'Мысал 1. Есептеңіз: 18⁴ · 3⁷ / (27³ · 2⁵).',
          solution:
            'Негіздерді жіктеу: нәтиже 2^(−1) · 3⁶ = 729/2.',
        },
        {
          text: 'Мысал 2. x + 1/x = 4 болса, x³ + 1/x³ табыңыз.',
          solution:
            'x² + 1/x² = 14; x³ + 1/x³ = (x + 1/x)(x² − 1 + 1/x²) = 4 · 13 = 52.',
        },
      ],
    },
  },

  equations: {
    en: {
      levelLabels: {
        easy: 'Level A (easy)',
        medium: 'Level B (medium)',
        hard: 'Level C (hard)',
      },
      explanation: `Chapter 3. Equations

3.1 Linear equations ax + b = 0
• If a ≠ 0: x = −b/a.
• If a = 0, b ≠ 0: no solution.
• If a = b = 0: infinitely many solutions.

3.2 Quadratic ax² + bx + c = 0, a ≠ 0
Discriminant D = b² − 4ac
• D > 0: two roots x = (−b ± √D)/(2a)
• D = 0: one root x = −b/(2a)
• D < 0: no real roots

Vieta (for x² + px + q = 0): x₁ + x₂ = −p, x₁x₂ = q.

Many equations reduce to linear/quadratic after expanding, clearing denominators, or substitution.`,
      examples: [
        {
          text: 'Example 1 (linear). 5(2x−3) = 4x + 9',
          solution: '10x − 15 = 4x + 9 → 6x = 24 → x = 4.',
        },
        {
          text: 'Example 2 (quadratic). 3x² − 5x − 2 = 0',
          solution: 'D = 49, roots x = 2 and x = −1/3.',
        },
        {
          text: 'Example 3 (rational). x/(x−2) + 3/(x+2) = 8/(x²−4)',
          solution: 'Domain x ≠ ±2. Multiply by x²−4, solve quadratic; valid root x = −7.',
        },
      ],
    },
    kk: {
      levelLabels: {
        easy: 'A деңгей (жеңіл)',
        medium: 'B деңгей (орта)',
        hard: 'C деңгей (қиын)',
      },
      explanation: `3-бөлім. Теңдеулер

3.1 Сызықтық теңдеу ax + b = 0
• a ≠ 0 болса: x = −b/a.
• a = 0, b ≠ 0: шешім жоқ.
• a = b = 0: шексіз көп шешім.

3.2 Квадраттық ax² + bx + c = 0
Дискриминант D = b² − 4ac
• D > 0: екі түбір
• D = 0: бір түбір
• D < 0: нақты түбір жоқ

Көптеген теңдеулер жақшаларды ашу, бөлгішті жою немесе алмастыру арқылы сызықтық/квадраттыққа келеді.`,
      examples: [
        {
          text: 'Мысал 1 (сызықтық). 5(2x−3) = 4x + 9',
          solution: '10x − 15 = 4x + 9 → 6x = 24 → x = 4.',
        },
        {
          text: 'Мысал 2 (квадраттық). 3x² − 5x − 2 = 0',
          solution: 'D = 49, түбірлер x = 2 және x = −1/3.',
        },
        {
          text: 'Мысал 3 (бөлшекті). x/(x−2) + 3/(x+2) = 8/(x²−4)',
          solution: 'Анықталу облысы x ≠ ±2. Квадраттық шешу; x = −7.',
        },
      ],
    },
  },

  inequalities: {
    en: {
      levelLabels: {
        easy: 'Level A (easy)',
        medium: 'Level B (medium)',
        hard: 'Level C (hard)',
      },
      explanation: `AM–GM inequality

For nonnegative reals a₁,…,aₙ:
Arithmetic mean AM = (a₁+…+aₙ)/n
Geometric mean GM = ⁿ√(a₁…aₙ)

Theorem: AM ≥ GM.
Equality iff a₁ = … = aₙ.

Cases:
n = 2: (a+b)/2 ≥ √(ab) ⇔ a+b ≥ 2√(ab)
n = 3: (a+b+c)/3 ≥ ∛(abc)

Examples show standard applications; problems are levels A, B, C.`,
      examples: [
        {
          text: 'Example 1. Minimum of x + 9/x for x > 0.',
          solution: 'AM–GM: x + 9/x ≥ 6. Equality at x = 3. Answer: 6.',
        },
        {
          text: 'Example 2. Minimum of a+b+c for a,b,c > 0 with abc = 27.',
          solution: 'AM–GM: a+b+c ≥ 3∛27 = 9. Equality at a=b=c=3.',
        },
        {
          text: 'Example 3. Minimum of 2x + 3/x² for x > 0.',
          solution: 'Write 2x = x+x; AM–GM on x, x, 3/x² gives minimum 3∛3 when x³ = 3.',
        },
        {
          text: 'Example 4. Prove a/b + b/a ≥ 2 for positive a, b.',
          solution: 'AM–GM on a/b and b/a gives mean ≥ 1, double to get ≥ 2.',
        },
      ],
    },
    kk: {
      levelLabels: {
        easy: 'A деңгей (жеңіл)',
        medium: 'B деңгей (орта)',
        hard: 'C деңгей (қиын)',
      },
      explanation: `AM–GM теңсіздігі

Теріс емес a₁,…,aₙ үшін:
Арифметикалық орта AM = (a₁+…+aₙ)/n
Геометриялық орта GM = ⁿ√(a₁…aₙ)

Теорема: AM ≥ GM.
Теңдік тек a₁ = … = aₙ болғанда.

n = 2: (a+b)/2 ≥ √(ab)
n = 3: (a+b+c)/3 ≥ ∛(abc)`,
      examples: [
        {
          text: 'Мысал 1. x > 0 үшін x + 9/x минимумы.',
          solution: 'AM–GM: x + 9/x ≥ 6. x = 3-те теңдік. Жауап: 6.',
        },
        {
          text: 'Мысал 2. abc = 27 болса a+b+c минимумы.',
          solution: 'AM–GM: a+b+c ≥ 9. a=b=c=3.',
        },
        {
          text: 'Мысал 3. x > 0 үшін 2x + 3/x² минимумы.',
          solution: '2x = x+x; x, x, 3/x² үшін AM–GM → минимум 3∛3.',
        },
        {
          text: 'Мысал 4. a,b > 0 үшін a/b + b/a ≥ 2 дәлелдеңіз.',
          solution: 'a/b және b/a үшін AM–GM.',
        },
      ],
    },
  },
};
