"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useLocale } from "@/lib/i18n";
import { projects, type Project } from "@/lib/data/projects";
import { AppIcon } from "./AppIcon";
import { NameMark } from "./NameMark";
import { SOCIALS } from "./icons";
import { LocaleToggle } from "./SideRail";

const EMAIL = "xbbilgun@gmail.com";

/**
 * The three phones in the fan, back-left, front, back-right. Hovering the fan
 * spreads the side phones out; hovering one phone pulls it forward.
 */
const PHONES = [
  { id: "niceleasing", card: "from-emerald-400 to-teal-600", pose: "-translate-x-[58%] translate-y-6 -rotate-[9deg] scale-[0.88] group-hover/fan:-translate-x-[78%] group-hover/fan:-rotate-[13deg]", delay: "0.6s" },
  { id: "eleasing", card: "from-[rgb(var(--accent))] to-indigo-700", pose: "z-10", delay: "0s" },
  { id: "gate", card: "from-sky-400 to-blue-700", pose: "translate-x-[58%] translate-y-6 rotate-[9deg] scale-[0.88] group-hover/fan:translate-x-[78%] group-hover/fan:rotate-[13deg]", delay: "1.2s" },
];

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Magnetic buttons: share of the pointer's offset they follow, capped in px. */
const MAGNET_PULL = 0.3;
const MAGNET_MAX_X = 8;
const MAGNET_MAX_Y = 5;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Full-screen opener. As it scrolls away the copy lifts, blurs and fades, and
 * on desktop the name flies down into the side rail's name slot, so the hero
 * hands over to the split layout rather than just leaving. Scroll progress is
 * written to `--p` on the section, so scrolling never re-renders React.
 *
 * Pointer extra (fine pointers only): the two CTAs are magnetic.
 */
export function Hero() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const name = nameRef.current;
    if (!element || !name) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const railSlot = document.getElementById("rail-name");
    const railName = railSlot?.querySelector<HTMLElement>(".hero-name") ?? null;

    let frame = 0;

    /** Fly the hero name toward the rail's name as the hero scrolls away. */
    const handOff = () => {
      if (!railSlot || !railName || !desktop.matches) {
        name.style.transform = "";
        name.style.opacity = "";
        if (railSlot) railSlot.style.opacity = "";
        return;
      }

      // The rail sticks once its header reaches the top of the viewport, which
      // is where the flight should land.
      const header = railSlot.closest("header");
      const landAt = header ? header.getBoundingClientRect().top + window.scrollY : element.offsetHeight;
      const progress = clamp01(window.scrollY / Math.max(landAt, 1));

      if (progress >= 1) {
        name.style.opacity = "0";
        railSlot.style.opacity = "1";
        return;
      }

      name.style.opacity = "1";
      railSlot.style.opacity = "0";

      // Measure the name where it would sit untransformed, then move and scale
      // it (from its top-left corner) toward the rail name's current box.
      name.style.transform = "";
      const from = name.getBoundingClientRect();
      const to = railName.getBoundingClientRect();
      const e = easeInOut(progress);
      const finalScale = to.width / from.width;
      const scale = 1 + (finalScale - 1) * e;
      const dx = (to.left - from.left) * e;
      const dy = (to.top + to.height / 2 - (from.top + (from.height * finalScale) / 2)) * e;
      name.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    };

    const update = () => {
      frame = 0;
      const progress = clamp01(window.scrollY / (element.offsetHeight * 0.75));
      element.style.setProperty("--p", progress.toFixed(3));
      handOff();
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    /* -- pointer: magnets ------------------------------------------------- */
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const magnets = Array.from(element.querySelectorAll<HTMLElement>("[data-magnetic]"));

    // Each button only reacts while the pointer is on it, and only nudges a
    // few pixels, so neighbours never drag each other around.
    const magnetMove = (event: PointerEvent) => {
      const magnet = event.currentTarget as HTMLElement;
      const box = magnet.getBoundingClientRect();
      const clampTo = (value: number, max: number) => Math.max(-max, Math.min(max, value));
      const x = clampTo((event.clientX - (box.left + box.width / 2)) * MAGNET_PULL, MAGNET_MAX_X);
      const y = clampTo((event.clientY - (box.top + box.height / 2)) * MAGNET_PULL, MAGNET_MAX_Y);
      magnet.style.transform = `translate(${x}px, ${y}px)`;
    };
    const magnetLeave = (event: PointerEvent) => {
      (event.currentTarget as HTMLElement).style.transform = "";
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    // Fonts swapping in changes the name's width, so re-measure once loaded.
    document.fonts?.ready.then(schedule);
    if (finePointer) {
      for (const magnet of magnets) {
        magnet.addEventListener("pointermove", magnetMove, { passive: true });
        magnet.addEventListener("pointerleave", magnetLeave);
      }
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const magnet of magnets) {
        magnet.removeEventListener("pointermove", magnetMove);
        magnet.removeEventListener("pointerleave", magnetLeave);
        magnet.style.transform = "";
      }
      name.style.transform = "";
      name.style.opacity = "";
      if (railSlot) railSlot.style.opacity = "";
    };
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center pb-24 pt-24">
      <div className="rise absolute right-0 top-6 flex items-center gap-2" style={stagger(5)}>
        <LocaleToggle />
        {/* <ThemeToggle /> — light mode is off, see ThemeProvider. */}
      </div>

      <div className="grid w-full items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {/* The name sits outside the fading copy: it doesn't fade, it flies. */}
          <div className="hero-copy">
            <p
              className="rise inline-flex items-center gap-2.5 rounded-full border border-[rgb(var(--line)/0.1)] bg-[rgb(var(--surface)/0.6)] px-3.5 py-2 mono-label text-muted backdrop-blur"
              style={stagger(0)}
            >
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              {t("hero.status")}
            </p>
          </div>

          <h1 className="relative z-30 mt-7 text-[clamp(3.4rem,10vw,7.5rem)] leading-[0.88]">
            <span ref={nameRef} className="inline-block origin-top-left will-change-transform">
              <NameMark animate />
            </span>
          </h1>

          <div className="hero-copy">
            <p
              className="rise mt-6 flex items-center gap-3 text-base font-medium tracking-[0.08em] sm:text-lg"
              style={stagger(2)}
            >
              <span className="h-px w-10 bg-[rgb(var(--accent))]" aria-hidden />
              {t("hero.role")}
            </p>

            <p className="rise mt-5 max-w-md text-lg leading-relaxed text-muted" style={stagger(3)}>
              {t("hero.tagline.lead")}
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={stagger(4)}>
              <a
                href={`mailto:${EMAIL}`}
                data-magnetic
                className="group inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent))] px-6 py-3.5 mono-label text-[rgb(var(--accent-contrast))] shadow-[0_12px_30px_-10px_rgb(var(--accent)/0.7)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[0_16px_36px_-10px_rgb(var(--accent)/0.8)]"
              >
                {t("contact.cta")}
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </a>
              <a
                href="#projects"
                data-magnetic
                className="group inline-flex items-center gap-2 rounded-full border border-[rgb(var(--line)/0.14)] px-6 py-3.5 mono-label transition-[transform,color,border-color] duration-200 ease-out hover:border-[rgb(var(--accent)/0.5)] hover:text-accent"
              >
                {t("nav.projects")}
                <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>↓</span>
              </a>

              <ul className="flex items-center gap-1 sm:ml-3">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center text-muted transition-all duration-300 hover:scale-110 hover:text-accent hover:drop-shadow-[0_0_10px_rgb(var(--accent)/0.9)]"
                    >
                      <social.icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="hero-phones relative hidden h-[480px] lg:col-span-5 lg:block" aria-hidden>
          <div className="rise group/fan absolute inset-0" style={stagger(3)}>
            {/* Soft accent glow under the fan. */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--accent)/0.3)] blur-[90px]" />
            {PHONES.map((phone) => (
              <div
                key={phone.id}
                className={`absolute left-1/2 top-1/2 -ml-[95px] -mt-[195px] transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/fan:opacity-60 group-hover/fan:saturate-50 hover:z-20 hover:!translate-y-0 hover:!rotate-0 hover:!scale-[1.12] hover:!opacity-100 hover:!saturate-100 ${phone.pose}`}
              >
                <div className="animate-float" style={{ animationDelay: phone.delay }}>
                  <PhoneMock project={projects.find((project) => project.id === phone.id)!} card={phone.card} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue: a mouse outline with a dot rolling down. */}
      <a
        href="#content"
        aria-label="Scroll to content"
        className="hero-backdrop absolute bottom-8 left-1/2 hidden h-10 w-6 -translate-x-1/2 justify-center rounded-full border-2 border-[rgb(var(--ink)/0.25)] pt-2 transition-colors hover:border-[rgb(var(--accent))] md:flex"
      >
        <span className="h-2 w-1 animate-scroll-cue rounded-full bg-[rgb(var(--ink)/0.5)]" />
      </a>
    </section>
  );
}

