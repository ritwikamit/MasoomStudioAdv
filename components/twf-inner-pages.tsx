'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  ArrowUpRight,
  MapPin,
  Check,
  ChevronDown,
  Phone,
  Mail,
  CheckCircle2,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Film,
  Play,
  Pause,
  Camera,
} from 'lucide-react';
import {
  INSTAGRAM_REELS,
  GALLERY_PHOTOS,
  SIGNATURE_FRAMES,
  COMMISSION_SERVICES,
  VENUE_INSTALLATIONS,
  STORY_SCENES,
  FAQ_ITEMS,
  STUDIO_INFO,
  CinemaFilm,
  InstagramReelItem,
  PhotoFrame,
} from '@/lib/masoom-data';
import { PageId } from './twf-sidebar';
import { WhatsAppMinimalIcon, FacebookMinimalIcon } from './twf-icons';

interface TwfInnerPagesProps {
  activePage: PageId;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onPlayFilm: (film: CinemaFilm) => void;
  onSelectPhoto: (photo: PhotoFrame) => void;
  onNavigate: (page: PageId) => void;
  onOpenQuickEnquire: (preselectedService?: string) => void;
}

interface InnerHoverVideoBoxProps {
  videoSrc: string;
  posterUrl: string;
  couple: string;
  location: string;
  aspectClass?: string;
  onOpenModal: () => void;
}

interface TimelineMilestoneItem {
  year: string;
  title: string;
  desc: string;
  img: string;
  align: string;
  tag?: string;
  metric?: string;
  lensSpec?: string;
}

