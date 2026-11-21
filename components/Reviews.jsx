import { Star } from "lucide-react";

/*
 * PLACEHOLDER REVIEWS for the portfolio demo (Dar Zayna is fictional).
 * Replace with real guest reviews before using this for an actual restaurant:
 * invented reviews for a real business are misleading and illegal in many countries.
 */
const reviews = [
  {
    quote:
      "Our riad host would not stop talking about the pastilla, so we went the first night. She was right. Sweet and salty in a way I didn't expect, and big enough that we should have shared one.",
    name: "Claire M.",
    country: "France",
  },
  {
    quote:
      "The tea alone is worth the walk. Hamid poured it from way up high, then laughed when I tried and spilled half of it on the table. Lamb tajine was perfect. The door is a bit hard to find the first time.",
    name: "Tom R.",
    country: "United Kingdom",
  },
  {
    quote:
      "We ate here twice in four days. Quiet courtyard, no loud music, and the staff remembered us the second time. Service is slow-ish, but honestly that's the point.",
    name: "Sofia L.",
    country: "Spain",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-gold">
      <span className="sr-only">Rated 5 out of 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden size={16} strokeWidth={1.5} fill="currentColor" />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="bg-champagne/30 py-24 md:py-32">
      {/* max-w-304 (76rem) = the 72rem content width used by other sections + their 2rem side padding */}
      <div className="mx-auto max-w-304 px-5 md:px-8">
        <h2 id="reviews-heading" className="text-4xl leading-[1.1] text-zellige sm:text-5xl">
          In our guests&rsquo; words
        </h2>
      </div>

      {/*
       * Mobile: native horizontal swipe with snap points; the next review peeks in as a hint.
       * Desktop: three calm columns. Focusable so keyboard users can scroll it with arrow keys.
       */}
      <ul
        tabIndex={0}
        aria-label="Guest reviews"
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 scrollbar-none md:mx-auto md:mt-16 md:grid md:max-w-304 md:grid-cols-3 md:gap-12 md:overflow-visible md:px-8 lg:gap-16 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <li
            key={review.name}
            // relative: keeps the absolutely positioned sr-only text inside the scroller,
            // otherwise it escapes the overflow clip and widens the whole page on mobile
            className="relative w-[85%] shrink-0 snap-start rounded-3xl bg-ivory p-7 sm:w-[60%] md:w-auto md:rounded-none md:bg-transparent md:p-0"
          >
            <figure className="flex h-full flex-col">
              <Stars />
              <blockquote className="mt-6 flex-1">
                <p className="font-serif text-2xl italic leading-snug text-ink">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-8 border-t border-ink/10 pt-5">
                <p className="text-ink">{review.name}</p>
                <p className="text-sm text-ink/70">{review.country}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
