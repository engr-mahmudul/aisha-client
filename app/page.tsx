// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone, Star, Truck, UtensilsCrossed, Sparkles, Leaf, Flame } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/40 to-white">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          {/* Background image with a soft overlay */}
          <Image
            src="/hero.jpg" // put a photo under /public/hero.jpg
            alt="Restaurant ambiance"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:py-28 lg:py-36">
          <div className="max-w-2xl text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span className="opacity-90">Fresh • Fast • Flavorful</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to <span className="text-amber-300">Ravintola Aisha</span>
            </h1>
            <p className="mt-4 max-w-xl text-base opacity-90 sm:text-lg">
              Savor the best of Asian, Grill, Burger, and more—crafted with local ingredients and served with a smile.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/offer-lunch"
                className="rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-neutral-900 shadow-lg transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
              >
                Today’s Offers
              </Link>
              <Link
                href="/pizz"
                className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                View Menu
              </Link>
            </div>

            {/* Quick category chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { label: "Asian", href: "/asian" },
                { label: "Burger", href: "/burger" },
                { label: "Grill", href: "/grill" },
                { label: "Kebab", href: "/kebab" },
                { label: "Pizz", href: "/pizz" },
                { label: "Salad", href: "/salad" },
                { label: "Drinks", href: "/drinks" },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur transition hover:bg-white/20"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BADGES / USP */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200/50 bg-white p-4 shadow-sm">
            <UtensilsCrossed className="h-5 w-5" />
            <p className="text-sm font-semibold">Handcrafted, made to order</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200/50 bg-white p-4 shadow-sm">
            <Truck className="h-5 w-5" />
            <p className="text-sm font-semibold">Fast pickup & delivery</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200/50 bg-white p-4 shadow-sm">
            <Leaf className="h-5 w-5" />
            <p className="text-sm font-semibold">Quality, fresh ingredients</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200/50 bg-white p-4 shadow-sm">
            <Star className="h-5 w-5" />
            <p className="text-sm font-semibold">Loved by locals</p>
          </div>
        </div>
      </section>

      {/* SPECIALS */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Today’s Specials</h2>
            <p className="mt-1 text-sm text-neutral-600">Handpicked dishes our chefs are excited about.</p>
          </div>
          <Link href="/offer-lunch" className="hidden rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-50 sm:inline-block">
            See all offers
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Smoky Grill Platter",
              img: "/dishes/grill.jpg",
              tag: "Grill",
              href: "/grill",
            },
            {
              title: "Teriyaki Chicken Bowl",
              img: "/dishes/asian.jpg",
              tag: "Asian",
              href: "/asian",
            },
            {
              title: "Double Smash Burger",
              img: "/dishes/burger.jpg",
              tag: "Burger",
              href: "/burger",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-3xl border border-amber-200/40 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-52 w-full">
                <Image src={item.img} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-neutral-800">
                  <Flame className="h-3.5 w-3.5" /> {item.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                  A crowd-pleasing favorite with bold flavors and perfect balance.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-amber-700">From €9.90</span>
                  <span className="rounded-xl bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Order</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/offer-lunch" className="block rounded-2xl border border-neutral-300 px-3 py-2 text-center text-sm font-medium hover:bg-neutral-50">
            See all offers
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="rounded-3xl border border-amber-200/50 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <h2 className="text-xl font-bold sm:text-2xl">Guests love us</h2>
          </div>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {[
              {
                quote:
                  "The best grill in town. Juicy meats and fast service!",
                name: "Sofia",
              },
              {
                quote:
                  "Authentic flavors and generous portions—my go-to lunch spot.",
                name: "Mikko",
              },
              {
                quote:
                  "Great variety: burgers for the kids, Asian bowls for me!",
                name: "Elina",
              },
            ].map((r) => (
              <figure key={r.name} className="rounded-2xl border border-neutral-200/70 p-4">
                <blockquote className="text-sm text-neutral-700">“{r.quote}”</blockquote>
                <figcaption className="mt-3 text-sm font-semibold">— {r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-2 sm:pb-20">
        <div className="grid gap-6 rounded-3xl border border-amber-200/50 bg-white p-6 shadow-sm sm:grid-cols-3 sm:p-8">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5" />
            <div>
              <h3 className="text-sm font-semibold">Opening Hours</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Mon–Fri: 10:30–21:30<br /> Sat: 11:00–22:00 • Sun: 12:00–20:00
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5" />
            <div>
              <h3 className="text-sm font-semibold">Find Us</h3>
              <p className="mt-1 text-sm text-neutral-600">Main Street 12, Helsinki</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5" />
            <div>
              <h3 className="text-sm font-semibold">Call to Order</h3>
              <p className="mt-1 text-sm text-neutral-600">+358 40 123 4567</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-neutral-600">© {new Date().getFullYear()} Ravintola Aisha. All rights reserved.</p>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/privacy" className="text-neutral-600 hover:text-neutral-900">Privacy</Link>
              <span className="text-neutral-300">•</span>
              <Link href="/terms" className="text-neutral-600 hover:text-neutral-900">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
