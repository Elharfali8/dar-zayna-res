"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getLenis } from "./SmoothScroll";
import logoLight from "@/public/brand/logo-light.png";
import logoHorizontal from "@/public/brand/logo-horizontal.png";

const links = [
  { id: "story", label: "Story" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "visit", label: "Visit" },
];

const HEADER_OFFSET = 80;
const ease = [0.22, 1, 0.36, 1];

/** Smoothly scroll to a section (Lenis if active, native otherwise) and move focus there. */
function scrollToSection(id, reduceMotion) {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -HEADER_OFFSET });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }

  history.replaceState(null, "", `#${id}`);
  // Keyboard and screen-reader users continue from the section they jumped to
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: pause scrolling, close on Escape
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop size
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => media.matches && setOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      // Wait for the menu effect cleanup to restart scrolling first
      requestAnimationFrame(() => scrollToSection(id, reduceMotion));
    } else {
      scrollToSection(id, reduceMotion);
    }
  };

  const light = scrolled && !open; // ivory bar with ink text

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-soft ${
        light
          ? "bg-ivory/90 shadow-[0_1px_0_rgb(42_33_26/0.06)] backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <nav
        aria-label="Main"
        className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8"
      >
        {/* Brand: stacked light logo over dark green; horizontal logo (dark text) on the ivory bar */}
        <a
          href="#top"
          onClick={(e) => handleNav(e, "top")}
          aria-label="Dar Zayna, back to top"
          className="relative flex h-12 w-40 items-center"
        >
          <Image
            src={logoLight}
            alt=""
            sizes="64px"
            className={`h-11 w-auto transition-opacity duration-500 ease-soft md:h-12 ${
              light ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src={logoHorizontal}
            alt=""
            sizes="160px"
            className={`absolute left-0 h-9 w-auto transition-opacity duration-500 ease-soft md:h-10 ${
              light ? "opacity-100" : "opacity-0"
            }`}
          />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNav(e, link.id)}
                className={`relative py-1 text-[15px] tracking-wide transition-colors duration-500 ease-soft after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  light ? "text-ink/75 hover:text-ink" : "text-ivory/80 hover:text-ivory"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#reserve"
            onClick={(e) => handleNav(e, "reserve")}
            className="hidden rounded-full bg-gold px-6 py-2.5 text-[15px] text-ink transition-colors duration-300 hover:bg-gold-light sm:inline-block"
          >
            Reserve a table
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`-mr-2 grid size-11 place-items-center transition-colors duration-500 md:hidden ${
              light ? "text-ink" : "text-ivory"
            }`}
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ease-soft ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ease-soft ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0.15 : 0.6, ease }}
            className="fixed inset-0 flex flex-col bg-zellige px-5 pb-10 pt-28 md:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNav(e, link.id)}
                    className="block py-2 font-serif text-5xl text-ivory transition-colors hover:text-champagne"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#reserve"
              onClick={(e) => handleNav(e, "reserve")}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="rounded-full bg-gold px-6 py-4 text-center text-lg text-ink transition-colors hover:bg-gold-light"
            >
              Reserve a table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
