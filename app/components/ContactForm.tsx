'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Send } from 'react-feather';

interface Fields {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

const EMPTY: Fields = { name: '', email: '', subject: '', message: '', website: '' };

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus]   = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot — silently succeed for bots
    if (fields.website) { setStatus('success'); return; }

    // Client-side validation
    const required = ['name', 'email', 'subject', 'message'] as const;
    const missing = required.find((k) => !fields[k].trim());
    if (missing) {
      setStatus('error');
      setErrorMsg(`${missing.charAt(0).toUpperCase() + missing.slice(1)} is required.`);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...fields }).toString(),
      });
      if (res.ok) { setFields(EMPTY); setStatus('success'); }
      else throw new Error(`HTTP ${res.status}`);
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-success" role="status" aria-live="polite">
        <div className="contact-success-icon" aria-hidden="true">✓</div>
        <h3>Message sent!</h3>
        <p>Thanks for reaching out — I&apos;ll get back to you soon.</p>
        <button className="btn-ghost" onClick={() => setStatus('idle')}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="website"
      onSubmit={handleSubmit}
      className="contact-form"
      noValidate
    >
      {/* Required for Netlify to associate AJAX submissions with this form */}
      <input type="hidden" name="form-name" value="contact" />

      <div className="form-group">
        <label htmlFor="cf-name" className="form-label">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name" type="text" name="name"
          className="form-input" value={fields.name}
          onChange={handleChange} required autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cf-email" className="form-label">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email" type="email" name="email"
          className="form-input" value={fields.email}
          onChange={handleChange} required autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cf-subject" className="form-label">
          Subject <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-subject" type="text" name="subject"
          className="form-input" value={fields.subject}
          onChange={handleChange} required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cf-message" className="form-label">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message" name="message"
          className="form-input form-textarea"
          value={fields.message} onChange={handleChange}
          rows={6} required
        />
      </div>

      {/* Honeypot — hidden from humans */}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website" type="text" name="website"
          value={fields.website} onChange={handleChange}
          tabIndex={-1} autoComplete="off"
        />
      </div>

      {status === 'error' && (
        <p className="form-error" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        className="btn-primary contact-submit"
        disabled={status === 'sending'}
        aria-busy={status === 'sending'}
      >
        <Send size={15} aria-hidden="true" />
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
