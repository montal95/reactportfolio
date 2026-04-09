'use client';

import { useActionState, useState } from 'react';
import { Send } from 'react-feather';
import { submitContact, type ContactState } from '@/app/actions/contact';

const initial: ContactState = { status: 'idle', message: '' };

/**
 * Inner form — holds useActionState. Remounted by ContactForm when the
 * user clicks "Send another", which resets both action state and the
 * uncontrolled inputs in one shot without any useEffect gymnastics.
 */
function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState(submitContact, initial);

  if (state.status === 'success') {
    return (
      <div className="contact-success" role="status" aria-live="polite">
        <div className="contact-success-icon" aria-hidden="true">✓</div>
        <h3>Message sent!</h3>
        <p>Thanks for reaching out — I&apos;ll get back to you soon.</p>
        <button className="btn-ghost" onClick={onReset}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form" noValidate>
      <div className="form-group">
        <label htmlFor="cf-name" className="form-label">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name" type="text" name="name"
          className="form-input" required autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cf-email" className="form-label">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email" type="email" name="email"
          className="form-input" required autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cf-subject" className="form-label">
          Subject <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-subject" type="text" name="subject"
          className="form-input" required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cf-message" className="form-label">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message" name="message"
          className="form-input form-textarea"
          rows={6} required
        />
      </div>

      {/* Honeypot — hidden from humans, checked server-side */}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website" type="text" name="website"
          tabIndex={-1} autoComplete="off"
        />
      </div>

      {state.status === 'error' && (
        <p className="form-error" role="alert">{state.message}</p>
      )}

      <button
        type="submit"
        className="btn-primary contact-submit"
        disabled={isPending}
        aria-busy={isPending}
      >
        <Send size={15} aria-hidden="true" />
        {isPending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

/** Exported component — manages the reset key that remounts ContactFormInner. */
export default function ContactForm() {
  const [resetKey, setResetKey] = useState(0);
  return (
    <ContactFormInner
      key={resetKey}
      onReset={() => setResetKey((k) => k + 1)}
    />
  );
}
