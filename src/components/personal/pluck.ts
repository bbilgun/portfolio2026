/**
 * A tiny plucked-string synth (Karplus–Strong): a burst of noise fed round a
 * delay line one period long, averaged a little every lap, rings like a
 * string. Notes come from E minor pentatonic, low on the left to high on the
 * right, so any strum sounds in key. Buffers are rendered once per note and
 * reused.
 */

// MIDI notes, E2 up to E5.
const SCALE = [40, 43, 45, 47, 50, 52, 55, 57, 59, 62, 64, 67, 69, 71, 74, 76];

export class Plucker {
  private ctx: AudioContext;
  private out: GainNode;
  private buffers = new Map<number, AudioBuffer>();
  private lastAt = 0;

  constructor() {
    this.ctx = new AudioContext();
    // Soften the top end like a wooden body, and catch peaks from fast strums.
    const tone = this.ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 3800;
    const limiter = this.ctx.createDynamicsCompressor();
    this.out = this.ctx.createGain();
    this.out.gain.value = 0.55;
    this.out.connect(tone).connect(limiter).connect(this.ctx.destination);
  }

  resume() {
    return this.ctx.resume();
  }

  /** `position` and `strength` both run 0..1: left→right, soft→hard. */
  play(position: number, strength: number) {
    const now = this.ctx.currentTime;
    // A fast sweep crosses dozens of strings; space them out like a real strum.
    if (now - this.lastAt < 0.028) return;
    this.lastAt = now;

    const midi = SCALE[Math.min(SCALE.length - 1, Math.floor(position * SCALE.length))];
    const source = this.ctx.createBufferSource();
    source.buffer = this.buffer(midi);
    const gain = this.ctx.createGain();
    gain.gain.value = 0.2 + 0.45 * strength;
    const pan = this.ctx.createStereoPanner();
    pan.pan.value = (position - 0.5) * 1.2;
    source.connect(gain).connect(pan).connect(this.out);
    source.start();
  }

  close() {
    void this.ctx.close();
  }

  private buffer(midi: number) {
    const cached = this.buffers.get(midi);
    if (cached) return cached;

    const rate = this.ctx.sampleRate;
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    // Low strings ring longer than high ones.
    const seconds = midi < 55 ? 2.6 : midi < 67 ? 1.9 : 1.3;
    const buffer = this.ctx.createBuffer(1, Math.floor(rate * seconds), rate);
    const data = buffer.getChannelData(0);

    const period = Math.max(2, Math.round(rate / frequency));
    const ring = new Float32Array(period);
    // Pre-filtered noise: a pick, not a hiss.
    let smooth = 0;
    for (let i = 0; i < period; i++) {
      smooth += 0.55 * (Math.random() * 2 - 1 - smooth);
      ring[i] = smooth;
    }

    let index = 0;
    for (let i = 0; i < data.length; i++) {
      const current = ring[index];
      const next = ring[(index + 1) % period];
      data[i] = current;
      ring[index] = 0.996 * 0.5 * (current + next);
      index = (index + 1) % period;
    }

    // Short fade so the tail never clicks off.
    const fade = Math.floor(rate * 0.05);
    for (let i = 0; i < fade; i++) data[data.length - 1 - i] *= i / fade;

    this.buffers.set(midi, buffer);
    return buffer;
  }
}
