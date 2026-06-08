import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Store, Megaphone } from 'lucide-react';
import { mockProducts, mockAdvertisements } from '../data/mockData';
import businessMeeting from '../assets/images/business-meeting.jpg';
import heroMeeting from './public/images/meeting.avif';

function LogoCloud() {
  const partners = [
    { name: 'EcoCash', initials: 'EC' },
    { name: 'ZimPost', initials: 'ZP' },
    { name: 'CBZ Bank', initials: 'CB' },
    { name: 'First Capital', initials: 'FC' },
    { name: 'NetOne', initials: 'N1' },
    { name: 'POSB', initials: 'PB' },
  ];

  return (
    <section className="border-t border-slate-900 bg-white py-16" data-aos="fade-up">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Trusted Partners & Sponsors
          </h2>
          <p className="mt-2 text-slate-500">
            Proudly supported by leading organizations across Zimbabwe
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner) => (
            <div key={partner.name} data-aos="fade-up" data-aos-delay={100}>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg">
                  <span className="text-sm font-black text-slate-700">{partner.initials}</span>
                </div>
                <span className="text-xs font-medium tracking-wide text-slate-600">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description, color = 'red' }) {
  const colorClasses = {
    red: 'text-red-600 bg-red-50',
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
  };

  return (
    <div
      data-aos="fade-up"
      className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
    >
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[color]}`}>
        <Icon size={22} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}

function Landing() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-red-500/30 page-enter">
      {/* Modern Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-rose-500 text-sm text-white">
                H
              </span>
              <span className="text-sm sm:text-base">Platform</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link to="/about" className="transition-colors hover:text-red-600">About</Link>
              <Link to="/products" className="transition-colors hover:text-red-600">Products</Link>
              <Link to="/contact" className="transition-colors hover:text-red-600">Contact</Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Join Now
              </Link>
            </div>

            <Link
              to="/register"
              className="md:hidden rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
            >
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 text-white sm:py-32 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-950/40 via-slate-950 to-slate-950" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]"
          style={{
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                <span className="text-base">🇿🇼</span>
                Zimbabwe&apos;s Premier Business Network
              </div>

              <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-balance">
                Connect.
                <br />
                <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                  Trade.
                </span>
                <br />
                Grow Together.
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl lg:mx-0 text-pretty">
                A powerful marketplace and fellowship where suppliers,
                businesses, entrepreneurs and customers connect,
                trade and create opportunities together.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start lg:gap-4">
                <Link
                  to="/register"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  Join The Forum
                  <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-6 py-3.5 text-sm font-semibold text-slate-300 backdrop-blur-md transition duration-200 hover:bg-slate-800 hover:text-white hover:border-slate-700"
                >
                  Explore Marketplace
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 rounded-2xl border border-slate-800 bg-slate-900/40 p-3 backdrop-blur-xl shadow-2xl">
                    <img
                      src={heroMeeting}
                      alt="Business meeting"
                      className="h-full w-full rounded-xl object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105 animate-bounce-slow">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-xs text-slate-400">Businesses</div>
                  </div>
                  <div className="absolute -top-4 -right-4 inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 backdrop-blur-md">
                    Live Updates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to grow
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              From product listings to supplier connections, our platform is built for modern businesses.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Store}
              title="Browse Marketplace"
              description="Find products and services from verified suppliers across Zimbabwe."
              color="red"
            />
            <FeatureCard
              icon={Users}
              title="Supplier Directory"
              description="Connect with trusted suppliers, read reviews, and build lasting partnerships."
              color="blue"
            />
            <FeatureCard
              icon={Megaphone}
              title="Sponsored Listings"
              description="Get featured exposure with our premium advertising packages and promotions."
              color="green"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-t border-slate-200 bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Products</h2>
              <p className="mt-2 text-slate-500">Top picks from our marketplace this week</p>
            </div>
            <Link
              to="/products"
              className="hidden items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-800 sm:inline-flex"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockProducts.slice(0, 3).map((product, index) => (
              <div
                key={product.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="h-48 bg-gradient-to-br from-slate-50 to-white transition duration-500 group-hover:from-red-50 group-hover:to-white">
                  <div className="flex h-full items-center justify-center text-6xl">{product.image}</div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-red-700">{product.category}</div>
                  <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-slate-900">${product.price}</span>
                      {product.priceUnit && (
                        <span className="ml-1 text-xs text-slate-500">{product.priceUnit}</span>
                      )}
                    </div>
                    <span className="text-sm text-slate-500">{product.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-6 py-3 text-sm font-bold text-white hover:bg-red-800"
            >
              View all products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsored Section */}
      <section className="border-t border-slate-200 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sponsored</h2>
            <p className="mt-2 text-slate-500">Exclusive offers and promotions from our partners</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {mockAdvertisements.slice(0, 3).map((ad, index) => (
              <div
                key={ad.id}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="absolute top-4 right-4 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                  {ad.type.replace(/_/g, ' ')}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-200">
                  {ad.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{ad.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Booked by <span className="font-semibold text-slate-900">{ad.bookedBy}</span>
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">${ad.price}</span>
                    <span className="ml-1 text-xs text-slate-500">{ad.period}</span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      ad.status === 'approved'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}
                  >
                    {ad.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LogoCloud />

      {/* CTA Section */}
      <section className="border-t border-slate-900 bg-slate-950 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to transform your business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Join hundreds of successful businesses already trading on the HMFBF platform.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
          >
            Get Started Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
