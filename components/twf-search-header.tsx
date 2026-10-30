'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  X,
  Play,
  Camera,
  MapPin,
  Heart,
  ArrowUpRight,
  Film,
} from 'lucide-react';
import {
  CINEMA_FILMS,
  INSTAGRAM_REELS,
  GALLERY_PHOTOS,
  SIGNATURE_FRAMES,
  CinemaFilm,
  PhotoFrame,
} from '@/lib/masoom-data';

interface TwfSearchHeaderProps {
  onPlayFilm: (film: CinemaFilm) => void;
  onSelectPhoto: (photo: PhotoFrame) => void;
  onOpenQuickEnquire?: (service?: string) => void;
  onNavigateFilms?: () => void;
}

const POPULAR_TAGS = [
  'Patna Weddings',
  'Rajgir Hills',
  'Bridal Glow',
  'Pre-Wedding',
  'Bodh Gaya',
  'Haldi Moments',
  'Vidaai Tears',
];

export function TwfSearchHeader({
  onPlayFilm,
  onSelectPhoto,
  onOpenQuickEnquire,
  onNavigateFilms,
}: TwfSearchHeaderProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Quick keyboard shortcut "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cleanQuery = query.trim().toLowerCase();

  // Filter Matching Films
  const matchingFilms: CinemaFilm[] = cleanQuery
    ? CINEMA_FILMS.filter(
        (f) =>
          f.couple.toLowerCase().includes(cleanQuery) ||
          f.location.toLowerCase().includes(cleanQuery) ||
          f.title.toLowerCase().includes(cleanQuery) ||
          f.synopsis.toLowerCase().includes(cleanQuery)
      )
    : [];

  // Filter Matching Reels
  const matchingReels = cleanQuery
    ? INSTAGRAM_REELS.filter(
        (r) =>
          r.couple.toLowerCase().includes(cleanQuery) ||
          r.location.toLowerCase().includes(cleanQuery) ||
          r.title.toLowerCase().includes(cleanQuery) ||
          r.caption.toLowerCase().includes(cleanQuery)
      )
    : [];

  // Filter Matching Photos
  const allPhotos = [...GALLERY_PHOTOS, ...SIGNATURE_FRAMES];
  const matchingPhotos: PhotoFrame[] = cleanQuery
    ? allPhotos.filter(
        (p) =>
          p.couple.toLowerCase().includes(cleanQuery) ||
          p.title.toLowerCase().includes(cleanQuery) ||
          p.location.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          p.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const hasResults =
    matchingFilms.length > 0 ||
    matchingReels.length > 0 ||
    matchingPhotos.length > 0;

  const handleSelectReelAsFilm = (reel: (typeof INSTAGRAM_REELS)[0]) => {
    const film: CinemaFilm = {
      id: `film-${reel.id}`,
      videoSrc: reel.videoSrc,
      isPortrait: reel.isPortrait,
      title: reel.title,
      scriptHighlight: 'soulful wedding memories',
      couple: reel.couple,
      location: reel.location,
      year: '2025',
      month: 'Wedding Highlights',
      duration: '0:45',
      thumbnailUrl: reel.posterUrl,
      heroImageUrl: reel.posterUrl,
      aiConceptPrompt: reel.caption,
      synopsis: reel.caption,
      emotionalHook:
        'Captured with natural light and genuine emotion by Masoom Studio in Patna.',
      category: 'palace',
    };
    onPlayFilm(film);
    setIsOpen(false);
  };

  return (
    <header className="relative w-full z-40 mb-3 sm:mb-4">
      <div ref={containerRef} className="relative w-full">
        {/* Top Header Row: Cursive Tagline + Functional Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-4 p-2 sm:p-3 rounded-[18px] sm:rounded-[22px] bg-white/90 backdrop-blur-xl border border-black/10 shadow-md">
          {/* Left: Romantic Cursive Header Subtitle */}
          <div className="flex items-center gap-2 px-1 shrink-0">
            <span
              className="text-lg sm:text-xl lg:text-2xl text-[#ff3333] leading-none"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Search our wedding stories
            </span>
            <span className="hidden lg:inline text-black/30">|</span>
            <span
              className="hidden lg:inline text-xs text-black/70 font-normal lowercase tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              every smile, vow &amp; sacred tear
            </span>
          </div>

          {/* Center-Right: Functional Search Input */}
          <div className="relative flex-1 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-[#ff3333] pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Search films, couples, Patna, Varanasi, pre-wedding..."
                className="w-full pl-9.5 pr-20 py-2 sm:py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.06] focus:bg-white border border-black/10 focus:border-[#ff3333] text-xs sm:text-sm text-[#111111] placeholder:text-black/45 outline-none transition-all shadow-inner"
              />

              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search query"
                  className="absolute right-3 w-5 h-5 rounded-full bg-black/10 hover:bg-[#ff3333] hover:text-white flex items-center justify-center text-black/60 transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              ) : (
                <div className="hidden sm:flex absolute right-3 items-center gap-1 text-[10px] uppercase font-mono text-black/40 bg-black/5 px-2 py-0.5 rounded-md pointer-events-none">
                  <span>Press</span>
                  <span className="font-semibold text-black/60">/</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Suggestion Quick Tags Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-2 px-1">
          <span className="text-[10px] uppercase tracking-wider text-black/45 shrink-0 hidden sm:inline">
            Quick search:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag.split(' ')[0]);
                setIsOpen(true);
                inputRef.current?.focus();
              }}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white/70 hover:bg-[#ff3333] hover:text-white border border-black/10 text-[10px] sm:text-[11px] text-black/75 transition-all shadow-sm cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ===================================================================
            LIVE SEARCH RESULTS DROPDOWN
           =================================================================== */}
        {isOpen && cleanQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-[20px] sm:rounded-[24px] bg-[#111111] text-white border border-white/20 shadow-2xl overflow-hidden z-50 max-h-[75vh] overflow-y-auto">
            {/* Header of Results */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff3333] animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-white/80">
                  Search Results for &ldquo;{query}&rdquo;
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white text-xs inline-flex items-center gap-1"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 sm:p-5 space-y-5">
              {!hasResults && (
                <div className="py-8 text-center text-white/70 space-y-2">
                  <p className="text-sm">
                    No results found matching &ldquo;{query}&rdquo;.
                  </p>
                  <p className="text-xs text-white/50">
                    Try searching &ldquo;Patna&rdquo;, &ldquo;Rajgir&rdquo;,
                    &ldquo;Varanasi&rdquo;, &ldquo;Bridal&rdquo;, or
                    &ldquo;Candid&rdquo;.
                  </p>
                </div>
              )}

              {/* 1. MATCHING FILMS */}
              {matchingFilms.length > 0 && (
                <div className="space-y-2.5">
                  <span
                    className="text-lg text-[#ff3333] block"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Wedding Films
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchingFilms.slice(0, 4).map((film) => (
                      <div
                        key={film.id}
                        onClick={() => {
                          onPlayFilm(film);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ff3333] cursor-pointer transition-all group"
                      >
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-black">
                          <img
                            src={film.thumbnailUrl}
                            alt={film.couple}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                            <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4
                            className="text-sm text-white font-normal truncate"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {film.couple}
                          </h4>
                          <span className="text-[11px] text-[#ff3333] block truncate">
                            {film.location}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#ff3333] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. MATCHING REELS */}
              {matchingReels.length > 0 && (
                <div className="space-y-2.5">
                  <span
                    className="text-lg text-[#ff3333] block"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Wedding Reels &amp; Moments
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchingReels.slice(0, 4).map((reel) => (
                      <div
                        key={reel.id}
                        onClick={() => handleSelectReelAsFilm(reel)}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ff3333] cursor-pointer transition-all group"
                      >
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 bg-black">
                          <img
                            src={reel.posterUrl}
                            alt={reel.couple}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                            <Play className="w-3.5 h-3.5 fill-white text-white group-hover:scale-110 transition-transform" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4
                            className="text-sm text-white font-normal truncate"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {reel.couple}
                          </h4>
                          <span className="text-[11px] text-white/70 block truncate">
                            {reel.location}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#ff3333] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. MATCHING PHOTOS */}
              {matchingPhotos.length > 0 && (
                <div className="space-y-2.5">
                  <span
                    className="text-lg text-[#ff3333] block"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Photographs &amp; Portraits
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {matchingPhotos.slice(0, 4).map((photo) => (
                      <div
                        key={photo.id}
                        onClick={() => {
                          onSelectPhoto(photo);
                          setIsOpen(false);
                        }}
                        className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-black/40 border border-white/15 cursor-pointer hover:border-[#ff3333] transition-all"
                      >
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black via-black/60 to-transparent">
                          <span className="text-[10px] text-white/90 truncate block">
                            {photo.couple}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions Footer inside Search */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateFilms) onNavigateFilms();
                    setIsOpen(false);
                  }}
                  className="text-xs text-white/80 hover:text-[#ff3333] transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>View Full Cinema &amp; Photo Archive</span>
                </button>

                {onOpenQuickEnquire && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenQuickEnquire(`Enquiry for "${query}"`);
                      setIsOpen(false);
                    }}
                    className="px-3 py-1 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    Enquire for Wedding Dates
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
