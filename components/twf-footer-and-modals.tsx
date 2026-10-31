'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Camera,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Volume2,
  VolumeX,
  Film,
  Instagram,
  Youtube,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import {
  STUDIO_INFO,
  FOOTER_REELS,
  GALLERY_PHOTOS,
  SIGNATURE_FRAMES,
  CinemaFilm,
  PhotoFrame,
} from '@/lib/masoom-data';
import { PageId } from './twf-sidebar';
import { WhatsAppMinimalIcon, FacebookMinimalIcon } from './twf-icons';

interface TwfFooterAndModalsProps {
  onNavigate: (page: PageId) => void;
  activeFilm: CinemaFilm | null;
  onCloseFilm: () => void;
  activePhoto: PhotoFrame | null;
  onClosePhoto: () => void;
  onSelectPhoto: (photo: PhotoFrame) => void;
  quickEnquireOpen: boolean;
  preselectedService?: string;
  onCloseQuickEnquire: () => void;
  onOpenQuickEnquire: (service?: string) => void;
  cookiePolicyOpen?: boolean;
  onCloseCookiePolicy?: () => void;
}

export function TwfFooterAndModals({
  onNavigate,
  activeFilm,
  onCloseFilm,
  activePhoto,
  onClosePhoto,
  onSelectPhoto,
  quickEnquireOpen,
  preselectedService,
  onCloseQuickEnquire,
  onOpenQuickEnquire,
  cookiePolicyOpen,
  onCloseCookiePolicy,
}: TwfFooterAndModalsProps) {
  const footerRef = useRef<HTMLElement | null>(null);
  const footerVideo1Ref = useRef<HTMLVideoElement | null>(null);
  const footerVideo2Ref = useRef<HTMLVideoElement | null>(null);
  const [activeFooterVideoIdx, setActiveFooterVideoIdx] = useState<0 | 1>(0);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [modalVideoMuted, setModalVideoMuted] = useState(false);
  const [photoZoom, setPhotoZoom] = useState(1);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  const isCookieOpen = cookieModalOpen || Boolean(cookiePolicyOpen);
  const handleCloseCookieModal = () => {
    setCookieModalOpen(false);
    onCloseCookiePolicy?.();
  };

  const [enquireForm, setEnquireForm] = useState({
    coupleNames: '',
    phone: '',
    email: '',
    dates: '',
    venueCity: 'Patna, Bihar',
    service: preselectedService || 'Wedding Films & Candid Photography',
    storyNote: '',
  });
  const [enquireSubmitted, setEnquireSubmitted] = useState(false);

  // Observe when footer enters viewport so footer videos don't decode while scrolling top of page
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);

    const handleVisibility = () => {
      if (!document.hidden && isFooterVisible) {
        const vid =
          activeFooterVideoIdx === 0
            ? footerVideo1Ref.current
            : footerVideo2Ref.current;
        if (vid && vid.paused) {
          vid.play().catch(() => {});
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Watchdog to guarantee uninterrupted footer video loop
    const watchdog = setInterval(() => {
      if (!isFooterVisible || document.hidden) return;
      const vid =
        activeFooterVideoIdx === 0
          ? footerVideo1Ref.current
          : footerVideo2Ref.current;
      if (vid && vid.paused) {
        vid.muted = true;
        vid.play().catch(() => {});
      }
    }, 2500);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(watchdog);
    };
  }, [isFooterVisible, activeFooterVideoIdx]);

  // Sequential playback of both footer videos one by one when footer is visible
  useEffect(() => {
    const activeVid =
      activeFooterVideoIdx === 0
        ? footerVideo1Ref.current
        : footerVideo2Ref.current;
    const inactiveVid =
      activeFooterVideoIdx === 0
        ? footerVideo2Ref.current
        : footerVideo1Ref.current;

    if (inactiveVid) {
      inactiveVid.pause();
    }

    if (!isFooterVisible) {
      activeVid?.pause();
      return;
    }

    if (activeVid) {
      activeVid.defaultMuted = true;
      activeVid.muted = true;
      activeVid.playsInline = true;
      if (activeVid.ended) {
        activeVid.currentTime = 0;
      }
      const playPromise = activeVid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          activeVid.muted = true;
          activeVid.play().catch(() => {});
        });
      }
    }
  }, [activeFooterVideoIdx, isFooterVisible]);

  const allPhotos = [...GALLERY_PHOTOS, ...SIGNATURE_FRAMES];
  const currentPhotoIndex = activePhoto
    ? allPhotos.findIndex((p) => p.id === activePhoto.id)
    : -1;

  const handlePrevPhoto = () => {
    if (currentPhotoIndex < 0) return;
    setPhotoZoom(1);
    const prevIdx = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    onSelectPhoto(allPhotos[prevIdx]);
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex < 0) return;
    setPhotoZoom(1);
    const nextIdx = (currentPhotoIndex + 1) % allPhotos.length;
    onSelectPhoto(allPhotos[nextIdx]);
  };

  const selectedServiceValue =
    enquireForm.service || preselectedService || 'Wedding Films & Candid Photography';

  const whatsappText = encodeURIComponent(
    `Hello Masoom Studio! We would love to check date availability.\n\nCouple: ${
      enquireForm.coupleNames || 'Wedding Enquiry'
    }\nPhone: ${enquireForm.phone || 'Not provided'}\nDates: ${
      enquireForm.dates || 'TBD'
    }\nVenue: ${enquireForm.venueCity}\nService: ${selectedServiceValue}\nDetails: ${
      enquireForm.storyNote || 'Looking forward to connecting!'
    }`
  );
  const whatsappHref = `https://wa.me/917488458213?text=${whatsappText}`;

  const handleQuickEnquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquireSubmitted(true);
    const link = document.createElement('a');
    link.href = whatsappHref;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* ===================================================================
          CLEAN LANDSCAPE VIDEO FOOTER (Matches Header Video Box Spacing & Curves)
          - Plays both rotated straight landscape reels (DCYrmYgyjns & C_h6bbOyC9j)
            one by one sequentially across the footer
          - Transparent content box at bottom, Big Masoom Studio Logo
          - Spaced from outer sheet borders identically to the header video box
         =================================================================== */}
      <footer
        ref={footerRef}
        className="relative w-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] bg-black text-white rounded-[18px] sm:rounded-[24px] overflow-hidden mt-6 sm:mt-8 flex flex-col justify-end select-none shadow-2xl border border-black/10"
      >
        {/* Full-Footer Straight Landscape Video 1 (DCYrmYgyjns) */}
        <video
          ref={footerVideo1Ref}
          src={FOOTER_REELS[0].videoSrc}
          poster={FOOTER_REELS[0].posterUrl}
          autoPlay
          muted
          playsInline
          preload="auto"
          onCanPlay={() => {
            if (activeFooterVideoIdx === 0 && isFooterVisible) {
              footerVideo1Ref.current?.play().catch(() => {});
            }
          }}
          onEnded={() => {
            const v2 = footerVideo2Ref.current;
            if (v2) v2.currentTime = 0;
            setActiveFooterVideoIdx(1);
          }}
          onError={() => setActiveFooterVideoIdx(1)}
          className={`pointer-events-none absolute inset-0 w-full h-full object-cover object-[50%_28%] transition-opacity duration-1000 ease-in-out ${
            activeFooterVideoIdx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />

        {/* Full-Footer Straight Landscape Video 2 (C_h6bbOyC9j) */}
        <video
          ref={footerVideo2Ref}
          src={FOOTER_REELS[1].videoSrc}
          poster={FOOTER_REELS[1].posterUrl}
          autoPlay
          muted
          playsInline
          preload="auto"
          onCanPlay={() => {
            if (activeFooterVideoIdx === 1 && isFooterVisible) {
              footerVideo2Ref.current?.play().catch(() => {});
            }
          }}
          onEnded={() => {
            const v1 = footerVideo1Ref.current;
            if (v1) v1.currentTime = 0;
            setActiveFooterVideoIdx(0);
          }}
          onError={() => setActiveFooterVideoIdx(0)}
          className={`pointer-events-none absolute inset-0 w-full h-full object-cover object-[50%_28%] transition-opacity duration-1000 ease-in-out ${
            activeFooterVideoIdx === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />

        {/* Subtle Bottom Gradient Scrim so White Text & Big Logo Pop Cleanly Over Video */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.68) 42%, rgba(0,0,0,0.95) 100%)',
          }}
        />

        {/* Completely Transparent Content Container at the Bottom of Footer */}
        <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 pb-5 sm:pb-7 pt-12 bg-transparent space-y-4">
          {/* Tier 1: Big Logo + Cursive Tagline (Left) & Minimal Social Icons + Enquire Button (Right) */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-5">
            {/* Left: BIG Masoom Studio Transparent Logo + Romantic Cursive Tagline */}
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3.5 sm:gap-5 min-w-0">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer focus:outline-none"
                aria-label="Masoom Studio Home"
              >
                <img
                  src="/MasoomStudioLogo.png"
                  alt="Masoom Studio"
                  loading="lazy"
                  decoding="async"
                  className="w-28 h-22 sm:w-36 sm:h-28 lg:w-44 lg:h-34 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)]"
                  referrerPolicy="no-referrer"
                />
              </button>

              <div className="min-w-0 space-y-1">
                <span
                  className="text-2xl sm:text-3xl lg:text-4xl text-[#ff3333] block leading-none drop-shadow"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  Vibrant, fun &amp; natural stories
                </span>
                <p
                  className="text-sm sm:text-lg lg:text-xl text-white/95 font-normal tracking-wide drop-shadow"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Wedding Films &amp; Candid Photography
                </p>
              </div>
            </div>

            {/* Right: Clean Row of Working Connect Buttons with Minimal WhatsApp Icon + Primary Enquire CTA */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <a
                  href={STUDIO_INFO.phonePrimaryUrl}
                  aria-label={`Call ${STUDIO_INFO.phoneNumber}`}
                  title={`Call ${STUDIO_INFO.phoneNumber}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#ff3333] border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                  title={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#ff3333] border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer group"
                >
                  <WhatsAppMinimalIcon className="w-4 h-4 text-white/95 group-hover:text-white" />
                </a>
                <a
                  href={STUDIO_INFO.emailUrl}
                  aria-label={`Email ${STUDIO_INFO.email}`}
                  title={`Email ${STUDIO_INFO.email}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#ff3333] border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#ff3333] border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#ff3333] border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FacebookMinimalIcon className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  title="YouTube"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#ff3333] border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => onOpenQuickEnquire()}
                className="px-5 sm:px-6 py-2.5 rounded-full bg-[#ff3333] hover:bg-[#e02828] active:scale-95 text-white text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-[#ff3333]/35"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tier 2: Redesigned Single Line (Copyright, Terms, Cookie Policy, ACCUstomLabs) */}
          <div className="pt-3.5 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-white/80">
            <span className="leading-none">
              &copy; {new Date().getFullYear()} Masoom Studio. All rights reserved.
            </span>

            {/* Terms and Conditions & Cookie Policy Links (Not in main menus) */}
            <div className="flex items-center gap-3 text-white/75 leading-none">
              <button
                type="button"
                onClick={() => setTermsModalOpen(true)}
                className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Terms &amp; Conditions
              </button>
              <span className="text-white/30">·</span>
              <button
                type="button"
                onClick={() => setCookieModalOpen(true)}
                className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Cookie Policy
              </button>
            </div>

            {/* Designed and Developed by ACCUstomLabs (Optically Baseline-Aligned with Text) */}
            <div className="inline-flex items-center gap-2 text-white/80 leading-none">
              <span>Designed and Developed by</span>
              <a
                href="https://accustomlabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-100 opacity-95 transition-opacity"
                title="ACCUstomLabs"
              >
                <img
                  src="/ac-custom-labs.png"
                  alt="ACCUstomLabs"
                  loading="lazy"
                  decoding="async"
                  className="h-4 sm:h-[18px] w-auto object-contain translate-y-[2.5px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===================================================================
          MODAL 1: IN-WEBSITE FILM & REEL PLAYER
          Viewport-constrained flex layout so NO component or content is ever cut
         =================================================================== */}
      {activeFilm && (
        <div
          onClick={onCloseFilm}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeFilm.couple} Wedding Film`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[calc(100dvh-16px)] sm:max-h-[calc(100dvh-32px)] bg-[#111111] border border-white/20 rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-2xl flex flex-col my-auto"
          >
            {/* Modal Top Header Bar (Never Cut) */}
            <div className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-3.5 border-b border-white/10 bg-[#0c0c0c]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#ff3333] shrink-0" />
                <div className="min-w-0">
                  <h3
                    className="text-base sm:text-lg text-white font-medium truncate"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {activeFilm.couple}
                  </h3>
                  <p className="text-[11px] text-white/60 truncate">
                    {activeFilm.location} · {activeFilm.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeFilm.videoSrc && (
                  <button
                    type="button"
                    onClick={() => setModalVideoMuted((m) => !m)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#ff3333] text-[11px] sm:text-xs text-white transition-colors cursor-pointer"
                  >
                    {modalVideoMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Sound On</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={onCloseFilm}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#ff3333] text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close video player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Video Stage (Fits 100% of Widescreen or Portrait Video Without Overflow) */}
            <div className="relative flex-1 min-h-0 w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeFilm.heroImageUrl}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
                referrerPolicy="no-referrer"
              />

              {activeFilm.videoSrc ? (
                <video
                  key={activeFilm.videoSrc}
                  src={activeFilm.videoSrc}
                  poster={activeFilm.heroImageUrl}
                  autoPlay
                  loop
                  muted={modalVideoMuted}
                  controls
                  playsInline
                  className="relative z-10 w-full h-full max-h-[50dvh] sm:max-h-[58dvh] object-contain"
                />
              ) : (
                <div className="relative z-10 w-full aspect-video max-h-[56dvh]">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeFilm.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${activeFilm.couple} — Masoom Studio Film`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {/* Modal Bottom Story & Action Bar (Never Cut) */}
            <div className="shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#141414] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="min-w-0 max-w-xl">
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {activeFilm.synopsis}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff3333] text-white flex items-center justify-center transition-colors shrink-0"
                  title={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                >
                  <WhatsAppMinimalIcon className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const coupleRef = activeFilm.couple;
                    onCloseFilm();
                    onOpenQuickEnquire(`Wedding Film (${coupleRef})`);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Book Similar Film</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: PHOTOGRAPH VIEWER LIGHTBOX
         =================================================================== */}
      {activePhoto && (
        <div
          onClick={onClosePhoto}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[calc(100dvh-16px)] sm:max-h-[calc(100dvh-32px)] bg-[#121212] border border-white/15 rounded-[18px] sm:rounded-[24px] overflow-y-auto lg:overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 my-auto"
          >
            <div className="lg:col-span-8 relative bg-black flex items-center justify-center min-h-[260px] sm:min-h-[420px] max-h-[55dvh] lg:max-h-[82dvh] overflow-hidden select-none">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                style={{
                  transform: `scale(${photoZoom})`,
                  transition: 'transform 0.25s ease-out',
                }}
                className={`max-w-full max-h-[52dvh] lg:max-h-[78dvh] w-auto h-auto object-contain ${
                  photoZoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                }`}
                onClick={() => setPhotoZoom((prev) => (prev < 2.5 ? prev + 0.5 : 1))}
                referrerPolicy="no-referrer"
              />

              {/* Floating Interactive Zoom Bar */}
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1 p-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white shadow-xl">
                <button
                  type="button"
                  onClick={() => setPhotoZoom((prev) => Math.min(3, prev + 0.5))}
                  aria-label="Zoom in"
                  title="Zoom In"
                  className="w-7 h-7 rounded-full hover:bg-[#ff3333] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoZoom((prev) => Math.max(1, prev - 0.5))}
                  aria-label="Zoom out"
                  title="Zoom Out"
                  className="w-7 h-7 rounded-full hover:bg-[#ff3333] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                {photoZoom > 1 && (
                  <button
                    type="button"
                    onClick={() => setPhotoZoom(1)}
                    aria-label="Reset zoom"
                    title="Reset to 100%"
                    className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 hover:bg-[#ff3333] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
                <span className="text-[10px] px-1.5 text-white/70">
                  {Math.round(photoZoom * 100)}%
                </span>
              </div>

              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/65 hover:bg-[#ff3333] border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/65 hover:bg-[#ff3333] border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="lg:col-span-4 p-4 sm:p-6 flex flex-col justify-between bg-[#151515] text-white overflow-y-auto max-h-[82dvh]">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="text-lg sm:text-xl text-[#ff3333] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {activePhoto.categoryLabel}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl text-white mt-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {activePhoto.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      {activePhoto.couple} · {activePhoto.location}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClosePhoto}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#ff3333] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label="Close photo viewer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {activePhoto.description}
                </p>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/55">
                    <Camera className="w-3.5 h-3.5 text-[#ff3333]" />
                    <span>Photo Details</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-white/50">Camera</span>
                      <span className="text-white">{activePhoto.exif.camera}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-white/50">Lens</span>
                      <span className="text-white">{activePhoto.exif.lens}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    const frameTitle = activePhoto.title;
                    onClosePhoto();
                    onOpenQuickEnquire(`Photography & Album (${frameTitle})`);
                  }}
                  className="w-full py-2.5 px-5 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enquire About Photography</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 3: QUICK DATE AVAILABILITY & ENQUIRY MODAL
         =================================================================== */}
      {quickEnquireOpen && (
        <div
          onClick={onCloseQuickEnquire}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Enquire with Masoom Studio"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[calc(100dvh-16px)] sm:max-h-[calc(100dvh-32px)] overflow-y-auto bg-[#f8f8f7] text-[#111111] rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 shadow-2xl border border-black/10 my-auto"
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10">
              <div>
                <div className="inline-flex items-center gap-2 text-[#ff3333] text-xs uppercase tracking-[0.2em] font-medium">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Masoom Studio · Check Wedding Dates</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-normal text-[#111111] mt-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Tell Us About Your{' '}
                  <span
                    className="text-3xl sm:text-4xl text-[#ff3333] ml-1"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Celebration
                  </span>
                </h3>
              </div>

              <button
                type="button"
                onClick={onCloseQuickEnquire}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-[#ff3333] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {enquireSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4
                  className="text-2xl font-normal text-[#111111]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Thank You, {enquireForm.coupleNames || 'Friend'}!
                </h4>
                <p className="text-xs sm:text-sm text-black/65 max-w-md mx-auto leading-relaxed">
                  Your wedding enquiry has been prepared for WhatsApp{' '}
                  <strong>({STUDIO_INFO.phoneNumber})</strong>. You can also call{' '}
                  <strong>{STUDIO_INFO.phoneNumber}</strong> or email{' '}
                  <strong>{STUDIO_INFO.email}</strong> directly.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors"
                  >
                    <WhatsAppMinimalIcon className="w-4 h-4" />
                    <span>Open WhatsApp</span>
                  </a>
                  <a
                    href={STUDIO_INFO.phonePrimaryUrl}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-black/5 hover:bg-black/10 text-xs uppercase tracking-[0.14em] text-black/80 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#ff3333]" />
                    <span>Call {STUDIO_INFO.phoneNumber}</span>
                  </a>
                  <a
                    href={STUDIO_INFO.emailUrl}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-black/5 hover:bg-black/10 text-xs uppercase tracking-[0.14em] text-black/80 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#ff3333]" />
                    <span>{STUDIO_INFO.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setEnquireSubmitted(false);
                      onCloseQuickEnquire();
                    }}
                    className="px-4 py-3 rounded-full bg-black/5 hover:bg-black/10 text-xs uppercase tracking-[0.14em] text-black/65 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickEnquireSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                      Couple Names *
                    </label>
                    <input
                      type="text"
                      required
                      value={enquireForm.coupleNames}
                      onChange={(e) =>
                        setEnquireForm({ ...enquireForm, coupleNames: e.target.value })
                      }
                      placeholder="e.g., Seema & Sayan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#ff3333]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={enquireForm.phone}
                      onChange={(e) =>
                        setEnquireForm({ ...enquireForm, phone: e.target.value })
                      }
                      placeholder="Your phone number"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#ff3333]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                      Wedding Dates *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={enquireForm.dates}
                        onChange={(e) =>
                          setEnquireForm({ ...enquireForm, dates: e.target.value })
                        }
                        placeholder="Wedding dates"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#ff3333]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                      Venue &amp; City *
                    </label>
                    <input
                      type="text"
                      required
                      value={enquireForm.venueCity}
                      onChange={(e) =>
                        setEnquireForm({ ...enquireForm, venueCity: e.target.value })
                      }
                      placeholder="Hotel Maurya, Patna"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#ff3333]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                    Tell Us About Your Wedding Events
                  </label>
                  <textarea
                    rows={3}
                    value={enquireForm.storyNote}
                    onChange={(e) =>
                      setEnquireForm({ ...enquireForm, storyNote: e.target.value })
                    }
                    placeholder="Share your events (Haldi, Mehendi, Sangeet, Wedding, Reception)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#ff3333]"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={STUDIO_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/5 hover:bg-black/10 text-black/85 text-xs font-medium transition-colors border border-black/10 group"
                      title={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                    >
                      <WhatsAppMinimalIcon className="w-3.5 h-3.5 text-black/75 group-hover:text-[#ff3333] transition-colors" />
                      <span>{STUDIO_INFO.phoneNumber}</span>
                    </a>
                    <a
                      href={STUDIO_INFO.phonePrimaryUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/5 hover:bg-black/10 text-black/85 text-xs font-medium transition-colors border border-black/10 group"
                      title={`Call ${STUDIO_INFO.phoneNumber}`}
                    >
                      <Phone className="w-3.5 h-3.5 text-black/75 group-hover:text-[#ff3333] transition-colors" />
                      <span>Call</span>
                    </a>
                    <a
                      href={STUDIO_INFO.emailUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/5 hover:bg-black/10 text-black/85 text-xs font-medium transition-colors border border-black/10 group"
                      title={`Email ${STUDIO_INFO.email}`}
                    >
                      <Mail className="w-3.5 h-3.5 text-black/75 group-hover:text-[#ff3333] transition-colors" />
                      <span>{STUDIO_INFO.email}</span>
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                  >
                    Check Availability
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {/* ===================================================================
          MODAL 4: TERMS & CONDITIONS MODAL
         =================================================================== */}
      {termsModalOpen && (
        <div
          onClick={() => setTermsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Terms & Conditions"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[calc(100dvh-32px)] bg-white rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-2xl flex flex-col my-auto border border-black/10"
          >
            <div className="shrink-0 flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-black/10 bg-[#fafafa]">
              <div>
                <span
                  className="text-base sm:text-lg text-[#ff3333] block leading-none"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  Our Commitment to Your Family
                </span>
                <h3
                  className="text-lg sm:text-2xl text-[#111111] font-normal lowercase tracking-tight mt-0.5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  terms &amp; conditions
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Terms"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7 space-y-5 text-xs sm:text-sm text-black/75 leading-relaxed">
              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#111111]">
                  1. Booking &amp; Milestone Payments
                </h4>
                <p>
                  A 30% advance deposit secures your wedding dates exclusively on our filming calendar. 50% is due prior to the commencement of wedding day events, and the remaining 20% balance is payable upon delivery of your raw footage and cinematic teaser.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#111111]">
                  2. Creative Filming &amp; Candid Philosophy
                </h4>
                <p>
                  Masoom Studio is dedicated to vibrant, fun, and natural storytelling. We focus on real human moments rather than stiff, artificial staging. Post-production editing, color grading, and acoustic design reflect our signature cinematic warmth.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#111111]">
                  3. Delivery Timelines
                </h4>
                <p>
                  Your curated Wedding Teaser / Instagram Reel is typically delivered within 3 to 4 weeks. The Complete Wedding Film and Full Resolution Photo Archive are delivered in 6 to 8 weeks via private digital delivery and secure USB drives.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#111111]">
                  4. Rescheduling &amp; Date Changes
                </h4>
                <p>
                  We understand family circumstances can shift. In the event of date changes, we transfer your deposit to new dates with zero fee, provided the revised dates are available on our production calendar.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#111111]">
                  5. Usage &amp; Family Rights
                </h4>
                <p>
                  You and your family have full, unrestricted personal rights to print, download, archive, and share your wedding photos and films anywhere, for lifetime preservation.
                </p>
              </div>
            </div>

            <div className="shrink-0 p-4 sm:p-5 border-t border-black/10 bg-[#fafafa] flex items-center justify-between">
              <span className="text-[11px] text-black/50">
                Masoom Studio · Pillar 42, Bailey Road, Patna
              </span>
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#111111] hover:bg-[#ff3333] text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 5: COOKIE POLICY MODAL
         =================================================================== */}
      {isCookieOpen && (
        <div
          onClick={handleCloseCookieModal}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie & Privacy Policy"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[calc(100dvh-32px)] bg-white rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-2xl flex flex-col my-auto border border-black/10"
          >
            <div className="shrink-0 flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-black/10 bg-[#fafafa]">
              <div>
                <span
                  className="text-base sm:text-lg text-[#ff3333] block leading-none"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  Clear &amp; Transparent
                </span>
                <h3
                  className="text-lg sm:text-2xl text-[#111111] font-normal lowercase tracking-tight mt-0.5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  cookie &amp; privacy policy
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseCookieModal}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Cookie Policy"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7 space-y-4 text-xs sm:text-sm text-black/75 leading-relaxed">
              <p>
                At Masoom Studio, we believe in privacy and transparency. Our portfolio website is crafted to showcase wedding films and photography cleanly without intrusive trackers.
              </p>

              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-[#111111]">
                  1. Essential Functional Cookies
                </h4>
                <p>
                  We store minimal preferences (such as whether you have muted or unmuted a video, your consent status, and smooth scroll progress) directly in your browser&apos;s local storage so your experience remains seamless.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-[#111111]">
                  2. Video Caching &amp; Performance
                </h4>
                <p>
                  Videos are cached locally in your device&apos;s standard browser cache so they load instantly upon repeat visits without consuming unnecessary cellular data.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-[#111111]">
                  3. Zero Third-Party Advertising Trackers
                </h4>
                <p>
                  We do not run ad networks, data brokering pixels, or cross-site tracking cookies. Your wedding inquiries submitted through our forms are strictly confidential between you and Masoom Studio.
                </p>
              </div>
            </div>

            <div className="shrink-0 p-4 sm:p-5 border-t border-black/10 bg-[#fafafa] flex items-center justify-between">
              <span className="text-[11px] text-black/50">
                Last updated: 2025 · Masoom Studio
              </span>
              <button
                type="button"
                onClick={handleCloseCookieModal}
                className="px-5 py-2 rounded-full bg-[#111111] hover:bg-[#ff3333] text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

