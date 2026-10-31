'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * High-performance luxury preloader:
 * - Stays visible until the website, fonts, and critical hero media are fully loaded & decoded
 * - Displays a sleek, smooth 0% -> 100% progress counter and glowing crimson line
 * - Performs a silky smooth exit fade once the site is completely ready
 */
export function TwfLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(15);
  const isCompleteRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let progressInterval: NodeJS.Timeout | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;
    let fadeOutTimer: NodeJS.Timeout | null = null;
    let unmountTimer: NodeJS.Timeout | null = null;

    const criticalAssets = [
      '/MasoomStudioLogo.webp',
      '/reels/DV30vU6gci7.webp',
      '/Gallary/LandingPage1.webp',
      '/Gallary/Landingpage2.webp',
      '/Gallary/LandingPage3.webp',
    ];

    let loadedCriticalCount = 0;

    const finishLoading = () => {
      if (isCompleteRef.current) return;
      isCompleteRef.current = true;
      setProgress(100);

      // Brief delay at 100% for visual satisfaction, then silky fade out
      fadeOutTimer = setTimeout(() => {
        setIsLoading(false);
      }, 350);

      unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, 1050);
    };

    // Incremental progress simulation while waiting for real assets & document load
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (isCompleteRef.current) return 100;
        // Glide smoothly up to 92% until complete signal arrives
        if (prev < 45) return prev + 6;
        if (prev < 75) return prev + 3;
        if (prev < 90) return prev + 1;
        return prev;
      });
    }, 90);

    // Check critical visual assets
    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      const onAssetDone = () => {
        loadedCriticalCount += 1;
        if (loadedCriticalCount >= criticalAssets.length - 1) {
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
        setProgress((prev) => Math.max(prev, 60));
      }).catch(() => {});
    }

    // Window load listener (all initial HTML, scripts, styles, and hero media ready)
    if (document.readyState === 'complete') {
      // Document is already ready, give at least 550ms for smooth aesthetic reveal
      setTimeout(() => {
        finishLoading();
      }, 600);
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
      if (progressInterval) clearInterval(progressInterval);
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
      <div className="flex flex-col items-center justify-center space-y-7 px-6 text-center max-w-sm w-full">
        {/* Masoom Studio Logo */}
        <div className="relative">
          <img
            src="/MasoomStudioLogo.webp"
            alt="Masoom Studio"
            className="w-44 sm:w-56 md:w-64 h-auto object-contain drop-shadow-[0_12px_40px_rgba(255,51,51,0.28)] transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Minimal Progress Bar & Status */}
        <div className="w-full max-w-[200px] space-y-2.5">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#ff3333] via-[#ff6666] to-[#ff3333] transition-all duration-150 ease-out rounded-full shadow-[0_0_12px_#ff3333]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/50 font-light">
            <span>Loading</span>
            <span className="text-[#ff3333] font-medium tracking-normal text-xs">{progress}%</span>
          </div>
        </div>

        <p className="text-[11px] text-white/40 tracking-wider font-light">
          Wedding Films &amp; Photography · Patna
        </p>
      </div>
    </aside>
  );
}
