import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import SelfAssessmentRubric from '../../components/SelfAssessmentRubric';
import { getOlympiad, mockAiScore } from '../../data/olympiads';
import { useApp } from '../../context/AppContext';
import { matchesAnyCorrectAnswer } from '../../utils/answerCheck';
import { safeBackTo } from '../../utils/navigationSafeBack';

export default function OlympiadProblemScreen({ navigation, route }) {
  const { olympiadId, problemId } = route.params;
  const olympiad = getOlympiad(olympiadId);
  const problem = olympiad?.problems.find((p) => p.id === problemId);
  const { recordOlympiadScore, recordOlympiadAnswerCheck } = useApp();

  const [text, setText] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [showSample, setShowSample] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [rubricMode, setRubricMode] = useState('none');

  if (!problem) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Задача не найдена</Text>
      </SafeAreaView>
    );
  }

  const hasAutoCheck = Array.isArray(problem.correctAnswers) && problem.correctAnswers.length > 0;

  const runAi = () => {
    const r = mockAiScore(text);
    setAiResult(r);
  };

  const onCheckAnswer = () => {
    if (!hasAutoCheck) {
      setCheckResult('no_auto');
      return;
    }
    const ok = matchesAnyCorrectAnswer(answerInput, problem.correctAnswers);
    recordOlympiadAnswerCheck(olympiadId, problemId, ok);
    setCheckResult(ok ? 'correct' : 'wrong');
  };

  const onRubric = (score) => {
    recordOlympiadScore(olympiadId, problemId, score, aiResult?.score ?? null);
    navigation.goBack();
  };

  const onChangeAnswer = (t) => {
    setAnswerInput(t);
    if (checkResult != null) setCheckResult(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <BackButton
            onPress={() =>
              safeBackTo(navigation, 'OlympiadSession', { olympiadId })
            }
          />
          <Text style={styles.task}>{problem.text}</Text>

          {hasAutoCheck ? (
            <>
              <Text style={styles.label}>Ответ для проверки</Text>
              <TextInput
                style={styles.answerInput}
                value={answerInput}
                onChangeText={onChangeAnswer}
                placeholder="Например: 405 или 2√2+2"
                placeholderTextColor="#94a3b8"
              />
              <TouchableOpacity style={styles.checkBtn} onPress={onCheckAnswer}>
                <Text style={styles.checkBtnText}>Проверить ответ</Text>
              </TouchableOpacity>
              {checkResult === 'correct' ? (
                <View style={styles.okBox}>
                  <Text style={styles.okTitle}>Верно</Text>
                </View>
              ) : null}
              {checkResult === 'wrong' ? (
                <View style={styles.badBox}>
                  <Text style={styles.badTitle}>Неверно — смотрите разбор ниже</Text>
                </View>
              ) : null}
            </>
          ) : null}

          <Text style={styles.label}>Развёрнутое решение (по желанию)</Text>
          <TextInput
            style={styles.input}
            multiline
            value={text}
            onChangeText={setText}
            placeholder="Пишите ход решения — для заглушки ИИ"
            placeholderTextColor="#94a3b8"
          />

          <TouchableOpacity style={styles.aiBtn} onPress={runAi}>
            <Text style={styles.aiBtnText}>Получить оценку ИИ (0–7, заглушка)</Text>
          </TouchableOpacity>
          {aiResult ? (
            <View style={styles.aiBox}>
              <Text style={styles.aiScore}>Баллы: {aiResult.score} / 7</Text>
              <Text style={styles.aiNote}>{aiResult.note}</Text>
            </View>
          ) : null}

          {rubricMode === 'none' ? (
            <>
              <TouchableOpacity style={styles.secondary} onPress={() => setRubricMode('own')}>
                <Text style={styles.secondaryText}>Оценить своё решение</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outline} onPress={() => setShowSample(true)}>
                <Text style={styles.outlineText}>Посмотреть решение</Text>
              </TouchableOpacity>
            </>
          ) : null}

          {showSample && rubricMode === 'none' ? (
            <View style={styles.solBox}>
              <Text style={styles.solTitle}>Образец решения</Text>
              <Text style={styles.solBody}>{problem.solution}</Text>
              <TouchableOpacity style={styles.secondary} onPress={() => setRubricMode('after')}>
                <Text style={styles.secondaryText}>Оценить после просмотра</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {rubricMode === 'own' ? (
            <SelfAssessmentRubric title="Самооценка" onSelect={onRubric} />
          ) : null}

          {rubricMode === 'after' && showSample ? (
            <View style={styles.solBox}>
              <Text style={styles.solTitle}>Образец решения</Text>
              <Text style={styles.solBody}>{problem.solution}</Text>
              <SelfAssessmentRubric title="Самооценка после просмотра" onSelect={onRubric} />
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 40 },
  task: { fontSize: 17, fontWeight: '600', color: '#0f172a', lineHeight: 24, marginBottom: 12 },
  label: { fontSize: 14, color: '#64748b', marginBottom: 6 },
  answerInput: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    color: '#0f172a',
  },
  checkBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#14532d',
  },
  checkBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  okBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'hsl(142, 50%, 94%)',
    borderWidth: 1,
    borderColor: 'hsl(142, 50%, 36%)',
    marginBottom: 12,
  },
  okTitle: { fontSize: 16, fontWeight: '800', color: 'hsl(142, 50%, 22%)' },
  badBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
    marginBottom: 12,
  },
  badTitle: { fontSize: 15, fontWeight: '800', color: '#9a3412' },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 15,
    marginBottom: 10,
  },
  aiBtn: { backgroundColor: '#0f172a', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  aiBtnText: { color: '#fff', fontWeight: '700' },
  aiBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 10, marginBottom: 12 },
  aiScore: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  aiNote: { fontSize: 14, color: '#475569', marginTop: 4 },
  secondary: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryText: { color: '#3730a3', fontWeight: '700' },
  outline: {
    borderWidth: 2,
    borderColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  outlineText: { color: '#2563eb', fontWeight: '700' },
  solBox: {
    padding: 14,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  solTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  solBody: { fontSize: 15, color: '#334155', lineHeight: 22 },
});
