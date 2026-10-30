'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { MapPin, RotateCcw, Navigation } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/masoom-data';

interface TwfRealisticGlobeProps {
  onOpenQuickEnquire?: (service?: string) => void;
}

const MASOOM_STUDIO_COORDS = {
  lat: 25.6063075,
  lng: 85.0820087,
  name: 'Masoom Studio',
  subtitle: 'Pillar No. 42, Bailey Road · Patna, Bihar',
};

export function TwfRealisticGlobe({ onOpenQuickEnquire }: TwfRealisticGlobeProps) {
  const globeVizRef = useRef<HTMLDivElement | null>(null);
  const zoomFeatherOverlayRef = useRef<HTMLDivElement | null>(null);
  const worldInstanceRef = useRef<{
    width: (w: number) => { height: (h: number) => void };
    pointOfView: (pov: { lat: number; lng: number; altitude: number }, ms?: number) => void;
    _destructor?: () => void;
  } | null>(null);

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

      // Initialize globe.gl using https://globe.gl/example/custom-globe-styling/
      // with transparent background so the 3D globe floats completely box-less
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
        // 1. Pulsing Radar Rings at Masoom Studio (Patna, Bihar)
        .ringsData([MASOOM_STUDIO_COORDS])
        .ringLat('lat')
        .ringLng('lng')
        .ringColor(() => (t: number) => `rgba(255, 51, 51, ${Math.max(0, 1 - t)})`)
        .ringMaxRadius(6.5)
        .ringPropagationSpeed(2.4)
        .ringRepeatPeriod(850)
        // 2. 3D Point Beacon at Masoom Studio
        .pointsData([MASOOM_STUDIO_COORDS])
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(() => '#ff3333')
        .pointAltitude(0.035)
        .pointRadius(0.55)
        // 3. Crisp 3D Surface Label for Masoom Studio
        .labelsData([
          {
            lat: MASOOM_STUDIO_COORDS.lat,
            lng: MASOOM_STUDIO_COORDS.lng,
            text: 'Masoom Studio · Patna',
          },
        ])
        .labelLat('lat')
        .labelLng('lng')
        .labelText('text')
        .labelSize(1.55)
        .labelDotRadius(0.55)
        .labelColor(() => '#ffffff')
        .labelAltitude(0.04)
        .labelResolution(3)
        // 4. Interactive HTML Pin Callout Anchored to Masoom Studio on the Globe
        .htmlElementsData([MASOOM_STUDIO_COORDS])
        .htmlLat('lat')
        .htmlLng('lng')
        .htmlAltitude(0.05)
        .htmlElement(() => {
          const wrapper = document.createElement('div');
          wrapper.style.pointerEvents = 'auto';
          wrapper.style.cursor = 'pointer';
          wrapper.style.transform = 'translate(-50%, -130%)';
          wrapper.title = 'Open Masoom Studio in Google Maps';

          wrapper.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 6px 11px;
              border-radius: 9999px;
              background: rgba(12, 12, 16, 0.9);
              backdrop-filter: blur(10px);
              border: 1.5px solid rgba(255, 51, 51, 0.85);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.32);
              color: #ffffff;
              font-family: system-ui, -apple-system, sans-serif;
              white-space: nowrap;
            ">
              <span style="
                width: 9px;
                height: 9px;
                border-radius: 9999px;
                background: #ff3333;
                box-shadow: 0 0 10px #ff3333;
                display: inline-block;
                flex-shrink: 0;
              "></span>
              <div style="line-height: 1.15; text-align: left;">
                <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.02em; color: #ffffff;">
                  Masoom Studio
                </div>
                <div style="font-size: 9px; color: rgba(255, 255, 255, 0.8);">
                  Bailey Road, Patna · Bihar
                </div>
              </div>
            </div>
          `;

          wrapper.onclick = (e) => {
            e.stopPropagation();
            const link = document.createElement('a');
            link.href = STUDIO_INFO.mapsUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          };

          return wrapper;
        });

      // Custom globe material
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

      // Change directional light position to see the specularMap's effect
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

      // Configure smooth interactive OrbitControls:
      // - NO fade at default size (dist >= 238)
      // - Smooth circular radial fade ONLY when user zooms in (dist < 238 down to 120)
      const controls = world.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.45;
        controls.enableDamping = true;
        controls.dampingFactor = 0.07;
        controls.enableZoom = true;
        controls.minDistance = 120;
        controls.maxDistance = 380;

        const updateCircularZoomFade = () => {
          const vizEl = globeVizRef.current;
          const featherEl = zoomFeatherOverlayRef.current;
          if (!vizEl) return;
          const cam = world.camera();
          if (!cam) return;
          const dist = cam.position.length();

          // Default altitude 1.55 corresponds to dist ~255.
          // Keep the globe 100% crisp and unfaded at default size or zoomed out (dist >= 238).
          if (dist >= 238) {
            vizEl.style.webkitMaskImage = 'none';
            vizEl.style.maskImage = 'none';
            if (featherEl) {
              featherEl.style.opacity = '0';
            }
            return;
          }

          // User is zooming in (dist < 238 down to 120): progressively apply circular radial fade
          const zoomRatio = Math.max(0, Math.min(1, (238 - dist) / (238 - 120)));
          // Solid core starts wide (92%) when zoom begins and tightens smoothly (to 30%) at deep zoom
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

        updateCircularZoomFade();
        controls.addEventListener('change', updateCircularZoomFade);

        controls.addEventListener('start', () => {
          controls.autoRotate = false;
          if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
        });

        controls.addEventListener('end', () => {
          if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
          resumeAutoRotateTimer = setTimeout(() => {
            controls.autoRotate = true;
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
            const w = worldInstanceRef.current as unknown as {
              pauseAnimation?: () => void;
              resumeAnimation?: () => void;
            } | null;
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

    let visibilityObserver: IntersectionObserver | null = null;
    initGlobe();

    return () => {
      isCancelled = true;
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

  const handleFocusMasoomStudio = useCallback(() => {
    if (!worldInstanceRef.current) return;
    worldInstanceRef.current.pointOfView(
      {
        lat: MASOOM_STUDIO_COORDS.lat,
        lng: MASOOM_STUDIO_COORDS.lng,
        altitude: 1.55,
      },
      1000
    );
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      {/* Box-less 3D Globe Stage: Unfaded at Default Size, Circularly Faded on Zoom-In */}
      <div className="relative w-full aspect-square max-w-[380px] sm:max-w-[460px] lg:max-w-[520px] mx-auto flex items-center justify-center">
        <div
          ref={globeVizRef}
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        />

        {/* Soft Circular Ambient Edge Feather — Hidden (opacity 0) at default size, fades in smoothly only when zooming in */}
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

      {/* Minimal Floating Controls Below the Box-less Globe */}
      <div className="mt-1 flex flex-wrap items-center justify-center gap-2 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[#111111]/70 text-[10px] tracking-wider uppercase">
          <Navigation className="w-3 h-3 text-[#ff3333]" />
          <span>Drag &amp; Zoom 3D Globe</span>
        </span>

        <button
          type="button"
          onClick={handleFocusMasoomStudio}
          aria-label="Center on Masoom Studio Patna"
          className="px-3.5 py-1 rounded-full bg-[#111111] hover:bg-[#ff3333] text-white text-[10px] tracking-wider uppercase font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Focus Masoom Studio</span>
        </button>

        <a
          href={STUDIO_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1 rounded-full bg-[#ff3333] hover:bg-[#e02828] text-white text-[10px] tracking-wider uppercase font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <MapPin className="w-3 h-3" />
          <span>Open Map</span>
        </a>
      </div>
    </div>
  );
}
