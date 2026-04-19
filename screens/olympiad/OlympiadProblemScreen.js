import React, { useMemo, useState } from 'react';
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
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedOlympiadProblem } from '../../i18n/olympiadI18n';
import { matchesAnyCorrectAnswer, formatExpectedAnswers } from '../../utils/answerCheck';
import { safeBackTo } from '../../utils/navigationSafeBack';

export default function OlympiadProblemScreen({ navigation, route }) {
  const { olympiadId, problemId } = route.params;
  const { t, currentLang } = useLanguage();
  const olympiad = getOlympiad(olympiadId);
  const baseProblem = olympiad?.problems.find((p) => p.id === problemId);
  const problem = useMemo(
    () => (baseProblem ? getLocalizedOlympiadProblem(baseProblem, currentLang) : null),
    [baseProblem, currentLang]
  );
  const { recordOlympiadScore, recordOlympiadAnswerCheck } = useApp();

  const [text, setText] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [showSample, setShowSample] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [rubricMode, setRubricMode] = useState('none');

  const hasAutoCheck =
    problem && Array.isArray(problem.correctAnswers) && problem.correctAnswers.length > 0;

  const runAi = () => {
    const r = mockAiScore(text);
    setAiResult(r);
  };

  const onCheckAnswer = () => {
    if (!problem || !hasAutoCheck) {
      setCheckResult('no_auto');
      return;
    }
    const match = matchesAnyCorrectAnswer(answerInput, problem.correctAnswers);
    if (match === null) {
      setCheckResult('no_auto');
      return;
    }
    recordOlympiadAnswerCheck(olympiadId, problemId, match);
    setCheckResult(match ? 'correct' : 'wrong');
  };

  const onRubric = (score) => {
    recordOlympiadScore(olympiadId, problemId, score, aiResult?.score ?? null);
    navigation.goBack();
  };

  const onChangeAnswer = (txt) => {
    setAnswerInput(txt);
    if (checkResult != null) setCheckResult(null);
  };

  if (!problem) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <BackButton
          onPress={() => safeBackTo(navigation, 'OlympiadSession', { olympiadId })}
        />
        <Text style={styles.task}>{t('olympProblemNotFound')}</Text>
      </SafeAreaView>
    );
  }

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

          <Text style={styles.label}>{t('olympProblemLabelAnswer')}</Text>
          <TextInput
            style={styles.answerInput}
            value={answerInput}
            onChangeText={onChangeAnswer}
            placeholder={
              hasAutoCheck ? t('olympProblemCheckPlaceholder') : t('olympProblemCheckPlaceholderNoAuto')
            }
            placeholderTextColor="#94a3b8"
            editable={hasAutoCheck}
          />
          <TouchableOpacity
            style={[styles.checkBtn, !hasAutoCheck && styles.checkBtnMuted]}
            onPress={onCheckAnswer}
          >
            <Text style={styles.checkBtnText}>{t('topicProblemCheck')}</Text>
          </TouchableOpacity>
          {checkResult === 'correct' ? (
            <View style={styles.okBox}>
              <Text style={styles.okTitle}>{t('topicProblemOkTitle')}</Text>
              <Text style={styles.okBody}>{t('topicProblemOkBody')}</Text>
            </View>
          ) : null}
          {checkResult === 'wrong' ? (
            <View style={styles.badBox}>
              <Text style={styles.badTitle}>{t('topicProblemWrongTitle')}</Text>
              <Text style={styles.badLead}>
                {t('topicProblemWrongLead')} {formatExpectedAnswers(problem.correctAnswers)}
              </Text>
              <Text style={styles.badHint}>{t('olympProblemWrongHint')}</Text>
            </View>
          ) : null}
          {checkResult === 'no_auto' ? (
            <View style={styles.hintBox}>
              <Text style={styles.hintBody}>
                {hasAutoCheck ? t('olympProblemNoAutoParse') : t('olympProblemNoAutoNone')}
              </Text>
            </View>
          ) : null}

          <Text style={styles.label}>{t('olympProblemExpanded')}</Text>
          <TextInput
            style={styles.input}
            multiline
            value={text}
            onChangeText={setText}
            placeholder={t('olympProblemExpandedPlaceholder')}
            placeholderTextColor="#94a3b8"
          />

          <TouchableOpacity style={styles.aiBtn} onPress={runAi}>
            <Text style={styles.aiBtnText}>{t('olympProblemAiBtn')}</Text>
          </TouchableOpacity>
          {aiResult ? (
            <View style={styles.aiBox}>
              <Text style={styles.aiScore}>
                {t('olympProblemAiScore')} {aiResult.score} / 7
              </Text>
              <Text style={styles.aiNote}>{t(aiResult.noteKey)}</Text>
            </View>
          ) : null}

          {rubricMode === 'none' ? (
            <>
              <TouchableOpacity style={styles.secondary} onPress={() => setRubricMode('own')}>
                <Text style={styles.secondaryText}>{t('topicProblemRateSelf')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outline} onPress={() => setShowSample(true)}>
                <Text style={styles.outlineText}>{t('topicProblemViewSolution')}</Text>
              </TouchableOpacity>
            </>
          ) : null}

          {showSample && rubricMode === 'none' ? (
            <View style={styles.solBox}>
              <Text style={styles.solTitle}>{t('olympProblemSampleTitle')}</Text>
              <Text style={styles.solBody}>{problem.solution}</Text>
              <TouchableOpacity style={styles.secondary} onPress={() => setRubricMode('after')}>
                <Text style={styles.secondaryText}>{t('topicProblemRateAfter')}</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {rubricMode === 'own' ? (
            <SelfAssessmentRubric title={t('rubricTitleOwn')} onSelect={onRubric} />
          ) : null}

          {rubricMode === 'after' && showSample ? (
            <View style={styles.solBox}>
              <Text style={styles.solTitle}>{t('olympProblemSampleTitle')}</Text>
              <Text style={styles.solBody}>{problem.solution}</Text>
              <SelfAssessmentRubric title={t('rubricTitleAfter')} onSelect={onRubric} />
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
  checkBtnMuted: {
    backgroundColor: '#94a3b8',
    borderColor: '#64748b',
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
  okBody: { fontSize: 14, color: '#14532d', marginTop: 4, lineHeight: 20 },
  badBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
    marginBottom: 12,
  },
  badTitle: { fontSize: 15, fontWeight: '800', color: '#9a3412' },
  badLead: { fontSize: 15, fontWeight: '600', color: '#0f172a', marginTop: 6, lineHeight: 22 },
  badHint: { fontSize: 14, color: '#64748b', marginTop: 8, lineHeight: 20 },
  hintBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  hintBody: { fontSize: 14, color: '#475569', lineHeight: 20 },
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
