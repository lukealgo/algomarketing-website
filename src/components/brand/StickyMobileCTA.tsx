import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling 400px
      setVisible(window.scrollY > 400);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:hidden',
        'transition-transform duration-500 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      {/* Safe-area padding for notched devices */}
      <div className="bg-gradient-cta px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href="/contact"
          className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-white"
        >
          Book a Discovery Call
          <svg
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
