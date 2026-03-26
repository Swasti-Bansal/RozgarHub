// src/hooks/useTranslatedText.js
import { useState, useEffect, useContext, useRef } from 'react';
import { TranslationContext_INTERNAL, _cache } from '../context/TranslationContext';

const fetchTranslation = async (text, lang) => {
  if (lang === 'en' || !text) return text;
  const key = `${text}__${lang}`;
  if (_cache[key]) return _cache[key];
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`
    );
    const data = await res.json();
    if (data.responseStatus === 200) {
      const clean = data.responseData.translatedText
        .replace(/@\s*\w+\s*:\s*\w+/g, '').trim();
      _cache[key] = clean;
      return clean;
    }
  } catch {}
  return text;
};

const useTranslatedText = (...texts) => {
  const context     = useContext(TranslationContext_INTERNAL);
  const currentLang = context?.currentLang ?? 'en';
  const [results, setResults] = useState(texts);
  const prevLang = useRef(currentLang);

  useEffect(() => {
    let cancelled = false;

    if (currentLang === 'en') {
      setResults(texts);
      return;
    }

    Promise.all(texts.map(t => fetchTranslation(t, currentLang)))
      .then(translated => {
        if (!cancelled) setResults(translated);
      });

    prevLang.current = currentLang;
    return () => { cancelled = true; };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang, ...texts]);

  return results;
};

export default useTranslatedText;