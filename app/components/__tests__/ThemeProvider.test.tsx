import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeProvider, { useTheme } from '../ThemeProvider'

/** Minimal consumer that surfaces context values for assertions */
function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

const renderWithProvider = () =>
  render(
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>
  )

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('provides "dark" as the initial default theme', () => {
    renderWithProvider()
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('reads stored "light" theme from localStorage on mount', async () => {
    localStorage.setItem('theme', 'light')
    renderWithProvider()
    // useEffect flushes via act() inside render
    expect(await screen.findByText('light')).toBeInTheDocument()
  })

  it('toggleTheme switches from dark to light', () => {
    renderWithProvider()
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('toggleTheme switches from light back to dark', async () => {
    localStorage.setItem('theme', 'light')
    renderWithProvider()
    await screen.findByText('light')
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('persists new theme to localStorage after toggle', () => {
    renderWithProvider()
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('sets data-theme attribute on <html> after toggle', () => {
    renderWithProvider()
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})
