'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

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
  if (!f.name.trim()) {
    errors.name = 'Your name is required.';
  }
  if (!f.email.trim()) {
    errors.email = 'An email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    errors.email = "That email address doesn't look right — check for typos.";
  }
  if (!f.details.trim()) {
    errors.details = 'Tell us what you want to build.';
  }
  return errors;
}

const inputClass =
  'w-full px-4 py-3 bg-canvas border border-hairline rounded-lg text-ink text-sm placeholder:text-mist focus:outline-none focus:border-ink/40 transition-colors';

const labelClass = 'block text-sm text-ink font-medium mb-1.5';

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-clay text-xs mt-1.5"
          role="alert"
        >
          {message}
        </motion.p>
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

  function field(key: keyof Fields) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
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
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="py-16 text-center"
      >
        <p className="font-fraunces text-ink text-2xl mb-3">We've got it.</p>
        <p className="text-mist text-sm">
          Expect a reply within two business days. Check your inbox for a
          confirmation.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="hidden" aria-hidden="true">
        <input
          tabIndex={-1}
          autoComplete="off"
          value={fields._honeypot}
          onChange={field('_honeypot')}
        />
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name <span className="text-clay">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className={inputClass}
          value={fields.name}
          onChange={field('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-err' : undefined}
        />
        <FieldError message={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-clay">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={fields.email}
          onChange={field('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <label htmlFor="organization" className={labelClass}>
          Organization{' '}
          <span className="text-mist font-normal">(optional)</span>
        </label>
        <input
          id="organization"
          type="text"
          autoComplete="organization"
          className={inputClass}
          value={fields.organization}
          onChange={field('organization')}
        />
      </div>

      <div>
        <label htmlFor="buildType" className={labelClass}>
          What do you want to build?
        </label>
        <select
          id="buildType"
          className={inputClass}
          value={fields.buildType}
          onChange={field('buildType')}
        >
          <option value="">Select one...</option>
          <option value="web-app">Web app</option>
          <option value="mobile-app">Mobile app</option>
          <option value="payment-integration">
            Payment or mobile-money integration
          </option>
          <option value="ai-chatbot">AI or chatbot feature</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="details" className={labelClass}>
          Project details <span className="text-clay">*</span>
        </label>
        <textarea
          id="details"
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Describe the problem you're solving and who it's for."
          value={fields.details}
          onChange={field('details')}
          aria-invalid={!!errors.details}
          aria-describedby={errors.details ? 'details-err' : undefined}
        />
        <FieldError message={errors.details} />
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>
          Budget range <span className="text-mist font-normal">(optional)</span>
        </label>
        <select
          id="budget"
          className={inputClass}
          value={fields.budget}
          onChange={field('budget')}
        >
          <option value="">Select a range...</option>
          <option value="under-25k">Under SLE 25,000 (~$1k)</option>
          <option value="25k-120k">SLE 25k–120k (~$1–5k)</option>
          <option value="120k-350k">SLE 120k–350k (~$5–15k)</option>
          <option value="350k-plus">SLE 350k+ (~$15k+)</option>
          <option value="not-sure">Not sure</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contactPreference" className={labelClass}>
            Preferred contact{' '}
            <span className="text-mist font-normal">(optional)</span>
          </label>
          <select
            id="contactPreference"
            className={inputClass}
            value={fields.contactPreference}
            onChange={field('contactPreference')}
          >
            <option value="">Select...</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="call">Call</option>
          </select>
        </div>
        <div>
          <label htmlFor="contactHandle" className={labelClass}>
            Contact handle{' '}
            <span className="text-mist font-normal">(optional)</span>
          </label>
          <input
            id="contactHandle"
            type="text"
            className={inputClass}
            placeholder="Phone, WhatsApp number, etc."
            value={fields.contactHandle}
            onChange={field('contactHandle')}
          />
        </div>
      </div>

      {status === 'error' && (
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border border-clay/30 rounded-lg bg-clay/5"
          role="alert"
        >
          <p className="text-sm text-ink">
            Something went wrong on our end. You can also reach us on{' '}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-clay underline underline-offset-2"
            >
              WhatsApp
            </a>{' '}
            or at{' '}
            <a
              href="mailto:walonfoundation@gmail.com"
              className="text-clay underline underline-offset-2"
            >
              walonfoundation@gmail.com
            </a>
            .
          </p>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={prefersReduced ? {} : { opacity: 0.9 }}
        whileTap={prefersReduced ? {} : { scale: 0.99 }}
        className="w-full sm:w-auto px-8 py-3.5 bg-clay text-canvas text-sm font-medium rounded-lg disabled:opacity-60 transition-opacity"
      >
        {status === 'submitting' ? 'Sending...' : 'Send request'}
      </motion.button>
    </form>
  );
}
