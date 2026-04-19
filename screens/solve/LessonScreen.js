import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { getTopicLesson, topicTitle } from '../../data/algebraTopics';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { safeBackTo } from '../../utils/navigationSafeBack';

/** HSL ~50% saturation: зелёный +7, жёлтый +5/+3, красный 0–1 */
function rowStylesForRubric(score) {
  if (score === 7) {
    return { row: styles.taskRowGreen, badge: styles.badgeGreen, text: styles.taskPreviewTone, chev: styles.chevTone };
  }
  if (score === 5 || score === 3) {
    return { row: styles.taskRowYellow, badge: styles.badgeYellow, text: styles.taskPreviewTone, chev: styles.chevTone };
  }
  if (score === 0 || score === 1) {
    return { row: styles.taskRowRed, badge: styles.badgeRed, text: styles.taskPreviewTone, chev: styles.chevTone };
  }
  return { row: styles.taskRow, badge: styles.badge, text: styles.taskPreview, chev: styles.chev };
}

const LEVEL_KEYS = ['easy', 'medium', 'hard'];
const DEFAULT_LEVEL_LABELS = {
  easy: 'levelEasy',
  medium: 'levelMedium',
  hard: 'levelHard',
};

export default function LessonScreen({ navigation, route }) {
  const { topicId } = route.params;
  const { currentLang, t } = useLanguage();
  const { solvedTaskKeys } = useApp();
  const lesson = getTopicLesson(topicId, currentLang);

  const taskStyleFor = useCallback(
    (problemId) => {
      const key = `topic:${topicId}:${problemId}`;
      const prev = solvedTaskKeys[key];
      const score = prev != null ? prev.rubricScore : null;
      return rowStylesForRubric(score);
    },
    [solvedTaskKeys, topicId]
  );
  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{t('lessonNotFound')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => safeBackTo(navigation, 'AlgebraTopics')} />
        <Text style={styles.title}>{topicTitle(topicId, currentLang)}</Text>

        <Text style={styles.h2}>{t('lessonExpl')}</Text>
        <Text style={styles.body}>{lesson.explanation}</Text>

        {lesson.examples && lesson.examples.length > 0 ? (
          <>
            <Text style={styles.h2}>{t('lessonExamples')}</Text>
            {lesson.examples.map((ex, i) => (
              <View key={i} style={styles.exCard}>
                <Text style={styles.exQ}>{ex.text}</Text>
                <Text style={styles.exA}>{ex.solution}</Text>
              </View>
            ))}
          </>
        ) : null}

        <Text style={styles.h2}>{t('lessonTasks')}</Text>
        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>{t('lessonCalloutTitle')}</Text>
          <Text style={styles.calloutBody}>{t('lessonCalloutBody')}</Text>
        </View>

        {LEVEL_KEYS.map((key) => {
          const list = lesson.problems[key] || [];
          if (!list.length) return null;
          const lvLabel =
            (lesson.levelLabels && lesson.levelLabels[key]) || t(DEFAULT_LEVEL_LABELS[key]);
          return (
            <View key={key} style={styles.levelBlock}>
              <Text style={styles.levelTitle}>{lvLabel}</Text>
              {list.map((prob, idx) => {
                const rs = taskStyleFor(prob.id);
                return (
                <TouchableOpacity
                  key={prob.id}
                  style={rs.row}
                  onPress={() =>
                    navigation.navigate('TopicProblem', {
                      topicId,
                      problemId: prob.id,
                      indexInLevel: idx,
                    })
                  }
                >
                  <View style={rs.badge}>
                    <Text style={styles.badgeText}>{idx + 1}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={rs.text} numberOfLines={2}>
                      {prob.text}
                    </Text>
                    {prob.isSimple ? <Text style={styles.simpleTag}>{t('simpleTag')}</Text> : null}
                  </View>
                  <Text style={rs.chev}>›</Text>
                </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 48 },
  title: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 16 },
  h2: { fontSize: 18, fontWeight: '700', color: '#111', marginTop: 18, marginBottom: 8 },
  body: { fontSize: 15, color: '#334155', lineHeight: 22 },
  exCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  exQ: { fontSize: 15, color: '#0f172a', marginBottom: 6 },
  exA: { fontSize: 14, color: '#475569' },
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
  levelBlock: { marginBottom: 8 },
  levelTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 8, marginTop: 8 },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  taskRowGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'hsl(142, 50%, 94%)',
    borderWidth: 2,
    borderColor: 'hsl(142, 50%, 36%)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  taskRowYellow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'hsl(48, 50%, 94%)',
    borderWidth: 2,
    borderColor: 'hsl(48, 50%, 40%)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  taskRowRed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'hsl(0, 50%, 96%)',
    borderWidth: 2,
    borderColor: 'hsl(0, 50%, 42%)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  badgeGreen: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'hsl(142, 50%, 88%)',
    borderWidth: 2,
    borderColor: 'hsl(142, 50%, 36%)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  badgeYellow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'hsl(48, 50%, 88%)',
    borderWidth: 2,
    borderColor: 'hsl(48, 50%, 40%)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  badgeRed: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'hsl(0, 50%, 90%)',
    borderWidth: 2,
    borderColor: 'hsl(0, 50%, 42%)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  badgeText: { color: '#000', fontWeight: '700', fontSize: 14 },
  taskPreview: { fontSize: 15, color: '#000', fontWeight: '600' },
  taskPreviewTone: { fontSize: 15, color: '#0f172a', fontWeight: '600' },
  simpleTag: { fontSize: 12, color: '#64748b', marginTop: 4 },
  chev: { fontSize: 20, color: '#000', marginLeft: 6 },
  chevTone: { fontSize: 20, color: '#0f172a', marginLeft: 6 },
});
