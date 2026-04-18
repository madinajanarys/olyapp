/** Неравенства (AM–GM) */

export const inequalitiesLesson = {
  levelLabels: {
    easy: 'Уровень A (лёгкий)',
    medium: 'Уровень B (средний)',
    hard: 'Уровень C (сложный)',
  },
  explanation: `Теоретический материал

1) Определения
Пусть a₁, a₂, …, aₙ — неотрицательные действительные числа.

• Среднее арифметическое (AM): AM = (a₁ + a₂ + … + aₙ)/n
• Среднее геометрическое (GM): GM = ⁿ√(a₁a₂…aₙ)

2) Формулировка неравенства
Для любых неотрицательных чисел a₁, …, aₙ:
AM ≥ GM.
Равенство тогда и только тогда, когда все числа равны: a₁ = a₂ = … = aₙ.

3) Важнейшие частные случаи
Для двух чисел (n = 2): (a+b)/2 ≥ √(ab) ⟺ a+b ≥ 2√(ab).
Для трёх чисел (n = 3): (a+b+c)/3 ≥ ∛(abc) ⟺ a+b+c ≥ 3∛(abc).

В блоке «Примеры» — образцы с решениями. Задачи по уровням A, B, C — ниже.`,
  examples: [
    {
      text: 'Пример 1. Наименьшее значение x + 9/x при x > 0.',
      solution:
        'AM–GM: x + 9/x ≥ 2√(x·9/x) = 6. Равенство при x = 3. Ответ: 6.',
    },
    {
      text: 'Пример 2. Наименьшее a + b + c при a,b,c > 0 и abc = 27.',
      solution:
        'AM–GM: a+b+c ≥ 3∛(abc) = 9. Равенство при a = b = c = 3.',
    },
    {
      text: 'Пример 3. Наименьшее значение 2x + 3/x² при x > 0.',
      solution:
        'Пишем 2x = x + x и применяем AM–GM к трём числам x, x, 3/x². Минимум 3∛3 при x³ = 3.',
    },
    {
      text: 'Пример 4. Доказать: для положительных a, b выполняется a/b + b/a ≥ 2.',
      solution:
        'AM–GM к a/b и b/a: среднее арифметическое ≥ среднее геометрическое = 1, удваиваем → ≥ 2.',
    },
  ],
  problems: {
    easy: [
      {
        id: 'in-a1',
        difficulty: 'easy',
        text: 'A1. Найдите наименьшее значение выражения x + 25/x для x > 0.',
        solution:
          'x + 25/x ≥ 2√(x·25/x) = 10. Равенство при x = 5.',
        correctAnswers: ['10'],
      },
      {
        id: 'in-a2',
        difficulty: 'easy',
        text: 'A2. Найдите наименьшее значение суммы a + b, если a, b > 0 и ab = 36.',
        solution: 'a + b ≥ 2√(ab) = 12. Равенство при a = b = 6.',
        correctAnswers: ['12'],
      },
      {
        id: 'in-a3',
        difficulty: 'easy',
        text: 'A3. Найдите наибольшее значение произведения xy, если x, y > 0 и x + y = 20.',
        solution:
          'xy ≤ ((x+y)/2)² = 100. Равенство при x = y = 10.',
        correctAnswers: ['100'],
      },
      {
        id: 'in-a4',
        difficulty: 'easy',
        text: 'A4. Найдите наименьшее значение выражения 5a + 5/a для a > 0.',
        solution:
          '5(a + 1/a) ≥ 5·2 = 10. Равенство при a = 1.',
        correctAnswers: ['10'],
      },
      {
        id: 'in-a5',
        difficulty: 'easy',
        text:
          'A5. Докажите, что для любых положительных a, b выполняется a/b + b/a ≥ 2.',
        solution:
          'AM–GM к a/b и b/a: среднее геометрическое равно 1.',
        correctAnswers: null,
      },
    ],
    medium: [
      {
        id: 'in-b1',
        difficulty: 'medium',
        text:
          'B1. Найдите наименьшее значение x + 1/x + y + 1/y, если x, y > 0 и xy = 1.',
        solution:
          'По AM–GM: x+1/x ≥ 2 и y+1/y ≥ 2, сумма ≥ 4 при x = y = 1.',
        correctAnswers: ['4'],
      },
      {
        id: 'in-b2',
        difficulty: 'medium',
        text:
          'B2. Найдите наименьшее значение a/b + b/c + c/a для положительных a, b, c.',
        solution:
          'AM–GM к трём числам: ≥ 3∛((a/b)(b/c)(c/a)) = 3.',
        correctAnswers: ['3'],
      },
      {
        id: 'in-b3',
        difficulty: 'medium',
        text:
          'B3. Докажите, что для любых положительных a, b, c выполняется (a+b)(b+c)(c+a) ≥ 8abc.',
        solution:
          'a+b ≥ 2√(ab), b+c ≥ 2√(bc), c+a ≥ 2√(ca); перемножить.',
        correctAnswers: null,
      },
      {
        id: 'in-b4',
        difficulty: 'medium',
        text:
          'B4. Докажите, что для любых положительных a, b, c выполняется a² + b² + c² ≥ ab + bc + ca.',
        solution:
          'Удвоить и свернуть: 1/2·((a−b)²+(b−c)²+(c−a)²) ≥ 0.',
        correctAnswers: null,
      },
      {
        id: 'in-b5',
        difficulty: 'medium',
        text:
          'B5. Периметр прямоугольника равен 8. Какую максимальную площадь может иметь этот прямоугольник?',
        solution:
          'Пусть стороны x и y, тогда x+y=4. Площадь xy ≤ ((x+y)/2)² = 4 при x=y=2.',
        correctAnswers: ['4'],
      },
      {
        id: 'in-b6',
        difficulty: 'medium',
        text:
          'B6. Докажите, что для любого положительного a выполняется a + 1/a ≥ 2.',
        solution: 'AM–GM: a + 1/a ≥ 2√(a·1/a) = 2.',
        correctAnswers: null,
      },
      {
        id: 'in-b7',
        difficulty: 'medium',
        text: 'B7. Найдите наименьшее значение выражения x² + 1/x² для x > 0.',
        solution:
          'AM–GM: x² + 1/x² ≥ 2. Равенство при x = 1.',
        correctAnswers: ['2'],
      },
    ],
    hard: [
      {
        id: 'in-c1',
        difficulty: 'hard',
        text:
          'C1. Найдите наименьшее значение (x² + y²)/(xy) для положительных x, y.',
        solution:
          '(x²+y²)/(xy) = x/y + y/x ≥ 2. Равенство при x = y.',
        correctAnswers: ['2'],
      },
      {
        id: 'in-c2',
        difficulty: 'hard',
        text:
          'C2. Докажите неравенство Несбитта: a/(b+c) + b/(c+a) + c/(a+b) ≥ 3/2 при a,b,c > 0.',
        solution:
          'Классическое доказательство через переписывание и оценку (например, через прибавление 1 к каждой дроби и HM–AM).',
        correctAnswers: null,
      },
      {
        id: 'in-c3',
        difficulty: 'hard',
        text:
          'C3. Пусть a, b, c > 0 и abc = 27. Найдите наименьшее значение a + b + c.',
        solution: 'AM–GM: a+b+c ≥ 3∛(abc) = 9 при a=b=c=3.',
        correctAnswers: ['9'],
      },
      {
        id: 'in-c4',
        difficulty: 'hard',
        text:
          'C4. Пусть x, y, z > 0 и xyz = 1. Докажите: 1/(x³+y³+1) + 1/(y³+z³+1) + 1/(z³+x³+1) ≤ 1.',
        solution:
          'Оценка x³+y³ ≥ xy(x+y) и циклическое суммирование даёт нужную сумму дробей ≤ 1.',
        correctAnswers: null,
      },
      {
        id: 'in-c5',
        difficulty: 'hard',
        text:
          'C5. Найдите наименьшее значение 1/a + 1/b + 1/c, если a, b, c > 0 и abc = 8.',
        solution:
          'AM–GM для обратных: ≥ 3/∛(abc) = 3/2 при a=b=c=2.',
        correctAnswers: ['3/2', '1.5'],
      },
      {
        id: 'in-c6',
        difficulty: 'hard',
        text:
          'C6. Докажите, что для любых положительных a, b, c выполняется a²/b + b²/c + c²/a ≥ a + b + c.',
        solution:
          'Складываем неравенства a²/b + b ≥ 2a и циклические аналоги.',
        correctAnswers: null,
      },
      {
        id: 'in-c7',
        difficulty: 'hard',
        text:
          'C7. Найдите наименьшее значение выражения x/(y+z) + y/(z+x) + z/(x+y) для положительных x, y, z.',
        solution:
          'Это неравенство Несбитта; минимум 3/2 при x=y=z.',
        correctAnswers: ['3/2', '1.5'],
      },
      {
        id: 'in-c8',
        difficulty: 'hard',
        text:
          'C8. Докажите, что для любых положительных a, b, c выполняется a³/b + b³/c + c³/a ≥ ab + bc + ca.',
        solution:
          'Складываем a³/b + ab ≥ 2a² и использовать a²+b²+c² ≥ ab+bc+ca.',
        correctAnswers: null,
      },
    ],
  },
};
