'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Minimal Luxury Preloader for Masoom Studio:
 * - Displays ONLY the Masoom Studio logo and animated Loading... text
 * - Silky smooth fade out once fonts, document, and critical media are ready
 */
export function TwfLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const isCompleteRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let fallbackTimer: NodeJS.Timeout | null = null;
    let fadeOutTimer: NodeJS.Timeout | null = null;
    let unmountTimer: NodeJS.Timeout | null = null;

    const criticalAssets = [
      '/MasoomStudioLogo.webp',
      '/reels/DV30vU6gci7.webp',
      '/Gallary/LandingPage1.webp',
    ];

    let loadedCriticalCount = 0;

    const finishLoading = () => {
      if (isCompleteRef.current) return;
      isCompleteRef.current = true;

      // Silky fade out
      fadeOutTimer = setTimeout(() => {
        setIsLoading(false);
      }, 400);

      unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, 1100);
    };

    // Preload critical visual assets
    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      const onAssetDone = () => {
        loadedCriticalCount += 1;
        if (loadedCriticalCount >= criticalAssets.length) {
          if (document.readyState === 'complete') {
            finishLoading();
          }
        }
      };
      if (img.complete) {
        onAssetDone();
      } else {
        img.onload = onAssetDone;
        img.onerror = onAssetDone;
      }
    });

    // Font readiness
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (document.readyState === 'complete') {
          finishLoading();
        }
      }).catch(() => {});
    }

    // Window load listener (all initial HTML, scripts, styles, and hero media ready)
    if (document.readyState === 'complete') {
      setTimeout(() => {
        finishLoading();
      }, 650);
    } else {
      const handleWindowLoad = () => {
        finishLoading();
      };
      window.addEventListener('load', handleWindowLoad);
    }

    // Safety fallback: Never leave the user stuck on slow/offline networks
    fallbackTimer = setTimeout(() => {
      finishLoading();
    }, 4500);

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (fadeOutTimer) clearTimeout(fadeOutTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <aside
      aria-label="Loading Masoom Studio"
      aria-busy={isLoading}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b] transition-opacity duration-700 ease-out select-none ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-6 px-6 text-center select-none">
        {/* Masoom Studio Logo */}
        <div className="relative">
          <img
            src="/MasoomStudioLogo.webp"
            alt="Masoom Studio"
            className="w-48 sm:w-60 md:w-68 h-auto object-contain drop-shadow-[0_12px_40px_rgba(255,51,51,0.32)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Loading text Loading... with only animated ... dots */}
        <div className="flex items-baseline text-xs sm:text-sm tracking-[0.24em] uppercase font-light text-white/70">
          <span>Loading</span>
          <span className="inline-flex tracking-normal ml-0.5 text-[#ff3333] font-bold text-base leading-none">
            <span className="animate-loading-dot-1">.</span>
            <span className="animate-loading-dot-2">.</span>
            <span className="animate-loading-dot-3">.</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
