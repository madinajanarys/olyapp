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
import { useApp } from '../../context/AppContext';
import { matchesAnyCorrectAnswer } from '../../utils/answerCheck';

export default function TopicProblemScreen({ navigation, route }) {
  const { topicId, problem } = route.params;
  const { recordTaskOutcome } = useApp();
  const [answer, setAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  /** 'none' | 'own' | 'after_solution' */
  const [rubricMode, setRubricMode] = useState('none');
  /** null | 'correct' | 'wrong' | 'no_auto' */
  const [checkResult, setCheckResult] = useState(null);

  const taskKey = `topic:${topicId}:${problem.id}`;

  const onRubric = (score) => {
    recordTaskOutcome(topicId, taskKey, problem.difficulty, score);
    navigation.goBack();
  };

  const canAutoCheck =
    Array.isArray(problem.correctAnswers) && problem.correctAnswers.length > 0;

  const onChangeAnswer = (t) => {
    setAnswer(t);
    if (checkResult != null) setCheckResult(null);
  };

  const handleCheck = () => {
    if (!canAutoCheck) {
      setCheckResult('no_auto');
      return;
    }
    const ok = matchesAnyCorrectAnswer(answer, problem.correctAnswers);
    if (ok) setCheckResult('correct');
    else setCheckResult('wrong');
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
              navigation.canGoBack() ? navigation.goBack() : navigation.navigate('AlgebraMenu')
            }
          />

          <Text style={styles.task}>{problem.text}</Text>

          <Text style={styles.label}>Ваш ответ или ход решения</Text>
          <TextInput
            style={styles.input}
            multiline
            value={answer}
            onChangeText={onChangeAnswer}
            placeholder="Введите здесь"
            placeholderTextColor="#94a3b8"
          />

          <TouchableOpacity style={styles.primary} onPress={handleCheck}>
            <Text style={styles.primaryText}>Проверить ответ</Text>
          </TouchableOpacity>

          {checkResult === 'correct' ? (
            <View style={styles.okBox}>
              <Text style={styles.okTitle}>Верно</Text>
              <Text style={styles.okBody}>Ответ совпал с ожидаемым.</Text>
            </View>
          ) : null}

          {checkResult === 'wrong' ? (
            <View style={styles.wrongBox}>
              <Text style={styles.wrongTitle}>Неверно — разбор этой задачи</Text>
              <Text style={styles.wrongBody}>{problem.solution}</Text>
            </View>
          ) : null}

          {checkResult === 'no_auto' ? (
            <View style={styles.hintBox}>
              <Text style={styles.hintBody}>
                Для этой задачи нет автоматической проверки. Сравните ход с разбором кнопкой ниже
                или оцените решение по рубрике.
              </Text>
            </View>
          ) : null}

          {rubricMode === 'none' ? (
            <>
              <TouchableOpacity style={styles.secondary} onPress={() => setRubricMode('own')}>
                <Text style={styles.secondaryText}>Оценить своё решение</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.outline}
                onPress={() => {
                  setShowSolution(true);
                }}
              >
                <Text style={styles.outlineText}>Посмотреть решение</Text>
              </TouchableOpacity>
            </>
          ) : null}

          {showSolution && rubricMode === 'none' ? (
            <View style={styles.solBox}>
              <Text style={styles.solTitle}>Решение</Text>
              <Text style={styles.solBody}>{problem.solution}</Text>
              <TouchableOpacity style={styles.secondary} onPress={() => setRubricMode('after_solution')}>
                <Text style={styles.secondaryText}>Оценить после просмотра решения</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {rubricMode === 'own' ? (
            <SelfAssessmentRubric title="Самооценка (без просмотра решения)" onSelect={onRubric} />
          ) : null}

          {rubricMode === 'after_solution' && showSolution ? (
            <View style={styles.solBox}>
              <Text style={styles.solTitle}>Решение</Text>
              <Text style={styles.solBody}>{problem.solution}</Text>
              <SelfAssessmentRubric title="Самооценка после просмотра решения" onSelect={onRubric} />
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
  task: { fontSize: 17, color: '#0f172a', lineHeight: 24, marginBottom: 14, fontWeight: '600' },
  label: { fontSize: 14, color: '#64748b', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#0f172a',
    marginBottom: 12,
  },
  primary: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  okBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'hsl(142, 50%, 94%)',
    borderWidth: 1,
    borderColor: 'hsl(142, 50%, 36%)',
    marginBottom: 12,
  },
  okTitle: { fontSize: 16, fontWeight: '800', color: 'hsl(142, 50%, 22%)', marginBottom: 4 },
  okBody: { fontSize: 14, color: '#14532d', lineHeight: 20 },
  wrongBox: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
    marginBottom: 12,
  },
  wrongTitle: { fontSize: 16, fontWeight: '800', color: '#9a3412', marginBottom: 8 },
  wrongBody: { fontSize: 15, color: '#334155', lineHeight: 22 },
  hintBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  hintBody: { fontSize: 14, color: '#475569', lineHeight: 20 },
  secondary: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryText: { color: '#3730a3', fontWeight: '700', fontSize: 15 },
  outline: {
    borderWidth: 2,
    borderColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  outlineText: { color: '#2563eb', fontWeight: '700', fontSize: 15 },
  solBox: {
    marginTop: 4,
    padding: 14,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  solTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#0f172a' },
  solBody: { fontSize: 15, color: '#334155', lineHeight: 22 },
});
