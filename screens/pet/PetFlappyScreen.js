import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { safeBackTo } from '../../utils/navigationSafeBack';
import { speciesMeta } from '../../data/petSpeciesData';

const FPS = 30;
/** Базовый размер питомца (коллизия и отрисовка) — обозначим «x» */
const PET_BASE = 40;
const PIPE_W = 56;
const GROUND = 72;
const GRAVITY = 0.45;
const FLAP = -8.2;
const SPEED = 3.4;

/**
 * Расстояние между левыми краями соседних столбов = mult * x + PIPE_HORIZONTAL_EXTRA.
 * Цикл чуть «длиннее», чем раньше, плюс фиксированный запас — ученику проще успеть к следующему отверстию.
 */
const GAP_MULT_CYCLE = [7, 7, 7, 6, 6, 6, 5, 5, 5, 4, 4, 4];
/** Дополнительные пиксели между столбами (после mult * x) */
const PIPE_HORIZONTAL_EXTRA = 56;

function randObstacleTarget() {
  return 3 + Math.floor(Math.random() * 13);
}

export default function PetFlappyScreen({ navigation, route }) {
  const { itemId } = route.params || {};
  const { inventory, consumeInventoryItem, animalSpecies, plantSpecies } = useApp();
  const { t } = useLanguage();
  const { width: W, height: H } = useWindowDimensions();

  const item = itemId ? inventory.find((x) => x.id === itemId) : null;
  const playableH = Math.max(200, H - GROUND);
  const petEmoji = animalSpecies
    ? speciesMeta(animalSpecies).emoji
    : plantSpecies
      ? speciesMeta(plantSpecies).emoji
      : '🐾';

  /** Размер питомца «x»; для растения чуть больше из‑за «листьев» эмодзи */
  const petSize = plantSpecies ? PET_BASE + 4 : PET_BASE;
  /**
   * Высота отверстия между столбами = 4x (четыре размера питомца).
   * На очень низком экране слегка уменьшаем, чтобы щель помещалась в игровую зону.
   */
  const GAP = Math.min(4 * petSize, playableH - 24);

  const x = petSize;

  const targetTotal = useRef(randObstacleTarget());
  const cleared = useRef(0);
  const birdY = useRef(playableH * 0.45);
  const vel = useRef(0);
  const pipes = useRef([]);
  const nextPipeId = useRef(0);
  const gapMultIndex = useRef(0);
  const ended = useRef(false);
  const timerRef = useRef(null);
  const [, setFrame] = useState(0);
  const [replayToken, setReplayToken] = useState(0);
  /** null | { type: 'fail', message } | { type: 'win' } */
  const [overlay, setOverlay] = useState(null);

  const force = useCallback(() => setFrame((n) => n + 1), []);

  const spawnPipeAt = useCallback(
    (xPos) => {
      const half = GAP / 2;
      const pad = 12;
      const minGapY = half + pad;
      const maxGapY = playableH - half - pad;
      let gapY;
      if (maxGapY <= minGapY) {
        gapY = playableH / 2;
      } else {
        gapY = minGapY + Math.random() * (maxGapY - minGapY);
      }
      return {
        id: nextPipeId.current++,
        x: xPos,
        gapY,
        counted: false,
      };
    },
    [playableH, GAP]
  );

  const pushNextPipe = useCallback(() => {
    const list = pipes.current;
    const last = list[list.length - 1];
    if (!last) return;
    const mult = GAP_MULT_CYCLE[gapMultIndex.current % GAP_MULT_CYCLE.length];
    gapMultIndex.current += 1;
    const step = mult * x + PIPE_HORIZONTAL_EXTRA;
    list.push(spawnPipeAt(last.x + step));
  }, [spawnPipeAt, x]);

  const clearGameTimer = () => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const endFail = useCallback(
    (msg) => {
      if (ended.current) return;
      ended.current = true;
      clearGameTimer();
      setOverlay({ type: 'fail', message: msg });
    },
    []
  );

  const endWin = useCallback(() => {
    if (ended.current) return;
    ended.current = true;
    clearGameTimer();
    if (itemId) consumeInventoryItem(itemId);
    setOverlay({ type: 'win' });
  }, [consumeInventoryItem, itemId]);

  const restartGame = useCallback(() => {
    setOverlay(null);
    setReplayToken((t) => t + 1);
  }, []);

  useEffect(() => {
    if (!itemId || !item) {
      Alert.alert(t('petFlappyNoFoodTitle'), t('petFlappyNoFoodBody'), [
        { text: t('btnOk'), onPress: () => safeBackTo(navigation, 'PetHub') },
      ]);
    }
  }, [item, itemId, navigation, t]);

  useEffect(() => {
    if (!itemId || !item) return undefined;

    birdY.current = playableH * 0.45;
    vel.current = 0;
    cleared.current = 0;
    ended.current = false;
    setOverlay(null);
    targetTotal.current = randObstacleTarget();
    nextPipeId.current = 0;
    gapMultIndex.current = 0;
    pipes.current = [spawnPipeAt(W + 80)];

    const bx = W * 0.26;

    timerRef.current = setInterval(() => {
      if (ended.current) return;

      vel.current += GRAVITY;
      birdY.current += vel.current;

      const list = pipes.current;
      for (const p of list) {
        p.x -= SPEED;
      }

      const last = list[list.length - 1];
      if (last && last.x < W - 200) {
        pushNextPipe();
      }

      const by = birdY.current;
      if (by - x / 2 < 0 || by + x / 2 > playableH) {
        endFail(by + x / 2 > playableH ? t('petFlappyHitGround') : t('petFlappyTooHigh'));
        return;
      }

      for (const p of list) {
        const overlapX = bx + x / 2 > p.x && bx - x / 2 < p.x + PIPE_W;
        if (overlapX) {
          const topH = p.gapY - GAP / 2;
          const gapBottom = p.gapY + GAP / 2;
          if (by - x / 2 < topH || by + x / 2 > gapBottom) {
            endFail(t('petFlappyHitPipe'));
            return;
          }
        }
        if (!p.counted && p.x + PIPE_W < bx - x / 2) {
          p.counted = true;
          cleared.current += 1;
          if (cleared.current >= targetTotal.current) {
            endWin();
            return;
          }
        }
      }

      pipes.current = list.filter((p) => p.x > -PIPE_W);
      force();
    }, 1000 / FPS);

    return () => {
      clearGameTimer();
    };
  }, [
    W,
    playableH,
    itemId,
    item,
    endFail,
    endWin,
    force,
    pushNextPipe,
    spawnPipeAt,
    replayToken,
    GAP,
    x,
    t,
  ]);

  const onFlap = () => {
    if (ended.current) return;
    vel.current = FLAP;
  };

  if (!itemId || !item) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <BackButton onPress={() => safeBackTo(navigation, 'PetHub')} />
        <Text style={styles.err}>{t('petFlappyNoItem')}</Text>
      </SafeAreaView>
    );
  }

  const list = pipes.current;
  const bx = W * 0.26;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.bar}>
        <BackButton onPress={() => safeBackTo(navigation, 'PetHub')} />
        <Text style={styles.barText} numberOfLines={1}>
          {cleared.current} / {targetTotal.current}
        </Text>
      </View>

      <Pressable style={[styles.touch, { height: playableH, width: W }]} onPress={onFlap}>
        <View style={[styles.sky, { width: W, height: playableH }]}>
          {list.map((p) => (
            <React.Fragment key={p.id}>
              <View
                style={[
                  styles.pipe,
                  { left: p.x, top: 0, width: PIPE_W, height: Math.max(0, p.gapY - GAP / 2) },
                ]}
              />
              <View
                style={[
                  styles.pipe,
                  {
                    left: p.x,
                    top: p.gapY + GAP / 2,
                    width: PIPE_W,
                    height: Math.max(0, playableH - (p.gapY + GAP / 2)),
                  },
                ]}
              />
            </React.Fragment>
          ))}
          <Text
            style={[
              styles.pet,
              animalSpecies === 'dog' ? styles.petDogFaceRight : null,
              {
                left: bx - x / 2,
                top: birdY.current - x / 2,
                width: x,
                height: x,
                lineHeight: x,
                fontSize: plantSpecies ? 36 : 34,
              },
            ]}
          >
            {petEmoji}
          </Text>
        </View>
      </Pressable>

      <View style={[styles.ground, { width: W, height: GROUND }]}>
        <Text style={styles.groundHint}>{t('petFlappyTapJump')}</Text>
      </View>

      {overlay?.type === 'fail' ? (
        <View style={styles.overlay} pointerEvents="box-none">
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitle}>{t('petFlappyFailTitle')}</Text>
            <Text style={styles.overlayMsg}>{overlay.message}</Text>
            <Pressable style={styles.btnAgain} onPress={restartGame}>
              <Text style={styles.btnAgainText}>{t('petFlappyAgain')}</Text>
            </Pressable>
            <Pressable style={styles.btnBack} onPress={() => safeBackTo(navigation, 'PetHub')}>
              <Text style={styles.btnBackText}>{t('petBackBtn')}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {overlay?.type === 'win' ? (
        <View style={styles.overlay} pointerEvents="box-none">
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitle}>{t('petFlappyWinTitle')}</Text>
            <Text style={styles.overlayMsg}>{t('petFlappyWinMsg')}</Text>
            <Pressable style={styles.btnAgain} onPress={() => navigation.navigate('PetHub')}>
              <Text style={styles.btnAgainText}>{t('btnOk')}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#7dd3fc' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 6,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  barText: { flex: 1, fontSize: 16, fontWeight: '800', color: '#111', marginLeft: 4 },
  touch: { backgroundColor: '#7dd3fc' },
  sky: { position: 'relative', overflow: 'hidden', backgroundColor: '#7dd3fc' },
  pipe: {
    position: 'absolute',
    backgroundColor: '#15803d',
    borderWidth: 2,
    borderColor: '#14532d',
  },
  pet: {
    position: 'absolute',
    textAlign: 'center',
  },
  /** Собака 🐕 по умолчанию «смотрит» влево — отражаем, чтобы смотрела вправо (по ходу полёта). */
  petDogFaceRight: {
    transform: [{ scaleX: -1 }],
  },
  ground: {
    backgroundColor: '#92400e',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 3,
    borderColor: '#451a03',
  },
  groundHint: { color: '#fef3c7', fontWeight: '700', fontSize: 13, paddingHorizontal: 12 },
  err: { padding: 20, fontSize: 16 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  overlayCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#000',
    padding: 20,
    width: '100%',
    maxWidth: 320,
    alignItems: 'stretch',
  },
  overlayTitle: { fontSize: 20, fontWeight: '900', color: '#0f172a', marginBottom: 8, textAlign: 'center' },
  overlayMsg: { fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 16, textAlign: 'center' },
  btnAgain: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  btnAgainText: { color: '#fff', fontWeight: '900', fontSize: 17 },
  btnBack: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#64748b',
  },
  btnBackText: { color: '#334155', fontWeight: '800', fontSize: 16 },
});
