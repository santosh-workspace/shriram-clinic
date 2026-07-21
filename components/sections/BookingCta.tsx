'use client';

import { useState } from 'react';
import { site } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';
import { RevealText } from '@/components/ui/RevealText';
import { MagneticButton } from '@/components/ui/MagneticButton';

type Errors = Partial<Record<'name' | 'phone' | 'reason', string>>;

export function BookingCta() {
  const [form, setForm] = useState({ name: '', phone: '', reason: '', when: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[0-9+\s-]{8,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number.';
    if (form.reason.trim().length < 3) e.reason = 'Tell us briefly what it’s about.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const msg = `Hello ${site.name}, I'd like to book an appointment.%0A%0AName: ${form.name}%0APhone: ${form.phone}%0APreferred time: ${form.when || 'Any'}%0AReason: ${form.reason}`;
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
            <p className="eyebrow mb-8">Book an appointment</p>
          </Reveal>
          <h2 className="font-display text-display-md text-ink">
            <span className="block overflow-hidden">
              <RevealText as="span" className="block">
                Your health deserves
              </RevealText>
            </span>
            <span className="italic text-gold">thoughtful care.</span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              Leave your details and we&rsquo;ll confirm your slot on WhatsApp — usually within the
              hour during clinic times. Prefer to talk? Call us directly.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href={`tel:${site.phoneHref}`} variant="outline" cursor="link">
                Call {site.phoneDisplay}
              </MagneticButton>
              <MagneticButton
                href={`https://wa.me/${site.whatsapp}`}
                variant="ghost"
                cursor="link"
              >
                WhatsApp us
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
                  <h3 className="mt-6 font-display text-2xl text-ink">Request on its way</h3>
                  <p className="mt-2 max-w-xs text-muted">
                    We&rsquo;re opening WhatsApp so you can send your request. We&rsquo;ll confirm
                    shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="link-underline mt-6 text-sm text-ink"
                    data-cursor="link"
                  >
                    Book another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-caption uppercase tracking-wider text-muted">
                      Full name
                    </label>
                    <input
                      id="name"
                      className={field}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-caption uppercase tracking-wider text-muted">
                      Phone
                    </label>
                    <input
                      id="phone"
                      className={field}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 …"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                    {errors.phone && <p className="mt-1.5 text-xs text-red-700">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="when" className="text-caption uppercase tracking-wider text-muted">
                      Preferred time <span className="normal-case text-muted/60">(optional)</span>
                    </label>
                    <input
                      id="when"
                      className={field}
                      value={form.when}
                      onChange={(e) => setForm({ ...form, when: e.target.value })}
                      placeholder="e.g. Tomorrow evening"
                    />
                  </div>
                  <div>
                    <label htmlFor="reason" className="text-caption uppercase tracking-wider text-muted">
                      Reason for visit
                    </label>
                    <input
                      id="reason"
                      className={field}
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      placeholder="Briefly, what’s it about?"
                    />
                    {errors.reason && <p className="mt-1.5 text-xs text-red-700">{errors.reason}</p>}
                  </div>

                  <button
                    type="submit"
                    data-cursor="link"
                    className="mt-2 w-full rounded-full bg-ink py-4 text-sm font-medium text-canvas transition-colors duration-500 ease-editorial hover:bg-gold"
                  >
                    Request appointment
                  </button>
                  <p className="text-center text-xs text-muted">
                    We reply on WhatsApp. Your details are never shared.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
