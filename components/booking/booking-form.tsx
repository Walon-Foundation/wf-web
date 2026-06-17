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

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <m.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-clay text-xs mt-1.5 leading-snug"
          role="alert"
        >
          {message}
        </m.p>
      )}
    </AnimatePresence>
  );
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
            className={`px-4 py-2 rounded-lg text-sm border transition-all duration-150 ${
              active
                ? 'bg-forest text-canvas border-forest font-medium'
                : 'bg-hairline/40 text-mist border-transparent hover:border-ink/20 hover:text-ink'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const inputBase = [
  'w-full px-4 py-3 rounded-lg text-ink text-sm',
  'bg-hairline/30 border',
  'placeholder:text-mist/60',
  'transition-all duration-150',
  'focus:outline-none focus:bg-canvas',
].join(' ');

const inputNormal = 'border-hairline focus:border-clay focus:[box-shadow:0_0_0_3px_rgba(199,92,54,0.12)]';
const inputErr    = 'border-clay/50 focus:border-clay focus:[box-shadow:0_0_0_3px_rgba(199,92,54,0.12)]';

export function BookingForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const prefersReduced = useReducedMotion();
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '23276000000';

  function set(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key] && touched[key]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };
  }

  function blur(key: keyof Fields) {
    return () => {
      setTouched((prev) => ({ ...prev, [key]: true }));
      const errs = validate(fields);
      if (errs[key]) setErrors((prev) => ({ ...prev, [key]: errs[key] }));
    };
  }

  function pick(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ name: true, email: true, details: true });
      return;
    }
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
        transition={{ duration: 0.5, ease: EASE }}
        className="py-20 text-center"
      >
        <p className="font-fraunces text-ink text-3xl mb-3">We've got it.</p>
        <p className="text-mist text-sm max-w-xs mx-auto leading-relaxed">
          Expect a reply within two business days.
        </p>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={fields._honeypot} onChange={set('_honeypot')} />
      </div>

      <div className="space-y-6">

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
              Name <span className="text-clay">*</span>
            </label>
            <input
              id="name" type="text" autoComplete="name"
              placeholder="Your full name"
              className={`${inputBase} ${errors.name ? inputErr : inputNormal}`}
              value={fields.name} onChange={set('name')} onBlur={blur('name')}
              aria-invalid={!!errors.name}
            />
            <FieldError message={errors.name} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
              Email <span className="text-clay">*</span>
            </label>
            <input
              id="email" type="email" autoComplete="email"
              placeholder="you@example.com"
              className={`${inputBase} ${errors.email ? inputErr : inputNormal}`}
              value={fields.email} onChange={set('email')} onBlur={blur('email')}
              aria-invalid={!!errors.email}
            />
            <FieldError message={errors.email} />
          </div>
        </div>

        {/* Organization */}
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-ink mb-2">
            Organization{' '}
            <span className="text-mist font-normal">(optional)</span>
          </label>
          <input
            id="organization" type="text" autoComplete="organization"
            placeholder="Company, NGO, school, or personal project"
            className={`${inputBase} ${inputNormal}`}
            value={fields.organization} onChange={set('organization')}
          />
        </div>

        {/* Divider */}
        <div className="pt-2 border-t border-hairline" />

        {/* Build type */}
        <div>
          <label className="block text-sm font-medium text-ink mb-3">
            What do you want to build?
          </label>
          <PillGroup
            options={BUILD_TYPES}
            value={fields.buildType}
            onChange={(v) => pick('buildType', v)}
          />
        </div>

        {/* Project details */}
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-ink mb-2">
            Project details <span className="text-clay">*</span>
          </label>
          <textarea
            id="details" rows={5}
            placeholder="What problem are you solving? Who is it for? Any timeline or constraints?"
            className={`${inputBase} ${errors.details ? inputErr : inputNormal} resize-none`}
            value={fields.details} onChange={set('details')} onBlur={blur('details')}
            aria-invalid={!!errors.details}
          />
          <FieldError message={errors.details} />
          <p className="text-xs text-mist mt-1.5">
            More detail = faster, more useful reply.
          </p>
        </div>

        {/* Divider */}
        <div className="pt-2 border-t border-hairline" />

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-ink mb-3">
            Budget range{' '}
            <span className="text-mist font-normal">(optional)</span>
          </label>
          <PillGroup
            options={BUDGETS}
            value={fields.budget}
            onChange={(v) => pick('budget', v)}
          />
        </div>

        {/* Contact preference */}
        <div>
          <label className="block text-sm font-medium text-ink mb-3">
            Best way to reach you{' '}
            <span className="text-mist font-normal">(optional)</span>
          </label>
          <PillGroup
            options={CONTACT_METHODS}
            value={fields.contactPreference}
            onChange={(v) => pick('contactPreference', v)}
          />
        </div>

        {/* Phone — shown only when needed */}
        <AnimatePresence>
          {(fields.contactPreference === 'whatsapp' || fields.contactPreference === 'call') && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="overflow-hidden"
            >
              <label htmlFor="contactHandle" className="block text-sm font-medium text-ink mb-2">
                Phone / WhatsApp number
              </label>
              <input
                id="contactHandle" type="tel"
                placeholder="+232 76 000 000"
                className={`${inputBase} ${inputNormal}`}
                value={fields.contactHandle} onChange={set('contactHandle')}
              />
            </m.div>
          )}
        </AnimatePresence>

        {/* Error banner */}
        <AnimatePresence>
          {status === 'error' && (
            <m.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 border border-clay/30 rounded-lg bg-clay/5 text-sm text-ink"
              role="alert"
            >
              Something went wrong —{' '}
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="text-clay underline underline-offset-2">WhatsApp us</a>{' '}
              or email{' '}
              <a href="mailto:walonfoundation@gmail.com"
                className="text-clay underline underline-offset-2">walonfoundation@gmail.com</a>.
            </m.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <m.button
            type="submit"
            disabled={status === 'submitting'}
            whileHover={prefersReduced ? {} : { opacity: 0.88 }}
            whileTap={prefersReduced ? {} : { scale: 0.98 }}
            transition={{ duration: 0.1 }}
            className="w-full sm:w-auto px-8 py-3.5 bg-clay text-canvas text-sm font-medium rounded-lg disabled:opacity-50 transition-opacity"
          >
            {status === 'submitting' ? 'Sending…' : 'Send request'}
          </m.button>
          <p className="text-xs text-mist">Never shared with third parties.</p>
        </div>
      </div>
    </form>
  );
}
