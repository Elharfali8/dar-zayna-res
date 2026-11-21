"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getLenis } from "./SmoothScroll";

const photos = [
  {
    id: "1761416182644-2d9d4f432563",
    aspect: "aspect-3/4",
    caption: "The salon ceiling",
    alt: "Carved and painted cedar ceiling above zellige walls and an arched doorway, with a brass lantern",
  },
  {
    id: "1561084092-f409d06f91f3",
    aspect: "aspect-4/3",
    caption: "Lanterns at dusk",
    alt: "Pierced metal lanterns glowing in the dark",
  },
  {
    id: "1661081988119-58e40ee39201",
    aspect: "aspect-4/3",
    caption: "Dinner in the salon",
    alt: "Low table laid with Moroccan dishes, bread and napkins in a salon lined with cushions",
  },
  {
    id: "1771148885678-6e9eead7e8dc",
    aspect: "aspect-3/4",
    caption: "Through the arch",
    alt: "Riad courtyard seen through a carved arch, with carved plaster, cedar screens and a tiled floor",
  },
  {
    id: "1591299089616-c9604047b1a6",
    aspect: "aspect-3/4",
    caption: "Mint tea, poured high",
    alt: "Mint tea poured from a silver teapot into glasses filled with fresh mint",
  },
  {
    id: "1539020140153-e479b8c22e70",
    aspect: "aspect-4/3",
    caption: "The zellige fountain",
    alt: "Zellige fountain set into carved plaster arches",
  },
];

const src = (id) => `https://images.unsplash.com/photo-${id}`;

function Lightbox({ index, onClose, onPrev, onNext }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const photo = photos[index];

  // Focus the close button on open; keep Tab inside the dialog; keyboard controls
  useEffect(() => {
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "Tab") {
        // Only visible buttons: the phone-only arrows are display:none on larger screens
        const focusable = [...(dialogRef.current?.querySelectorAll("button") ?? [])].filter(
          (el) => el.offsetParent !== null
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  // Pause page scrolling while open
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, []);

  const fade = { duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.caption}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fade}
      className="fixed inset-0 z-60 flex flex-col bg-ink/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between px-4 py-4 text-ivory/80 sm:px-6">
        <p className="text-sm tabular-nums">
          {index + 1} / {photos.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="grid size-11 place-items-center rounded-full text-ivory transition-colors hover:bg-ivory/10"
        >
          <X aria-hidden size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 sm:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={photo.id}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            transition={fade}
            // Swipe left/right on touch screens
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) onNext();
              else if (info.offset.x > 60) onPrev();
            }}
            className="flex h-full w-full max-w-5xl cursor-grab flex-col items-center justify-center active:cursor-grabbing"
          >
            <div className="relative h-[68vh] w-full sm:h-[74vh]">
              <Image
                src={src(photo.id)}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="pointer-events-none object-contain"
              />
            </div>
            <figcaption className="mt-4 font-serif text-xl text-champagne">{photo.caption}</figcaption>
          </motion.figure>
        </AnimatePresence>

        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:bg-ivory/10 sm:left-5 sm:grid"
        >
          <ChevronLeft aria-hidden size={22} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:bg-ivory/10 sm:right-5 sm:grid"
        >
          <ChevronRight aria-hidden size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* On phones the arrows sit under the photo, within thumb reach */}
      <div className="flex justify-center gap-4 pb-6 sm:hidden">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous photo"
          className="grid size-12 place-items-center rounded-full border border-ivory/20 text-ivory"
        >
          <ChevronLeft aria-hidden size={22} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="grid size-12 place-items-center rounded-full border border-ivory/20 text-ivory"
        >
          <ChevronRight aria-hidden size={22} strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState(null); // index of the open photo, or null
  const triggers = useRef([]);
  const lastOpened = useRef(null);

  const show = (i) => {
    lastOpened.current = i;
    setOpen(i);
  };
  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i - 1 + photos.length) % photos.length), []);
  const next = useCallback(() => setOpen((i) => (i + 1) % photos.length), []);

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-ivory px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 id="gallery-heading" className="text-4xl leading-[1.1] text-zellige sm:text-5xl">
          Inside Dar Zayna
        </h2>

        {/* Masonry: CSS columns keep each photo's own shape */}
        <ul className="mt-12 columns-2 gap-3 sm:gap-5 md:mt-16 md:columns-3">
          {photos.map((photo, i) => (
            <li key={photo.id} className="mb-3 break-inside-avoid sm:mb-5">
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => show(i)}
                aria-label={`Open photo: ${photo.caption}`}
                className={`group relative block w-full overflow-hidden rounded-2xl ${photo.aspect}`}
              >
                <Image
                  src={src(photo.id)}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 360px, 50vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-soft motion-safe:group-hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence
        // Return focus to the photo that opened the lightbox
        onExitComplete={() => triggers.current[lastOpened.current]?.focus()}
      >
        {open !== null && <Lightbox index={open} onClose={close} onPrev={prev} onNext={next} />}
      </AnimatePresence>
    </section>
  );
}
