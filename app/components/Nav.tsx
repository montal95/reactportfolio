'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'react-feather';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/',        label: 'Home'   },
  { href: '/about',   label: 'About'  },
  { href: '/work',    label: 'Work'   },
  { href: '/resume',  label: 'Resume' },
];

export default function Nav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className={`site-nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav-inner">

        {/* Logo */}
        <Link
          href="/"
          className="brand"
          onClick={() => setMobileOpen(false)}
          aria-label="Sam Montalvo Jr — home"
        >
          sam_montalvo<span className="brand-accent">.jr</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-link${isActive(href) ? ' is-active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: theme toggle + Contact */}
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            href="/contact"
            className={`nav-link${isActive('/contact') ? ' is-active' : ''}`}
          >
            Contact
          </Link>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <ul role="list">
              {[...navLinks, { href: '/contact', label: 'Contact' }].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`nav-link${isActive(href) ? ' is-active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
