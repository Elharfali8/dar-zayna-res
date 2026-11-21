import Image from "next/image";

/*
 * Moroccan arch in a 0–1 box: straight sides, soft shoulders, pointed tip,
 * echoing the arch in the logo. Used both as the photo's clip-path and as its gold outline.
 */
const ARCH =
  "M0,1 L0,0.36 C0,0.2 0.2,0.13 0.36,0.08 C0.44,0.055 0.48,0.03 0.5,0 C0.52,0.03 0.56,0.055 0.64,0.08 C0.8,0.13 1,0.2 1,0.36 L1,1 Z";

const facts = [
  { value: "28", label: "years at the stove" },
  { value: "40", label: "seats around the courtyard" },
  { value: "Fes", label: "where the recipes come from" },
];

function ArchPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-sm md:max-w-md">
      {/* Clip path definition (objectBoundingBox scales it to the photo) */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <clipPath id="story-arch" clipPathUnits="objectBoundingBox">
            <path d={ARCH} />
          </clipPath>
        </defs>
      </svg>

      {/* Thin gold arch, offset behind the photo like a doorway frame */}
      <svg
        aria-hidden
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full translate-x-3 translate-y-3 text-gold/50 md:translate-x-5 md:translate-y-5"
        fill="none"
      >
        <path d={ARCH} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="relative aspect-4/5 [clip-path:url(#story-arch)]">
        <Image
          src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea"
          alt="Couscous topped with slow-cooked carrots, squash and caramelised onions in a hand-painted Moroccan bowl"
          fill
          sizes="(min-width: 768px) 448px, (min-width: 640px) 384px, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-heading" className="bg-ivory px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
        <ArchPhoto />

        <div className="max-w-xl">
          <h2 id="story-heading" className="text-4xl leading-[1.1] text-zellige sm:text-5xl">
            A family kitchen since 1998
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              Zayna grew up cooking beside her mother in Fes. When she opened
              this riad to guests in 1998, she brought those recipes with her.
              She never wrote them down. Her daughter learned them by watching,
              and her grandson cooks them the same way today.
            </p>
            <p>
              Everything still goes into clay tajines and cooks slowly over
              charcoal, some of it for most of the afternoon. Each morning we
              walk to the souk for cumin, saffron and ras el hanout, and for
              whatever vegetables look best that day.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <dt className="text-sm leading-snug text-ink/60">{fact.label}</dt>
                {/* Shown above its label, but kept after the dt in markup for valid <dl> semantics */}
                <dd className="order-first font-serif text-4xl leading-none text-gold-deep sm:text-5xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
