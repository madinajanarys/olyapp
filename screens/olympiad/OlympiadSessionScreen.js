import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { getOlympiad } from '../../data/olympiads';
import { safeBackTo } from '../../utils/navigationSafeBack';
import { useApp } from '../../context/AppContext';

const MINUTE_STEPS = [0, 15, 30, 45];
const HOURS_RANGE = [0, 1, 2, 3, 4, 5];

function formatMs(ms) {
  if (ms <= 0) return '0:00:00';
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function formatDurationMs(ms) {
  const tm = Math.max(15, Math.floor(ms / 60000));
  const hh = Math.floor(tm / 60);
  const mm = tm % 60;
  const parts = [];
  if (hh > 0) parts.push(`${hh} ч`);
  if (mm > 0) parts.push(`${mm} мин`);
  return parts.length ? parts.join(' ') : '15 мин';
}

function durationFromClock(h, m) {
  return Math.min(
    5 * 60 * 60 * 1000,
    Math.max(15 * 60 * 1000, (h * 3600 + m * 60) * 1000)
  );
}

export default function OlympiadSessionScreen({ navigation, route }) {
  const { olympiadId } = route.params;
  const olympiad = getOlympiad(olympiadId);
  const { olympiadProgress, clearOlympiadProgress } = useApp();

  const [hour, setHour] = useState(2);
  const [minute, setMinute] = useState(0);
  const hourRef = useRef(hour);
  const minuteRef = useRef(minute);
  hourRef.current = hour;
  minuteRef.current = minute;

  const [started, setStarted] = useState(false);
  const startAt = useRef(null);
  const durationMsRef = useRef(2 * 60 * 60 * 1000);
  const [left, setLeft] = useState(2 * 60 * 60 * 1000);
  const endedNav = useRef(false);

  const selectedDurationMs = durationFromClock(hour, minute);

  useEffect(() => {
    if (!started) {
      durationMsRef.current = selectedDurationMs;
      setLeft(selectedDurationMs);
    }
  }, [hour, minute, started, selectedDurationMs]);

  useEffect(() => {
    if (!olympiad || !started || startAt.current == null) return undefined;
    const id = setInterval(() => {
      const elapsed = Date.now() - startAt.current;
      setLeft(Math.max(0, durationMsRef.current - elapsed));
    }, 1000);
    return () => clearInterval(id);
  }, [olympiad, started]);

  useEffect(() => {
    if (started && left === 0 && !endedNav.current && olympiad) {
      endedNav.current = true;
      navigation.replace('OlympiadResults', { olympiadId });
    }
  }, [left, started, olympiad, olympiadId, navigation]);

  const onStart = () => {
    if (!olympiad) return;
    endedNav.current = false;
    durationMsRef.current = selectedDurationMs;
    startAt.current = Date.now();
    setLeft(selectedDurationMs);
    setStarted(true);
  };

  /** Сброс ответов + таймер с полной выбранной длительности и немедленный отсчёт (без второго Start). */
  const restartSessionFromClock = () => {
    const ms = durationFromClock(hourRef.current, minuteRef.current);
    clearOlympiadProgress(olympiadId);
    endedNav.current = false;
    durationMsRef.current = ms;
    startAt.current = Date.now();
    setLeft(ms);
    setStarted(true);
  };

  const onAgain = () => {
    const body =
      'Сбросятся ответы по этой олимпиаде, таймер начнётся заново с выбранной длительности (отсчёт сразу).';
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      if (window.confirm(`Сначала?\n\n${body}`)) restartSessionFromClock();
      return;
    }
    Alert.alert('Сначала?', body, [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Again', onPress: restartSessionFromClock },
    ]);
  };

  const onFinish = () => {
    navigation.navigate('OlympiadResults', { olympiadId });
  };

  if (!olympiad) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Олимпиада не найдена</Text>
      </SafeAreaView>
    );
  }

  const progress = olympiadProgress[olympiadId] || {};

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => safeBackTo(navigation, 'AlgebraMenu')} />
        <Text style={styles.title}>{olympiad.title}</Text>

        {!started ? (
          <View style={styles.clockBlock}>
            <Text style={styles.clockTitle}>Выберите время на олимпиаду</Text>
            <View style={styles.rowPick}>
              <Text style={styles.pickLabel}>Часы</Text>
              <View style={styles.chips}>
                {HOURS_RANGE.map((h) => (
                  <TouchableOpacity
                    key={h}
                    style={[styles.chip, hour === h && styles.chipOn]}
                    onPress={() => setHour(h)}
                  >
                    <Text style={[styles.chipText, hour === h && styles.chipTextOn]}>{h}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.rowPick}>
              <Text style={styles.pickLabel}>Минуты</Text>
              <View style={styles.chips}>
                {MINUTE_STEPS.map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.chip, minute === m && styles.chipOn]}
                    onPress={() => setMinute(m)}
                  >
                    <Text style={[styles.chipText, minute === m && styles.chipTextOn]}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Text style={styles.durationSummary}>Итого: {formatDurationMs(selectedDurationMs)}</Text>
          </View>
        ) : null}

        <View style={styles.timer}>
          <Text style={styles.timerLabel}>{started ? 'Осталось времени' : 'Таймер'}</Text>
          <Text style={styles.timerValue}>{formatMs(left)}</Text>
        </View>

        {!started ? (
          <View style={styles.startRow}>
            <TouchableOpacity style={styles.startBtn} onPress={onStart} activeOpacity={0.9}>
              <Text style={styles.startBtnText}>Start</Text>
            </TouchableOpacity>
            <Text style={styles.goodLuck}>Good luck!</Text>
          </View>
        ) : (
          <View style={styles.afterStart}>
            <TouchableOpacity style={styles.againBtn} onPress={onAgain}>
              <Text style={styles.againBtnText}>Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finishBtn} onPress={onFinish}>
              <Text style={styles.finishBtnText}>Завершить и итоги</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>Как решать</Text>
          <Text style={styles.calloutBody}>
            Откройте задачу после Start. Введите ответ и нажмите «Проверить ответ»; в конце нажмите
            «Завершить и итоги» или дождитесь конца времени — появится процент и список задач.
          </Text>
        </View>

        <Text style={styles.h2}>Задачи</Text>
        {olympiad.problems.map((p, i) => {
          const st = progress[p.id];
          let mark = '';
          if (st?.answerCorrect === true) mark = '✓ ';
          else if (st?.answerCorrect === false) mark = '✗ ';
          return (
            <TouchableOpacity
              key={p.id}
              style={[styles.row, !started && styles.rowDisabled]}
              onPress={() => {
                if (!started) {
                  Alert.alert('Олимпиада', 'Сначала нажмите Start и выберите время выше.');
                  return;
                }
                navigation.navigate('OlympiadProblem', {
                  olympiadId: olympiad.id,
                  problemId: p.id,
                });
              }}
            >
              <View style={styles.num}>
                <Text style={styles.numText}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.preview} numberOfLines={2}>
                  {mark}
                  {p.shortLabel ? `${p.shortLabel}. ` : ''}
                  {p.text}
                </Text>
              </View>
              <Text style={styles.chev}>›</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  clockBlock: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    backgroundColor: '#f8fafc',
  },
  clockTitle: { fontSize: 16, fontWeight: '800', marginBottom: 10, color: '#0f172a' },
  rowPick: { marginBottom: 10 },
  pickLabel: { fontSize: 13, color: '#64748b', marginBottom: 6, fontWeight: '700' },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },
  chipOn: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  chipText: { fontWeight: '700', color: '#334155' },
  chipTextOn: { color: '#1e40af' },
  durationSummary: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginTop: 6 },
  timer: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  timerLabel: { color: '#94a3b8', fontSize: 13, marginBottom: 4 },
  timerValue: { color: '#fff', fontSize: 28, fontWeight: '800', fontVariant: ['tabular-nums'] },
  startRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  startBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 12,
  },
  startBtnText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  goodLuck: { fontSize: 18, fontWeight: '800', color: '#16a34a', flex: 1 },
  afterStart: { marginBottom: 14 },
  againBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#64748b',
    backgroundColor: '#f1f5f9',
  },
  againBtnText: { fontWeight: '800', color: '#334155', fontSize: 16 },
  finishBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e40af',
    marginTop: 8,
  },
  finishBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  callout: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  calloutTitle: { fontSize: 16, fontWeight: '700', color: '#1e3a8a', marginBottom: 4 },
  calloutBody: { fontSize: 14, color: '#1e40af', lineHeight: 20 },
  h2: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#111' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  rowDisabled: { opacity: 0.45 },
  num: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  numText: { color: '#000', fontWeight: '800' },
  preview: { fontSize: 14, color: '#000', fontWeight: '600' },
  chev: { fontSize: 20, color: '#000', marginLeft: 6 },
});
