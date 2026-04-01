import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SocialRow from '../SocialRow'
import { information } from '@/lib/data/database'

describe('SocialRow', () => {
  it('renders the social links list', () => {
    render(<SocialRow />)
    expect(screen.getByRole('list', { name: 'Social links' })).toBeInTheDocument()
  })

  it('renders only the 5 populated social links (empty hrefs filtered out)', () => {
    render(<SocialRow />)
    expect(screen.getAllByRole('link')).toHaveLength(5)
  })

  it('GitHub link has correct href from database', () => {
    render(<SocialRow />)
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute(
      'href',
      information.socialLinks.github
    )
  })

  it('LinkedIn link has correct href from database', () => {
    render(<SocialRow />)
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
      'href',
      information.socialLinks.linkedin
    )
  })

  it('all social links open in a new tab', () => {
    render(<SocialRow />)
    screen.getAllByRole('link').forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
    })
  })

  it('all social links have rel="noopener noreferrer"', () => {
    render(<SocialRow />)
    screen.getAllByRole('link').forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
