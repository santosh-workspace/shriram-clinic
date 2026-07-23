'use client';

import { useLang } from '@/components/providers/LanguageProvider';

/**
 * Single-button language switch. Shows both scripts with the active one
 * highlighted; one click flips English ⇄ मराठी.
 */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      data-cursor="link"
      aria-label={lang === 'en' ? 'मराठीत बदला' : 'Switch to English'}
      title={lang === 'en' ? 'मराठी' : 'English'}
      className={`inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-3 py-1.5 text-xs font-medium transition-colors duration-300 hover:border-gold/60 ${className}`}
    >
      <span className={lang === 'en' ? 'text-ink' : 'text-muted'}>EN</span>
      <span className="text-ink/25">/</span>
      <span className={lang === 'mr' ? 'text-ink' : 'text-muted'}>मराठी</span>
    </button>
  );
}
