'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Film,
  Heart,
  Camera,
  Building2,
  Mail,
  HelpCircle,
  Search,
  X,
  ArrowUpRight,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  MessageCircle,
  Menu,
  ChevronLeft,
} from 'lucide-react';
import { STUDIO_INFO, CINEMA_FILMS, HEADER_HERO_FILMS, GALLERY_PHOTOS, COMMISSION_SERVICES, CinemaFilm, PhotoFrame } from '@/lib/masoom-data';
import { WhatsAppMinimalIcon, FacebookMinimalIcon } from './twf-icons';

export type PageId =
  | 'home'
  | 'films'
  | 'about'
  | 'commissions'
  | 'installations'
  | 'contact'
  | 'faqs';

interface TwfSidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  onOpenQuickEnquire: () => void;
  onPlayFilm?: (film: CinemaFilm) => void;
  onSelectPhoto?: (photo: PhotoFrame) => void;
}

const NAV_ITEMS: {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'films', label: 'Films & Photos', icon: Film },
  { id: 'about', label: 'About Us', icon: Heart },
  { id: 'commissions', label: 'Services', icon: Camera },
  { id: 'installations', label: 'Venues', icon: Building2 },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function TwfSidebar({
  activePage,
  onNavigate,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenQuickEnquire,
  onPlayFilm,
  onSelectPhoto,
}: TwfSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Search Results across Films, Photos & Services
  const matchingFilms = cleanQuery
    ? [...HEADER_HERO_FILMS, ...CINEMA_FILMS]
        .filter(
          (f, idx, arr) =>
            arr.findIndex((x) => x.id === f.id) === idx &&
            (f.couple.toLowerCase().includes(cleanQuery) ||
              f.location.toLowerCase().includes(cleanQuery) ||
              f.title.toLowerCase().includes(cleanQuery))
        )
        .slice(0, 3)
    : [];

  const matchingPhotos = cleanQuery
    ? GALLERY_PHOTOS.filter(
        (p) =>
          p.couple.toLowerCase().includes(cleanQuery) ||
          p.title.toLowerCase().includes(cleanQuery) ||
          p.categoryLabel.toLowerCase().includes(cleanQuery) ||
          p.location.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const matchingServices = cleanQuery
    ? COMMISSION_SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQuery) ||
          s.tagline.toLowerCase().includes(cleanQuery)
      ).slice(0, 2)
    : [];

  const hasResults =
    matchingFilms.length > 0 ||
    matchingPhotos.length > 0 ||
    matchingServices.length > 0;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cleanQuery) return;
    onSearchSubmit(searchQuery);
    setSearchFocused(false);
    setMobileOpen(false);
  };

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ===================================================================
          SMARTPHONE COLLAPSED MENU TRIGGER BUTTON (< 640px)
          Allows the left menu to collapse completely on smartphones
         =================================================================== */}
      {!mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="fixed top-4 right-4 z-50 sm:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/85 hover:bg-[#ff3333] text-white backdrop-blur-xl border border-white/25 shadow-2xl transition-all active:scale-95 cursor-pointer"
        >
          <Menu className="w-4 h-4 text-[#ff3333]" />
          <span className="text-[11px] font-medium tracking-wider uppercase">
            Menu
          </span>
        </button>
      )}

      {/* Smartphone Backdrop Scrim when Left Menu is Expanded */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 sm:hidden transition-opacity"
        />
      )}

      {/* ===================================================================
          LEFT SIDEBAR MENU
          - Collapses off-screen on Smartphone (< 640px) until toggled open
          - Permanently docked on Tablet (sm:w-[172px]) & Desktop (lg:w-[214px])
         =================================================================== */}
      <aside
        className={`fixed top-0 left-0 bottom-0 h-[100dvh] w-[224px] sm:w-[172px] lg:w-[214px] text-white z-50 sm:z-40 flex flex-col justify-between py-3 sm:py-3.5 lg:py-4 select-none transition-transform duration-300 ease-out shadow-2xl sm:shadow-none border-r border-white/10 sm:border-r-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        {/* TOP: TRANSPARENT LOGO ONLY (No Texts, No Background) + MOBILE COLLAPSE BTN + SEARCH */}
        <div className="px-3 sm:px-3 lg:px-3.5 shrink-0 flex flex-col items-stretch bg-[#070707] z-10 pb-2">
          <div className="flex items-center justify-between sm:justify-center">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="flex-1 flex items-center justify-center py-0.5 transition-transform duration-300 hover:scale-105 cursor-pointer focus:outline-none"
              aria-label="Masoom Studio Home"
            >
              <img
                src="/MasoomStudioLogo.webp"
                alt="Masoom Studio"
                className="w-20 h-15 sm:w-20 sm:h-15 lg:w-24 lg:h-18 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                referrerPolicy="no-referrer"
              />
            </button>

            {/* Collapse Button on Smartphone */}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Collapse menu"
              className="sm:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-[#ff3333] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input with Interactive Dropdown */}
          <div className="mt-2 relative">
            <form onSubmit={handleFormSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search couples, films..."
                className="w-full bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] text-white placeholder-white/55 text-[11px] sm:text-[10px] lg:text-[11px] rounded-full py-1.5 pl-8 pr-6 border border-white/[0.14] focus:border-[#ff3333] focus:outline-none backdrop-blur-md transition-all shadow-inner"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/65 hover:text-[#ff3333] transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    setSearchFocused(false);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </form>

            {/* LIVE SEARCH RESULTS DROPDOWN */}
            {searchFocused && cleanQuery && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#121214] border border-white/20 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl max-h-[320px] overflow-y-auto space-y-2 select-text"
                onMouseDown={(e) => e.preventDefault()}
              >
                {hasResults ? (
                  <>
                    {matchingFilms.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-[#ff3333] px-1 font-semibold block">
                          Films &amp; Trailers
                        </span>
                        {matchingFilms.map((film) => (
                          <button
                            key={film.id}
                            type="button"
                            onClick={() => {
                              if (onPlayFilm) onPlayFilm(film);
                              setSearchFocused(false);
                              setMobileOpen(false);
                            }}
                            className="w-full flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors text-left cursor-pointer group"
                          >
                            <img
                              src={film.thumbnailUrl}
                              alt=""
                              className="w-8 h-8 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] text-white font-medium truncate group-hover:text-[#ff3333]">
                                {film.couple}
                              </p>
                              <p className="text-[9px] text-white/60 truncate">
                                {film.location}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {matchingPhotos.length > 0 && (
                      <div className="space-y-1 pt-1 border-t border-white/10">
                        <span className="text-[9px] uppercase tracking-wider text-[#ff3333] px-1 font-semibold block">
                          Gallery Frames
                        </span>
                        {matchingPhotos.map((photo) => (
                          <button
                            key={photo.id}
                            type="button"
                            onClick={() => {
                              if (onSelectPhoto) onSelectPhoto(photo);
                              setSearchFocused(false);
                              setMobileOpen(false);
                            }}
                            className="w-full flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors text-left cursor-pointer group"
                          >
                            <img
                              src={photo.imageUrl}
                              alt=""
                              className="w-8 h-8 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] text-white font-medium truncate group-hover:text-[#ff3333]">
                                {photo.title}
                              </p>
                              <p className="text-[9px] text-white/60 truncate">
                                {photo.couple}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {matchingServices.length > 0 && (
                      <div className="space-y-1 pt-1 border-t border-white/10">
                        <span className="text-[9px] uppercase tracking-wider text-[#ff3333] px-1 font-semibold block">
                          Services
                        </span>
                        {matchingServices.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => {
                              onNavigate('commissions');
                              setSearchFocused(false);
                              setMobileOpen(false);
                            }}
                            className="w-full p-1.5 rounded-xl hover:bg-white/10 transition-colors text-left cursor-pointer group"
                          >
                            <p className="text-[11px] text-white font-medium truncate group-hover:text-[#ff3333]">
                              {service.title}
                            </p>
                            <p className="text-[9px] text-white/60 truncate">
                              {service.tagline}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        onSearchSubmit(searchQuery);
                        setSearchFocused(false);
                        setMobileOpen(false);
                      }}
                      className="w-full py-1.5 rounded-lg bg-[#ff3333] hover:bg-[#e02828] text-white text-[10px] uppercase tracking-wider font-medium text-center transition-colors cursor-pointer mt-1"
                    >
                      View All Results &rarr;
                    </button>
                  </>
                ) : (
                  <div className="py-3 text-center">
                    <p className="text-[10px] text-white/65">No results found for &ldquo;{searchQuery}&rdquo;</p>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('films');
                        setSearchFocused(false);
                        setMobileOpen(false);
                      }}
                      className="mt-1 text-[10px] text-[#ff3333] hover:underline"
                    >
                      Browse All Films &rarr;
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CENTER NAVIGATION MENU: Pure White Texts + Seamless Gliding TWF Active Tab Fillet Curves */}
        <nav className="my-2 flex-1 min-h-0 overflow-visible pl-3 sm:pl-2.5 lg:pl-3 pr-0 flex flex-col justify-center relative">
          <div className="relative flex flex-col gap-[4px] overflow-visible">
            {/* Real Physical Cutout: Top Solid Black Cover (main body up to right: 14px) */}
            <motion.div
              initial={false}
              animate={{
                bottom: `calc(100% - ${Math.max(0, NAV_ITEMS.findIndex((i) => i.id === activePage)) * 42}px)`,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 34,
                mass: 0.55,
              }}
              style={{ top: -600 }}
              className="absolute left-0 right-[14px] bg-[#070707] pointer-events-none z-0"
            />

            {/* Top Solid Black Cover Right Strip (stops 14px above the cutout so the fillet curves outward) */}
            <motion.div
              initial={false}
              animate={{
                bottom: `calc(100% - ${Math.max(0, NAV_ITEMS.findIndex((i) => i.id === activePage)) * 42 - 14}px)`,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 34,
                mass: 0.55,
              }}
              style={{ top: -600 }}
              className="hidden sm:block absolute right-0 w-[14px] bg-[#070707] pointer-events-none z-0"
            />

            {/* Real Physical Cutout: Bottom Solid Black Cover (main body up to right: 14px) */}
            <motion.div
              initial={false}
              animate={{
                top: Math.max(0, NAV_ITEMS.findIndex((i) => i.id === activePage)) * 42 + 38,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 34,
                mass: 0.55,
              }}
              style={{ bottom: -600 }}
              className="absolute left-0 right-[14px] bg-[#070707] pointer-events-none z-0"
            />

            {/* Bottom Solid Black Cover Right Strip (starts 14px below the cutout so the fillet curves outward) */}
            <motion.div
              initial={false}
              animate={{
                top: Math.max(0, NAV_ITEMS.findIndex((i) => i.id === activePage)) * 42 + 52,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 34,
                mass: 0.55,
              }}
              style={{ bottom: -600 }}
              className="hidden sm:block absolute right-0 w-[14px] bg-[#070707] pointer-events-none z-0"
            />

            {/* Left solid black strip ensuring outer screen edge is opaque #070707 */}
            <div
              style={{ top: -600, bottom: -600 }}
              className="absolute -left-[32px] w-[32px] bg-[#070707] pointer-events-none z-0"
            />

            {/* The Fully Sculpted Hollow Cutout (Every Edge Curved: rounded left cap + top/bottom inverted fillets) */}
            <motion.div
              initial={false}
              animate={{
                y: Math.max(0, NAV_ITEMS.findIndex((i) => i.id === activePage)) * 42,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 34,
                mass: 0.55,
              }}
              className="absolute top-0 left-0 -right-[2px] h-[38px] bg-transparent pointer-events-none z-0 overflow-visible will-change-transform"
            >
              {/* Top-Left Inner Corner: rounds the left end of the cutout */}
              <svg
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 top-0 w-[18px] h-[19px] pointer-events-none"
                shapeRendering="geometricPrecision"
              >
                <path
                  d="M 0 0 L 18 0 A 18 19 0 0 0 0 19 Z"
                  fill="#070707"
                />
              </svg>

              {/* Bottom-Left Inner Corner: rounds the left end of the cutout */}
              <svg
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 bottom-0 w-[18px] h-[19px] pointer-events-none"
                shapeRendering="geometricPrecision"
              >
                <path
                  d="M 0 19 L 0 0 A 18 19 0 0 0 18 19 Z"
                  fill="#070707"
                />
              </svg>

              {/* TWF Signature Top Inverted Fillet Curve: concave scoop curving upward into the card */}
              <svg
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden sm:block absolute right-0 -top-[14px] w-[14px] h-[14px] pointer-events-none"
                shapeRendering="geometricPrecision"
              >
                <path
                  d="M 0 0 L 14 0 A 14 14 0 0 1 0 14 Z"
                  fill="#070707"
                />
              </svg>

              {/* TWF Signature Bottom Inverted Fillet Curve: concave scoop curving downward into the card */}
              <svg
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden sm:block absolute right-0 -bottom-[14px] w-[14px] h-[14px] pointer-events-none"
                shapeRendering="geometricPrecision"
              >
                <path
                  d="M 0 14 L 0 0 A 14 14 0 0 1 14 14 Z"
                  fill="#070707"
                />
              </svg>
            </motion.div>

            {/* The Dynamic Jumping Black Dot (Arcs in ')' direction to the clicked menu) */}
            <motion.div
              initial={false}
              animate={{
                y: Math.max(0, NAV_ITEMS.findIndex((i) => i.id === activePage)) * 42 + 15,
                x: [0, 16, 0],
                scale: [1, 1.45, 0.85, 1],
              }}
              transition={{
                y: { type: 'spring', stiffness: 360, damping: 30, mass: 0.55 },
                x: { duration: 0.38, times: [0, 0.5, 1], ease: 'easeInOut' },
                scale: { duration: 0.38, times: [0, 0.45, 0.8, 1], ease: 'easeOut' },
              }}
              className="absolute right-3.5 sm:right-3 lg:right-4 top-0 w-2 h-2 rounded-full bg-[#111111] pointer-events-none z-20 shadow-sm"
            />

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 w-full h-[38px] flex flex-row items-center justify-between px-3 lg:px-3.5 rounded-l-[16px] sm:rounded-l-[18px] transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#111111] font-semibold'
                      : 'text-white/90 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="flex flex-row items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isActive ? 'text-[#ff3333] scale-105' : 'text-white'
                      }`}
                    />
                    <span className="text-xs sm:text-[11px] lg:text-[12px] tracking-[0.02em] leading-none truncate">
                      {item.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ===================================================================
            BOTTOM BOX: "We'd love to hear your story!" WITH SLOW CRIMSON TRAIL BORDER
           =================================================================== */}
        <div className="px-3 sm:px-2.5 lg:px-3.5 shrink-0 bg-[#070707] z-10 pt-2">
          <div className="relative rounded-2xl p-[2px] overflow-hidden bg-[#1a0a0a] shadow-[0_0_25px_rgba(255,51,51,0.16)]">
            {/* Animated Slow-Moving Crimson Glowing Trail Border (No White) */}
            <div className="trail-border-spinner" aria-hidden="true" />

            {/* Inner Content Box */}
            <div className="relative z-10 p-3 rounded-[14px] bg-[#0e0e10]/95 backdrop-blur-xl space-y-2.5">
              <p
                className="text-base sm:text-sm lg:text-base text-white/95 leading-snug text-center"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                We&apos;d love to hear your story!
              </p>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenQuickEnquire();
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#ff3333] hover:bg-[#e02828] active:scale-[0.98] text-white text-[10px] uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#ff3333]/30 cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              {/* 5 Uniform Icon-Only Quick Connect Buttons */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-5 gap-1 items-center">
                <a
                  href={STUDIO_INFO.phonePrimaryUrl}
                  title={`Call ${STUDIO_INFO.phoneNumber}`}
                  aria-label={`Call ${STUDIO_INFO.phoneNumber}`}
                  className="aspect-square w-full max-w-[30px] mx-auto rounded-full bg-white/[0.08] hover:bg-[#ff3333] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                </a>
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                  aria-label={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                  className="aspect-square w-full max-w-[30px] mx-auto rounded-full bg-white/[0.08] hover:bg-[#ff3333] text-white flex items-center justify-center transition-colors cursor-pointer group"
                >
                  <WhatsAppMinimalIcon className="w-3.5 h-3.5 text-white/95 group-hover:text-white transition-colors" />
                </a>
                <a
                  href={STUDIO_INFO.emailUrl}
                  title={`Email ${STUDIO_INFO.email}`}
                  aria-label={`Email ${STUDIO_INFO.email}`}
                  className="aspect-square w-full max-w-[30px] mx-auto rounded-full bg-white/[0.08] hover:bg-[#ff3333] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Mail className="w-3 h-3" />
                </a>
                <a
                  href={STUDIO_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  aria-label="Instagram"
                  className="aspect-square w-full max-w-[30px] mx-auto rounded-full bg-white/[0.08] hover:bg-[#ff3333] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Instagram className="w-3 h-3" />
                </a>
                <a
                  href={STUDIO_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  aria-label="Facebook"
                  className="aspect-square w-full max-w-[30px] mx-auto rounded-full bg-white/[0.08] hover:bg-[#ff3333] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FacebookMinimalIcon className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

