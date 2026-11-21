"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Languages, Smartphone, Sparkles } from "lucide-react";

const features = [
  {
    Icon: Languages,
    title: "English, French or Arabic",
    text: "Guests pick their language and the whole menu follows, dish names and descriptions included.",
  },
  {
    Icon: Smartphone,
    title: "Nothing to download",
    text: "The camera opens the menu straight in the browser. No app, no sign-up.",
  },
  {
    Icon: Sparkles,
    title: "Always today's menu",
    text: "Prices and specials change in one place and every table sees it at once.",
  },
];

const previewDishes = [
  { name: "Lamb tajine", price: "145", id: "1643019237176-8ae0859f1123" },
  { name: "Royal couscous", price: "160", id: "1749993086443-93a5a88eb4c2" },
  { name: "Mint tea & pastries", price: "45", id: "1574810134700-b6ba48d151a0" },
];

/*
 * A scanned QR code needs an absolute URL. Use NEXT_PUBLIC_SITE_URL when set (production),
 * otherwise the origin the page is served from. The server has no origin, so it renders a placeholder.
 */
const noopSubscribe = () => () => {};
function useMenuUrl() {
  const origin = useSyncExternalStore(
    noopSubscribe,
    () => process.env.NEXT_PUBLIC_SITE_URL || window.location.origin,
    () => process.env.NEXT_PUBLIC_SITE_URL || null
  );
  return origin ? `${origin.replace(/\/$/, "")}/menu` : null;
}

/** CSS-only phone showing a miniature of the mobile menu. Decorative: described by its label. */
function PhoneMockup() {
  return (
    <div
      role="img"
      aria-label="Preview of the Dar Zayna menu on a phone, in English, with three dishes and an order button"
      className="relative w-60 shrink-0 rounded-[2.75rem] bg-ink p-2.5 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.5)] ring-1 ring-champagne/15 sm:w-64"
    >
      <div aria-hidden className="relative overflow-hidden rounded-[2.2rem] bg-ivory">
        {/* Dynamic-island style notch */}
        <div className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />

        <div className="px-4 pb-4 pt-11">
          <div className="flex items-center justify-between">
            <p className="font-serif text-xl text-zellige">Dar Zayna</p>
            <p className="text-[10px] text-ink/50">Table 7</p>
          </div>

          {/* Language switch */}
          <div className="mt-3 grid grid-cols-3 rounded-full bg-champagne/40 p-0.5 text-center text-[10px]">
            <span className="rounded-full bg-zellige py-1 text-ivory">EN</span>
            <span className="py-1 text-ink/60">FR</span>
            <span lang="ar" className="py-1 text-ink/60">
              ع
            </span>
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-3 text-[11px]">
            <span className="border-b border-gold pb-0.5 text-ink">Mains</span>
            <span className="text-ink/45">Starters</span>
            <span className="text-ink/45">Sweets</span>
            <span className="text-ink/45">Tea</span>
          </div>

          <ul className="mt-3 divide-y divide-ink/8">
            {previewDishes.map((dish) => (
              <li key={dish.name} className="flex items-center gap-3 py-2.5">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={`https://images.unsplash.com/photo-${dish.id}`}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-[13px] leading-tight text-ink">{dish.name}</p>
                  <p className="mt-0.5 text-[11px] text-gold-deep">{dish.price} DH</p>
                </div>
                <span className="grid size-6 place-items-center rounded-full border border-zellige/25 text-xs text-zellige">
                  +
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between rounded-full bg-zellige px-4 py-2.5 text-[11px] text-ivory">
            <span>View order · 2 items</span>
            <span>305 DH</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QrCard() {
  const url = useMenuUrl();

  return (
    <div className="flex w-44 flex-col items-center rounded-3xl bg-ivory p-4 text-center shadow-[0_24px_48px_-16px_rgb(0_0_0/0.45)]">
      <div className="grid size-36 place-items-center">
        {url ? (
          <QRCodeSVG
            value={url}
            size={144}
            level="M"
            marginSize={1} // with the card padding this gives the ~4-module quiet zone scanners need
            fgColor="#2a211a"
            bgColor="#fbf8f3"
            title="QR code that opens the Dar Zayna menu"
          />
        ) : (
          <div className="size-36 rounded-lg bg-ink/5" />
        )}
      </div>
      <p className="mt-3 font-serif text-lg leading-tight text-zellige">Try it now</p>
      <p className="mt-0.5 text-xs text-ink/70">Scan with your camera</p>
      <Link
        href="/menu"
        className="mt-2 text-xs text-zellige underline decoration-gold underline-offset-4 hover:decoration-2"
      >
        or open the menu here
      </Link>
    </div>
  );
}

export default function QrMenu() {
  return (
    <section
      id="qr-menu"
      aria-labelledby="qr-heading"
      className="overflow-hidden bg-zellige px-5 py-24 text-ivory md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="max-w-xl">
          <h2 id="qr-heading" className="text-4xl leading-[1.1] text-champagne sm:text-5xl">
            Scan, browse, order
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ivory/80">
            Every table has its own QR code. Point your phone at it and the menu opens in
            English, French or Arabic, with a photo of each dish. Order when you are ready,
            and it goes straight to the kitchen.
          </p>

          <ul className="mt-10 space-y-6">
            {features.map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-light">
                  <Icon aria-hidden size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-sans text-base font-normal tracking-normal text-ivory">{title}</h3>
                  <p className="mt-1 leading-relaxed text-ivory/65">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Phone with the QR card beside it; on small screens the card sits below */}
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center sm:gap-6">
          <PhoneMockup />
          <div className="sm:mb-10">
            <QrCard />
          </div>
        </div>
      </div>
    </section>
  );
}
