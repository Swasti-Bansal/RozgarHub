// src/context/TranslationContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

// ── Export the raw context so other files import THIS, not useTranslation ──
export const TranslationContext_INTERNAL = createContext({
  currentLang: 'en',
  switchLanguage: () => {},
  isTranslating: false,
  LANGUAGES: [],
});

export const _cache = {};

export const LANGUAGES = [
  { code: 'en', label: 'English',   native: 'English'  },
  { code: 'hi', label: 'Hindi',     native: 'हिंदी'    },
  { code: 'mr', label: 'Marathi',   native: 'मराठी'    },
  { code: 'te', label: 'Telugu',    native: 'తెలుగు'   },
  { code: 'ta', label: 'Tamil',     native: 'தமிழ்'    },
  { code: 'bn', label: 'Bengali',   native: 'বাংলা'    },
  { code: 'gu', label: 'Gujarati',  native: 'ગુજરાતી'  },
  { code: 'kn', label: 'Kannada',   native: 'ಕನ್ನಡ'    },
  { code: 'pa', label: 'Punjabi',   native: 'ਪੰਜਾਬੀ'   },
  { code: 'ur', label: 'Urdu',      native: 'اردو'     },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം'  },
];

export const TranslationProvider = ({ children }) => {
  const [currentLang, setCurrentLang]     = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const switchLanguage = useCallback(async (langCode) => {
    if (langCode === currentLang) return;
    setIsTranslating(true);
    setCurrentLang(langCode);
    setTimeout(() => setIsTranslating(false), 500);
  }, [currentLang]);

  return (
    <TranslationContext_INTERNAL.Provider
      value={{ currentLang, switchLanguage, isTranslating, LANGUAGES }}
    >
      {children}
    </TranslationContext_INTERNAL.Provider>
  );
};

// ── useTranslation uses the internal context ──
export const useTranslation = () => {
  const context = useContext(TranslationContext_INTERNAL);
  return context ?? { currentLang: 'en', switchLanguage: () => {}, isTranslating: false, LANGUAGES };
};
