import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroContent from '../HeroContent'

// Render next/image as a plain <img> — no Next.js runtime needed
vi.mock('next/image', () => ({
  default: ({ src, alt, ...rest }: any) => <img src={src} alt={alt} />,
}))

// Render framer-motion elements as plain HTML — no animation runtime needed
vi.mock('framer-motion', () => {
  const el =
    (tag: string) =>
    ({ children, variants, initial, animate, exit, transition, ...rest }: any) =>
      React.createElement(tag, rest, children)
  return {
    motion: {
      div: el('div'),
      h1: el('h1'),
      p: el('p'),
      span: el('span'),
    },
    AnimatePresence: ({ children }: any) => children,
  }
})

const defaultProps = {
  aboutContent: 'Full-stack engineer specializing in Rails and React.',
  available: true,
  cvfile: '/files/Sam-Montalvo-Jr-CV.pdf',
  brandImage: '/images/Sam-Montalvo.webp',
}

describe('HeroContent', () => {
  it('renders bio text from the aboutContent prop', () => {
    render(<HeroContent {...defaultProps} />)
    expect(screen.getByText(defaultProps.aboutContent)).toBeInTheDocument()
  })

  it('renders all three career stat numbers', () => {
    render(<HeroContent {...defaultProps} />)
    expect(screen.getByText('4+')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('10k+')).toBeInTheDocument()
  })

  it('"View my work" CTA links to /work', () => {
    render(<HeroContent {...defaultProps} />)
    expect(screen.getByRole('link', { name: /View my work/i })).toHaveAttribute('href', '/work')
  })

  it('"Download CV" CTA links to the cvfile prop', () => {
    render(<HeroContent {...defaultProps} />)
    expect(screen.getByRole('link', { name: /Download CV/i })).toHaveAttribute(
      'href',
      defaultProps.cvfile
    )
  })

  it('renders the availability badge when available=true', () => {
    render(<HeroContent {...defaultProps} available={true} />)
    expect(screen.getByText(/Available for work/i)).toBeInTheDocument()
  })

  it('does not render the availability badge when available=false', () => {
    render(<HeroContent {...defaultProps} available={false} />)
    expect(screen.queryByText(/Available for work/i)).not.toBeInTheDocument()
  })

  it('renders the hero photo with correct alt text', () => {
    render(<HeroContent {...defaultProps} />)
    expect(screen.getByRole('img', { name: 'Sam Montalvo Jr' })).toBeInTheDocument()
  })
})
