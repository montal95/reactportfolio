import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Import mock data setup - must be before component imports
import '../data';

import Contact from './Contact';

// Mock global fetch to prevent real network calls
global.fetch = jest.fn();

// Renders Contact and waits until the form is ready
const renderAndWait = async () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(screen.getByLabelText(/Enter your name/i)).toBeInTheDocument();
  });
};

// Fill visible form fields; omitted keys default to empty string
const fillForm = ({ name, email, subject, message }) => {
  fireEvent.change(screen.getByLabelText(/Enter your name/i), {
    target: { name: 'name', value: name || '' },
  });
  fireEvent.change(screen.getByLabelText(/Enter your email/i), {
    target: { name: 'email', value: email || '' },
  });
  fireEvent.change(screen.getByLabelText(/Enter your subject/i), {
    target: { name: 'subject', value: subject || '' },
  });
  fireEvent.change(screen.getByLabelText(/Enter your Message/i), {
    target: { name: 'message', value: message || '' },
  });
};

// Click the submit button
const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: /Send Mail/i }));
};

const validFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Test Subject',
  message: 'Hello, this is a test message.',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Contact Form — Honeypot', () => {
  it('renders the hidden form-name input for Netlify Forms', async () => {
    await renderAndWait();
    const hiddenInput = document.querySelector('input[name="form-name"]');
    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput).toHaveAttribute('value', 'contact');
  });

  it('renders the honeypot field with the hiding class', async () => {
    await renderAndWait();
    const honeypotInput = screen.getByLabelText(/Website/i);
    expect(honeypotInput).toBeInTheDocument();
    expect(honeypotInput.closest('.mi-form-honeypot')).not.toBeNull();
  });

  it('honeypot field is not tab-accessible', async () => {
    await renderAndWait();
    expect(screen.getByLabelText(/Website/i)).toHaveAttribute('tabIndex', '-1');
  });

  it('honeypot field has autocomplete disabled', async () => {
    await renderAndWait();
    expect(screen.getByLabelText(/Website/i)).toHaveAttribute('autoComplete', 'off');
  });

  it('silently discards submission when honeypot is filled (bot detected)', async () => {
    await renderAndWait();
    fillForm(validFormData);
    fireEvent.change(screen.getByLabelText(/Website/i), {
      target: { name: 'website', value: 'http://spam-bot.example.com' },
    });
    submitForm();
    // Fake success shown to bot — fetch must not have been called
    await waitFor(() => {
      expect(screen.getByText(/You message has been sent/i)).toBeInTheDocument();
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('submits via Netlify Forms fetch when honeypot is empty (real user)', async () => {
    fetch.mockResolvedValue({ ok: true });
    await renderAndWait();
    fillForm(validFormData);
    submitForm();
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    expect(fetch).toHaveBeenCalledWith(
      '/',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: expect.stringContaining('form-name=contact'),
      })
    );
    await waitFor(() => {
      expect(screen.getByText(/You message has been sent/i)).toBeInTheDocument();
    });
  });

  it('clears all form fields after successful submission', async () => {
    fetch.mockResolvedValue({ ok: true });
    await renderAndWait();
    fillForm(validFormData);
    submitForm();
    await waitFor(() => {
      expect(screen.getByText(/You message has been sent/i)).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/Enter your name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Enter your email/i)).toHaveValue('');
    expect(screen.getByLabelText(/Enter your subject/i)).toHaveValue('');
    expect(screen.getByLabelText(/Enter your Message/i)).toHaveValue('');
  });

  it('shows error message when server returns a non-ok response', async () => {
    fetch.mockResolvedValue({ ok: false });
    await renderAndWait();
    fillForm(validFormData);
    submitForm();
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });

  it('shows error message when fetch throws a network error', async () => {
    fetch.mockRejectedValue(new Error('Network failure'));
    await renderAndWait();
    fillForm(validFormData);
    submitForm();
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});

describe('Contact Form — Validation', () => {
  it('shows error when name is empty', async () => {
    await renderAndWait();
    submitForm();
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('shows error when email is empty', async () => {
    await renderAndWait();
    fillForm({ name: 'Jane Doe' });
    submitForm();
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('shows error when subject is empty', async () => {
    await renderAndWait();
    fillForm({ name: 'Jane Doe', email: 'jane@example.com' });
    submitForm();
    await waitFor(() => {
      expect(screen.getByText(/Subject is required/i)).toBeInTheDocument();
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('shows error when message is empty', async () => {
    await renderAndWait();
    fillForm({ name: 'Jane Doe', email: 'jane@example.com', subject: 'Test Subject' });
    submitForm();
    await waitFor(() => {
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
    });
    expect(fetch).not.toHaveBeenCalled();
  });
});
