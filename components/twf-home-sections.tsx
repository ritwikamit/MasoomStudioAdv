'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Play,
  Globe2,
  MapPin,
  RotateCcw,
  Phone,
} from 'lucide-react';
import { TwfRealisticGlobe } from './twf-realistic-globe';
import {
  CINEMA_FILMS,
  INSTAGRAM_REELS,
  GALLERY_PHOTOS,
  SIGNATURE_FRAMES,
  GRATITUDE_NOTES,
  STUDIO_INFO,
  CinemaFilm,
  InstagramReelItem,
  PhotoFrame,
} from '@/lib/masoom-data';
import { PageId } from './twf-sidebar';

interface TwfHomeSectionsProps {
  onPlayFilm: (film: CinemaFilm) => void;
  onSelectPhoto: (photo: PhotoFrame) => void;
  onNavigate: (page: PageId) => void;
  onOpenQuickEnquire?: (service?: string) => void;
}

/**
 * HoverVideoBox:
 * - Plays in website only (never redirects externally)
 * - Automatically plays muted when visible in viewport and on hover
 * - Enlarges smoothly on hover
 * - Clean detail (couple + location) and Mute/Unmute button at bottom
 */
interface HoverVideoBoxProps {
  videoSrc: string;
  posterUrl: string;
  couple: string;
  location: string;
  aspectClass?: string;
  onOpenModal: () => void;
}

function HoverVideoBox({
  videoSrc,
  posterUrl,
  couple,
  location,
  aspectClass = 'aspect-[9/14]',
  onOpenModal,
}: HoverVideoBoxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInViewRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            vid.muted = isMuted;
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      vid.pause();
    };
  }, [isMuted]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onClick={onOpenModal}
      className={`group relative shrink-0 ${aspectClass} rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#0d0d0d] cursor-pointer border border-black/10 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.03] hover:z-30`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterUrl}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onCanPlay={(e) => {
          if (isInViewRef.current) {
            e.currentTarget.muted = isMuted;
            e.currentTarget.play().catch(() => {});
          }
        }}
        className="w-full h-full object-cover object-[50%_16%]"
      />

      {/* Aesthetic Bottom Gradient Scrim */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 transition-opacity duration-300 ${
          isHovered ? 'opacity-95' : 'opacity-85'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {/* Editorial Information + Mute/Unmute Button */}
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex items-end justify-between gap-2.5 z-20">
        <div className="min-w-0 text-left">
          <span
            className="text-sm sm:text-base text-[#ff3333] block truncate leading-none mb-0.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {location}
          </span>
          <h3
            className="text-lg sm:text-xl text-white font-normal leading-tight truncate drop-shadow"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {couple}
          </h3>
        </div>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="relative z-30 shrink-0 w-8 h-8 rounded-full bg-black/75 hover:bg-[#ff3333] border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          )}
        </button>
      </div>
    </div>
  );
}

