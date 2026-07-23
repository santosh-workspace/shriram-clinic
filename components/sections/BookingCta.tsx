'use client';

import { useState } from 'react';
import { site } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';
import { RevealText } from '@/components/ui/RevealText';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useContent } from '@/components/providers/LanguageProvider';

type Errors = Partial<Record<'name' | 'phone' | 'reason', string>>;

export function BookingCta() {
  const c = useContent();
  const b = c.booking;
  const f = b.form;
  const [form, setForm] = useState({ name: '', phone: '', reason: '', when: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = f.errName;
    if (!/^[0-9+\s-]{8,}$/.test(form.phone.trim())) e.phone = f.errPhone;
    if (form.reason.trim().length < 3) e.reason = f.errReason;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const msg = `${b.waGreeting}%0A%0A${form.name}%0A${form.phone}%0A${form.when || '—'}%0A${form.reason}`;
    setSent(true);
    // hand the request to WhatsApp — the fastest real booking path
    setTimeout(() => {
      window.open(`https://wa.me/${site.whatsapp}?text=${msg}`, '_blank', 'noopener');
    }, 900);
  };

  const field =
    'w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-muted/70 focus:border-gold focus:outline-none transition-colors duration-300';

  return (
    <section id="booking" className="relative overflow-hidden py-28 md:py-40">
      <div className="shell grid grid-cols-12 gap-y-14 md:gap-x-12">
        {/* left: the invitation */}
        <div className="col-span-12 md:col-span-6">
          <Reveal>
            <p className="eyebrow mb-8">{b.eyebrow}</p>
          </Reveal>
          <h2 className="font-display text-display-md text-ink">
            <span className="block overflow-hidden">
              <RevealText as="span" className="block">
                {b.headingPre}
              </RevealText>
            </span>
            <span className="italic text-gold">{b.headingEm}</span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{b.sub}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href={site.bookingUrl} newTab variant="solid" cursor="link">
                {c.ui.book}
              </MagneticButton>
              <MagneticButton href={`tel:${site.phoneHref}`} variant="outline" cursor="link">
                {b.callCta} {site.phoneDisplay}
              </MagneticButton>
              <MagneticButton href={`https://wa.me/${site.whatsapp}`} variant="ghost" cursor="link">
                {b.whatsappCta}
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* right: the form */}
        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <Reveal delay={0.1}>
            <div className="relative rounded-sm border border-line bg-surface p-8 md:p-10">
              {sent ? (
                <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M20 6 9 17l-5-5" strokeDasharray="30" className="[animation:check_.9s_var(--ease-editorial)_forwards]" style={{ strokeDashoffset: 30, animationName: 'check' }} />
                    </svg>
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">{f.sentTitle}</h3>
                  <p className="mt-2 max-w-xs text-muted">{f.sentBody}</p>
                  <button
                    onClick={() => setSent(false)}
                    className="link-underline mt-6 text-sm text-ink"
                    data-cursor="link"
                  >
                    {f.bookAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-caption uppercase tracking-wider text-muted">
                      {f.name}
                    </label>
                    <input
                      id="name"
                      className={field}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={f.namePh}
                      autoComplete="name"
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-caption uppercase tracking-wider text-muted">
                      {f.phone}
                    </label>
                    <input
                      id="phone"
                      className={field}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={f.phonePh}
                      inputMode="tel"
                      autoComplete="tel"
                    />
                    {errors.phone && <p className="mt-1.5 text-xs text-red-700">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="when" className="text-caption uppercase tracking-wider text-muted">
                      {f.when} <span className="normal-case text-muted/60">{f.whenOpt}</span>
                    </label>
                    <input
                      id="when"
                      className={field}
                      value={form.when}
                      onChange={(e) => setForm({ ...form, when: e.target.value })}
                      placeholder={f.whenPh}
                    />
                  </div>
                  <div>
                    <label htmlFor="reason" className="text-caption uppercase tracking-wider text-muted">
                      {f.reason}
                    </label>
                    <input
                      id="reason"
                      className={field}
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      placeholder={f.reasonPh}
                    />
                    {errors.reason && <p className="mt-1.5 text-xs text-red-700">{errors.reason}</p>}
                  </div>

                  <button
                    type="submit"
                    data-cursor="link"
                    className="mt-2 w-full rounded-full bg-ink py-4 text-sm font-medium text-canvas transition-colors duration-500 ease-editorial hover:bg-gold"
                  >
                    {f.submit}
                  </button>
                  <p className="text-center text-xs text-muted">{f.note}</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
