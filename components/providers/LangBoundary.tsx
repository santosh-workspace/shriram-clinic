'use client';

import { Fragment } from 'react';
import { useLang } from '@/components/providers/LanguageProvider';

/**
 * Remounts its children whenever the language changes. Because several
 * sections mutate the DOM (SplitType line-splitting, GSAP clearProps),
 * a fresh mount is the reliable way to re-render text in the new language
 * without leaving stale split spans behind.
 */
export function LangBoundary({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  return <Fragment key={lang}>{children}</Fragment>;
}
