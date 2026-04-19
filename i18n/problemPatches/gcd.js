/** EN/KK for gcd topic problems */
export const gcdProblemsI18n = {
  'gcd-e-a': {
    en: {
      text: 'Problem A. Find GCD(45, 13).',
      solution: '45 ÷ 13 → remainder 6; 13 ÷ 6 → remainder 1; 6 ÷ 1 → remainder 0. GCD = 1.',
    },
    kk: {
      text: 'А тапсырмасы. ЕҮОБ(45, 13) табыңыз.',
      solution: '45 ÷ 13 → қалдық 6; 13 ÷ 6 → қалдық 1; 6 ÷ 1 → қалдық 0. ЕҮОБ = 1.',
    },
  },
  'gcd-e-b': {
    en: {
      text: 'Problem B. Prove that GCD(43, 76) = 1 (show the steps).',
      solution:
        '76 ÷ 43 → remainder 33; 43 ÷ 33 → remainder 10; 33 ÷ 10 → remainder 3; 10 ÷ 3 → remainder 1; 3 ÷ 1 → remainder 0. GCD = 1.',
    },
    kk: {
      text: 'Б тапсырмасы. ЕҮОБ(43, 76) = 1 екенін дәлелдеңіз (қадамдарды көрсетіңіз).',
      solution:
        '76 ÷ 43 → қалдық 33; 43 ÷ 33 → 10; 33 ÷ 10 → 3; 10 ÷ 3 → 1; 3 ÷ 1 → 0. ЕҮОБ = 1.',
    },
  },
  'gcd-e-c': {
    en: {
      text: 'Problem C. Compute GCD(8³⁶ − 1, 8²⁴ − 1).',
      solution: 'GCD(8³⁶ − 1, 8²⁴ − 1) = 8^GCD(36,24) − 1 = 8¹² − 1.',
    },
    kk: {
      text: 'В тапсырмасы. ЕҮОБ(8³⁶ − 1, 8²⁴ − 1) есептеңіз.',
      solution: 'ЕҮОБ(8³⁶ − 1, 8²⁴ − 1) = 8^ЕҮОБ(36,24) − 1 = 8¹² − 1.',
    },
  },
  'gcd-m-1': {
    en: {
      text: 'Problem 1. Find GCD(3m + 17, m + 8).',
      solution:
        'Subtract 3 times the second from the first: 3m+17 − 3(m+8) = −7. Hence GCD(3m+17, m+8) = GCD(m+8, 7). Since 7 is prime, GCD is 1 unless 7 | (m+8), i.e. m ≡ 6 (mod 7); then GCD can be 7.',
    },
    kk: {
      text: '1-тапсырма. ЕҮОБ(3m + 17, m + 8) табыңыз.',
      solution:
        'Біріншіден екіншінің 3 есесін азайтамыз: қалдық 7-ге қатысты. ЕҮОБ(m+8, 7). 7 жай сан, сондықтан m ≡ 6 (mod 7) болмаса ЕҮОБ = 1, әйтпесе 7 болуы мүмкін.',
    },
  },
  'gcd-m-2': {
    en: {
      text:
        'Problem 2. Prove that (k + 5)/(2k + 11) is in lowest terms for every integer k (except when the denominator is 0).',
      solution:
        'Let d = GCD(k+5, 2k+11). Then d divides 2k+11 − 2(k+5) = 1, so d = 1 whenever 2k+11 ≠ 0. The fraction is irreducible.',
    },
    kk: {
      text:
        '2-тапсырма. k бүтін үшін (ауытқу 0 емес болса) (k + 5)/(2k + 11) бөлшегі қысқартылмайтынын дәлелдеңіз.',
      solution:
        'd = ЕҮОБ(k+5, 2k+11) болса, d | 1, сондықтан d = 1. Бөлшек несократима.',
    },
  },
  'gcd-m-3': {
    en: {
      text: 'Problem 3. Compute GCD(3⁸⁰ − 1, 3¹⁰⁰ − 1).',
      solution: 'GCD = 3^GCD(80,100) − 1 = 3²⁰ − 1.',
    },
    kk: {
      text: '3-тапсырма. ЕҮОБ(3⁸⁰ − 1, 3¹⁰⁰ − 1) есептеңіз.',
      solution: 'ЕҮОБ = 3^ЕҮОБ(80,100) − 1 = 3²⁰ − 1.',
    },
  },
  'gcd-m-4': {
    en: {
      text: 'Problem 4. Find the GCD of the 90-digit repunit and the 50-digit repunit.',
      solution: 'GCD(R₉₀, R₅₀) = R_GCD(90,50) = R₁₀ — the number with 10 ones.',
    },
    kk: {
      text: '4-тапсырма. 90 бірліктен және 50 бірліктен тұратын сандардың ЕҮОБ-ын табыңыз.',
      solution: 'ЕҮОБ(R₉₀, R₅₀) = R_ЕҮОБ(90,50) = R₁₀ — 10 бірліктен тұратын сан.',
    },
  },
  'gcd-h-1': {
    en: {
      text:
        'Problem 5. Find all possible values of GCD(7a + 11, 3a + 5). When is this GCD > 1?',
      solution:
        'Let d = GCD(7a+11, 3a+5). Then d | (7(3a+5) − 3(7a+11)) = 2, so d ∈ {1, 2}. GCD = 2 for odd a when both numbers are even; for even a both are odd and GCD = 1.',
    },
    kk: {
      text: '5-тапсырма. ЕҮОБ(7a + 11, 3a + 5) мүмкін мәндері. Қашан ЕҮОБ > 1?',
      solution:
        'd тек 2-ні бөлгіші болуы мүмкін: d ∈ {1, 2}. a тақ болса екеуі жұп, ЕҮОБ = 2; a жұп болса ЕҮОБ = 1.',
    },
  },
  'gcd-h-2': {
    en: {
      text: 'Problem 6. Compute LCM(5⁴⁸ − 1, 5⁷² − 1, 5¹²⁰ − 1).',
      solution: 'For numbers a^k−1: LCM(a^m−1, a^n−1) = a^LCM(m,n)−1. LCM(48,72,120) = 720. Answer: 5⁷²⁰ − 1.',
    },
    kk: {
      text: '6-тапсырма. ЕХОБ(5⁴⁸ − 1, 5⁷² − 1, 5¹²⁰ − 1) есептеңіз.',
      solution: 'ЕХОБ(5^m−1, ...) = 5^ЕХОБ(m,n)−1. ЕХОБ(48,72,120) = 720. Жауап: 5⁷²⁰ − 1.',
    },
  },
  'gcd-h-3': {
    en: {
      text:
        'Problem 7. Prove GCD(n² + n + 1, n − 1) is 1 or 3. For which n is it 3?',
      solution:
        'Divide: n²+n+1 = (n+2)(n−1) + 3, so GCD(n²+n+1, n−1) = GCD(n−1, 3) ∈ {1,3}. It is 3 when n ≡ 1 (mod 3).',
    },
    kk: {
      text: '7-тапсырма. ЕҮОБ(n² + n + 1, n − 1) 1 немесе 3 екенін дәлелдеңіз. Қашан 3?',
      solution: 'ЕҮОБ(n−1, 3) ∈ {1, 3}. n ≡ 1 (mod 3) болса ЕҮОБ = 3.',
    },
  },
  'gcd-h-4': {
    en: {
      text:
        'Problem. Find GCD of the number with 105 nines and the number with 84 threes.',
      solution:
        'R_k = repunit of k ones; 10^k−1 = 9R_k. GCD(9R₁₀₅, 3R₈₄) relates to GCD(R₁₀₅,R₈₄)=R₂₁; final GCD is 3·R₂₁ (21 threes in a row).',
    },
    kk: {
      text: 'Тапсырма. 105 тоғыздан және 84 үшінен тұратын сандардың ЕҮОБ-ы.',
      solution:
        'Бірліктер саны R_k; GCD(R₁₀₅, R₈₄) = R₂₁. Соңғы жауап: 3·R₂₁ түрінде.',
    },
  },
};
