import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from '../Nav'

// Render next/link as a plain <a> — no router context needed
vi.mock('next/link', () => ({
  default: function MockLink({ href, children, ...rest }: any) {
    return <a href={href} {...rest}>{children}</a>
  },
}))

// Stub usePathname — all tests start at "/"
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Stub useTheme — Nav calls it on every render
vi.mock('../ThemeProvider', () => ({
  useTheme: () => ({ theme: 'dark', toggleTheme: vi.fn() }),
}))

describe('Nav', () => {
  it('renders without crashing', () => {
    render(<Nav />)
  })

  it('renders the nav landmark with aria-label "Main navigation"', () => {
    render(<Nav />)
    expect(
      screen.getByRole('navigation', { name: 'Main navigation' })
    ).toBeInTheDocument()
  })

  it('renders all 5 nav links: Home, About, Work, Resume, Contact', () => {
    render(<Nav />)
    ;['Home', 'About', 'Work', 'Resume', 'Contact'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })

  it('renders brand link with visible text containing sam_montalvo', () => {
    render(<Nav />)
    // Brand link has aria-label "Sam Montalvo Jr — home"
    const brandLink = screen.getByRole('link', { name: /Sam Montalvo Jr/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink.textContent).toMatch(/sam_montalvo/)
  })
})