function TiltMilestoneCard({
  item,
  idx,
  isActive,
  onActivate,
  onInspectPhoto,
}: {
  item: TimelineMilestoneItem;
  idx: number;
  isActive: boolean;
  onActivate: () => void;
  onInspectPhoto: () => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    setTilt({
      rotateX: Number((-normY * 11).toFixed(2)),
      rotateY: Number((normX * 11).toFixed(2)),
      glareX: Math.round((x / rect.width) * 100),
      glareY: Math.round((y / rect.height) * 100),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onActivate}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onActivate}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-[20px] overflow-hidden p-3.5 sm:p-4 transition-all duration-300 cursor-pointer select-none ${
        isActive
          ? 'bg-[#111111] text-white border-2 border-[#ff3333] shadow-[0_20px_50px_rgba(255,51,51,0.2)]'
          : 'bg-white/95 text-[#111111] border border-black/10 shadow-lg hover:border-[#ff3333]/60'
      }`}
    >
      {/* Dynamic Cursor-Following Spotlight Glare */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle 240px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,51,51,0.15), transparent 75%)`,
        }}
      />

      {/* Top Film-Strip Meta Bar (No red dots, no cylinders) */}
      <div className="relative z-20 flex items-center justify-between gap-2 mb-2.5 px-1">
        <span
          className={`text-[10px] uppercase tracking-[0.2em] font-medium ${
            isActive ? 'text-white/80' : 'text-black/55'
          }`}
        >
          Reel 0{idx + 1} — {item.tag}
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-[4px] font-medium uppercase tracking-wider ${
            isActive
              ? 'bg-[#ff3333] text-white'
              : 'bg-black/5 text-black/65 group-hover:bg-[#ff3333]/10 group-hover:text-[#ff3333]'
          }`}
        >
          {item.metric}
        </span>
      </div>

      {/* Image Frame with Generous Face Headroom & Film Corner Brackets */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden mb-3.5 bg-[#0a0a0a]">
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover object-[50%_12%] transition-transform duration-700 ease-out ${
            isActive ? 'scale-[1.03]' : 'group-hover:scale-105'
          }`}
          referrerPolicy="no-referrer"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Viewfinder Corner Brackets */}
        <div className="pointer-events-none absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-white/75" />
        <div className="pointer-events-none absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-white/75" />
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-white/75" />
        <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-white/75" />

        {/* Floating Script Year Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-2">
          <span
            className="text-3xl sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] leading-none"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {item.year}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspectPhoto();
            }}
            className="px-2.5 py-1 rounded-[6px] bg-black/70 hover:bg-[#ff3333] backdrop-blur-md border border-white/25 text-white text-[10px] uppercase tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3 h-3" />
            <span>View Frame</span>
          </button>
        </div>
      </div>

      {/* Narrative Content */}
      <div className="relative z-20 px-1.5 pb-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h4
            className={`text-lg sm:text-xl transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-[#111111] group-hover:text-[#ff3333]'
            }`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {item.title}
          </h4>
          <ArrowUpRight
            className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
              isActive
                ? 'text-[#ff3333] translate-x-0.5 -translate-y-0.5'
                : 'text-black/35 group-hover:text-[#ff3333] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            }`}
          />
        </div>
        <p
          className={`text-xs leading-relaxed ${
            isActive ? 'text-white/80' : 'text-black/65'
          }`}
        >
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

function AnimatedJourneyTimeline({
  items,
  onSelectPhoto,
}: {
  items: TimelineMilestoneItem[];
  onSelectPhoto: (photo: PhotoFrame) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [autoPlay, items.length]);

  const activeItem = items[activeIdx] || items[0];

  const handleOpenInLightbox = (item: TimelineMilestoneItem, idx: number) => {
    const matched =
      GALLERY_PHOTOS.find((p) => p.imageUrl === item.img) ||
      SIGNATURE_FRAMES.find((p) => p.imageUrl === item.img) ||
      GALLERY_PHOTOS[idx % GALLERY_PHOTOS.length];
    onSelectPhoto(matched);
  };

  return (
    <div className="pt-8 border-t border-black/10 space-y-8 sm:space-y-10">
      {/* 1. CLEAN TYPOGRAPHIC HEADER & RECTANGULAR ERA SCRUBBER (NO RED DOTS, NO CYLINDERS) */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-2.5">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-2xl sm:text-3xl text-[#ff3333] leading-none block"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          2018 — Today
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-2xl sm:text-4xl lg:text-5xl text-[#111111] lowercase leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          our journey of filming{' '}
          <span
            className="text-3xl sm:text-5xl text-[#ff3333] px-1 inline-block"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            real wedding stories
          </span>
        </motion.h3>

        <p className="text-xs sm:text-sm text-black/65 max-w-xl leading-relaxed">
          Explore our living wedding reel from 2018 to today — click or hover any year to scrub through our milestones in Patna and across Bihar.
        </p>

        {/* Rectangular Film-Frame Era Tabs (Zero Dots, Zero Cylinders) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {items.map((item, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setAutoPlay(false);
                }}
                className={`relative overflow-hidden px-4 py-2 rounded-[6px] text-xs font-medium transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                    : 'bg-black/[0.04] hover:bg-black/[0.08] text-[#111111]/75 border-black/10'
                }`}
              >
                {isSelected && autoPlay && (
                  <motion.span
                    key={`progress-${activeIdx}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.2, ease: 'linear' }}
                    className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-[#ff3333]"
                  />
                )}
                <span className="relative z-10 tracking-wider uppercase text-[11px]">
                  {item.year}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setAutoPlay((prev) => !prev)}
            className="px-3.5 py-2 rounded-[6px] bg-black/[0.04] hover:bg-[#111111] text-[#111111] hover:text-white border border-black/10 text-[11px] uppercase tracking-wider font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title={autoPlay ? 'Pause Auto-Reel' : 'Play Auto-Reel'}
          >
            {autoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{autoPlay ? 'Auto Reel' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* 2. 35MM CINEMA STAGE WITH CONSTANTLY LOOPING UP & DOWN SQUARE CUTOUTS */}
      <div className="relative rounded-[20px] sm:rounded-[24px] bg-[#0b0b0e] text-white overflow-hidden border border-black/15 shadow-2xl">
        {/* Top Horizontal Square Cutouts Strip (Constantly Moving Left in Loop) */}
        <div className="h-6 bg-[#050507] border-b border-white/10 flex items-center overflow-hidden px-2">
          <div className="animate-sprocket-left flex items-center gap-3 whitespace-nowrap min-w-[200%]">
            {Array.from({ length: 56 }).map((_, i) => (
              <span
                key={`top-sprocket-${i}`}
                className="w-3.5 h-2.5 rounded-[2px] bg-white/15 border border-white/25 shrink-0 inline-block"
              />
            ))}
          </div>
        </div>

        {/* Middle Stage with Left (Moving Up) & Right (Moving Down) Square Cutout Rails */}
        <div className="relative flex items-stretch">
          {/* Left Vertical Square Cutouts Strip — Constantly Moving UP in Loop */}
          <div className="w-6 sm:w-8 bg-[#050507] border-r border-white/10 overflow-hidden shrink-0 relative">
            <div className="animate-squares-up absolute inset-x-0 top-0 flex flex-col items-center gap-3 py-1.5">
              {Array.from({ length: 48 }).map((_, i) => (
                <span
                  key={`left-square-${i}`}
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2px] bg-white/15 border border-white/25 shrink-0 block"
                />
              ))}
            </div>
          </div>

          {/* Main Cinema Stage Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-w-0">
            {/* Left: Uncropped Couple Frame with Vertical Moving Square Film Cutouts */}
            <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#050507] border border-white/15 shadow-2xl flex items-stretch">
              {/* Inner Left Mini Square Cutout Track Moving UP */}
              <div className="hidden sm:block w-5 bg-black/90 border-r border-white/15 overflow-hidden shrink-0 relative z-20">
                <div className="animate-squares-up absolute inset-x-0 top-0 flex flex-col items-center gap-2.5 py-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span
                      key={`inner-l-${i}`}
                      className="w-2.5 h-2.5 rounded-[1.5px] bg-white/20 border border-white/25 shrink-0 block"
                    />
                  ))}
                </div>
              </div>

              {/* Active Couple Photo — Top-Aligned Object Position so Faces Are Never Cut */}
              <div className="relative flex-1 h-full overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.year}
                    src={activeItem.img}
                    alt={activeItem.title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover object-[50%_12%]"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Gentle Bottom Gradient Only (Leaves Faces in Upper/Middle Frame Clear) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Clean Rectangular HUD Readouts (No Red Dots, No Cylinders) */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/90">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-black/65 backdrop-blur-md border border-white/15">
                    <span className="font-semibold text-[#ff3333]">REEL 0{activeIdx + 1}</span>
                    <span>· 00:0{activeIdx + 1}:24:18</span>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-black/65 backdrop-blur-md border border-white/15">
                    <Camera className="w-3 h-3 text-[#ff3333]" />
                    <span>{activeItem.lensSpec}</span>
                  </div>
                </div>

                {/* Bottom Frame Caption & Rectangular Full-Frame Action */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <div className="px-3 py-1.5 rounded-[6px] bg-black/70 backdrop-blur-md border border-white/15">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/65 block">
                      Chapter 0{activeIdx + 1} of 0{items.length}
                    </span>
                    <span
                      className="text-xl sm:text-2xl text-white leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {activeItem.tag}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenInLightbox(activeItem, activeIdx)}
                    className="px-3.5 py-2 rounded-[6px] bg-[#ff3333] hover:bg-[#e02828] text-white text-[10px] uppercase tracking-[0.16em] font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Full Frame</span>
                  </button>
                </div>
              </div>

              {/* Inner Right Mini Square Cutout Track Moving DOWN */}
              <div className="hidden sm:block w-5 bg-black/90 border-l border-white/15 overflow-hidden shrink-0 relative z-20">
                <div className="animate-squares-down absolute inset-x-0 top-0 flex flex-col items-center gap-2.5 py-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span
                      key={`inner-r-${i}`}
                      className="w-2.5 h-2.5 rounded-[1.5px] bg-white/20 border border-white/25 shrink-0 block"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Animated Story Reel Details */}
            <div className="lg:col-span-5 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`story-${activeItem.year}`}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-3.5"
                >
                  <div className="inline-flex items-center gap-2 pb-1 border-b border-white/15 text-[11px] uppercase tracking-[0.18em] text-white/80">
                    <Film className="w-3.5 h-3.5 text-[#ff3333]" />
                    <span>Milestone · {activeItem.metric}</span>
                  </div>

                  <div>
                    <span
                      className="text-4xl sm:text-5xl text-[#ff3333] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {activeItem.year}
                    </span>
                    <h4
                      className="text-2xl sm:text-3xl text-white font-normal lowercase mt-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {activeItem.title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {activeItem.desc}
                  </p>

                  {/* Film Frame Thumbnails Strip (Top-Aligned so Faces Are Not Cut) */}
                  <div className="pt-2 grid grid-cols-5 gap-2">
                    {items.map((thumb, idx) => (
                      <button
                        key={`thumb-${thumb.year}`}
                        type="button"
                        onClick={() => {
                          setActiveIdx(idx);
                          setAutoPlay(false);
                        }}
                        className={`group/thumb relative aspect-square rounded-[8px] overflow-hidden border transition-all cursor-pointer ${
                          idx === activeIdx
                            ? 'border-[#ff3333] ring-2 ring-[#ff3333]/50 scale-105'
                            : 'border-white/15 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={thumb.img}
                          alt={thumb.year}
                          className="w-full h-full object-cover object-[50%_15%]"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute inset-x-0 bottom-0 bg-black/75 text-[9px] text-white text-center py-0.5 font-medium">
                          {thumb.year}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Vertical Square Cutouts Strip — Constantly Moving DOWN in Loop */}
          <div className="w-6 sm:w-8 bg-[#050507] border-l border-white/10 overflow-hidden shrink-0 relative">
            <div className="animate-squares-down absolute inset-x-0 top-0 flex flex-col items-center gap-3 py-1.5">
              {Array.from({ length: 48 }).map((_, i) => (
                <span
                  key={`right-square-${i}`}
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2px] bg-white/15 border border-white/25 shrink-0 block"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Square Cutouts Strip (Constantly Moving Right in Loop) */}
        <div className="h-6 bg-[#050507] border-t border-white/10 flex items-center overflow-hidden px-2">
          <div className="animate-sprocket-right flex items-center gap-3 whitespace-nowrap min-w-[200%]">
            {Array.from({ length: 56 }).map((_, i) => (
              <span
                key={`bottom-sprocket-${i}`}
                className="w-3.5 h-2.5 rounded-[2px] bg-white/15 border border-white/25 shrink-0 inline-block"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE TIMELINE SPINE (SQUARE FILM MARKERS — NO RED DOTS OR CYLINDERS) */}
      <div className="relative max-w-5xl mx-auto pt-4">
        {/* Central Spine Track */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-black/10 -translate-x-1/2 overflow-hidden">
          <motion.div
            animate={{ top: ['-20%', '110%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-36 bg-gradient-to-b from-transparent via-[#ff3333] to-transparent"
          />
        </div>

        <div className="space-y-8 sm:space-y-12">
          {items.map((item, idx) => {
            const isLeft = item.align === 'left';
            const isActive = idx === activeIdx;
            return (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* 3D Tilt Milestone Card */}
                <div className="w-full md:w-[45%]">
                  <TiltMilestoneCard
                    item={item}
                    idx={idx}
                    isActive={isActive}
                    onActivate={() => {
                      setActiveIdx(idx);
                    }}
                    onInspectPhoto={() => handleOpenInLightbox(item, idx)}
                  />
                </div>

                {/* Central Square Film Frame Marker (No Red Dots, No Circles) */}
                <div className="hidden md:flex w-[10%] justify-center relative z-20">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveIdx(idx);
                      setAutoPlay(false);
                    }}
                    className={`relative flex items-center justify-center w-9 h-9 rotate-45 rounded-[4px] border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#111111] border-[#ff3333] text-white shadow-lg scale-110'
                        : 'bg-white border-black/20 text-black/60 hover:border-[#ff3333]'
                    }`}
                    title={`Jump to ${item.year}`}
                  >
                    <span className="-rotate-45 text-[10px] font-semibold tracking-tighter">
                      0{idx + 1}
                    </span>
                  </button>
                </div>

                {/* Opposite Side Floating Script Callout on Desktop */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className={`hidden md:flex w-[45%] flex-col ${
                    isLeft ? 'items-start pl-4 text-left' : 'items-end pr-4 text-right'
                  }`}
                >
                  <span
                    className={`text-4xl lg:text-5xl transition-colors duration-300 leading-none ${
                      isActive ? 'text-[#ff3333]' : 'text-black/25'
                    }`}
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {item.year} · {item.tag}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-black/45 mt-1">
                    {item.lensSpec} · {item.metric}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InnerHoverVideoBox({
  videoSrc,
  posterUrl,
  couple,
  location,
  aspectClass = 'aspect-[9/14]',
  onOpenModal,
}: InnerHoverVideoBoxProps) {
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
      className={`group relative ${aspectClass} rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#0d0d0d] cursor-pointer border border-black/10 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.03] hover:z-30`}
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

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 transition-opacity duration-300 ${
          isHovered ? 'opacity-95' : 'opacity-85'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.88) 100%)',
        }}
      />

      {/* Editorial Information + Mute/Unmute Button */}
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex items-end justify-between gap-2.5 z-20">
        <div className="min-w-0">
          <span
            className="text-sm sm:text-base text-[#ff3333] block truncate leading-none mb-0.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {location}
          </span>
          <h4
            className="text-base sm:text-xl text-white font-normal tracking-wide truncate leading-tight drop-shadow"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {couple}
          </h4>
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

export function TwfInnerPages({
  activePage,
  searchQuery,
  onSearchChange,
  onPlayFilm,
  onSelectPhoto,
  onOpenQuickEnquire,
}: TwfInnerPagesProps) {
  // Films & Gallery Page State
  const [archiveTab, setArchiveTab] = useState<
    'all' | 'landscape' | 'portrait' | 'gallery' | 'signature'
  >('all');
  const [photoFilter, setPhotoFilter] = useState<
    'all' | 'weddings' | 'pre-wedding' | 'portraits' | 'candid'
  >('all');

  // About Us Scene Filter & Photo Detail Zoom State
  const [activeSceneIdx, setActiveSceneIdx] = useState<number>(0);
  const [aboutZoomPlateIdx, setAboutZoomPlateIdx] = useState<number>(0);
  const [aboutZoomLevel, setAboutZoomLevel] = useState<number>(1);

  // Installations Lighting Toggle
  const [lightingInspectId, setLightingInspectId] = useState<string | null>(null);

  // FAQs State
  const [openFaqId, setOpenFaqId] = useState<string>('faq1');
  const [legalTab, setLegalTab] = useState<'faqs' | 'cookies' | 'terms' | 'privacy'>(
    'faqs'
  );

  // Contact / Careers Form State
  const [contactTab, setContactTab] = useState<'wedding' | 'careers'>('wedding');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    coupleNames: '',
    email: '',
    phone: '',
    dates: '',
    venueCity: '',
    notes: '',
  });
  const [careerForm, setCareerForm] = useState({
    fullName: '',
    role: '',
    portfolioUrl: '',
    experience: '',
  });

  const contactWhatsappText = encodeURIComponent(
    `Hello Masoom Studio! We would love to enquire about our wedding.\n\nCouple: ${
      contactForm.coupleNames || 'Wedding Enquiry'
    }\nEmail: ${contactForm.email || 'Not provided'}\nPhone: ${
      contactForm.phone || 'Not provided'
    }\nDates: ${contactForm.dates || 'TBD'}\nVenue: ${
      contactForm.venueCity || 'Patna, Bihar'
    }\nEvents & Details: ${contactForm.notes || 'Looking forward to connecting!'}`
  );
  const contactWhatsappHref = `https://wa.me/917488458213?text=${contactWhatsappText}`;

  const handleOpenReelModal = (reel: InstagramReelItem) => {
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
      duration: reel.isPortrait ? 'Portrait Reel' : 'Wedding Film',
      thumbnailUrl: reel.posterUrl,
      heroImageUrl: reel.posterUrl,
      aiConceptPrompt: reel.caption,
      synopsis: reel.caption,
      emotionalHook: 'Filmed by Masoom Studio, Patna.',
      category: 'royal',
    });
  };

  const q = searchQuery.trim().toLowerCase();

  const filteredReels = INSTAGRAM_REELS.filter(
    (r) =>
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.couple.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.caption.toLowerCase().includes(q)
  );

  const landscapeVideos = filteredReels.filter((r) => !r.isPortrait);
  const portraitVideos = filteredReels.filter((r) => r.isPortrait);

  const filteredGallery = GALLERY_PHOTOS.filter((p) => {
    const matchesQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.couple.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q);
    const matchesCat = photoFilter === 'all' || p.category === photoFilter;
    return matchesQ && matchesCat;
  });

  const filteredSignature = SIGNATURE_FRAMES.filter((p) => {
    const matchesQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.couple.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q);
    const matchesCat = photoFilter === 'all' || p.category === photoFilter;
    return matchesQ && matchesCat;
  });

  // =========================================================================
  // PAGE 1: FILMS, REELS & PHOTO ARCHIVE (/twf-films)
  // =========================================================================
  if (activePage === 'films') {
    return (
      <div className="space-y-10 sm:space-y-12 py-2 sm:py-4 px-1 sm:px-2">
        <div className="rounded-[20px] sm:rounded-[24px] min-h-[290px] sm:min-h-[370px] lg:min-h-[430px] bg-[#111111] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-end">
          {/* Distinct Clear Hero Photography Background for Films & Photos (Faces Uncropped) */}
          <img
            src="/Gallary/Landingpage2.jpg"
            alt="Wedding Films & Photos Hero"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover object-[50%_22%] filter brightness-95 contrast-[1.03] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.38) 48%, rgba(0,0,0,0.88) 100%)',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span
                className="text-xl sm:text-2xl text-[#ff3333] block mb-1"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Masoom Studio · Patna &amp; Destination Weddings
              </span>
              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight lowercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                wedding films, reels &amp; photos
              </h1>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by couple or venue..."
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full py-2.5 pl-9 pr-8 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#ff3333]"
              />
              <Search className="w-3.5 h-3.5 text-white/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                { id: 'all', label: 'All Work' },
                { id: 'landscape', label: 'Landscape Trailers' },
                { id: 'portrait', label: 'Portrait Reels' },
                { id: 'gallery', label: 'Wedding Photos' },
                { id: 'signature', label: 'Signature Photos' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setArchiveTab(
                      tab.id as
                        | 'all'
                        | 'landscape'
                        | 'portrait'
                        | 'gallery'
                        | 'signature'
                    )
                  }
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs transition-all cursor-pointer ${
                    archiveTab === tab.id
                      ? 'bg-[#ff3333] text-white font-medium shadow-lg shadow-[#ff3333]/25'
                      : 'bg-white/10 text-white/75 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {(archiveTab === 'all' ||
              archiveTab === 'gallery' ||
              archiveTab === 'signature') && (
              <div className="flex flex-wrap items-center gap-1">
                {[
                  { id: 'all', label: 'All Photos' },
                  { id: 'weddings', label: 'Wedding Rituals' },
                  { id: 'portraits', label: 'Bridal Portraits' },
                  { id: 'pre-wedding', label: 'Pre-Wedding' },
                  { id: 'candid', label: 'Candid Moments' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setPhotoFilter(
                        cat.id as
                          | 'all'
                          | 'weddings'
                          | 'pre-wedding'
                          | 'portraits'
                          | 'candid'
                      )
                    }
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] transition-all cursor-pointer ${
                      photoFilter === cat.id
                        ? 'bg-white text-[#111111] font-medium'
                        : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 1. LANDSCAPE WEDDING TRAILERS & FILMS ROW (16:9 WIDESCREEN) */}
        {(archiveTab === 'all' || archiveTab === 'landscape') && (
          <section className="space-y-5">
            <div className="border-b border-black/10 pb-2.5">
              <span
                className="text-xl sm:text-2xl text-[#ff3333] block leading-none"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Widescreen Wedding Stories
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#111111] lowercase mt-0.5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                landscape wedding trailers
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-2">
              {landscapeVideos.map((reel) => (
                <InnerHoverVideoBox
                  key={reel.id}
                  videoSrc={reel.videoSrc}
                  posterUrl={reel.posterUrl}
                  couple={reel.couple}
                  location={reel.location}
                  aspectClass="aspect-video"
                  onOpenModal={() => handleOpenReelModal(reel)}
                />
              ))}
            </div>
          </section>
        )}

        {/* 2. PORTRAIT WEDDING REELS ROW (9:16 VERTICAL) */}
        {(archiveTab === 'all' || archiveTab === 'portrait') && (
          <section className="space-y-5">
            <div className="border-b border-black/10 pb-2.5">
              <span
                className="text-xl sm:text-2xl text-[#ff3333] block leading-none"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Vertical Wedding Moments
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#111111] lowercase mt-0.5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                portrait wedding reels
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 py-2">
              {portraitVideos.map((reel) => (
                <InnerHoverVideoBox
                  key={reel.id}
                  videoSrc={reel.videoSrc}
                  posterUrl={reel.posterUrl}
                  couple={reel.couple}
                  location={reel.location}
                  aspectClass="aspect-[9/14]"
                  onOpenModal={() => handleOpenReelModal(reel)}
                />
              ))}
            </div>
          </section>
        )}

        {/* 3. WEDDING PHOTOGRAPHY GALLERY */}
        {(archiveTab === 'all' || archiveTab === 'gallery') && (
          <section className="space-y-5">
            <div className="border-b border-black/10 pb-2.5">
              <span
                className="text-xl sm:text-2xl text-[#ff3333] block leading-none"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Candid &amp; Traditional Wedding Photos
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#111111] lowercase mt-0.5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                wedding photo gallery
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {filteredGallery.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className="group relative aspect-[4/5] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111111] border border-black/10 shadow-md cursor-pointer transition-all duration-500 hover:scale-[1.03]"
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
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 100%)',
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                    <span
                      className="text-sm text-[#ff3333] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {photo.couple}
                    </span>
                    <span className="text-[11px] text-white/95 font-medium truncate block mt-0.5">
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. SIGNATURE PHOTOS */}
        {(archiveTab === 'all' || archiveTab === 'signature') && (
          <section className="space-y-5">
            <div className="border-b border-black/10 pb-2.5">
              <span
                className="text-xl sm:text-2xl text-[#ff3333] block leading-none"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Our Favourite Wedding Moments
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#111111] lowercase mt-0.5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                signature photo collection
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {filteredSignature.map((frame) => (
                <div
                  key={frame.id}
                  onClick={() => onSelectPhoto(frame)}
                  className="group relative aspect-[4/5] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111111] border border-black/10 shadow-md cursor-pointer transition-all duration-500 hover:scale-[1.03]"
                >
                  <img
                    src={frame.imageUrl}
                    alt={frame.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 100%)',
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                    <span
                      className="text-sm text-[#ff3333] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {frame.couple}
                    </span>
                    <span className="text-[11px] text-white/95 font-medium truncate block mt-0.5">
                      {frame.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // =========================================================================
  // PAGE 2: ABOUT US (/about-us)
  // =========================================================================
  if (activePage === 'about') {
    const col1 = [...GALLERY_PHOTOS.slice(0, 5), ...GALLERY_PHOTOS.slice(0, 5)];
    const col2 = [...SIGNATURE_FRAMES.slice(0, 5), ...SIGNATURE_FRAMES.slice(0, 5)];
    const col3 = [...GALLERY_PHOTOS.slice(6, 11), ...GALLERY_PHOTOS.slice(6, 11)];
    const col4 = [...SIGNATURE_FRAMES.slice(6, 11), ...SIGNATURE_FRAMES.slice(6, 11)];
    const col5 = [...GALLERY_PHOTOS.slice(12, 17), ...GALLERY_PHOTOS.slice(12, 17)];

    const timelineItems: TimelineMilestoneItem[] = [
      {
        year: '2018',
        title: 'Beginning in Patna',
        desc: 'Masoom Javed starts Masoom Studio with a focus on natural light, candid smiles, and real family feelings.',
        img: GALLERY_PHOTOS[0].imageUrl,
        align: 'left',
        tag: 'Where It Began',
        metric: 'First 25+ Weddings',
        lensSpec: '35mm · Natural Light',
      },
      {
        year: '2019',
        title: 'Building Our Wedding Team',
        desc: 'Candid photographers, traditional videographers, and film editors join hands to cover weddings across Bihar.',
        img: GALLERY_PHOTOS[1].imageUrl,
        align: 'right',
        tag: 'Growing Crew',
        metric: 'All Across Bihar',
        lensSpec: '50mm f/1.2 · Candid',
      },
      {
        year: '2021',
        title: 'Pre-Wedding Shoots & Drone Coverage',
        desc: 'Expanding into outdoor pre-wedding films and aerial drone shots for grand wedding venues and baraats.',
        img: GALLERY_PHOTOS[8].imageUrl,
        align: 'left',
        tag: 'Cinema & Skies',
        metric: '4K Aerial Cinema',
        lensSpec: '24mm · Drone & Gimbal',
      },
      {
        year: '2023',
        title: 'Handcrafted Family Wedding Albums',
        desc: 'Designing custom, long-lasting wedding photo albums that parents and grandparents love flipping through.',
        img: GALLERY_PHOTOS[3].imageUrl,
        align: 'right',
        tag: 'Family Heirlooms',
        metric: '300+ Celebrations',
        lensSpec: '85mm · Fine Art Print',
      },
      {
        year: 'Today',
        title: 'Our Bailey Road Studio in Patna',
        desc: 'Welcoming couples and families at Pillar No. 42, Pandey Palace, Bailey Road, near Paras Hospital, Patna.',
        img: GALLERY_PHOTOS[19].imageUrl,
        align: 'left',
        tag: 'Bailey Road Home',
        metric: 'Pillar 42 · Patna',
        lensSpec: 'Full Production House',
      },
    ];

    const iconicWeddingsCol1 = GALLERY_PHOTOS.slice(0, 4);
    const iconicWeddingsCol2 = SIGNATURE_FRAMES.slice(0, 4);
    const iconicWeddingsCol3 = GALLERY_PHOTOS.slice(14, 18);

    return (
      <div className="space-y-12 sm:space-y-16 py-2 sm:py-4 px-1 sm:px-2">
        {/* 1. 5-COLUMN MOVING PARALLAX PHOTO WALL WITH TRANSLUCENT HERO GLASS BOX */}
        <section className="relative h-[460px] sm:h-[600px] lg:h-[680px] rounded-[20px] sm:rounded-[26px] overflow-hidden bg-[#0a0a0a] border border-white/15 shadow-2xl flex items-center justify-center">
          <div className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 p-2.5 sm:p-4 opacity-85">
            <div className="animate-float-up space-y-2.5 sm:space-y-4">
              {col1.map((p, i) => (
                <div
                  key={`c1-${i}`}
                  onClick={() => onSelectPhoto(p)}
                  className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 cursor-pointer"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[50%_12%] hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            <div className="animate-float-down space-y-2.5 sm:space-y-4">
              {col2.map((p, i) => (
                <div
                  key={`c2-${i}`}
                  onClick={() => onSelectPhoto(p)}
                  className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 cursor-pointer"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[50%_12%] hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            <div className="animate-float-up space-y-2.5 sm:space-y-4">
              {col3.map((p, i) => (
                <div
                  key={`c3-${i}`}
                  onClick={() => onSelectPhoto(p)}
                  className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 cursor-pointer"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[50%_12%] hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            <div className="hidden sm:block animate-float-down space-y-4">
              {col4.map((p, i) => (
                <div
                  key={`c4-${i}`}
                  onClick={() => onSelectPhoto(p)}
                  className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 cursor-pointer"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[50%_12%] hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            <div className="hidden lg:block animate-float-up space-y-4">
              {col5.map((p, i) => (
                <div
                  key={`c5-${i}`}
                  onClick={() => onSelectPhoto(p)}
                  className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 cursor-pointer"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[50%_12%] hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.28) 65%, rgba(0,0,0,0.68) 100%)',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-4 p-6 sm:p-10 rounded-[22px] sm:rounded-[26px] bg-black/25 backdrop-blur-md border border-white/30 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <img
              src="/MasoomStudioLogo.png"
              alt="Masoom Studio"
              className="w-24 h-20 sm:w-28 sm:h-22 mx-auto mb-3 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              referrerPolicy="no-referrer"
            />
            <span
              className="text-2xl sm:text-3xl text-[#ff3333] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] block mb-1"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Our Story · Patna, Bihar
            </span>
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where it all began
            </h1>
            <p className="text-xs sm:text-sm text-white/95 mt-3 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              Started in Patna by Masoom Javed, we capture weddings in a way that
              is{' '}
              <span
                className="text-xl text-[#ff3333] px-1"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                vibrant, fun, and natural
              </span>{' '}
              — turning real family moments into memories you will love forever.
            </p>
          </div>
        </section>

        {/* 2. FOUNDER STORY & VERTICAL TIMELINE */}
        <section className="rounded-[20px] sm:rounded-[24px] bg-white/85 backdrop-blur-xl border border-black/10 p-5 sm:p-10 lg:p-12 shadow-xl space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden border border-black/10 shadow-xl">
                <img
                  src="/Gallary/LandingPage1.jpg"
                  alt="Masoom Javed"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 sm:p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 text-white">
                  <span
                    className="text-lg text-[#ff3333] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Founder &amp; Lead Storyteller
                  </span>
                  <h3
                    className="text-xl sm:text-2xl text-white mt-0.5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {STUDIO_INFO.founder}
                  </h3>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <span
                className="text-2xl text-[#ff3333] block"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Meet Masoom Studio
              </span>
              <h2
                className="text-2xl sm:text-4xl lg:text-5xl text-[#111111] leading-tight lowercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                focusing on{' '}
                <span
                  className="text-3xl sm:text-5xl text-[#ff3333] px-1"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  real moments
                </span>
                , family warmth, and natural smiles
              </h2>
              <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                Instead of treating your wedding like a long checklist of forced
                poses, Masoom Javed and our team focus on how your wedding
                actually feels — the fun of Haldi and Sangeet, the blessings of
                parents, and the quiet smiles shared between the bride and groom.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-black/[0.03] border border-black/10">
                  <span
                    className="text-base text-[#ff3333] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Home City
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#111111] mt-1 block">
                    Patna, Bihar
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/[0.03] border border-black/10">
                  <span
                    className="text-base text-[#ff3333] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Established
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#111111] mt-1 block">
                    Since 2018
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/[0.03] border border-black/10">
                  <span
                    className="text-base text-[#ff3333] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Studio Location
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#111111] mt-1 block">
                    Bailey Road, Patna
                  </span>
                </div>
              </div>
            </div>
          </div>

          <AnimatedJourneyTimeline
            items={timelineItems}
            onSelectPhoto={onSelectPhoto}
          />
        </section>

        {/* 3. INTERACTIVE CHAPTER SCRUBBER */}
        <section className="rounded-[20px] sm:rounded-[24px] bg-[#111111] text-white p-5 sm:p-10 lg:p-12 border border-white/15 shadow-2xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span
                className="text-xl text-[#ff3333] block leading-none"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                How We Work
              </span>
              <h2
                className="text-2xl sm:text-4xl text-white lowercase mt-0.5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                the masoom studio story
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {STORY_SCENES.map((sc, i) => (
                <button
                  key={sc.sceneNumber}
                  type="button"
                  onClick={() => setActiveSceneIdx(i)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
                    activeSceneIdx === i
                      ? 'bg-[#ff3333] text-white'
                      : 'bg-white/10 text-white/65 hover:text-white'
                  }`}
                >
                  {sc.sceneNumber}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span
                className="text-2xl text-[#ff3333] block"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                {STORY_SCENES[activeSceneIdx].scriptTitle}
              </span>
              <h3
                className="text-2xl sm:text-4xl lg:text-5xl text-white leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {STORY_SCENES[activeSceneIdx].title}
              </h3>
              <p className="text-xs sm:text-base text-white/80 leading-relaxed">
                {STORY_SCENES[activeSceneIdx].narrative}
              </p>
            </div>

            <div className="lg:col-span-6 relative h-[300px] sm:h-[400px] flex items-center justify-center">
              <div className="w-[56%] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/25 shadow-2xl -rotate-6 -translate-x-6 hover:rotate-0 transition-all duration-500">
                <img
                  src={STORY_SCENES[activeSceneIdx].imageUrl}
                  alt={STORY_SCENES[activeSceneIdx].title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-[52%] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#ff3333]/60 shadow-2xl rotate-6 translate-x-6 translate-y-4 hover:rotate-0 transition-all duration-500">
                <img
                  src={STORY_SCENES[activeSceneIdx].secondaryImageUrl}
                  alt={STORY_SCENES[activeSceneIdx].title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE HIGH-RESOLUTION DETAIL ZOOM INSPECTOR */}
        <section className="rounded-[22px] sm:rounded-[28px] bg-white p-5 sm:p-10 border border-black/10 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-black/10 pb-4">
            <div>
              <span
                className="text-2xl text-[#ff3333] block"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Inspect Every Nuance Up Close
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#111111] lowercase tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                high-resolution photo zoom plate
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-black/60 hidden sm:inline">
                Zoom level: {Math.round(aboutZoomLevel * 100)}%
              </span>
              <div className="flex items-center gap-1 p-1 rounded-full bg-black/5 border border-black/10">
                <button
                  type="button"
                  onClick={() => setAboutZoomLevel((prev) => Math.min(3, prev + 0.5))}
                  className="w-7 h-7 rounded-full bg-white hover:bg-[#ff3333] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  title="Zoom In"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setAboutZoomLevel((prev) => Math.max(1, prev - 0.5))}
                  className="w-7 h-7 rounded-full bg-white hover:bg-[#ff3333] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  title="Zoom Out"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                {aboutZoomLevel > 1 && (
                  <button
                    type="button"
                    onClick={() => setAboutZoomLevel(1)}
                    className="px-2.5 py-1 rounded-full text-[10px] bg-white hover:bg-[#ff3333] hover:text-white transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Selectors for Zoomable Iconic Plates */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                title: 'Royal Bridal Grace',
                couple: 'Patna Wedding',
                img: '/Gallary/LandingPage3.png',
              },
              {
                title: 'Sacred Vows & Phere',
                couple: 'Kunika & Tushar',
                img: '/Gallary/LandingPage1.jpg',
              },
              {
                title: 'Couple Starlight',
                couple: 'Nilesh & Sweta',
                img: '/Gallary/Landingpage2.jpg',
              },
              {
                title: 'The Emotional Vidaai',
                couple: 'Anupam & Aishwarya',
                img: '/Gallary/imgi_30_704427170_17969958399160466_4603175030385960861_n.jpg',
              },
            ].map((plate, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setAboutZoomPlateIdx(idx);
                  setAboutZoomLevel(1);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  aboutZoomPlateIdx === idx
                    ? 'border-[#ff3333] bg-[#ff3333]/5 shadow-sm'
                    : 'border-black/10 hover:border-black/20 bg-black/[0.02]'
                }`}
              >
                <img
                  src={plate.img}
                  alt={plate.title}
                  className="w-10 h-10 rounded-lg object-cover object-[center_18%] shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[11px] font-medium text-[#111111] block truncate">
                    {plate.title}
                  </span>
                  <span className="text-[10px] text-black/50 block truncate">
                    {plate.couple}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Zoom Viewport */}
          <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-black border border-black/15 shadow-inner flex items-center justify-center select-none group">
            {(() => {
              const activePlateImg = [
                '/Gallary/LandingPage3.png',
                '/Gallary/LandingPage1.jpg',
                '/Gallary/Landingpage2.jpg',
                '/Gallary/imgi_30_704427170_17969958399160466_4603175030385960861_n.jpg',
              ][aboutZoomPlateIdx];

              return (
                <img
                  src={activePlateImg}
                  alt="Zoomable wedding plate"
                  onClick={() =>
                    setAboutZoomLevel((prev) => (prev < 2.5 ? prev + 0.5 : 1))
                  }
                  style={{
                    transform: `scale(${aboutZoomLevel})`,
                    transformOrigin: '50% 20%',
                    transition: 'transform 0.3s ease-out',
                  }}
                  className={`w-full h-full object-cover object-[center_18%] ${
                    aboutZoomLevel > 1 ? 'cursor-grab' : 'cursor-zoom-in'
                  }`}
                  referrerPolicy="no-referrer"
                />
              );
            })()}

            {/* Instruction Badge */}
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] flex items-center gap-1.5 pointer-events-none">
              <ZoomIn className="w-3.5 h-3.5 text-[#ff3333]" />
              <span>
                {aboutZoomLevel > 1
                  ? 'Click to zoom further or tap Reset'
                  : 'Click on image to zoom in (Faces centered)'}
              </span>
            </div>
          </div>
        </section>

        {/* 4. 3-COLUMN COUPLES GRID */}
        <section className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span
              className="text-2xl text-[#ff3333] block mb-0.5"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Our Couples &amp; Families
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl text-[#111111] lowercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              celebrations we have loved filming
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[iconicWeddingsCol1, iconicWeddingsCol2, iconicWeddingsCol3].map(
              (col, colIdx) => (
                <div
                  key={colIdx}
                  className={`space-y-5 sm:space-y-6 ${
                    colIdx === 1 ? 'md:mt-8' : colIdx === 2 ? 'md:mt-16' : ''
                  }`}
                >
                  {col.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="group relative aspect-[4/5] rounded-[20px] overflow-hidden bg-black border border-black/10 shadow-xl cursor-pointer"
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.couple}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <div
                          className="text-lg text-[#ff3333] leading-none"
                          style={{ fontFamily: 'var(--font-script)' }}
                        >
                          {photo.location}
                        </div>
                        <div
                          className="text-xl sm:text-2xl text-white tracking-wide mt-0.5"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {photo.couple}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </section>
      </div>
    );
  }

  // =========================================================================
  // PAGE 3: SERVICES & WEDDING PACKAGES (/commissions)
  // =========================================================================
  if (activePage === 'commissions') {
    return (
      <div className="space-y-10 sm:space-y-12 py-2 sm:py-4 px-1 sm:px-2">
        <div className="rounded-[20px] sm:rounded-[24px] min-h-[290px] sm:min-h-[370px] lg:min-h-[430px] bg-[#111111] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-end">
          {/* Distinct Clear Hero Photography Background for Services & Packages (Faces Uncropped) */}
          <img
            src="/Gallary/imgi_27_628323685_18346461886235287_4431154153769162509_n.jpg"
            alt="Services & Packages Hero"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover object-[50%_26%] filter brightness-95 contrast-[1.03] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.38) 48%, rgba(0,0,0,0.88) 100%)',
            }}
          />

          <div className="relative z-10">
            <span
              className="text-2xl sm:text-3xl text-[#ff3333] block mb-1"
              style={{ fontFamily: 'var(--font-script)' }}
            >
            What We Offer · Patna &amp; Destination Weddings
          </span>
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white lowercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            our wedding services &amp; packages
          </h1>
          <p className="text-xs sm:text-sm text-white/75 mt-3 max-w-2xl leading-relaxed">
            From Candid Photography, Traditional Videography, and Cinematic Wedding
            Films to Pre-Wedding Shoots, Drone Coverage, and Custom Albums — we
            cover Engagement, Roka, Haldi, Mehendi, Sangeet, Wedding, and Reception.
          </p>
        </div>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {COMMISSION_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-xl border border-black/10 p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span
                  className="text-2xl text-[#ff3333] block leading-none"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  {srv.scriptHighlight}
                </span>
                <h2
                  className="text-2xl sm:text-4xl text-[#111111]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {srv.title}
                </h2>
                <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                  {srv.description}
                </p>

                <ul className="space-y-2 pt-2">
                  {srv.deliverables.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111111]"
                    >
                      <Check className="w-4 h-4 text-[#ff3333] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p
                  className="text-lg text-black/70 max-w-xs leading-snug"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  &ldquo;{srv.humanNote}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => onOpenQuickEnquire(srv.title)}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-[#ff3333] text-white text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  <span>Enquire Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // PAGE 4: WEDDING VENUES WE SHOOT AT (/installations)
  // =========================================================================
  if (activePage === 'installations') {
    return (
      <div className="space-y-10 sm:space-y-12 py-2 sm:py-4 px-1 sm:px-2">
        <div className="rounded-[20px] sm:rounded-[24px] min-h-[290px] sm:min-h-[370px] lg:min-h-[430px] bg-[#111111] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-end">
          {/* Distinct Clear Hero Photography Background for Wedding Venues (Faces Uncropped) */}
          <img
            src="/Gallary/imgi_43_611344093_17949077742160466_1107492647243003038_n.jpg"
            alt="Wedding Venues Hero"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover object-[50%_34%] filter brightness-95 contrast-[1.03] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.38) 48%, rgba(0,0,0,0.88) 100%)',
            }}
          />

          <div className="relative z-10">
            <span
              className="text-2xl sm:text-3xl text-[#ff3333] block mb-1"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Patna &amp; Bihar Wedding Venues
            </span>
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white lowercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              popular venues we shoot at
            </h1>
            <p className="text-xs sm:text-sm text-white/75 mt-3 max-w-xl leading-relaxed">
              See how our team captures weddings across Patna’s favourite hotels,
              banquet halls, open lawns, and riverfront ghats.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {VENUE_INSTALLATIONS.map((inst) => {
            const inspecting = lightingInspectId === inst.id;
            return (
              <div
                key={inst.id}
                className="rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-xl border border-black/10 overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-black overflow-hidden">
                  <img
                    src={inspecting ? inst.secondaryImageUrl : inst.imageUrl}
                    alt={inst.venue}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-3.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[11px] text-white">
                    {inst.atmosphereTag}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setLightingInspectId(inspecting ? null : inst.id)
                    }
                    className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-[10px] uppercase tracking-wider font-medium shadow-lg cursor-pointer transition-colors"
                  >
                    {inspecting ? 'View First Photo' : 'See Another Angle'}
                  </button>
                </div>

                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span
                      className="text-xl text-[#ff3333] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {inst.venue}
                    </span>
                    <h3
                      className="text-2xl sm:text-3xl text-[#111111] mt-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {inst.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-black/70 mt-2 leading-relaxed">
                      {inst.summary}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between gap-3 border-t border-black/10">
                    <span className="text-xs text-black/60 truncate">
                      {inst.lightingNotes}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenQuickEnquire(`Wedding at ${inst.venue}`)
                      }
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] hover:bg-[#ff3333] text-white text-[10px] uppercase tracking-wider font-medium transition-colors cursor-pointer"
                    >
                      <span>Enquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // PAGE 5: FAQs & POLICIES (/faqs)
  // =========================================================================
  if (activePage === 'faqs') {
    return (
      <div className="space-y-8 sm:space-y-10 py-2 sm:py-4 px-1 sm:px-2 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span
            className="text-2xl sm:text-3xl text-[#ff3333] block"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Common Questions
          </span>
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl text-[#111111] lowercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            frequently asked questions
          </h1>

          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full bg-black/5 border border-black/10 mt-3">
            {[
              { id: 'faqs', label: 'Wedding FAQs' },
              { id: 'cookies', label: 'Cookies Policy' },
              { id: 'terms', label: 'Booking Terms' },
              { id: 'privacy', label: 'Privacy Policy' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() =>
                  setLegalTab(t.id as 'faqs' | 'cookies' | 'terms' | 'privacy')
                }
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs transition-all cursor-pointer ${
                  legalTab === t.id
                    ? 'bg-[#111111] text-white font-medium'
                    : 'text-black/65 hover:text-black'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {legalTab === 'faqs' ? (
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white/90 backdrop-blur-xl border border-black/10 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <span
                        className="text-lg text-[#ff3333] block leading-none"
                        style={{ fontFamily: 'var(--font-script)' }}
                      >
                        {item.category}
                      </span>
                      <h3
                        className="text-lg sm:text-2xl text-[#111111] mt-1"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {item.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-black/50 transition-transform ${
                        isOpen ? 'rotate-180 text-[#ff3333]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-black/70 leading-relaxed border-t border-black/5 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-xl border border-black/10 p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-black/75 leading-relaxed">
            <h3
              className="text-2xl sm:text-3xl text-[#111111]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {legalTab === 'cookies'
                ? 'Cookies & Website Policy'
                : legalTab === 'terms'
                ? 'Booking & Package Terms'
                : 'Family Privacy Policy'}
            </h3>
            <p>
              Masoom Studio treats every family’s wedding photos and films with
              complete care and respect.
            </p>
            <p>
              Package prices, deliverables, travel arrangements, payment stages,
              and delivery timelines are shared clearly and confirmed directly with
              you when you book your dates. Private online galleries are available
              for families who prefer to keep their wedding photos private.
            </p>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // PAGE 6: CONTACT & CAREERS (/contact)
  // =========================================================================
  return (
    <div className="space-y-10 sm:space-y-12 py-2 sm:py-4 px-1 sm:px-2 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span
          className="text-2xl sm:text-3xl text-[#ff3333] block"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          We&apos;d love to hear from you
        </span>
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl text-[#111111] lowercase"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          tell us your story
        </h1>

        <div className="inline-flex gap-2 p-1.5 rounded-full bg-black/5 border border-black/10 mt-2">
          <button
            type="button"
            onClick={() => setContactTab('wedding')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs transition-all cursor-pointer ${
              contactTab === 'wedding'
                ? 'bg-[#111111] text-white font-medium'
                : 'text-black/65 hover:text-black'
            }`}
          >
            Book Your Wedding
          </button>
          <button
            type="button"
            onClick={() => setContactTab('careers')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs transition-all cursor-pointer ${
              contactTab === 'careers'
                ? 'bg-[#111111] text-white font-medium'
                : 'text-black/65 hover:text-black'
            }`}
          >
            Join Our Team
          </button>
        </div>
      </div>

      {contactTab === 'wedding' ? (
        <div className="rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-xl border border-black/10 p-5 sm:p-10 shadow-xl">
          {contactSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#ff3333] mx-auto" />
              <h3
                className="text-2xl sm:text-3xl text-[#111111]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Thank you for reaching out to Masoom Studio!
              </h3>
              <p className="text-xs sm:text-sm text-black/65 max-w-md mx-auto leading-relaxed">
                Your enquiry has been prepared for our official WhatsApp{' '}
                <strong>({STUDIO_INFO.phoneNumber})</strong>. You can also call{' '}
                <strong>{STUDIO_INFO.phoneNumber}</strong> or email{' '}
                <strong>{STUDIO_INFO.email}</strong> directly below.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={contactWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-xs uppercase tracking-widest transition-colors shadow-lg shadow-[#ff3333]/30"
                >
                  <WhatsAppMinimalIcon className="w-4 h-4 text-white" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={STUDIO_INFO.phonePrimaryUrl}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/5 hover:bg-black/10 text-black/85 text-xs uppercase tracking-wider transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#ff3333]" />
                  <span>Call {STUDIO_INFO.phoneNumber}</span>
                </a>
                <a
                  href={STUDIO_INFO.emailUrl}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/5 hover:bg-black/10 text-black/85 text-xs uppercase tracking-wider transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#ff3333]" />
                  <span>{STUDIO_INFO.email}</span>
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContactSubmitted(true);
                const link = document.createElement('a');
                link.href = contactWhatsappHref;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-black/65 mb-1.5">
                    Bride &amp; Groom Names *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.coupleNames}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, coupleNames: e.target.value })
                    }
                    placeholder="e.g., Seema & Sayan"
                    className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm focus:outline-none focus:border-[#ff3333]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-black/65 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm focus:outline-none focus:border-[#ff3333]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-black/65 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm focus:outline-none focus:border-[#ff3333]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-black/65 mb-1.5">
                    Wedding Dates *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.dates}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, dates: e.target.value })
                    }
                    placeholder="Wedding dates"
                    className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm focus:outline-none focus:border-[#ff3333]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-black/65 mb-1.5">
                    Venue &amp; City *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.venueCity}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, venueCity: e.target.value })
                    }
                    placeholder="Hotel Maurya, Patna"
                    className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm focus:outline-none focus:border-[#ff3333]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-black/65 mb-1.5">
                  Tell Us About Your Wedding Events *
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.notes}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, notes: e.target.value })
                  }
                  placeholder="Tell us about your events (Engagement, Haldi, Mehendi, Sangeet, Wedding, Reception) and what services you are looking for..."
                  className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm focus:outline-none focus:border-[#ff3333]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={STUDIO_INFO.phonePrimaryUrl}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-black/5 hover:bg-[#ff3333] hover:text-white text-xs text-black/80 font-medium transition-colors cursor-pointer"
                    title={`Call ${STUDIO_INFO.phoneNumber}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{STUDIO_INFO.phoneNumber}</span>
                  </a>
                  <a
                    href={STUDIO_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-[#ff3333] hover:text-white flex items-center justify-center transition-colors group"
                    title={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                  >
                    <WhatsAppMinimalIcon className="w-4 h-4 text-black/75 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href={STUDIO_INFO.emailUrl}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-black/5 hover:bg-[#ff3333] hover:text-white text-xs text-black/80 font-medium transition-colors"
                    title={`Email ${STUDIO_INFO.email}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{STUDIO_INFO.email}</span>
                  </a>
                  <a
                    href={STUDIO_INFO.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-[#ff3333] hover:text-white flex items-center justify-center transition-colors"
                    title="Facebook"
                  >
                    <FacebookMinimalIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={STUDIO_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-[#ff3333] hover:text-white flex items-center justify-center transition-colors"
                    title="Studio Map"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>

                <button
                  type="submit"
                  className="px-7 sm:px-8 py-3.5 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-xl border border-black/10 p-5 sm:p-10 shadow-xl">
          {careerSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#ff3333] mx-auto" />
              <h3
                className="text-3xl text-[#111111]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Application Received
              </h3>
              <p className="text-sm text-black/65">
                Our team in Patna will review your work and get in touch via{' '}
                <strong>{STUDIO_INFO.phoneNumber}</strong> or{' '}
                <strong>{STUDIO_INFO.email}</strong>.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCareerSubmitted(true);
                const text = encodeURIComponent(
                  `Hello Masoom Studio! I would like to apply to join the team.\n\nName: ${careerForm.fullName}\nRole: ${careerForm.role}\nPortfolio: ${careerForm.portfolioUrl}\nExperience: ${careerForm.experience}`
                );
                const link = document.createElement('a');
                link.href = `https://wa.me/917488458213?text=${text}`;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <input
                  type="text"
                  required
                  value={careerForm.fullName}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, fullName: e.target.value })
                  }
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm"
                />
                <input
                  type="text"
                  required
                  value={careerForm.role}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, role: e.target.value })
                  }
                  placeholder="Role (Photographer / Videographer / Editor) *"
                  className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm"
                />
              </div>
              <input
                type="url"
                required
                value={careerForm.portfolioUrl}
                onChange={(e) =>
                  setCareerForm({ ...careerForm, portfolioUrl: e.target.value })
                }
                placeholder="Link to Your Work / Instagram / Drive *"
                className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm"
              />
              <textarea
                rows={4}
                required
                value={careerForm.experience}
                onChange={(e) =>
                  setCareerForm({ ...careerForm, experience: e.target.value })
                }
                placeholder="Tell us about your experience shooting weddings..."
                className="w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-black/15 text-sm"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#ff3333] text-white text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

