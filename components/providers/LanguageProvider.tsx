'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { content, type Lang } from '@/lib/content';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (typeof content)['en'];
};

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = 'shriram-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start on 'en' so server and first client render match (no
  // hydration mismatch); the stored preference is applied after mount.
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (saved === 'mr' || saved === 'en') setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'mr' ? 'mr' : 'en';
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* private mode — ignore */
    }
  }, []);

  const toggle = useCallback(() => setLang(lang === 'en' ? 'mr' : 'en'), [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: content[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within <LanguageProvider>');
  return ctx;
}

/** Convenience: the active language's content bundle. */
export function useContent() {
  return useLang().t;
}
