'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TwfSidebar, PageId } from '@/components/twf-sidebar';
import { TwfHeroSlider } from '@/components/twf-hero-slider';
import { TwfHomeSections } from '@/components/twf-home-sections';
import { TwfInnerPages } from '@/components/twf-inner-pages';
import { TwfFooterAndModals } from '@/components/twf-footer-and-modals';
import { TwfLoadingScreen } from '@/components/twf-loading-screen';
import { TwfCookieBanner } from '@/components/twf-cookie-banner';
import { TwfScrollProgress } from '@/components/twf-scroll-progress';
import { CinemaFilm, PhotoFrame } from '@/lib/masoom-data';
import { initGlobalClickSound } from '@/lib/twf-sound';

export default function MasoomStudioTwfPage() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilm, setActiveFilm] = useState<CinemaFilm | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoFrame | null>(null);
  const [quickEnquireOpen, setQuickEnquireOpen] = useState(false);
  const [cookiePolicyOpen, setCookiePolicyOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(
    undefined
  );

  // Initialize global aesthetic click sound across all buttons & interactive controls
  useEffect(() => {
    const cleanup = initGlobalClickSound();
    return cleanup;
  }, []);

  // Silky quartic ease-out scroll-to-top helper on menu navigation
  const smoothScrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;
    const startY = window.scrollY || document.documentElement.scrollTop || 0;
    if (startY <= 4) {
      window.scrollTo(0, 0);
      return;
    }
    const duration = Math.min(480, Math.max(240, startY * 0.14));
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const easeOut = 1 - Math.pow(1 - t, 4);
      window.scrollTo(0, startY * (1 - easeOut));
      if (t < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  const handleNavigate = (page: PageId) => {
    if (page === activePage) {
      smoothScrollToTop();
      return;
    }
    setActivePage(page);
    smoothScrollToTop();
  };

  const handleSearchSubmit = (q: string) => {
    setSearchQuery(q);
    if (activePage !== 'films') {
      setActivePage('films');
      smoothScrollToTop();
    }
  };

  const handleOpenQuickEnquire = (service?: string) => {
    setPreselectedService(service);
    setQuickEnquireOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#111111] selection:bg-[#ff3333] selection:text-white">
      {/* Minimal Initial Loading Screen */}
      <TwfLoadingScreen />

      {/* Floating Interactive Cookie Consent Notice */}
      <TwfCookieBanner onOpenCookiePolicy={() => setCookiePolicyOpen(true)} />

      {/* Scroll-Up Button with Filling Circular Progress Border */}
      <TwfScrollProgress />

      {/* ===================================================================
          LEFT SIDEBAR MENU
          - Collapses smoothly on Smartphone (< 640px) with a floating trigger
          - Fixed on Tablet (sm: 172px) and Desktop (lg: 214px)
          - Functional search box with live results dropdown & submission
          - Includes Moving Trail Border on "We'd love to hear your story!"
         =================================================================== */}
      <TwfSidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onOpenQuickEnquire={() => handleOpenQuickEnquire()}
        onPlayFilm={(film) => setActiveFilm(film)}
        onSelectPhoto={(photo) => setActivePhoto(photo)}
      />

      {/* ===================================================================
          RIGHT FLOATING SHEET
          - Full width on Smartphone (ml-1.5) when left menu is collapsed
          - Offset on Tablet (sm:ml-[172px]) & Desktop (lg:ml-[214px])
         =================================================================== */}
      <div className="ml-1.5 sm:ml-2.5 lg:ml-3 mr-1.5 sm:mr-2.5 lg:mr-3 my-1.5 sm:my-2.5 lg:my-3 transition-all duration-300">
        <main className="bg-[#f8f8f7] text-[#111111] sm:pl-[172px] lg:pl-[214px] rounded-[18px] sm:rounded-[24px] min-h-[calc(100vh-12px)] sm:min-h-[calc(100vh-20px)] lg:min-h-[calc(100vh-24px)] overflow-hidden shadow-2xl flex flex-col justify-between">
          {/* Smooth Animated Page Content Transition when Switching Menus */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full"
            >
              {activePage === 'home' ? (
                <div className="p-2 sm:p-4 lg:p-5 space-y-6 sm:space-y-10">
                  {/* 1. Muted Looping Video Taking the Entire Header (Fills Video Box Completely) */}
                  <TwfHeroSlider
                    onPlayFilm={(film) => setActiveFilm(film)}
                    onNavigateFilms={() => handleNavigate('films')}
                    onOpenQuickEnquire={() => handleOpenQuickEnquire()}
                  />

                  {/* 2. Home Sections: Separate Landscape & Portrait Trailer Rows, Moving Photos, Studio Globe, Cursive Gratitude, Sacred Moments & Why Us */}
                  <TwfHomeSections
                    onPlayFilm={(film) => setActiveFilm(film)}
                    onSelectPhoto={(photo) => setActivePhoto(photo)}
                    onNavigate={handleNavigate}
                    onOpenQuickEnquire={(service) => handleOpenQuickEnquire(service)}
                  />
                </div>
              ) : (
                <div className="p-2 sm:p-4 lg:p-5">
                  <TwfInnerPages
                    activePage={activePage}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onPlayFilm={(film) => setActiveFilm(film)}
                    onSelectPhoto={(photo) => setActivePhoto(photo)}
                    onNavigate={handleNavigate}
                    onOpenQuickEnquire={(service) => handleOpenQuickEnquire(service)}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* 3. Transparent Content Footer Video Box + Big Logo & Modals (Leaves same border space as header) */}
          <div className="px-2 sm:px-4 lg:px-5 pb-2 sm:pb-4 lg:pb-5">
            <TwfFooterAndModals
              onNavigate={handleNavigate}
              activeFilm={activeFilm}
              onCloseFilm={() => setActiveFilm(null)}
              activePhoto={activePhoto}
              onClosePhoto={() => setActivePhoto(null)}
              onSelectPhoto={(photo) => setActivePhoto(photo)}
              quickEnquireOpen={quickEnquireOpen}
              preselectedService={preselectedService}
              onCloseQuickEnquire={() => setQuickEnquireOpen(false)}
              onOpenQuickEnquire={(service) => handleOpenQuickEnquire(service)}
              cookiePolicyOpen={cookiePolicyOpen}
              onCloseCookiePolicy={() => setCookiePolicyOpen(false)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

