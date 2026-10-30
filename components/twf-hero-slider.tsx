'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, ArrowUpRight } from 'lucide-react';
import { HEADER_HERO_FILMS, CinemaFilm } from '@/lib/masoom-data';

interface TwfHeroSliderProps {
  onPlayFilm: (film: CinemaFilm) => void;
  onNavigateFilms: () => void;
  onOpenQuickEnquire?: () => void;
}

export function TwfHeroSlider({
  onPlayFilm,
  onNavigateFilms,
  onOpenQuickEnquire,
}: TwfHeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const fgVideoRef = useRef<HTMLVideoElement | null>(null);
  const isInViewRef = useRef(true);

  const currentSlide = HEADER_HERO_FILMS[activeIndex] || HEADER_HERO_FILMS[0];
  const activeVideoSrc = currentSlide.videoSrc || '/reels/DV30vU6gci7.mp4';

  useEffect(() => {
    const timer = setInterval(() => {
      if (isInViewRef.current) {
        setActiveIndex((prev) => (prev + 1) % HEADER_HERO_FILMS.length);
      }
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
          const video = fgVideoRef.current;
          if (!video) return;
          if (entry.isIntersecting) {
            video.muted = true;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = fgVideoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.load();

    if (isInViewRef.current) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }
  }, [activeIndex, activeVideoSrc]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(
      (prev) => (prev - 1 + HEADER_HERO_FILMS.length) % HEADER_HERO_FILMS.length
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % HEADER_HERO_FILMS.length);
  };

  return (
    <section
      ref={sectionRef}
      onClick={() => onPlayFilm(currentSlide)}
      className="relative w-full aspect-[16/11] sm:aspect-video min-h-[280px] sm:min-h-[430px] lg:min-h-[540px] rounded-[18px] sm:rounded-[24px] overflow-hidden bg-[#080808] select-none shadow-2xl border border-black/10 cursor-pointer group"
    >
      {/* FOREGROUND HEADER VIDEO (Fills 100% of video box edge-to-edge, crops out baked-in letterbox bars, faces never cut) */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
        <video
          key={currentSlide.id}
          ref={fgVideoRef}
          src={activeVideoSrc}
          poster={currentSlide.heroImageUrl}
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={(e) => {
            if (isInViewRef.current) {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }
          }}
          style={{
            objectPosition: currentSlide.objectPosition || '50% 38%',
          }}
          className="absolute inset-0 w-full h-full object-cover scale-[1.15]"
        />
      </div>

      {/* TOP-LEFT CORNER OF VIDEO BOX: TRANSPARENT MASOOM STUDIO LOGO */}
      <div className="pointer-events-none absolute top-3 left-3 sm:top-5 sm:left-6 z-20">
        <img
          src="/MasoomStudioLogo.png"
          alt="Masoom Studio"
          loading="eager"
          decoding="async"
          className="w-16 h-13 sm:w-24 sm:h-19 lg:w-28 lg:h-22 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Soft Cinematic Bottom Gradient Scrim */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      {/* BOTTOM OF HEADER: AESTHETIC STORY INFO + WORKING ACTION BUTTONS & SLIDE SWITCHERS */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-3.5 sm:px-7 lg:px-10 pb-3.5 sm:pb-6 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        {/* Left: Romantic Cursive Accent + Couple Title & Synopsis */}
        <div className="min-w-0 text-left">
          <span
            className="text-base sm:text-xl lg:text-2xl text-[#ff3333] block leading-none mb-0.5 drop-shadow"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {currentSlide.scriptHighlight || 'forever begins here'}
          </span>
          <h1
            className="text-xl sm:text-3xl lg:text-5xl font-normal text-white tracking-tight leading-tight drop-shadow"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {currentSlide.couple}
          </h1>
          <p className="text-[11px] sm:text-xs text-white/85 mt-0.5 line-clamp-1 max-w-xl font-light">
            {currentSlide.synopsis}
          </p>
        </div>

        {/* Right: Working Watch Button, All Films Button, Slide Dots & Prev/Next Controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-wrap items-center justify-between md:justify-end gap-2 sm:gap-2.5 shrink-0"
        >
          {/* Watch Film & Enquire Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onPlayFilm(currentSlide)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#ff3333] hover:bg-[#e02828] active:scale-95 text-white text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-medium transition-all shadow-lg shadow-[#ff3333]/30 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Watch Film</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onOpenQuickEnquire) {
                  onOpenQuickEnquire();
                } else {
                  onNavigateFilms();
                }
              }}
              className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-black/55 hover:bg-white hover:text-[#111111] backdrop-blur-md border border-white/25 text-white text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-medium transition-all cursor-pointer"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Slide Dots + Prev/Next */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
              {HEADER_HERO_FILMS.map((slide, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Play ${slide.couple}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      active
                        ? 'w-5 sm:w-6 bg-[#ff3333]'
                        : 'w-1.5 bg-white/50 hover:bg-white'
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous header video"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-[#ff3333] backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next header video"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-[#ff3333] backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

