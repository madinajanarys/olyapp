import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';

/** Порядок в списке: Eng → Рус → Қаз */
const LANG_OPTIONS = [
  { code: 'en', labelKey: 'langEng' },
  { code: 'ru', labelKey: 'langRus' },
  { code: 'kk', labelKey: 'langKaz' },
];

export default function LanguageSwitcher({ style, align = 'flex-start' }) {
  const { t, currentLang, setLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);

  const active = LANG_OPTIONS.find((o) => o.code === currentLang);
  const currentLabel = t(active ? active.labelKey : 'langEng');

  const selectLang = (code) => {
    setLanguage(code);
    setVisible(false);
  };

  return (
    <View style={[styles.row, { alignItems: align }, style]}>
      <TouchableOpacity
        style={styles.langButton}
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={currentLabel}
      >
        <Text style={styles.langButtonText}>{currentLabel}</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent} pointerEvents="box-none">
            {LANG_OPTIONS.map(({ code, labelKey }) => (
              <TouchableOpacity
                key={code}
                style={styles.modalOption}
                onPress={() => selectLang(code)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    currentLang === code && styles.modalOptionActive,
                  ]}
                >
                  {t(labelKey)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingTop: 8,
    alignSelf: 'stretch',
  },
  langButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  langButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    minWidth: 160,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalOption: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  modalOptionText: {
    fontSize: 17,
    color: '#333',
  },
  modalOptionActive: {
    color: '#2563eb',
    fontWeight: '700',
  },
});
