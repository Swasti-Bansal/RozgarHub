// src/components/T.js
import React, { useEffect, useState, useRef, useContext } from 'react';
import { Text } from 'react-native';
import { TranslationContext_INTERNAL, _cache } from '../context/TranslationContext';

// Only strips actual emoji unicode ranges — NOT Hindi/regional scripts
const stripEmoji = str =>
  str.replace(
    /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]/gu,
    ''
  ).trim();

const shouldSkip = str => {
  if (!str || typeof str !== 'string') return true;
  if (!str.trim() || str.trim().length <= 1) return true;
  if (/^[\d\s₹+\-%.,:\/()→←•|]+$/.test(str.trim())) return true;
  return false;
};

const fetchTranslation = async (text, lang) => {
  // Strip emoji before sending — prevents @action:button from API
  const cleanInput = stripEmoji(text);
  if (!cleanInput) return text;

  const key = `${cleanInput}__${lang}`;
  if (_cache[key]) return _cache[key];

  try {
    const res  = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanInput)}&langpair=en|${lang}`
    );
    const data = await res.json();
    if (data.responseStatus === 200) {
      // Strip @action:button artifacts only — keep Hindi/regional chars intact
      const result = data.responseData.translatedText
        .replace(/@\s*\w+\s*:\s*\w+/g, '')
        .trim();
      _cache[key] = result;
      return result;
    }
  } catch {}
  return text;
};

const T = ({ children, style, ...props }) => {
  const context             = useContext(TranslationContext_INTERNAL);
  const currentLang         = context?.currentLang ?? 'en';
  const [output, setOutput] = useState(children);
  const mounted             = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (currentLang === 'en' || shouldSkip(children)) {
      setOutput(children);
      return;
    }
    fetchTranslation(String(children), currentLang).then(result => {
      if (mounted.current) setOutput(result);
    });
  }, [children, currentLang]);

  return <Text style={style} {...props}>{output}</Text>;
};

export default T;
