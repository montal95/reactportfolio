import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../ContactForm'

// Mock global fetch — individual tests override as needed
globalThis.fetch = vi.fn() as unknown as typeof fetch

const fillForm = ({
  name,
  email,
  subject,
  message,
}: Partial<{ name: string; email: string; subject: string; message: string }>) => {
  fireEvent.change(screen.getByLabelText(/^Name/), {
    target: { name: 'name', value: name ?? '' },
  })
  fireEvent.change(screen.getByLabelText(/^Email/), {
    target: { name: 'email', value: email ?? '' },
  })
  fireEvent.change(screen.getByLabelText(/^Subject/), {
    target: { name: 'subject', value: subject ?? '' },
  })
  fireEvent.change(screen.getByLabelText(/^Message/), {
    target: { name: 'message', value: message ?? '' },
  })
}

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: /Send message/i }))
}

const validFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Test Subject',
  message: 'Hello, this is a test message.',
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Contact Form — Honeypot', () => {
  it('renders the hidden form-name input for Netlify Forms', () => {
    render(<ContactForm />)
    const hiddenInput = document.querySelector('input[name="form-name"]')
    expect(hiddenInput).not.toBeNull()
    expect(hiddenInput).toHaveAttribute('value', 'contact')
  })

  it('renders the honeypot field with the hiding class', () => {
    render(<ContactForm />)
    const honeypotInput = screen.getByLabelText(/Website/i)
    expect(honeypotInput).toBeInTheDocument()
    expect(honeypotInput.closest('.form-honeypot')).not.toBeNull()
  })

  it('honeypot field is not tab-accessible', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/Website/i)).toHaveAttribute('tabIndex', '-1')
  })

  it('honeypot field has autocomplete disabled', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/Website/i)).toHaveAttribute('autoComplete', 'off')
  })

  it('silently shows success when honeypot is filled (bot detected)', async () => {
    render(<ContactForm />)
    fillForm(validFormData)
    fireEvent.change(screen.getByLabelText(/Website/i), {
      target: { name: 'website', value: 'http://spam-bot.example.com' },
    })
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Message sent!/i)).toBeInTheDocument()
    })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('submits via Netlify Forms fetch when honeypot is empty (real user)', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response)
    render(<ContactForm />)
    fillForm(validFormData)
    submitForm()
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
    })
    expect(fetch).toHaveBeenCalledWith(
      '/',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: expect.stringContaining('form-name=contact'),
      })
    )
    await waitFor(() => {
      expect(screen.getByText(/Message sent!/i)).toBeInTheDocument()
    })
  })

  it('clears all form fields after successful submission', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response)
    render(<ContactForm />)
    fillForm(validFormData)
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Message sent!/i)).toBeInTheDocument()
    })
    // Bring the form back — fields should be reset to empty
    fireEvent.click(screen.getByRole('button', { name: 'Send another' }))
    expect(screen.getByLabelText(/^Name/)).toHaveValue('')
    expect(screen.getByLabelText(/^Email/)).toHaveValue('')
    expect(screen.getByLabelText(/^Subject/)).toHaveValue('')
    expect(screen.getByLabelText(/^Message/)).toHaveValue('')
  })

  it('shows error message when server returns a non-ok response', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response)
    render(<ContactForm />)
    fillForm(validFormData)
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    })
  })

  it('shows error message when fetch throws a network error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network failure'))
    render(<ContactForm />)
    fillForm(validFormData)
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    })
  })
})

describe('Contact Form — Validation', () => {
  it('shows error when name is empty', async () => {
    render(<ContactForm />)
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
    })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('shows error when email is empty', async () => {
    render(<ContactForm />)
    fillForm({ name: 'Jane Doe' })
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('shows error when subject is empty', async () => {
    render(<ContactForm />)
    fillForm({ name: 'Jane Doe', email: 'jane@example.com' })
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Subject is required/i)).toBeInTheDocument()
    })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('shows error when message is empty', async () => {
    render(<ContactForm />)
    fillForm({ name: 'Jane Doe', email: 'jane@example.com', subject: 'Test Subject' })
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument()
    })
    expect(fetch).not.toHaveBeenCalled()
  })
})