export function TwfHomeSections({
  onPlayFilm,
  onSelectPhoto,
  onNavigate,
  onOpenQuickEnquire,
}: TwfHomeSectionsProps) {
  // 1. Trailer & Gallery Filter State
  const [trailerTab, setTrailerTab] = useState<
    'videos' | 'gallery' | 'signature'
  >('videos');
  const landscapeRowRef = useRef<HTMLDivElement | null>(null);
  const portraitRowRef = useRef<HTMLDivElement | null>(null);
  const photoRowRef = useRef<HTMLDivElement | null>(null);

  // Separate Landscape (16:9) and Portrait (9:16) Videos
  const landscapeReels = INSTAGRAM_REELS.filter((r) => !r.isPortrait);
  const portraitReels = INSTAGRAM_REELS.filter((r) => r.isPortrait);

  // Zero-re-render GPU-accelerated scroll tracking for "Moving Wedding Photos"
  // Only updates when the moving photos section is near/in the viewport
  const movingSectionRef = useRef<HTMLDivElement | null>(null);
  const movingRowOneRef = useRef<HTMLDivElement | null>(null);
  const movingRowTwoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let isSectionVisible = false;

    const sectionEl = movingSectionRef.current;
    const visibilityObserver = sectionEl
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isSectionVisible = entry.isIntersecting;
            });
          },
          { rootMargin: '200px 0px' }
        )
      : null;

    if (sectionEl && visibilityObserver) {
      visibilityObserver.observe(sectionEl);
    }

    const updateRows = () => {
      rafId = null;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (movingRowOneRef.current) {
        const x1 = -((y * 0.38) % 1200);
        movingRowOneRef.current.style.transform = `translate3d(${x1.toFixed(1)}px, 0, 0)`;
      }
      if (movingRowTwoRef.current) {
        const x2 = ((y * 0.34) % 1200) - 600;
        movingRowTwoRef.current.style.transform = `translate3d(${x2.toFixed(1)}px, 0, 0)`;
      }
    };

    const handleScroll = () => {
      if (!isSectionVisible) return;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateRows);
      }
    };

    updateRows();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      visibilityObserver?.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Gratitude Testimonials State
  const [gratitudeIndex, setGratitudeIndex] = useState(0);

  const scrollRow = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: 'left' | 'right'
  ) => {
    if (!ref.current) return;
    const offset = dir === 'left' ? -360 : 360;
    ref.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleOpenReelAsFilm = (reel: InstagramReelItem) => {
    onPlayFilm({
      id: reel.id,
      videoSrc: reel.videoSrc,
      instagramUrl: reel.instagramUrl,
      reelCode: reel.code,
      isPortrait: reel.isPortrait,
      title: reel.title,
      scriptHighlight: 'wedding story',
      couple: reel.couple,
      location: reel.location,
      year: '2025',
      month: '2025',
      duration: reel.isPortrait ? 'Portrait Reel' : 'Wedding Trailer',
      thumbnailUrl: reel.posterUrl,
      heroImageUrl: reel.posterUrl,
      aiConceptPrompt: reel.caption,
      synopsis: reel.caption,
      emotionalHook: 'Captured naturally by Masoom Studio, Patna.',
      category: 'royal',
    });
  };

  // Curated fast-loading Marquee Photo Strips (8 unique photos x 2 for lightweight GPU compositing)
  const rowOnePhotos = [
    ...GALLERY_PHOTOS.slice(0, 8),
    ...GALLERY_PHOTOS.slice(0, 8),
  ];
  const rowTwoPhotos = [
    ...SIGNATURE_FRAMES.slice(0, 8),
    ...SIGNATURE_FRAMES.slice(0, 8),
  ];

  const currentGratitude = GRATITUDE_NOTES[gratitudeIndex];

  return (
    <div className="space-y-14 sm:space-y-20">
      {/* =====================================================================
          SECTION 1: WATCH A TRAILER
          - Landscape Videos (16:9) and Portrait Videos (9:16) in DIFFERENT ROWS
          - Cursive Typography & Working Scroll / Modal / Tab Buttons
         ===================================================================== */}
      <section className="pt-2 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1 sm:px-2">
          <div>
            <span
              className="text-xl sm:text-2xl text-[#ff3333] block leading-none mb-1"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Vibrant, fun &amp; natural wedding stories
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              WATCH <span className="italic font-script text-[#ff3333] lowercase px-1">a</span> TRAILER
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5">
            <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full bg-black/[0.05] backdrop-blur-xl border border-black/10">
              {[
                { id: 'videos', label: 'Wedding Trailers & Reels' },
                { id: 'gallery', label: 'Wedding Photos' },
                { id: 'signature', label: 'Signature Photos' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setTrailerTab(
                      tab.id as 'videos' | 'gallery' | 'signature'
                    )
                  }
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs transition-all cursor-pointer ${
                    trailerTab === tab.id
                      ? 'bg-[#111111] text-white font-medium shadow-sm'
                      : 'text-black/65 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('films')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-[11px] uppercase tracking-wider font-medium transition-colors shadow-sm cursor-pointer"
            >
              <span>All Films</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {trailerTab === 'videos' ? (
          <div className="space-y-8">
            {/* ===============================================================
                ROW 1: LANDSCAPE WEDDING TRAILERS & FILMS (16:9 WIDESCREEN ROW)
               =============================================================== */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-2 sm:px-3">
                <div className="flex items-baseline gap-2.5">
                  <h3
                    className="text-xl sm:text-2xl text-[#111111] lowercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    landscape wedding trailers
                  </h3>
                  <span
                    className="text-base sm:text-lg text-[#ff3333]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    widescreen stories
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollRow(landscapeRowRef, 'left')}
                    aria-label="Scroll landscape videos left"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#111111] hover:text-white border border-black/10 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRow(landscapeRowRef, 'right')}
                    aria-label="Scroll landscape videos right"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#111111] hover:text-white border border-black/10 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={landscapeRowRef}
                className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-3 px-2 sm:px-3 snap-x snap-mandatory"
              >
                {landscapeReels.map((reel) => (
                  <HoverVideoBox
                    key={reel.id}
                    videoSrc={reel.videoSrc}
                    posterUrl={reel.posterUrl}
                    couple={reel.couple}
                    location={reel.location}
                    aspectClass="w-[285px] sm:w-[370px] lg:w-[420px] aspect-video snap-start"
                    onOpenModal={() => handleOpenReelAsFilm(reel)}
                  />
                ))}
              </div>
            </div>

            {/* ===============================================================
                ROW 2: PORTRAIT WEDDING REELS (9:16 VERTICAL ROW)
               =============================================================== */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-2 sm:px-3">
                <div className="flex items-baseline gap-2.5">
                  <h3
                    className="text-xl sm:text-2xl text-[#111111] lowercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    portrait wedding reels
                  </h3>
                  <span
                    className="text-base sm:text-lg text-[#ff3333]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    vertical moments
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollRow(portraitRowRef, 'left')}
                    aria-label="Scroll portrait videos left"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#111111] hover:text-white border border-black/10 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRow(portraitRowRef, 'right')}
                    aria-label="Scroll portrait videos right"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#111111] hover:text-white border border-black/10 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={portraitRowRef}
                className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-3 px-2 sm:px-3 snap-x snap-mandatory"
              >
                {portraitReels.map((reel) => (
                  <HoverVideoBox
                    key={reel.id}
                    videoSrc={reel.videoSrc}
                    posterUrl={reel.posterUrl}
                    couple={reel.couple}
                    location={reel.location}
                    aspectClass="w-[205px] sm:w-[245px] lg:w-[265px] aspect-[9/14] snap-start"
                    onOpenModal={() => handleOpenReelAsFilm(reel)}
                  />
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* PHOTO TABS: WEDDING PHOTOS OR SIGNATURE PHOTOS */
          <div className="space-y-2.5">
            <div className="flex items-center justify-end gap-1.5 px-2 sm:px-3">
              <button
                type="button"
                onClick={() => scrollRow(photoRowRef, 'left')}
                aria-label="Scroll photos left"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#111111] hover:text-white border border-black/10 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(photoRowRef, 'right')}
                aria-label="Scroll photos right"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#111111] hover:text-white border border-black/10 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={photoRowRef}
              className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-3 px-2 sm:px-3 snap-x snap-mandatory"
            >
              {(trailerTab === 'gallery'
                ? GALLERY_PHOTOS.slice(0, 16)
                : SIGNATURE_FRAMES.slice(0, 16)
              ).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className="group relative shrink-0 w-[225px] sm:w-[270px] lg:w-[300px] aspect-[4/5] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#111111] snap-start cursor-pointer shadow-lg border border-black/10 transition-all duration-500 hover:scale-[1.04]"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                    <span
                      className="text-sm text-[#ff3333] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {photo.couple}
                    </span>
                    <span className="text-xs text-white/95 font-medium truncate block mt-0.5">
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          SECTION 2: MOVING WEDDING PHOTOS · TIMELESS MEMORIES IN MOTION
          Standalone interactive section: strips move ONLY while scrolling
         ===================================================================== */}
      <section ref={movingSectionRef} className="pt-2 sm:pt-4 space-y-4 px-1 sm:px-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1 sm:px-2">
          <div>
            <span
              className="text-base sm:text-lg text-[#ff3333] block leading-none"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              timeless memories in motion
            </span>
            <h2
              className="text-2xl sm:text-4xl text-[#111111] lowercase tracking-tight mt-0.5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              moving wedding photos
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-black/55 hidden sm:inline">
              Scroll page to glide through memories
            </span>
            <button
              type="button"
              onClick={() => onNavigate('films')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-[#ff3333] hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <span>View All Photos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="rounded-[20px] sm:rounded-[26px] bg-[#0a0a0a] text-white overflow-hidden shadow-2xl border border-white/10 py-5 sm:py-8">
          {/* Row 1: Interactive Scroll-Driven Horizontal Translation */}
          <div className="relative w-full overflow-hidden py-1.5">
            <div
              ref={movingRowOneRef}
              className="flex gap-3.5 sm:gap-5 px-3 w-max will-change-transform"
              style={{
                transform: 'translate3d(0px, 0, 0)',
              }}
            >
              {rowOnePhotos.map((photo, idx) => (
                <div
                  key={`m1-${photo.id}-${idx}`}
                  onClick={() => onSelectPhoto(photo)}
                  className={`group relative shrink-0 overflow-hidden rounded-[16px] sm:rounded-[20px] border border-white/15 bg-white/5 cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:border-[#ff3333] shadow-xl ${
                    idx % 3 === 0
                      ? 'w-[165px] sm:w-[225px] h-[215px] sm:h-[295px] mt-2'
                      : idx % 3 === 1
                      ? 'w-[195px] sm:w-[265px] h-[230px] sm:h-[315px]'
                      : 'w-[175px] sm:w-[240px] h-[210px] sm:h-[285px] mt-4'
                  }`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)',
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span
                      className="text-xs text-[#ff3333] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {photo.couple}
                    </span>
                    <span className="text-[11px] text-white/90 truncate block mt-0.5">
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Interactive Scroll-Driven Reverse Horizontal Translation */}
          <div className="relative w-full overflow-hidden py-1.5 mt-2">
            <div
              ref={movingRowTwoRef}
              className="flex gap-3.5 sm:gap-5 px-3 w-max will-change-transform"
              style={{
                transform: 'translate3d(-750px, 0, 0)',
              }}
            >
              {rowTwoPhotos.map((photo, idx) => (
                <div
                  key={`m2-${photo.id}-${idx}`}
                  onClick={() => onSelectPhoto(photo)}
                  className={`group relative shrink-0 overflow-hidden rounded-[16px] sm:rounded-[20px] border border-white/15 bg-white/5 cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:border-[#ff3333] shadow-xl ${
                    idx % 2 === 0
                      ? 'w-[185px] sm:w-[250px] h-[210px] sm:h-[285px]'
                      : 'w-[165px] sm:w-[225px] h-[225px] sm:h-[305px] mt-3'
                  }`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)',
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span
                      className="text-xs text-[#ff3333] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {photo.couple}
                    </span>
                    <span className="text-[11px] text-white/90 truncate block mt-0.5">
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: 3D REALISTIC INTERACTIVE GLOBE (Masoom Studio Patna)
          Details in Left, AI-Generated 3D Realistic Globe in Right
         ===================================================================== */}
      <section className="px-1 sm:px-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1 sm:px-2 mb-4">
          <div>
            <span
              className="text-base sm:text-lg text-[#ff3333] block leading-none"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Our Creative Home
            </span>
            <h2
              className="text-xl sm:text-3xl text-[#111111] lowercase font-normal mt-0.5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              masoom studio · patna, bihar
            </h2>
          </div>
          <a
            href={STUDIO_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-[#ff3333] hover:text-white text-xs font-medium transition-colors w-fit"
          >
            <MapPin className="w-3.5 h-3.5 text-[#ff3333]" />
            <span>View on Google Maps</span>
          </a>
        </div>

        <div className="relative py-2 sm:py-4">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: Clean Focused Studio Location Details */}
            <div className="lg:col-span-5 space-y-4 px-1 sm:px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff3333]/10 border border-[#ff3333]/25 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#ff3333]" />
                </div>
                <div>
                  <span
                    className="text-base sm:text-lg text-[#ff3333] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Pillar 42, Bailey Road · Patna
                  </span>
                  <h3
                    className="text-xl sm:text-2xl text-[#111111] font-normal lowercase mt-0.5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    masoom studio
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-black/75 leading-relaxed font-light border-y border-black/10 py-3.5">
                <p className="flex items-start gap-2">
                  <span className="text-[#ff3333] font-medium shrink-0">
                    Address:
                  </span>
                  <span>
                    Pillar No. 42, Pandey Palace, Bailey Road, near Paras Hospital, Patna, Bihar 800014
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#ff3333] font-medium shrink-0">
                    Phone / WhatsApp:
                  </span>
                  <a
                    href={STUDIO_INFO.phonePrimaryUrl}
                    className="text-[#111111] hover:text-[#ff3333] transition-colors font-medium"
                  >
                    {STUDIO_INFO.phoneNumber}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#ff3333] font-medium shrink-0">
                    Email:
                  </span>
                  <a
                    href={STUDIO_INFO.emailUrl}
                    className="text-black/80 hover:text-[#ff3333] transition-colors"
                  >
                    {STUDIO_INFO.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#ff3333] font-medium shrink-0">
                    Hours:
                  </span>
                  <span>{STUDIO_INFO.studioHours}</span>
                </p>
              </div>

              <p
                className="text-base sm:text-lg text-black/80 leading-relaxed"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                &ldquo;Rooted in Bihar, crafting vibrant wedding films and timeless family memories across India.&rdquo;
              </p>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href={STUDIO_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-full bg-[#ff3333] hover:bg-[#e02828] active:scale-95 text-white text-[11px] uppercase tracking-[0.14em] font-medium inline-flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#ff3333]/20 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Maps</span>
                </a>

                {onOpenQuickEnquire && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenQuickEnquire(
                        'Studio Visit · Wedding Films & Photography'
                      )
                    }
                    className="py-2.5 px-5 rounded-full bg-[#111111] hover:bg-[#ff3333] text-white text-[11px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer"
                  >
                    Book Visit
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Box-less 3D Realistic Globe */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <TwfRealisticGlobe onOpenQuickEnquire={onOpenQuickEnquire} />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: NOTES OF GRATITUDE (Couple Testimonials Slider)
         ===================================================================== */}
      <section className="px-1 sm:px-2">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span
            className="text-xl sm:text-2xl text-[#ff3333] block mb-0.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Here&apos;s what our couples &amp; families say
          </span>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#111111] lowercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            notes of gratitude
          </h2>
        </div>

        <div className="rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-xl border border-black/10 p-5 sm:p-10 shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Romantic Couple Portrait Plate (Distinct Couple Photo per Note) */}
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] max-w-[280px] mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-black/10 shadow-lg bg-[#111111]">
                <img
                  key={currentGratitude.id}
                  src={currentGratitude.imageUrl}
                  alt={currentGratitude.author}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[50%_18%] transition-all duration-700 ease-out animate-in fade-in"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Heartfelt Cursive Testimonial Content */}
            <div className="lg:col-span-8 space-y-5">
              <p
                className="text-2xl sm:text-3xl lg:text-4xl text-[#111111] leading-relaxed font-normal"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                &ldquo;{currentGratitude.quote}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-black/10">
                <div>
                  <h4
                    className="text-2xl sm:text-3xl text-[#ff3333]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {currentGratitude.author}
                  </h4>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/55 mt-0.5">
                    {currentGratitude.role} · {currentGratitude.location}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setGratitudeIndex(
                        (prev) =>
                          (prev - 1 + GRATITUDE_NOTES.length) %
                          GRATITUDE_NOTES.length
                      )
                    }
                    aria-label="Previous note"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/5 hover:bg-[#111111] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setGratitudeIndex(
                        (prev) => (prev + 1) % GRATITUDE_NOTES.length
                      )
                    }
                    aria-label="Next note"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/5 hover:bg-[#111111] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION: THE SACRED MOMENTS WE LIVE FOR (Deep Emotional Storytelling)
         ===================================================================== */}
      <section className="px-1 sm:px-2">
        <div className="rounded-[22px] sm:rounded-[28px] bg-gradient-to-br from-[#121012] via-[#090809] to-[#040404] text-white p-6 sm:p-10 lg:p-14 border border-white/10 shadow-2xl space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span
              className="text-2xl sm:text-3xl text-[#ff3333] block"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Promises written in heartbeats
            </span>
            <h2
              className="text-3xl sm:text-5xl font-normal text-white lowercase tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              the sacred moments we live for
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed font-light">
              We believe a wedding film is not just about cameras and lights. It
              is an irreplaceable heirloom honoring your parents, your heritage,
              and the sacred promises you whisper to one another.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                title: 'The Father’s Silent Tear',
                scriptSub: 'a lifetime of quiet love',
                story:
                  'During the Vidaai, when the world rushes by in embraces, a father stands still for just one second. He smiles through trembling eyes, remembering the little girl who once held his finger. We protect that silence.',
              },
              {
                title: 'The Sacred Saat Phere',
                scriptSub: 'seven steps into eternity',
                story:
                  'Seven vows circled around the holy fire. Sandalwood and camphor in the cool Bihar night air, ancient Sanskrit chants resonating in the soul as two families become one bloodline.',
              },
              {
                title: 'The Sindoor Daan Whisper',
                scriptSub: 'unfiltered joy & sacred reds',
                story:
                  'The breathless hush as red vermilion touches the bride’s forehead, followed by an explosion of applause, happy tears, cousins throwing marigold petals, and smiles that light up the night.',
              },
              {
                title: 'Grandmothers’ Blessings',
                scriptSub: 'songs of ancient roots',
                story:
                  'Wrinkled palms softly pressing gold into the bride’s fingers, hummed Maithili folk songs, and the timeless embrace of elders whose prayers will guide your home for generations to come.',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#ff3333]/50 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span
                    className="text-lg sm:text-xl text-[#ff3333] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {card.scriptSub}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl text-white font-normal"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    {card.story}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#ff3333]">
                  <span style={{ fontFamily: 'var(--font-script)' }}>
                    Masoom Cinema Note
                  </span>
                  <Heart className="w-3.5 h-3.5 text-[#ff3333]" />
                </div>
              </div>
            ))}
          </div>

          {/* Romantic Handwritten Vow Quote Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/15 text-center max-w-3xl mx-auto space-y-2">
            <span
              className="text-3xl sm:text-4xl text-[#ff3333] block leading-tight"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              &ldquo;Years from today, when your grandchildren open this film,
              they will feel exactly how much you were loved.&rdquo;
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 block font-light">
              Masoom Studio Philosophy · Patna, Bihar
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: WHY MASOOM STUDIO? vibrant • fun • natural
         ===================================================================== */}
      <section className="px-1 sm:px-2 pb-2">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span
            className="text-xl sm:text-2xl text-[#ff3333] block mb-0.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Why Masoom Studio?
          </span>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#111111] lowercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            vibrant • fun • natural
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              tag: 'Real Moments',
              title: 'candid & natural',
              service: 'Wedding Films & Candid Photography',
              image:
                '/Gallary/imgi_11_663089682_18088892522215915_6152286074647645901_n.jpg',
              desc: 'We don’t interrupt your wedding rituals or force awkward poses. We blend in like family so every smile, tear, and hug looks completely real.',
            },
            {
              tag: 'Complete Coverage',
              title: 'wedding films & drone',
              service: 'Drone Coverage & Destination Weddings',
              image:
                '/Gallary/imgi_31_704558536_17969950212160466_5180294263165990764_n.jpg',
              desc: 'From pre-wedding shoots and engagement ceremonies to Sangeet, wedding rituals, drone shots, and reception — we cover every event with care.',
            },
            {
              tag: 'Family Keepsakes',
              title: 'albums for life',
              service: 'Custom Wedding Albums & Photo Books',
              image: '/Gallary/LandingPage3.png',
              desc: 'Along with your wedding films and online photo gallery, we create handcrafted wedding albums that your parents and family will treasure forever.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-[20px] sm:rounded-[22px] bg-white/85 backdrop-blur-xl border border-black/10 overflow-hidden shadow-md flex flex-col justify-between group"
            >
              <div className="aspect-[16/11] overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span
                    className="text-lg sm:text-xl text-[#ff3333] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl text-[#111111] lowercase mt-0.5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/65 leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>

                {onOpenQuickEnquire && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenQuickEnquire(item.service)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-medium text-[#111111] hover:text-[#ff3333] transition-colors cursor-pointer"
                    >
                      <span>Explore Package</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

