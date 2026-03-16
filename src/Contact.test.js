import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Import mock data setup - must be before component imports
import './data';

import Contact from './pages/Contact';

// Mock emailjs-com to prevent real API calls
jest.mock('emailjs-com', () => ({
  send: jest.fn(),
}));

import emailjs from 'emailjs-com';

// Helper to render Contact with router context
const renderContact = () => {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
};

// Helper to fill the visible form fields
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
  it('renders the honeypot field with the hiding class', async () => {
    renderContact();
    await waitFor(() => {
      const honeypotInput = screen.getByLabelText(/Website/i);
      expect(honeypotInput).toBeInTheDocument();
      expect(honeypotInput.closest('.mi-form-honeypot')).not.toBeNull();
    });
  });

  it('honeypot field is not tab-accessible', async () => {
    renderContact();
    await waitFor(() => {
      const honeypotInput = screen.getByLabelText(/Website/i);
      expect(honeypotInput).toHaveAttribute('tabIndex', '-1');
    });
  });

  it('honeypot field has autocomplete disabled', async () => {
    renderContact();
    await waitFor(() => {
      const honeypotInput = screen.getByLabelText(/Website/i);
      expect(honeypotInput).toHaveAttribute('autoComplete', 'off');
    });
  });

  it('silently discards submission when honeypot is filled (bot detected)', async () => {
    renderContact();
    await waitFor(() => {
      expect(screen.getByLabelText(/Enter your name/i)).toBeInTheDocument();
    });

    fillForm(validFormData);

    // Simulate a bot filling the honeypot
    fireEvent.change(screen.getByLabelText(/Website/i), {
      target: { name: 'website', value: 'http://spam-bot.example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Mail/i }));

    // Should show fake success message (so bot thinks it worked)
    await waitFor(() => {
      expect(screen.getByText(/You message has been sent/i)).toBeInTheDocument();
    });

    // But EmailJS should NOT have been called
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it('sends email via EmailJS when honeypot is empty (real user)', async () => {
    emailjs.send.mockResolvedValue({ status: 200, text: 'OK' });
    renderContact();
    await waitFor(() => {
      expect(screen.getByLabelText(/Enter your name/i)).toBeInTheDocument();
    });

    fillForm(validFormData);

    fireEvent.click(screen.getByRole('button', { name: /Send Mail/i }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText(/You message has been sent/i)).toBeInTheDocument();
    });
  });
});

describe('Contact Form — Validation', () => {
  it('shows error when name is empty', async () => {
    renderContact();
    await waitFor(() => {
      expect(screen.getByLabelText(/Enter your name/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Mail/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    });

    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it('shows error when email is empty', async () => {
    renderContact();
    await waitFor(() => {
      expect(screen.getByLabelText(/Enter your name/i)).toBeInTheDocument();
    });

    fillForm({ name: 'Jane Doe' });

    fireEvent.click(screen.getByRole('button', { name: /Send Mail/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it('shows error when subject is empty', async () => {
    renderContact();
    await waitFor(() => {
      expect(screen.getByLabelText(/Enter your name/i)).toBeInTheDocument();
    });

    fillForm({ name: 'Jane Doe', email: 'jane@example.com' });

    fireEvent.click(screen.getByRole('button', { name: /Send Mail/i }));

    await waitFor(() => {
      expect(screen.getByText(/Subject is required/i)).toBeInTheDocument();
    });

    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it('shows error when message is empty', async () => {
    renderContact();
    await waitFor(() => {
      expect(screen.getByLabelText(/Enter your name/i)).toBeInTheDocument();
    });

    fillForm({
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Test Subject',
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Mail/i }));

    await waitFor(() => {
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
    });

    expect(emailjs.send).not.toHaveBeenCalled();
  });
});
