import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const unsplash = (id) => `https://images.unsplash.com/photo-${id}`;

const featured = {
  name: "Lamb tajine with prunes",
  description:
    "Lamb shoulder braised all afternoon with prunes, honey and cinnamon, finished with eggs and toasted sesame.",
  price: "145 DH",
  image: unsplash("1643019237176-8ae0859f1123"),
  alt: "Top-down view of a clay tajine of braised meat with prunes, halved eggs and sesame, on a patterned tile table",
};

const dishes = [
  {
    name: "Chicken pastilla",
    description: "Spiced chicken and almonds in thin, crisp pastry, dusted with sugar and cinnamon.",
    price: "120 DH",
    image: unsplash("1743669022385-10e2b10dd8e2"),
    alt: "Golden flaky pastry dusted with powdered sugar",
  },
  {
    name: "Royal couscous",
    description: "Hand-rolled semolina with lamb, chicken and merguez, under sweet onions and raisins.",
    price: "160 DH",
    image: unsplash("1749993086443-93a5a88eb4c2"),
    alt: "Couscous topped with braised meat, caramelised onions and raisins",
  },
  {
    name: "Mint tea and pastries",
    description: "Green tea poured high with fresh mint, with a plate of almond pastries.",
    price: "45 DH",
    image: unsplash("1574810134700-b6ba48d151a0"),
    alt: "Silver Moroccan teapot beside a bowl of almond and sesame pastries",
  },
];

// Slow, slight zoom; skipped entirely for reduced motion
const zoom =
  "motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-soft motion-safe:group-hover:scale-105";

function FeaturedDish({ dish }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-4/5 overflow-hidden rounded-3xl sm:aspect-square lg:aspect-auto lg:flex-1">
        <Image
          src={dish.image}
          alt={dish.alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className={`object-cover ${zoom}`}
        />
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-6">
        <h3 className="text-3xl text-zellige sm:text-4xl">{dish.name}</h3>
        <p className="shrink-0 font-serif text-2xl text-gold-deep">{dish.price}</p>
      </div>
      <p className="mt-2 max-w-lg leading-relaxed text-ink/70">{dish.description}</p>
    </article>
  );
}

function DishRow({ dish }) {
  return (
    <article className="group grid grid-cols-[6.5rem_1fr] items-center gap-5 py-6 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-7">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image src={dish.image} alt={dish.alt} fill sizes="(min-width: 640px) 144px, 104px" className={`object-cover ${zoom}`} />
      </div>
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl leading-tight text-zellige">{dish.name}</h3>
          <p className="shrink-0 font-serif text-2xl text-gold-deep">{dish.price}</p>
        </div>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink/70">{dish.description}</p>
      </div>
    </article>
  );
}

export default function SignatureDishes() {
  return (
    <section id="menu" aria-labelledby="menu-heading" className="bg-champagne/30 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 id="menu-heading" className="max-w-md text-4xl leading-[1.1] text-zellige sm:text-5xl">
          What people come back for
        </h2>

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <FeaturedDish dish={featured} />

          <div className="flex flex-col justify-center divide-y divide-ink/10">
            {dishes.map((dish) => (
              <DishRow key={dish.name} dish={dish} />
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 rounded-full border border-zellige/30 px-8 py-3.5 text-zellige transition-colors duration-300 hover:border-zellige hover:bg-zellige hover:text-ivory"
          >
            See the full menu
            <ArrowRight
              aria-hidden
              size={18}
              strokeWidth={1.5}
              className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
