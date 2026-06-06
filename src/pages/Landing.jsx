import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Store, TrendingUp, Award, Zap, Globe } from 'lucide-react';
import { mockProducts, mockEvents } from '../data/mockData';

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
              <Link to="/events" className="text-gray-700 hover:text-red-700 font-medium">Events</Link>
              <Link to="/blog" className="text-gray-700 hover:text-red-700 font-medium">Blog</Link>
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

      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Connect. Trade. Grow.</h1>
              <p className="text-xl text-red-100 mb-8 leading-relaxed">
                Join Zimbabwe's most trusted marketplace for businesses. Connect with suppliers, buyers, and service providers. Grow your business today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="px-8 py-3 bg-white text-red-700 rounded-lg font-bold hover:bg-gray-100 flex items-center justify-center gap-2">
                  Get Started <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-red-700 flex items-center justify-center">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-red-100">Active Members</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">2,400+</div>
                <div className="text-red-100">Transactions</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">$2.4M</div>
                <div className="text-red-100">Trade Volume</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-red-100">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose HMFBF?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful tools to help your business thrive</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Store, title: 'Easy Marketplace', desc: 'List products and services. Connect with buyers instantly.' },
              { icon: Users, title: 'Verified Network', desc: 'Trusted members vetted and approved by administrators.' },
              { icon: TrendingUp, title: 'Grow Sales', desc: 'Reach 500+ potential customers in your industry.' },
              { icon: Globe, title: 'Smart Location', desc: 'Find businesses and suppliers near you on the map.' },
              { icon: Award, title: 'Ratings & Reviews', desc: 'Build trust with transparent ratings from customers.' },
              { icon: Zap, title: 'Business Tools', desc: 'Request quotes, track sales, generate reports.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
                <feature.icon className="w-12 h-12 text-red-700 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Products & Services</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {mockProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
                <div className="h-40 bg-gray-100 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-6">
                  <div className="text-sm text-red-700 font-bold mb-1">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-red-700">${product.price}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        ★ {product.rating} ({product.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600 border-t pt-4">
                    by {product.seller}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="px-8 py-3 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 inline-flex items-center gap-2">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {mockEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-red-100 rounded-lg flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-red-700">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-red-700 uppercase font-bold">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-red-700 font-bold mb-1">{event.type}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    <div className="text-sm text-gray-500">
                      {event.time} · {event.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/events" className="px-8 py-3 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 inline-flex items-center gap-2">
              View All Events <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-red-700 text-white py-20">
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