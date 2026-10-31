/**
 * Aesthetic UI Click Sound Synthesizer:
 * Uses the Web Audio API to produce an instantaneous, ultra-refined tactile click/tap sound.
 * Zero external audio file download, 0ms latency, works on mobile & desktop browsers.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function playAestheticClick(volume = 0.08) {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. High-frequency crisp tactile snap (mechanical haptic micro-click)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1400, now);
    osc1.frequency.exponentialRampToValueAtTime(320, now + 0.022);
    gain1.gain.setValueAtTime(volume * 1.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.025);

    // 2. Warm low-frequency wooden body resonance
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(280, now);
    osc2.frequency.exponentialRampToValueAtTime(70, now + 0.038);
    gain2.gain.setValueAtTime(volume * 0.9, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.04);
  } catch {
    // AudioContext blocked or not supported
  }
}

/**
 * Initializes a global click listener so any interactive button, menu item, or link
 * automatically produces the aesthetic click sound.
 * Also unlocks AudioContext immediately on first pointerdown/touchstart for mobile instant response.
 */
export function initGlobalClickSound() {
  if (typeof window === 'undefined') return () => {};

  // Prime/warm up AudioContext on initial touch or pointer down so mobile Safari & Chrome have 0ms delay
  const unlockAudio = () => {
    getAudioContext();
    window.removeEventListener('pointerdown', unlockAudio, true);
    window.removeEventListener('touchstart', unlockAudio, true);
  };
  window.addEventListener('pointerdown', unlockAudio, { capture: true, passive: true });
  window.addEventListener('touchstart', unlockAudio, { capture: true, passive: true });

  const handleGlobalClick = (e: MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const clickable = target.closest(
      'button, a, [role="button"], input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"]'
    );
    if (clickable) {
      playAestheticClick();
    }
  };

  window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });

  return () => {
    window.removeEventListener('pointerdown', unlockAudio, true);
    window.removeEventListener('touchstart', unlockAudio, true);
    window.removeEventListener('click', handleGlobalClick, { capture: true });
  };
}