/** A stylised loan-app screen: header, balance card, chart, list, CTA. */
function PhoneMock({ project, card }: { project: Project; card: string }) {
  return (
    <div className="h-[390px] w-[190px] rounded-[36px] bg-[#0d1020] p-[7px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] ring-1 ring-white/10">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[30px] bg-[rgb(var(--surface))] px-3.5 pb-3.5 pt-8">
        <span className="absolute left-1/2 top-2.5 h-[18px] w-16 -translate-x-1/2 rounded-full bg-[#0d1020]" />

        <div className="flex items-center gap-2">
          <AppIcon icon={project.icon} size={22} />
          <span className="truncate text-[11px] font-semibold">{project.title}</span>
          <span className="ml-auto h-5 w-5 shrink-0 rounded-full bg-[rgb(var(--surface-2))]" />
        </div>

        <div className={`mt-3 rounded-2xl bg-gradient-to-br ${card} p-3 text-white`}>
          <span className="block h-1.5 w-10 rounded-full bg-white/50" />
          <span className="mt-2 block h-3.5 w-24 rounded-full bg-white/90" />
          <div className="mt-4 flex h-8 items-end gap-1">
            {[40, 65, 50, 80, 60, 95, 75].map((height, index) => (
              <span key={index} className="flex-1 rounded-sm bg-white/35" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-2 rounded-xl bg-[rgb(var(--surface-2))] p-2">
              <span className="h-6 w-6 shrink-0 rounded-lg bg-[rgb(var(--ink)/0.1)]" />
              <span className="flex-1 space-y-1">
                <span className="block h-1.5 w-3/4 rounded-full bg-[rgb(var(--ink)/0.18)]" />
                <span className="block h-1.5 w-1/2 rounded-full bg-[rgb(var(--ink)/0.1)]" />
              </span>
            </div>
          ))}
        </div>

        <span className={`mt-auto block h-8 rounded-xl bg-gradient-to-r ${card}`} />
      </div>
    </div>
  );
}
