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

const CONTACT_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'call', label: 'Call' },
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
  name: '', email: '', organization: '', buildType: '',
  details: '', budget: '', contactPreference: '', contactHandle: '', _honeypot: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!f.name.trim()) errors.name = 'Your name is required.';
  if (!f.email.trim()) {
    errors.email = 'An email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    errors.email = "That doesn't look like a valid email.";
  }
  if (!f.details.trim()) errors.details = 'Tell us what you want to build.';
  return errors;
}

const inputBase =
  'w-full px-4 py-3 bg-canvas border rounded-lg text-ink text-sm placeholder:text-mist/50 focus:outline-none transition-colors';
const inputIdle = 'border-hairline focus:border-clay';
const inputError = 'border-clay/60 focus:border-clay';

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

function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink mb-2">
      {children}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-mist mt-1.5">{children}</p>;
}

function PillGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(active ? '' : o.value)}
            className={`px-4 py-2 rounded-lg text-sm border transition-all ${
              active
                ? 'bg-forest text-canvas border-forest font-medium'
                : 'bg-canvas text-mist border-hairline hover:text-ink hover:border-ink/25'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function BookingForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const prefersReduced = useReducedMotion();
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '23276000000';

  function set(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };
  }

  function pick(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
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
        <p className="text-mist text-sm max-w-xs mx-auto leading-relaxed">
          Expect a reply within two business days. Check your inbox.
        </p>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={fields._honeypot} onChange={set('_honeypot')} />
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Name <span className="text-clay">*</span></Label>
          <input
            id="name" type="text" autoComplete="name"
            placeholder="Your full name"
            className={`${inputBase} ${errors.name ? inputError : inputIdle}`}
            value={fields.name} onChange={set('name')} aria-invalid={!!errors.name}
          />
          <FieldError message={errors.name} />
        </div>
        <div>
          <Label htmlFor="email">Email <span className="text-clay">*</span></Label>
          <input
            id="email" type="email" autoComplete="email"
            placeholder="you@example.com"
            className={`${inputBase} ${errors.email ? inputError : inputIdle}`}
            value={fields.email} onChange={set('email')} aria-invalid={!!errors.email}
          />
          <FieldError message={errors.email} />
        </div>
      </div>

      {/* Organization */}
      <div>
        <Label htmlFor="organization">
          Organization <span className="text-mist font-normal text-xs">(optional)</span>
        </Label>
        <input
          id="organization" type="text" autoComplete="organization"
          placeholder="Company, NGO, school, or personal"
          className={`${inputBase} ${inputIdle}`}
          value={fields.organization} onChange={set('organization')}
        />
      </div>

      {/* Build type */}
      <div>
        <Label>What do you want to build?</Label>
        <PillGroup
          options={BUILD_TYPES}
          value={fields.buildType}
          onChange={(v) => pick('buildType', v)}
        />
      </div>

      {/* Project details */}
      <div>
        <Label htmlFor="details">
          Project details <span className="text-clay">*</span>
        </Label>
        <textarea
          id="details" rows={5}
          placeholder="What problem are you solving? Who is it for? Any deadlines or constraints?"
          className={`${inputBase} ${errors.details ? inputError : inputIdle} resize-none`}
          value={fields.details} onChange={set('details')} aria-invalid={!!errors.details}
        />
        <FieldError message={errors.details} />
        <Hint>The more detail you give, the faster we can reply with something useful.</Hint>
      </div>

      {/* Budget */}
      <div>
        <Label>
          Budget range <span className="text-mist font-normal text-xs">(optional)</span>
        </Label>
        <PillGroup
          options={BUDGETS}
          value={fields.budget}
          onChange={(v) => pick('budget', v)}
        />
      </div>

      {/* Contact preference */}
      <div>
        <Label>
          How should we reach you? <span className="text-mist font-normal text-xs">(optional)</span>
        </Label>
        <PillGroup
          options={CONTACT_METHODS}
          value={fields.contactPreference}
          onChange={(v) => pick('contactPreference', v)}
        />
      </div>

      {/* Contact handle — only show if whatsapp or call selected */}
      {(fields.contactPreference === 'whatsapp' || fields.contactPreference === 'call') && (
        <m.div
          initial={prefersReduced ? {} : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          <Label htmlFor="contactHandle">Phone / WhatsApp number</Label>
          <input
            id="contactHandle" type="tel"
            placeholder="+232 76 000 000"
            className={`${inputBase} ${inputIdle}`}
            value={fields.contactHandle} onChange={set('contactHandle')}
          />
        </m.div>
      )}

      {status === 'error' && (
        <m.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border border-clay/30 rounded-lg bg-clay/5"
          role="alert"
        >
          <p className="text-sm text-ink">
            Something went wrong.{' '}
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="text-clay underline underline-offset-2">
              Message us on WhatsApp
            </a>{' '}
            or email{' '}
            <a href="mailto:walonfoundation@gmail.com"
              className="text-clay underline underline-offset-2">
              walonfoundation@gmail.com
            </a>.
          </p>
        </m.div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <m.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={prefersReduced ? {} : { opacity: 0.88 }}
          whileTap={prefersReduced ? {} : { scale: 0.98 }}
          className="w-full sm:w-auto px-8 py-3.5 bg-clay text-canvas text-sm font-medium rounded-lg disabled:opacity-50 transition-opacity"
        >
          {status === 'submitting' ? 'Sending…' : 'Send request'}
        </m.button>
        <p className="text-xs text-mist">
          Never shared with third parties.
        </p>
      </div>
    </form>
  );
}
