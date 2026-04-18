import React, { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState('en');

  const t = (key) => {
    const langTranslations = translations[currentLang];
    return langTranslations && key in langTranslations
      ? langTranslations[key]
      : translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage: setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
