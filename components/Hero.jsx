"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import logoLight from "@/public/brand/logo-light.png";
import { starPoints } from "./star";

const ease = [0.22, 1, 0.36, 1]; // soft ease-out

const TILE = 64;
const bigStar = starPoints(TILE / 2, TILE / 2, 20);
const cornerStar = starPoints(0, 0, 9);

function ZelligePattern() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 size-full text-gold opacity-5 mask-[radial-gradient(ellipse_at_center,transparent_15%,black_70%)]"
    >
      <defs>
        <pattern id="zellige" width={TILE} height={TILE} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <polygon points={bigStar} />
            {/* Small stars on every corner, shared by neighbouring tiles */}
            {[
              [0, 0],
              [TILE, 0],
              [0, TILE],
              [TILE, TILE],
            ].map(([x, y]) => (
              <polygon key={`${x}-${y}`} points={cornerStar} transform={`translate(${x} ${y})`} />
            ))}
            {/* Fine lines joining the stars, like grout between tiles */}
            <path d={`M9 0H${TILE - 9}M0 9V${TILE - 9}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#zellige)" />
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  // Always animate to the visible state (the server renders the hidden start state).
  // With reduced motion, the change is instant: no movement, no delay.
  const timing = (duration, delay) =>
    reduce ? { duration: 0 } : { duration, delay, ease };

  const reveal = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: timing(1, delay),
  });

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-zellige px-5 pb-24 pt-24 text-center"
    >
      <ZelligePattern />
      {/* Faint warm glow behind the logo for depth */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_42%,rgb(201_138_46/0.14),transparent_75%)]"
      />

      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={timing(1.2, 0)}
        className="w-[min(78vw,400px)] md:w-110"
      >
        <Image
          src={logoLight}
          alt="Dar Zayna Restaurant"
          preload
          sizes="(min-width: 768px) 440px, 78vw"
          className="h-auto w-full"
        />
      </motion.h1>

      <motion.p
        {...reveal(0.9)}
        className="mt-8 max-w-88 text-balance font-sans text-lg font-light leading-relaxed text-champagne sm:max-w-none sm:text-xl"
      >
        Slow-cooked Moroccan cooking in the heart of the medina
      </motion.p>

      <motion.div
        {...reveal(1.2)}
        className="mt-10 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
      >
        <a
          href="#reserve"
          className="rounded-full bg-gold px-8 py-3.5 text-ink transition-colors duration-300 hover:bg-gold-light"
        >
          Reserve a table
        </a>
        <a
          href="#menu"
          className="rounded-full border border-champagne/60 px-8 py-3.5 text-champagne transition-colors duration-300 hover:border-champagne hover:bg-champagne/10"
        >
          See the menu
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#story"
        aria-label="Scroll to our story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={timing(1, 1.8)}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 p-2 text-champagne/60 transition-colors hover:text-champagne md:bottom-8"
      >
        <span className="text-xs tracking-[0.2em]">Scroll</span>
        <span aria-hidden className="relative h-10 w-px overflow-hidden bg-champagne/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-champagne/70" />
        </span>
      </motion.a>
    </section>
  );
}
