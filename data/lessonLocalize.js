import { loc } from '../utils/localized';
import { PROBLEM_I18N } from '../i18n/problemI18n';
import { LESSON_FRAME_I18N } from '../i18n/lessonFrames';

function mapProblem(p, lang) {
  if (!p) return p;
  const patch = PROBLEM_I18N[p.id];
  let text = p.text;
  let solution = p.solution;

  if (typeof p.text === 'string' && patch) {
    if (lang === 'en' && patch.en) {
      text = patch.en.text ?? p.text;
      solution = patch.en.solution ?? p.solution;
    } else if (lang === 'kk' && patch.kk) {
      text = patch.kk.text ?? p.text;
      solution = patch.kk.solution ?? p.solution;
    }
  } else if (typeof p.text === 'object' && p.text !== null) {
    text = loc(p.text, lang);
    solution = p.solution != null ? loc(p.solution, lang) : p.solution;
  }

  return { ...p, text, solution };
}

/**
 * Урок на выбранном языке. Для ru — исходные строки из data/topicLessons.
 */
export function localizeLesson(lesson, lang, topicId) {
  if (!lesson) return null;
  if (lang === 'ru') {
    return JSON.parse(JSON.stringify(lesson));
  }

  const frame = topicId ? LESSON_FRAME_I18N[topicId] : null;
  let levelLabels = lesson.levelLabels;
  let explanation = lesson.explanation;

  if (frame && typeof lesson.explanation === 'string') {
    if (lang === 'en' && frame.en) {
      explanation = frame.en.explanation ?? lesson.explanation;
      if (frame.en.levelLabels) {
        levelLabels = {
          easy: frame.en.levelLabels.easy ?? lesson.levelLabels?.easy,
          medium: frame.en.levelLabels.medium ?? lesson.levelLabels?.medium,
          hard: frame.en.levelLabels.hard ?? lesson.levelLabels?.hard,
        };
      }
    } else if (lang === 'kk' && frame.kk) {
      explanation = frame.kk.explanation ?? lesson.explanation;
      if (frame.kk.levelLabels) {
        levelLabels = {
          easy: frame.kk.levelLabels.easy ?? lesson.levelLabels?.easy,
          medium: frame.kk.levelLabels.medium ?? lesson.levelLabels?.medium,
          hard: frame.kk.levelLabels.hard ?? lesson.levelLabels?.hard,
        };
      }
    }
  } else {
    explanation = loc(lesson.explanation, lang);
    if (levelLabels) {
      levelLabels = {
        easy: loc(levelLabels.easy, lang),
        medium: loc(levelLabels.medium, lang),
        hard: loc(levelLabels.hard, lang),
      };
    }
  }

  return {
    ...lesson,
    levelLabels,
    explanation,
    examples: Array.isArray(lesson.examples)
      ? lesson.examples.map((ex, i) => {
          const exPatch = lang === 'en' ? frame?.en?.examples?.[i] : frame?.kk?.examples?.[i];
          if (exPatch) {
            return { text: exPatch.text, solution: exPatch.solution };
          }
          return {
            text: loc(ex.text, lang),
            solution: loc(ex.solution, lang),
          };
        })
      : lesson.examples,
    problems: {
      easy: (lesson.problems.easy || []).map((p) => mapProblem(p, lang)),
      medium: (lesson.problems.medium || []).map((p) => mapProblem(p, lang)),
      hard: (lesson.problems.hard || []).map((p) => mapProblem(p, lang)),
    },
  };
}
