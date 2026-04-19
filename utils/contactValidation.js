/** Email (простая проверка) или номер телефона (от 10 цифр после очистки). */
export function isValidEmailOrPhone(value) {
  const s = String(value || '').trim();
  if (s.length < 3) return false;
  if (s.includes('@')) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }
  const digits = s.replace(/\D/g, '');
  return digits.length >= 10;
}

export function isValidPassword(value) {
  return String(value || '').trim().length >= 6;
}
