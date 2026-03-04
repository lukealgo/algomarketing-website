import { useState, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const;

function LogoWordmark({ variant = 'color' }: { variant?: 'color' | 'white' }) {
  if (variant === 'white') {
    return (
      <a
        href="/"
        className="inline-flex items-center font-display text-2xl font-semibold tracking-tight select-none text-white"
        aria-label="AlgoMarketing - Home"
      >
        algomarketing
      </a>
    );
  }

  return (
    <a
      href="/"
      className="inline-flex items-center font-display text-2xl font-semibold tracking-tight select-none"
      aria-label="AlgoMarketing - Home"
    >
      <span className="text-gradient-brand">algo</span>
      <span className="text-brand-navy">marketing</span>
    </a>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-7 w-7', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Sticky header bar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          {/* Logo */}
          <LogoWordmark variant="color" />

          {/* Right-side controls */}
          <div className="flex items-center gap-3">
            {/* CTA button - hidden on small mobile to keep header clean */}
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center rounded-full border-2 border-brand-navy px-5 py-2 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
            >
              Get in Touch
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-brand-navy transition-colors hover:bg-brand-navy/5"
              aria-label="Open menu"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={cn(
          'fixed inset-0 z-[100] transition-all duration-500 ease-in-out',
          isOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0 pointer-events-none',
        )}
        aria-hidden={!isOpen}
      >
        {/* Background */}
        <div
          className={cn(
            'absolute inset-0 bg-brand-navy transition-transform duration-500 ease-in-out origin-top',
            isOpen ? 'scale-y-100' : 'scale-y-0',
          )}
        />

        {/* Overlay content */}
        <div
          className={cn(
            'relative z-10 flex h-full flex-col transition-opacity duration-300 delay-200',
            isOpen ? 'opacity-100' : 'opacity-0',
          )}
        >
          {/* Overlay header */}
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
            <LogoWordmark variant="white" />
            <button
              type="button"
              onClick={close}
              className="inline-flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:text-brand-green"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-4 px-5 md:gap-6">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="nav-overlay-link group relative block text-center"
                style={{
                  transitionDelay: isOpen ? `${200 + i * 60}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <span className="nav-stroke-text font-display text-5xl font-semibold uppercase tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Overlay footer */}
          <div className="mx-auto w-full max-w-7xl px-5 py-6 md:px-8">
            <a
              href="/contact"
              onClick={close}
              className="inline-flex items-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-brand-navy transition-transform hover:scale-105"
            >
              Book a Discovery Call
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Inline styles for stroke text effect */}
      <style>{`
        .nav-stroke-text {
          color: transparent;
          -webkit-text-stroke: 1.5px #1FE0BF;
          transition: color 0.25s ease, -webkit-text-stroke-color 0.25s ease;
        }
        .nav-overlay-link:hover .nav-stroke-text {
          color: #1FE0BF;
          -webkit-text-stroke: 1.5px #1FE0BF;
        }
        @media (min-width: 768px) {
          .nav-stroke-text {
            -webkit-text-stroke-width: 2px;
          }
        }
      `}</style>
    </>
  );
}
