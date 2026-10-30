'use client';

import React, { useState, useEffect } from 'react';

export function TwfLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Elegant, fast entrance and clean exit
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 950);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <aside
      aria-label="Loading Masoom Studio"
      aria-busy={isLoading}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0d0f] transition-opacity duration-600 ease-out ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-6 px-6 text-center select-none">
        {/* Big Masoom Studio Logo */}
        <div className="relative">
          <img
            src="/MasoomStudioLogo.png"
            alt="Masoom Studio"
            className="w-40 sm:w-52 md:w-60 h-auto object-contain drop-shadow-[0_10px_35px_rgba(255,51,51,0.25)] transition-transform duration-700 ease-out scale-100 animate-pulse"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Minimal Loading Text */}
        <div className="space-y-1.5">
          <p
            className="text-xs sm:text-sm tracking-[0.35em] uppercase text-white/70 font-light"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Loading...
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#ff3333] to-transparent mx-auto rounded-full" />
        </div>
      </div>
    </aside>
  );
}
