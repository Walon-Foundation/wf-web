'use client';

import { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const BUILD_TYPES = [
  { value: 'web-app', label: 'Web app' },
  { value: 'mobile-app', label: 'Mobile app' },
  { value: 'payment-integration', label: 'Payment / mobile money' },
  { value: 'ai-feature', label: 'AI feature' },
  { value: 'data-security', label: 'Data & security' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const BUDGETS = [
  { value: 'under-1k', label: 'Under $1k' },
  { value: '1k-5k', label: '$1k – $5k' },
  { value: '5k-15k', label: '$5k – $15k' },
  { value: '15k-plus', label: '$15k+' },
  { value: 'not-sure', label: 'Not sure' },
];

type Fields = {
  name: string;
  email: string;
  organization: string;
  buildType: string;
  details: string;
  budget: string;
  contactPreference: string;
  contactHandle: string;
  _honeypot: string;
};

const EMPTY: Fields = {
  name: '',
  email: '',
  organization: '',
  buildType: '',
  details: '',
  budget: '',
  contactPreference: '',
  contactHandle: '',
  _honeypot: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!f.name.trim()) errors.name = 'Your name is required.';
  if (!f.email.trim()) {
    errors.email = 'An email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    errors.email = "That doesn't look like a valid email — check for typos.";
  }
  if (!f.details.trim()) errors.details = 'Tell us what you want to build.';
  return errors;
}

const inputClass =
  'w-full px-4 py-3 bg-canvas border border-hairline rounded-lg text-ink text-sm placeholder:text-mist/60 focus:outline-none focus:border-ink/40 transition-colors';

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-xs text-mist/50">{n}</span>
      <span className="flex-1 h-px bg-hairline" />
      <span className="font-mono text-xs text-mist uppercase tracking-widest">{label}</span>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <m.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-clay text-xs mt-1.5"
          role="alert"
        >
          {message}
        </m.p>
      )}
    </AnimatePresence>
  );
}

export function BookingForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const prefersReduced = useReducedMotion();
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '23276000000';

  function set(key: keyof Fields) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };
  }

  function pick(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: prev[key] === value ? '' : value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('submitting');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error('server');
      setStatus('success');
      setFields(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <m.div
        initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="py-20 text-center"
      >
        <p className="font-fraunces text-ink text-3xl mb-3">We've got it.</p>
        <p className="text-mist text-sm max-w-xs mx-auto">
          Expect a reply within two business days. Check your inbox.
        </p>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={fields._honeypot} onChange={set('_honeypot')} />
      </div>

      {/* Section 1 — About you */}
      <div>
        <SectionLabel n="01" label="About you" />
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                Name <span className="text-clay">*</span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                className={inputClass}
                value={fields.name}
                onChange={set('name')}
                aria-invalid={!!errors.name}
              />
              <FieldError message={errors.name} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                Email <span className="text-clay">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
                value={fields.email}
                onChange={set('email')}
                aria-invalid={!!errors.email}
              />
              <FieldError message={errors.email} />
            </div>
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-ink mb-1.5">
              Organization <span className="text-mist font-normal text-xs">(optional)</span>
            </label>
            <input
              id="organization"
              type="text"
              autoComplete="organization"
              placeholder="Company, NGO, school, or personal project"
              className={inputClass}
              value={fields.organization}
              onChange={set('organization')}
            />
          </div>
        </div>
      </div>

      {/* Section 2 — Your project */}
      <div>
        <SectionLabel n="02" label="Your project" />
        <div className="space-y-5">
          <div>
            <p className="block text-sm font-medium text-ink mb-3">
              What do you want to build?
            </p>
            <div className="flex flex-wrap gap-2">
              {BUILD_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => pick('buildType', t.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    fields.buildType === t.value
                      ? 'bg-forest text-canvas border-forest'
                      : 'bg-canvas text-ink border-hairline hover:border-ink/30'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium text-ink mb-1.5">
              Project details <span className="text-clay">*</span>
            </label>
            <textarea
              id="details"
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="What problem are you solving? Who is it for? Any deadlines or constraints we should know about?"
              value={fields.details}
              onChange={set('details')}
              aria-invalid={!!errors.details}
            />
            <FieldError message={errors.details} />
          </div>
        </div>
      </div>

      {/* Section 3 — Logistics */}
      <div>
        <SectionLabel n="03" label="Logistics" />
        <div className="space-y-5">
          <div>
            <p className="block text-sm font-medium text-ink mb-3">
              Budget range <span className="text-mist font-normal text-xs">(optional)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => pick('budget', b.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    fields.budget === b.value
                      ? 'bg-forest text-canvas border-forest'
                      : 'bg-canvas text-ink border-hairline hover:border-ink/30'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contactPreference" className="block text-sm font-medium text-ink mb-1.5">
                Preferred contact <span className="text-mist font-normal text-xs">(optional)</span>
              </label>
              <select
                id="contactPreference"
                className={inputClass}
                value={fields.contactPreference}
                onChange={set('contactPreference')}
              >
                <option value="">Select...</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="call">Call</option>
              </select>
            </div>
            <div>
              <label htmlFor="contactHandle" className="block text-sm font-medium text-ink mb-1.5">
                Phone / WhatsApp <span className="text-mist font-normal text-xs">(optional)</span>
              </label>
              <input
                id="contactHandle"
                type="text"
                placeholder="+232 76 000 000"
                className={inputClass}
                value={fields.contactHandle}
                onChange={set('contactHandle')}
              />
            </div>
          </div>
        </div>
      </div>

      {status === 'error' && (
        <m.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border border-clay/30 rounded-lg bg-clay/5"
          role="alert"
        >
          <p className="text-sm text-ink">
            Something went wrong.{' '}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-clay underline underline-offset-2"
            >
              Message us on WhatsApp
            </a>{' '}
            or email{' '}
            <a href="mailto:walonfoundation@gmail.com" className="text-clay underline underline-offset-2">
              walonfoundation@gmail.com
            </a>.
          </p>
        </m.div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <m.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={prefersReduced ? {} : { opacity: 0.9 }}
          whileTap={prefersReduced ? {} : { scale: 0.99 }}
          className="w-full sm:w-auto px-8 py-3.5 bg-clay text-canvas text-sm font-medium rounded-lg disabled:opacity-60 transition-opacity"
        >
          {status === 'submitting' ? 'Sending…' : 'Send request'}
        </m.button>
        <p className="text-xs text-mist">
          Your information is never shared with third parties.
        </p>
      </div>
    </form>
  );
}
