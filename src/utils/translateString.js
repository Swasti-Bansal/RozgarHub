// src/utils/translateString.js
import { _cache } from '../context/TranslationContext';

const translateString = async (text, lang) => {
  if (lang === 'en' || !text) return text;
  const key = `${text}__${lang}`;
  if (_cache[key]) return _cache[key];
  try {
    const res  = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`
    );
    const data = await res.json();
    if (data.responseStatus === 200) {
      const clean = data.responseData.translatedText.replace(/@\w+:\w+/g, '').trim();
      _cache[key] = clean;
      return clean;
    }
  } catch {}
  return text;
};

export default translateString;
