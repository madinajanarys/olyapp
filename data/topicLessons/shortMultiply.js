/** ФСУ и степени */

export const shortMultiplyLesson = {
  levelLabels: {
    easy: 'Уровень A (базовый)',
    medium: 'Уровень B (средний)',
    hard: 'Уровень C (высокий)',
  },
  explanation: `ФСУ — степень и формулы сокращённого умножения

Теоретическая справка

1. Свойства степеней (a, b ≠ 0; m, n — целые):
• a^m · a^n = a^(m+n)
• a^m / a^n = a^(m−n)
• (a^m)^n = a^(mn)
• (ab)^n = a^n b^n
• (a/b)^n = a^n / b^n

2. Формулы сокращённого умножения (ФСУ):
• (a ± b)² = a² ± 2ab + b²
• a² − b² = (a − b)(a + b)
• (a ± b)³ = a³ ± 3a²b + 3ab² ± b³
• a³ ± b³ = (a ± b)(a² ∓ ab + b²)

Ниже в блоке «Примеры» — образцы оформления решений. Задачи идут по уровням A, B, C.`,
  examples: [
    {
      text: 'Пример 1. Вычислить: 18⁴ · 3⁷ / (27³ · 2⁵).',
      solution:
        'Приводим к простым множителям: (2·3²)⁴ · 3⁷ / ((3³)³ · 2⁵) = 2⁴ · 3⁸ · 3⁷ / (3⁹ · 2⁵) = 2^(−1) · 3⁶ = 729/2.',
    },
    {
      text: 'Пример 2. Известно, что x + 1/x = 4. Найти x³ + 1/x³.',
      solution:
        '1) x² + 1/x² = (x + 1/x)² − 2 = 16 − 2 = 14.\n2) x³ + 1/x³ = (x + 1/x)(x² − 1 + 1/x²) = 4 · (14 − 1) = 52.',
    },
  ],
  problems: {
    easy: [
      {
        id: 'sm-a1',
        difficulty: 'easy',
        text: 'A1. Упростите: (3a − 2b)² − (3a + 2b)².',
        solution:
          '−24ab. Разность квадратов: (3a−2b−3a−2b)(3a−2b+3a+2b) = (−4b)(6a) = −24ab.',
        correctAnswers: ['-24ab', '−24ab'],
      },
      {
        id: 'sm-a2',
        difficulty: 'easy',
        text: 'A2. Вычислите: 2¹⁰ · 3⁸ / 6⁸.',
        solution: '6⁸ = (2·3)⁸ = 2⁸·3⁸. Дробь = 2^(10−8) · 3^(8−8) = 2² = 4.',
        correctAnswers: ['4'],
      },
      {
        id: 'sm-a3',
        difficulty: 'easy',
        text: 'A3. Решите уравнение: (x−3)(x+3) = (2x−1)² − 3x².',
        solution:
          'x² − 9 = 4x² − 4x + 1 − 3x² ⇒ x² − 9 = x² − 4x + 1 ⇒ 4x = 10 ⇒ x = 2,5.',
        correctAnswers: ['2.5', '2,5', '5/2'],
      },
      {
        id: 'sm-a4',
        difficulty: 'easy',
        text: 'A4. Сравните: 2019 · 2021 и 2020².',
        solution:
          '2019·2021 = (2020−1)(2020+1) = 2020² − 1 < 2020². Больше выражение 2020².',
        correctAnswers: ['2020^2', '2020²', 'второе', 'больше2020'],
      },
      {
        id: 'sm-a5',
        difficulty: 'easy',
        text: 'A5. Найдите значение (3³)² · 3⁵ / 3¹⁰.',
        solution: '3⁶ · 3⁵ / 3¹⁰ = 3¹¹ / 3¹⁰ = 3.',
        correctAnswers: ['3'],
      },
    ],
    medium: [
      {
        id: 'sm-b1',
        difficulty: 'medium',
        text:
          'B1. Вычислите: (1 − 1/2²)(1 − 1/3²)…(1 − 1/100²).',
        solution:
          'Каждый множитель: 1 − 1/n² = (n−1)(n+1)/n². Телескопическая перемножение даёт 101/200.',
        correctAnswers: ['101/200', '0.505'],
      },
      {
        id: 'sm-b2',
        difficulty: 'medium',
        text: 'B2. Известно, что a + 1/a = 5. Найдите a⁴ + 1/a⁴.',
        solution:
          'a²+1/a² = 25−2 = 23; a⁴+1/a⁴ = 23² − 2 = 527.',
        correctAnswers: ['527'],
      },
      {
        id: 'sm-b3',
        difficulty: 'medium',
        text: 'B3. Докажите, что 36³ + 24³ не делится на 125.',
        solution:
          '36³+24³ = (36+24)(36²−36·24+24²) = 60·1008. Делится на 30, но не на 125 = 5³.',
        correctAnswers: null,
      },
      {
        id: 'sm-b4',
        difficulty: 'medium',
        text:
          'B4. Упростите: (m+2)(m² − 2m + 4)(m³ − 8) + 64.',
        solution:
          '(m+2)(m²−2m+4)=m³+8; (m³+8)(m³−8)+64 = m⁶−64+64 = m⁶.',
        correctAnswers: ['m^6', 'm⁶'],
      },
    ],
    hard: [
      {
        id: 'sm-c1',
        difficulty: 'hard',
        text: 'C1. Известно, что x² − 3x + 1 = 0. Найдите x³ + 1/x³.',
        solution:
          'Для x≠0: делим уравнение на x ⇒ x + 1/x = 3; x²+1/x² = 9−2 = 7; x³+1/x³ = (x+1/x)(x²−1+1/x²) = 3·6 = 18.',
        correctAnswers: ['18'],
      },
      {
        id: 'sm-c2',
        difficulty: 'hard',
        text:
          'C2. Докажите, что для любого целого n число n(n+1)(n+2)(n+3) + 1 — точный квадрат.',
        solution:
          'Пусть t = n²+3n. Тогда n(n+3)·(n+1)(n+2)+1 = t(t+2)+1 = (t+1)² = (n²+3n+1)².',
        correctAnswers: null,
      },
      {
        id: 'sm-c3',
        difficulty: 'hard',
        text:
          'C3. Представьте √(7 + 4√3) в виде a + b√d с целыми a, b и квадратным d.',
        solution:
          '7+4√3 = (2+√3)², значит √(7+4√3) = 2+√3 (положительный корень).',
        correctAnswers: ['2+sqrt(3)', '2+√3', '2+корень из3'],
      },
      {
        id: 'sm-c4',
        difficulty: 'hard',
        text: 'C4. Даны x+y = 5 и xy = 3. Найдите x³ + y³.',
        solution:
          'x²+y² = 25−6 = 19; x³+y³ = (x+y)(x²−xy+y²) = 5·(19−3) = 80.',
        correctAnswers: ['80'],
      },
    ],
  },
};
