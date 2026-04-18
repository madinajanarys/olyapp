import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/** Вложенные круги: красный — белый — красный (как «цель») */
function SolveIcon() {
  return (
    <View style={styles.solveOuter}>
      <View style={styles.solveMid}>
        <View style={styles.solveInner} />
      </View>
    </View>
  );
}

function OlympiadIcon() {
  return (
    <View style={styles.olympOuter}>
      <Text style={styles.olympPencil}>✎</Text>
    </View>
  );
}

function PetIcons() {
  return (
    <View style={styles.petCircles}>
      <View style={[styles.smallCircle, { backgroundColor: '#fff' }]}>
        <Text style={styles.petEmoji}>🐕</Text>
      </View>
      <View style={[styles.smallCircle, { backgroundColor: '#fff', marginLeft: -6 }]}>
        <Text style={styles.sprout}>🌱</Text>
      </View>
    </View>
  );
}

function ProgressIconLeft() {
  return (
    <View style={styles.chartRow}>
      <View style={[styles.chartBar, { height: 22, backgroundColor: '#ef4444' }]} />
      <View style={[styles.chartBar, { height: 32, backgroundColor: '#eab308' }]} />
      <View style={[styles.chartBar, { height: 26, backgroundColor: '#22c55e' }]} />
    </View>
  );
}

/**
 * @param {'algebra'|'solve'|'olympiad'|'pet'|'progress'} variant
 */
export default function MainMenuButton({ variant, title, onPress }) {
  const isProgress = variant === 'progress';

  const rowStyle = [styles.row, styles.rowWhite];

  const leftBlock =
    variant === 'algebra' ? null : variant === 'solve' ? (
      <SolveIcon />
    ) : variant === 'olympiad' ? (
      <OlympiadIcon />
    ) : variant === 'pet' ? (
      <PetIcons />
    ) : null;

  if (isProgress) {
    return (
      <TouchableOpacity style={rowStyle} onPress={onPress} activeOpacity={0.85}>
        <View style={styles.leftSlot}>
          <ProgressIconLeft />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.chev}>›</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={rowStyle} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.leftSlot}>{leftBlock}</View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.chev}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  rowWhite: {
    backgroundColor: '#fff',
  },
  leftSlot: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solveOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  solveMid: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  solveInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#dc2626',
  },
  olympOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  olympPencil: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  petCircles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  petEmoji: { fontSize: 18 },
  sprout: { fontSize: 16 },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    justifyContent: 'center',
  },
  chartBar: {
    width: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 2,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 8,
  },
  chev: {
    fontSize: 28,
    fontWeight: '300',
    color: '#000',
    paddingRight: 4,
  },
});
