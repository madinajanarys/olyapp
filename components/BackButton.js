import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

/** Кнопка «назад»: стрелка влево, слева сверху */
export default function BackButton({ onPress, label }) {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress} accessibilityRole="button" hitSlop={12}>
      <View style={styles.row}>
        <Text style={styles.arrow}>←</Text>
        {label ? <Text style={styles.text}>{label}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 28,
    color: '#111',
    fontWeight: '600',
    paddingRight: 4,
  },
  text: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
});
