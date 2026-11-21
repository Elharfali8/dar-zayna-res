import Image from "next/image";
import { cacheLife } from "next/cache";
import { Clock } from "lucide-react";
import logoLight from "@/public/brand/logo-light.png";
import { InstagramIcon, TikTokIcon } from "./SocialIcons";
import { starPoints } from "./star";

const links = [
  { href: "#story", label: "Story" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Visit" },
];

// Placeholder profiles: swap for the restaurant's real handles
const socials = [
  { href: "https://www.instagram.com/", label: "Dar Zayna on Instagram", Icon: InstagramIcon },
  { href: "https://www.tiktok.com/", label: "Dar Zayna on TikTok", Icon: TikTokIcon },
];

/** Cached so the page stays prerendered (Cache Components); refreshed daily so the year rolls over. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** Thin gold rule with an 8-point star in the middle, echoing the ornament under the logo. */
function StarDivider() {
  return (
    <div aria-hidden className="flex items-center gap-4 text-gold">
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-gold/50" />
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.2">
        <polygon points={starPoints(12, 12, 10)} strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-gold/50" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-zellige text-ivory">
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_auto] md:gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <a href="#top" aria-label="Dar Zayna, back to top" className="block w-36">
              <Image src={logoLight} alt="" sizes="144px" className="h-auto w-full" />
            </a>
            <p className="mt-6 max-w-xs text-balance leading-relaxed text-champagne/80">
              A restored riad in the medina, serving the dishes of Marrakech the slow way.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer" className="text-center md:text-left">
            <h2 className="font-serif text-xl text-champagne">Explore</h2>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 md:flex-col md:gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ivory/75 transition-colors duration-300 hover:text-gold-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div className="text-center md:text-left">
            <h2 className="flex items-center justify-center gap-2 font-serif text-xl text-champagne md:justify-start">
              <Clock aria-hidden size={16} strokeWidth={1.5} className="text-gold" />
              Hours
            </h2>
            <dl className="mt-4 space-y-3 text-ivory/75">
              <div>
                <dt className="text-sm text-ivory/65">Monday to Sunday</dt>
                <dd>12:00 – 23:00</dd>
              </div>
            </dl>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-xl text-champagne">Follow</h2>
            <ul className="mt-4 flex justify-center gap-3 md:justify-start">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-champagne/25 text-champagne transition-colors duration-300 hover:border-gold hover:text-gold-light"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <StarDivider />
        </div>

        <p className="mt-6 text-center text-sm text-ivory/60">
          © <CurrentYear /> Dar Zayna Restaurant · Marrakech
        </p>
      </div>
    </footer>
  );
}
