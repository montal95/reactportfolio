import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../ContactForm'

// Mock the Server Action module — must be hoisted before any imports resolve
vi.mock('@/app/actions/contact', () => ({
  submitContact: vi.fn(),
}))

// Pull the typed mock reference after vi.mock is set up
import { submitContact } from '@/app/actions/contact'

const fillForm = ({
  name,
  email,
  subject,
  message,
}: Partial<{ name: string; email: string; subject: string; message: string }>) => {
  if (name !== undefined)
    fireEvent.change(screen.getByLabelText(/^Name/), {
      target: { name: 'name', value: name },
    })
  if (email !== undefined)
    fireEvent.change(screen.getByLabelText(/^Email/), {
      target: { name: 'email', value: email },
    })
  if (subject !== undefined)
    fireEvent.change(screen.getByLabelText(/^Subject/), {
      target: { name: 'subject', value: subject },
    })
  if (message !== undefined)
    fireEvent.change(screen.getByLabelText(/^Message/), {
      target: { name: 'message', value: message },
    })
}

const submitForm = () =>
  fireEvent.click(screen.getByRole('button', { name: /Send message/i }))

const validFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Test Subject',
  message: 'Hello, this is a test message.',
}

beforeEach(() => {
  vi.clearAllMocks()
})

// ---------------------------------------------------------------------------
// Honeypot
// ---------------------------------------------------------------------------

describe('Contact Form — Honeypot', () => {
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

  it('silently shows success when honeypot is filled (bot detected server-side)', async () => {
    vi.mocked(submitContact).mockResolvedValue({ status: 'success', message: '' })
    render(<ContactForm />)
    fillForm(validFormData)
    fireEvent.change(screen.getByLabelText(/Website/i), {
      target: { name: 'website', value: 'http://spam-bot.example.com' },
    })
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Message sent!/i)).toBeInTheDocument()
    })
  })
})

// ---------------------------------------------------------------------------
// Submission outcomes
// ---------------------------------------------------------------------------

describe('Contact Form — Submission', () => {
  it('shows success screen after successful submission', async () => {
    vi.mocked(submitContact).mockResolvedValue({ status: 'success', message: '' })
    render(<ContactForm />)
    fillForm(validFormData)
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Message sent!/i)).toBeInTheDocument()
    })
    expect(submitContact).toHaveBeenCalledTimes(1)
  })

  it('shows empty form after clicking Send another', async () => {
    vi.mocked(submitContact).mockResolvedValue({ status: 'success', message: '' })
    render(<ContactForm />)
    fillForm(validFormData)
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Message sent!/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole('button', { name: 'Send another' }))
    // ContactFormInner remounts — uncontrolled inputs default to empty
    expect(screen.getByLabelText(/^Name/)).toHaveValue('')
    expect(screen.getByLabelText(/^Email/)).toHaveValue('')
    expect(screen.getByLabelText(/^Subject/)).toHaveValue('')
    expect(screen.getByLabelText(/^Message/)).toHaveValue('')
  })

  it('shows error message when action returns an error state', async () => {
    vi.mocked(submitContact).mockResolvedValue({
      status: 'error',
      message: 'Something went wrong. Please try again.',
    })
    render(<ContactForm />)
    fillForm(validFormData)
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    })
  })

  it('shows error message when action returns an error (e.g. network failure)', async () => {
    // The action's try/catch means it always returns ContactState — it never throws.
    // A network failure at the Resend layer is caught and returned as an error state.
    vi.mocked(submitContact).mockResolvedValue({
      status: 'error',
      message: 'Something went wrong. Please try again.',
    })
    render(<ContactForm />)
    fillForm(validFormData)
    submitForm()
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})

// ---------------------------------------------------------------------------
// Validation — all handled server-side; tests verify the UI reflects it
// ---------------------------------------------------------------------------

describe('Contact Form — Validation', () => {
  it('shows error when name is missing', async () => {
    vi.mocked(submitContact).mockResolvedValue({
      status: 'error',
      message: 'Name is required.',
    })
    render(<ContactForm />)
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
    })
  })

  it('shows error when email is missing', async () => {
    vi.mocked(submitContact).mockResolvedValue({
      status: 'error',
      message: 'Email is required.',
    })
    render(<ContactForm />)
    fillForm({ name: 'Jane Doe' })
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    })
  })

  it('shows error when subject is missing', async () => {
    vi.mocked(submitContact).mockResolvedValue({
      status: 'error',
      message: 'Subject is required.',
    })
    render(<ContactForm />)
    fillForm({ name: 'Jane Doe', email: 'jane@example.com' })
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Subject is required/i)).toBeInTheDocument()
    })
  })

  it('shows error when message is missing', async () => {
    vi.mocked(submitContact).mockResolvedValue({
      status: 'error',
      message: 'Message is required.',
    })
    render(<ContactForm />)
    fillForm({ name: 'Jane Doe', email: 'jane@example.com', subject: 'Test Subject' })
    submitForm()
    await waitFor(() => {
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument()
    })
  })
})
