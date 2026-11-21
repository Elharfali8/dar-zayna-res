import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

// Placeholder contact details for the demo
const address = { line1: "Derb Zayna, Medina", line2: "Marrakech 40000, Morocco" };
const phone = { display: "+212 524 00 00 00", href: "tel:+212524000000" };
const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(
  "Hello, I would like to reserve a table at Dar Zayna"
)}`;
const directionsUrl = "https://www.google.com/maps/search/?api=1&query=Medina%2C+Marrakech";
const mapEmbedUrl = "https://www.google.com/maps?q=Medina,+Marrakech,+Morocco&z=15&hl=en&output=embed";

function InfoRow({ Icon, label, children }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-deep">
        <Icon aria-hidden size={18} strokeWidth={1.5} />
      </span>
      <div>
        <dt className="font-serif text-xl text-zellige">{label}</dt>
        <dd className="mt-1 leading-relaxed text-ink/75">{children}</dd>
      </div>
    </div>
  );
}

export default function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-heading" className="bg-ivory px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <h2 id="visit-heading" className="text-4xl leading-[1.1] text-zellige sm:text-5xl">
            Come and visit
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75">
            We are a five-minute walk from Jemaa el-Fnaa, behind a carved cedar door. Ask anyone
            in the derb for Dar Zayna.
          </p>

          <dl className="mt-10 space-y-7">
            <InfoRow Icon={MapPin} label="Address">
              {address.line1}
              <br />
              {address.line2}
              <br />
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-zellige underline decoration-gold underline-offset-4 hover:decoration-2"
              >
                Get directions
              </a>
            </InfoRow>
            <InfoRow Icon={Clock} label="Opening hours">
              Monday to Sunday, 12:00 – 23:00
            </InfoRow>
            <InfoRow Icon={Phone} label="Phone">
              <a href={phone.href} className="hover:text-ink">
                {phone.display}
              </a>
            </InfoRow>
          </dl>

          {/* Target of every "Reserve a table" link on the page */}
          <div id="reserve" className="mt-12 scroll-mt-28">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-gold px-9 py-4.5 text-lg text-ink shadow-[0_12px_30px_-12px_rgb(201_138_46/0.7)] transition-colors duration-300 hover:bg-gold-light sm:inline-flex sm:w-auto"
            >
              <MessageCircle aria-hidden size={22} strokeWidth={1.5} />
              Reserve on WhatsApp
              <span className="sr-only">(opens WhatsApp in a new tab)</span>
            </a>
            <p className="mt-3 text-sm text-ink/70">We usually reply within the hour.</p>
          </div>
        </div>

        <div className="relative min-h-80 overflow-hidden rounded-3xl bg-champagne/40 ring-1 ring-ink/5 lg:min-h-full">
          <iframe
            src={mapEmbedUrl}
            title="Map of the Marrakech medina, where Dar Zayna is located"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            // Softer, warmer map so it sits with the ivory and gold palette
            className="absolute inset-0 size-full border-0 [filter:saturate(0.55)_sepia(0.15)_contrast(0.95)]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
