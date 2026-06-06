import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Store, TrendingUp, Award, Zap, Globe } from 'lucide-react';
import { mockProducts, mockAdvertisements } from '../data/mockData';
import meeting from '../assets/images/meeting.avif';
import supplierImg from '../assets/images/supplier.jpg';
import truckImg from '../assets/images/truck.jpg';
import marketImg from '../assets/images/market.jpg';

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
    <section className="py-16 bg-white border-y border-gray-100" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Trusted Partners & Sponsors</h2>
            <p className="mt-2 text-gray-600">Proudly supported by leading organizations across Zimbabwe</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner) => (
              <div key={partner.name} data-aos="fade-up" data-aos-delay={100}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center hover:shadow-lg hover:border-red-200 hover:-translate-y-1 transition-all duration-300">
                    <span className="text-sm font-bold text-gray-700">{partner.initials}</span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-xl">
                H
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900">Heartfelt Marketplace</div>
                <div className="text-xs text-gray-500">Fellowship Business Forum</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-red-700 font-medium">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-red-700 font-medium">About</Link>
              <Link to="/products" className="text-gray-700 hover:text-red-700 font-medium">Products</Link>
              <Link to="/contact" className="text-gray-700 hover:text-red-700 font-medium">Contact</Link>
            </div>

            <div className="flex gap-4">
              <Link to="/login" className="px-4 py-2 text-red-700 border border-red-700 rounded-lg font-medium hover:bg-red-50">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-red-800 to-red-600 min-h-[92vh] md:min-h-[88vh] lg:min-h-[95vh] flex items-center pb-40 md:pb-0" data-aos="fade-in">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[length:25px_25px]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pb-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white mb-8">
                🇿🇼 Zimbabwe's Premier Business Network
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Connect.
                <span className="text-red-300"> Trade.</span>
                <br />
                Grow Together.
              </h1>

              <p className="mt-8 text-xl text-red-100 max-w-2xl leading-relaxed">
                A powerful marketplace and fellowship where suppliers,
                businesses, entrepreneurs and customers connect,
                trade and create opportunities together.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link to="/register" className="px-8 py-4 rounded-2xl bg-white text-red-700 font-bold shadow-xl hover:scale-105 transition">
                  Join The Forum
                </Link>
                <Link to="/products" className="px-8 py-4 rounded-2xl border-2 border-white text-white font-semibold hover:bg-white hover:text-red-700 transition">
                  Explore Marketplace
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[520px] md:h-[520px] lg:w-[620px] lg:h-[620px] mx-auto">
                <div className="absolute inset-0 rounded-full" style={{overflow: 'hidden'}}>
                  <div className="w-full h-full animate-spin" style={{animationDuration: '8s'}}>
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent, rgba(239,68,68,0.95), rgba(251,146,60,0.7), transparent)',
                        mask: 'radial-gradient(closest-side, transparent calc(100% - 4px), black calc(100% - 4px))',
                        WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 4px), black calc(100% - 4px))',
                      }}
                    />
                  </div>
                  <div className="absolute inset-[2px] border border-white/20 rounded-full" />
                </div>
                <div className="absolute left-10 sm:left-16 md:left-20 top-10 sm:top-12 md:top-16 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-4 border-red-400 shadow-2xl">
                    <img src={meeting} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute right-0 top-16 sm:top-20 md:top-24 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-red-300 shadow-xl">
                  <img src={supplierImg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute right-4 sm:right-6 md:right-10 bottom-10 sm:bottom-14 md:bottom-20 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-red-300 shadow-xl">
                  <img src={truckImg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute left-12 sm:left-20 md:left-40 bottom-0 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-red-300 shadow-xl">
                  <img src={marketImg} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 rounded-full bg-red-600 border-4 border-white shadow-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-white">
                    <path d="M9 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                    <path d="M19 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l3.5-3.5A2.121 2.121 0 0 1 9 7h6a2 0 0 1 1.5.5L21 9v6a2 0 0 1-2 2h-3" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11l3.5-3.5A2.121 2.121 0 0 0 18.5 7h-9.5A2.121 2.121 0 0 0 7 9.5L3.5 13" />
                  </svg>
                </div>

                <div className="absolute top-2 sm:top-4 md:top-6 right-2 sm:right-6 md:right-10 bg-white rounded-2xl shadow-xl px-4 sm:px-5 py-3 sm:py-4">
                  <div className="font-bold text-gray-900 text-sm sm:text-base">Find Suppliers</div>
                  <div className="text-xs sm:text-sm text-gray-500">Quality you can trust</div>
                </div>

                <div className="absolute left-0 top-44 sm:top-52 md:top-72 bg-white rounded-2xl shadow-xl px-4 sm:px-5 py-3 sm:py-4">
                  <div className="font-bold text-gray-900 text-sm sm:text-base">Buy & Sell</div>
                  <div className="text-xs sm:text-sm text-gray-500">Products & Services</div>
                </div>

                <div className="absolute right-2 sm:right-4 md:right-10 bottom-24 sm:bottom-32 md:bottom-44 lg:bottom-48 bg-white rounded-2xl shadow-xl px-4 sm:px-5 py-3 sm:py-4">
                  <div className="font-bold text-gray-900 text-sm sm:text-base">Grow Business</div>
                  <div className="text-xs sm:text-sm text-gray-500">Opportunities Await</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-2 text-gray-600">Top picks from our marketplace this week</p>
            </div>
            <Link to="/products" className="hidden sm:inline-flex items-center gap-2 text-red-700 font-semibold hover:text-red-800">
              View all <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.slice(0, 3).map((product, index) => (
              <div key={product.id} data-aos="fade-up" data-aos-delay={index * 100} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-gray-900">${product.price}</span>
                      {product.priceUnit && <span className="text-xs text-gray-500 ml-1">{product.priceUnit}</span>}
                    </div>
                    <span className="text-sm text-gray-500">{product.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">
              View all products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50" data-aos="fade-up" data-aos-delay="100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Sponsored</h2>
              <p className="mt-2 text-gray-600">Exclusive offers and promotions from our partners</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mockAdvertisements.slice(0, 3).map((ad, index) => (
              <div key={ad.id} data-aos="zoom-in" data-aos-delay={index * 100} className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-red-100 transition-all duration-300 p-6">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                  {ad.type.replace(/_/g, ' ')}
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center text-xl mb-4 shadow-lg shadow-red-200">
                  {ad.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">{ad.title}</h3>
                <p className="text-gray-600 text-sm mb-4">Booked by <span className="font-semibold text-gray-900">{ad.bookedBy}</span></p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-gray-900">${ad.price}</span>
                    <span className="text-xs text-gray-500 ml-1">{ad.period}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${ad.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{ad.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LogoCloud />

      <section className="bg-red-700 text-white py-20" data-aos="fade-up" data-aos-delay="100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful businesses already trading on the HMFBF platform.
          </p>
          <Link to="/register" className="px-8 py-3 bg-white text-red-700 rounded-lg font-bold hover:bg-gray-100 inline-flex items-center gap-2">
            Get Started Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
