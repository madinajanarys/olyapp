import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../i18n/translations';
import { uiStrings } from '../i18n/uiStrings';

const LANG_STORAGE_KEY = '@olimpiad_family_app_lang';

const LanguageContext = createContext(null);

function isLangCode(v) {
  return v === 'en' || v === 'ru' || v === 'kk';
}

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLangState] = useState('en');
  const [languageReady, setLanguageReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(LANG_STORAGE_KEY);
        if (!cancelled && isLangCode(raw)) {
          setCurrentLangState(raw);
        }
      } finally {
        if (!cancelled) setLanguageReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!languageReady) return;
    AsyncStorage.setItem(LANG_STORAGE_KEY, currentLang).catch(() => {});
  }, [currentLang, languageReady]);

  const setLanguage = useCallback((lang) => {
    if (isLangCode(lang)) setCurrentLangState(lang);
  }, []);

  const t = useCallback(
    (key) => {
      const extra = uiStrings[currentLang];
      if (extra && key in extra) return extra[key];
      const langTranslations = translations[currentLang];
      if (langTranslations && key in langTranslations) return langTranslations[key];
      const fallbackExtra = uiStrings.en;
      if (fallbackExtra && key in fallbackExtra) return fallbackExtra[key];
      return translations.en[key] || key;
    },
    [currentLang]
  );

  const value = useMemo(
    () => ({
      currentLang,
      setLanguage,
      t,
      languageReady,
    }),
    [currentLang, setLanguage, t, languageReady]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
