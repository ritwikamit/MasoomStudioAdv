'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { MapPin, RotateCcw, Globe2, ArrowUpRight, ZoomIn } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/masoom-data';

interface TwfRealisticGlobeProps {
  onOpenQuickEnquire?: (service?: string) => void;
}

const MASOOM_STUDIO_COORDS = {
  lat: 25.6063075,
  lng: 85.0820087,
  name: 'Masoom Studio',
};

export function TwfRealisticGlobe({ onOpenQuickEnquire }: TwfRealisticGlobeProps) {
  const globeVizRef = useRef<HTMLDivElement | null>(null);
  const zoomFeatherOverlayRef = useRef<HTMLDivElement | null>(null);

  const [isRealMap, setIsRealMap] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isRealMapRef = useRef(false);
  const isTransitioningRef = useRef(false);

  const worldInstanceRef = useRef<{
    width: (w: number) => { height: (h: number) => void };
    pointOfView: (pov: { lat: number; lng: number; altitude: number }, ms?: number) => void;
    controls: () => any;
    camera: () => any;
    lights: () => any[];
    globeMaterial: () => any;
    pauseAnimation?: () => void;
    resumeAnimation?: () => void;
    _destructor?: () => void;
  } | null>(null);

  // Stable callback refs for globe listeners and HTML elements
  const triggerTransitionToRealMapRef = useRef<() => void>(() => { });
  const triggerTransitionToGlobeRef = useRef<() => void>(() => { });

  const triggerTransitionToRealMap = useCallback(() => {
    if (isTransitioningRef.current || isRealMapRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);

    if (worldInstanceRef.current) {
      const controls = worldInstanceRef.current.controls();
      if (controls) {
        controls.autoRotate = false;
      }
      // Swoop camera smoothly directly into Masoom Studio in Patna
      worldInstanceRef.current.pointOfView(
        {
          lat: MASOOM_STUDIO_COORDS.lat,
          lng: MASOOM_STUDIO_COORDS.lng,
          altitude: 0.1,
        },
        900
      );
    }

    // Midway through camera fly-in, smoothly dissolve into the real map view
    setTimeout(() => {
      setIsRealMap(true);
      isRealMapRef.current = true;
    }, 450);

    setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }, 1000);
  }, []);

  const triggerTransitionToGlobe = useCallback(() => {
    if (isTransitioningRef.current || !isRealMapRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setIsRealMap(false);
    isRealMapRef.current = false;

    if (worldInstanceRef.current) {
      // Zoom camera back out from Patna into orbital view over India
      worldInstanceRef.current.pointOfView(
        {
          lat: MASOOM_STUDIO_COORDS.lat,
          lng: MASOOM_STUDIO_COORDS.lng,
          altitude: 1.55,
        },
        1100
      );
      const controls = worldInstanceRef.current.controls();
      if (controls) {
        setTimeout(() => {
          if (!isRealMapRef.current) {
            controls.autoRotate = true;
          }
        }, 1400);
      }
    }

    setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }, 1100);
  }, []);

  triggerTransitionToRealMapRef.current = triggerTransitionToRealMap;
  triggerTransitionToGlobeRef.current = triggerTransitionToGlobe;

  const handleResetOrbit = useCallback(() => {
    if (isRealMapRef.current) {
      triggerTransitionToGlobe();
      return;
    }
    if (!worldInstanceRef.current) return;
    worldInstanceRef.current.pointOfView(
      {
        lat: MASOOM_STUDIO_COORDS.lat,
        lng: MASOOM_STUDIO_COORDS.lng,
        altitude: 1.55,
      },
      900
    );
  }, [triggerTransitionToGlobe]);

  useEffect(() => {
    const container = globeVizRef.current;
    if (!container) return;

    let isCancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let resumeAutoRotateTimer: NodeJS.Timeout | null = null;

    const initGlobe = async () => {
      const GlobeModule = await import('globe.gl');
      if (isCancelled || !container) return;

      const Globe = GlobeModule.default;
      const width = container.clientWidth || 460;
      const height = container.clientHeight || 460;

      // Clear any previous DOM child inside mount container
      container.innerHTML = '';

      // Initialize globe.gl with transparent background for pure floating 3D globe
      const world = new Globe(container, {
        animateIn: true,
        rendererConfig: { antialias: true, alpha: true },
      })
        .width(width)
        .height(height)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('/globe/earth-blue-marble.jpg')
        .bumpImageUrl('/globe/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor('#3a82f6')
        .atmosphereAltitude(0.14)
        // Exact Location Pin anchored to Masoom Studio with simple text: Masoom Studio & Patna, Bihar
        .htmlElementsData([MASOOM_STUDIO_COORDS])
        .htmlLat('lat')
        .htmlLng('lng')
        .htmlAltitude(0.015)
        .htmlElement(() => {
          const pinWrapper = document.createElement('div');
          pinWrapper.style.position = 'relative';
          pinWrapper.style.width = '0px';
          pinWrapper.style.height = '0px';
          pinWrapper.style.cursor = 'pointer';
          pinWrapper.style.pointerEvents = 'auto';
          pinWrapper.style.userSelect = 'none';
          pinWrapper.title = 'Masoom Studio · Patna, Bihar (Click to zoom to real map)';

          pinWrapper.innerHTML = `
            <!-- Accurate Location Pin: Sharp bottom tip anchored exactly at (0, 0) -->
            <div style="
              position: absolute;
              left: 0;
              top: 0;
              transform: translate(-50%, -100%);
              transform-origin: 50% 100%;
              line-height: 0;
              transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
              filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.85));
              cursor: pointer;
            " class="masoom-globe-pin-marker">
              <svg width="26" height="34" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37258 0 0 5.37258 0 12C0 20.25 10.35 30.7 11.45 31.78C11.75 32.07 12.25 32.07 12.55 31.78C13.65 30.7 24 20.25 24 12C24 5.37258 18.6274 0 12 0Z" fill="#ff2222"/>
                <circle cx="12" cy="11.5" r="4.2" fill="#ffffff"/>
              </svg>
            </div>

            <!-- Plain Text: Directly Pasted Typography Without Any Enclosing Box or Border -->
            <div style="
              position: absolute;
              left: 15px;
              top: -30px;
              white-space: nowrap;
              pointer-events: none;
              user-select: none;
              line-height: 1.15;
            ">
              <div style="
                font-size: 13px;
                font-weight: 800;
                letter-spacing: 0.03em;
                color: #ffffff;
                text-shadow: 0 1px 2px #000000, 0 2px 6px rgba(0, 0, 0, 0.95), 0 0 12px rgba(0, 0, 0, 0.9);
              ">
                Masoom Studio
              </div>
              <div style="
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.06em;
                color: #ff5555;
                text-transform: uppercase;
                text-shadow: 0 1px 2px #000000, 0 2px 6px rgba(0, 0, 0, 0.95), 0 0 12px rgba(0, 0, 0, 0.9);
              ">
                Patna, Bihar
              </div>
            </div>
          `;

          const marker = pinWrapper.querySelector('.masoom-globe-pin-marker') as HTMLElement;
          pinWrapper.onmouseenter = () => {
            if (marker) marker.style.transform = 'translate(-50%, -100%) scale(1.22)';
          };
          pinWrapper.onmouseleave = () => {
            if (marker) marker.style.transform = 'translate(-50%, -100%) scale(1)';
          };

          pinWrapper.onclick = (e) => {
            e.stopPropagation();
            triggerTransitionToRealMapRef.current();
          };

          return pinWrapper;
        });

      // Custom globe material specular highlights
      const globeMaterial = world.globeMaterial() as THREE.MeshPhongMaterial;
      if (globeMaterial) {
        globeMaterial.bumpScale = 10;

        new THREE.TextureLoader().load('/globe/earth-water.png', (texture) => {
          if (isCancelled) return;
          globeMaterial.specularMap = texture;
          globeMaterial.specular = new THREE.Color('grey');
          globeMaterial.shininess = 15;
          globeMaterial.needsUpdate = true;
        });
      }

      // Position directional light for specular reflection
      const directionalLight = world
        .lights()
        .find((light: THREE.Light) => light.type === 'DirectionalLight');
      if (directionalLight) {
        directionalLight.position.set(1, 1, 1);
      }

      // Point camera directly over India & Masoom Studio (Patna)
      world.pointOfView(
        {
          lat: MASOOM_STUDIO_COORDS.lat,
          lng: MASOOM_STUDIO_COORDS.lng,
          altitude: 1.55,
        },
        0
      );

      // Configure interactive OrbitControls with optimal touch pinch zoom on smartphones
      const controls = world.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.45;
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enableZoom = true;
        controls.zoomSpeed = 1.35;
        controls.enablePan = false; // Dedicates two-finger touch strictly to pinch-zoom (dolly)
        controls.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        };
        controls.minDistance = 110;
        controls.maxDistance = 380;

        const handleCameraChange = () => {
          const vizEl = globeVizRef.current;
          const featherEl = zoomFeatherOverlayRef.current;
          if (!vizEl) return;
          const cam = world.camera();
          if (!cam) return;
          const dist = cam.position.length();

          // When the user zooms in close (dist < 142), smoothly transition to the real map location
          if (dist < 142 && !isRealMapRef.current && !isTransitioningRef.current) {
            triggerTransitionToRealMapRef.current();
            return;
          }

          // Unfaded crisp globe at default or zoomed out altitude (dist >= 238)
          if (dist >= 238) {
            vizEl.style.webkitMaskImage = 'none';
            vizEl.style.maskImage = 'none';
            if (featherEl) {
              featherEl.style.opacity = '0';
            }
            return;
          }

          // User is zooming in: progressively apply smooth circular radial edge feathering
          const zoomRatio = Math.max(0, Math.min(1, (238 - dist) / (238 - 135)));
          const solidCore = Math.round(92 - zoomRatio * 62);
          const midStop1 = Math.round(solidCore + (99 - solidCore) * 0.28);
          const midStop2 = Math.round(solidCore + (99 - solidCore) * 0.56);
          const midStop3 = Math.round(solidCore + (99 - solidCore) * 0.82);

          const maskValue = `radial-gradient(closest-side at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${solidCore}%, rgba(0,0,0,0.82) ${midStop1}%, rgba(0,0,0,0.45) ${midStop2}%, rgba(0,0,0,0.12) ${midStop3}%, rgba(0,0,0,0) 99%)`;
          vizEl.style.webkitMaskImage = maskValue;
          vizEl.style.maskImage = maskValue;

          if (featherEl) {
            featherEl.style.opacity = String(Math.min(1, zoomRatio * 1.15).toFixed(3));
          }
        };

        handleCameraChange();
        controls.addEventListener('change', handleCameraChange);

        controls.addEventListener('start', () => {
          controls.autoRotate = false;
          if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
        });

        controls.addEventListener('end', () => {
          if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
          resumeAutoRotateTimer = setTimeout(() => {
            if (!isRealMapRef.current) {
              controls.autoRotate = true;
            }
          }, 4500);
        });
      }

      worldInstanceRef.current = world;

      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: nextW, height: nextH } = entry.contentRect;
          if (nextW > 0 && nextH > 0 && worldInstanceRef.current) {
            worldInstanceRef.current.width(nextW).height(nextH);
          }
        }
      });
      resizeObserver.observe(container);

      visibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const w = worldInstanceRef.current;
            if (!w) return;
            if (entry.isIntersecting) {
              w.resumeAnimation?.();
            } else {
              w.pauseAnimation?.();
            }
          });
        },
        { rootMargin: '150px 0px' }
      );
      visibilityObserver.observe(container);
    };

    container.style.touchAction = 'none';
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length >= 2) {
        e.preventDefault();
      }
    };
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    let visibilityObserver: IntersectionObserver | null = null;
    initGlobe();

    return () => {
      isCancelled = true;
      container.removeEventListener('touchmove', handleTouchMove);
      if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
      if (resizeObserver) resizeObserver.disconnect();
      if (visibilityObserver) visibilityObserver.disconnect();
      if (worldInstanceRef.current) {
        try {
          worldInstanceRef.current._destructor?.();
        } catch {
          // noop
        }
        worldInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      {/* 3D Globe & Real Map Combined Stage */}
      <div className="relative w-full aspect-square max-w-[380px] sm:max-w-[460px] lg:max-w-[520px] mx-auto flex items-center justify-center">
        {/* Layer 1: Box-less 3D Realistic Globe */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${isRealMap
              ? 'opacity-0 pointer-events-none scale-105 filter blur-[2px]'
              : 'opacity-100 pointer-events-auto scale-100 filter-none'
            }`}
        >
          <div
            ref={globeVizRef}
            style={{ touchAction: 'none' }}
            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
          />

          {/* Soft Circular Ambient Edge Feather on Zoom-In */}
          <div
            ref={zoomFeatherOverlayRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-150"
            style={{
              opacity: 0,
              background:
                'radial-gradient(closest-side at 50% 50%, rgba(248,248,247,0) 48%, rgba(248,248,247,0.24) 70%, rgba(248,248,247,0.68) 87%, rgba(248,248,247,1) 99%)',
            }}
          />
        </div>

        {/* Layer 2: Real High-Detail Map of Masoom Studio (Cross-Fades in on Zoom) */}
        <div
          className={`absolute inset-0 rounded-[24px] sm:rounded-[32px] overflow-hidden border border-black/10 shadow-2xl bg-[#f2efe9] transition-all duration-700 ease-out flex flex-col ${isRealMap
              ? 'opacity-100 pointer-events-auto scale-100 z-20'
              : 'opacity-0 pointer-events-none scale-95 z-0'
            }`}
        >
          {/* Top Bar Floating Badge & Return to Globe Button */}
          <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-black/10 text-xs text-[#111111] pointer-events-auto">
              <span className="font-semibold tracking-tight">Masoom Studio</span>
              <span className="text-black/55 text-[10px] hidden sm:inline">
                · Pillar No. 42, Bailey Road
              </span>
            </div>

            <button
              type="button"
              onClick={triggerTransitionToGlobe}
              aria-label="Return to 3D Globe View"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] hover:bg-[#ff3333] text-white text-[10px] tracking-wider uppercase font-medium shadow-md transition-colors cursor-pointer pointer-events-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>3D Globe</span>
            </button>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="w-full h-full relative bg-[#e5e3df]">
            <iframe
              title="Masoom Studio Patna Real Location Map"
              src={STUDIO_INFO.mapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Bottom Bar Floating Location Info & External App Action */}
          <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            <div className="text-[10px] font-medium text-black/75 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-black/10 pointer-events-auto truncate max-w-[55%]">
              📍 Bailey Road, near Paras Hospital
            </div>

            <a
              href={STUDIO_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-[10px] font-medium tracking-wide shadow-md transition-colors pointer-events-auto cursor-pointer shrink-0"
            >
              <span>Open Google Maps</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Smooth Atmospheric Iris Flash during Zoom Transition */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[32px] transition-opacity duration-500 z-30 ${isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
      </div>

      {/* Floating Action Controls Below Stage */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 relative z-10">
        {!isRealMap ? (
          <>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 text-[#111111]/70 text-[10px] tracking-wider uppercase font-medium">
              <ZoomIn className="w-3.5 h-3.5 text-[#ff3333]" />
              <span>Pinch / Scroll to zoom · Drag to rotate</span>
            </span>

            <button
              type="button"
              onClick={triggerTransitionToRealMap}
              aria-label="Zoom in to Masoom Studio real map"
              className="px-3.5 py-1.5 rounded-full bg-[#ff3333] hover:bg-[#e02828] active:scale-95 text-white text-[10px] tracking-wider uppercase font-medium inline-flex items-center gap-1.5 shadow-md shadow-[#ff3333]/25 transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Zoom to Real Map</span>
            </button>

            <button
              type="button"
              onClick={handleResetOrbit}
              aria-label="Reset 3D Globe"
              className="px-3 py-1.5 rounded-full bg-[#111111] hover:bg-black text-white text-[10px] tracking-wider uppercase font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Orbit</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={triggerTransitionToGlobe}
              aria-label="Back to 3D Globe"
              className="px-4 py-1.5 rounded-full bg-[#111111] hover:bg-[#ff3333] active:scale-95 text-white text-[10px] tracking-wider uppercase font-medium inline-flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Back to 3D Globe</span>
            </button>

            <a
              href={STUDIO_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-[#ff3333] hover:bg-[#e02828] active:scale-95 text-white text-[10px] tracking-wider uppercase font-medium inline-flex items-center gap-1.5 shadow-md shadow-[#ff3333]/25 transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
