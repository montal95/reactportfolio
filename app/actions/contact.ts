'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — silent success for bots; never reaches the email provider
  const website = (formData.get('website') as string | null) ?? '';
  if (website) return { status: 'success', message: '' };

  // Required field validation
  const name    = ((formData.get('name')    as string | null) ?? '').trim();
  const email   = ((formData.get('email')   as string | null) ?? '').trim();
  const subject = ((formData.get('subject') as string | null) ?? '').trim();
  const message = ((formData.get('message') as string | null) ?? '').trim();

  if (!name)    return { status: 'error', message: 'Name is required.' };
  if (!email)   return { status: 'error', message: 'Email is required.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: 'error', message: 'Please enter a valid email address.' };
  if (!subject) return { status: 'error', message: 'Subject is required.' };
  if (!message) return { status: 'error', message: 'Message is required.' };

  try {
    await resend.emails.send({
      from:    'Portfolio Contact <contact@sammontalvojr.com>',
      to:      'sammontalvojr@gmail.com',
      subject: `[Portfolio] ${subject}`,
      text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return { status: 'success', message: '' };
  } catch {
    return { status: 'error', message: 'Something went wrong. Please try again.' };
  }
}
