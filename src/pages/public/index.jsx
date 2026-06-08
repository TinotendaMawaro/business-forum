import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowLeft,
  Key,
  ChevronRight,
  Users,
  Store,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Star,
  Calendar,
  BookOpen,
  Info,
  MessageCircle,
} from 'lucide-react';

function PublicLayout({ title, subtitle, children, showBackButton = true }) {
  return (
    <div className="min-h-screen bg-white page-enter">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-rose-500 text-sm text-white" />
              <span className="text-sm sm:text-base">Platform</span>
            </Link>
            {showBackButton && (
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-red-600"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {title && (
        <div className="border-b border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            {subtitle && <p className="mt-3 max-w-2xl text-lg text-slate-500">{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="relative">{children}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color = 'red' }) {
  const colorClasses = {
    red: 'from-red-500 to-rose-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-indigo-600',
    orange: 'from-orange-500 to-amber-600',
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}
      >
        <Icon size={22} />
      </div>
      <h3 className="mt-5 text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const inputBase =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';

  return (
    <PublicLayout
      title="Contact Us"
      subtitle="We'd love to hear from you. Get in touch with us today and let's start a conversation."
    >
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Get in Touch</h3>
              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-red-600 shadow-sm">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Address</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      20 Dan Judson, Milton Park<br />Harare, Zimbabwe
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-red-600 shadow-sm">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone</h3>
                    <a href="tel:+263779830017" className="mt-1 block text-sm text-slate-600 hover:text-red-700">
                      +263 779 830 017
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-red-600 shadow-sm">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <a href="mailto:info@hmfbf.co.zw" className="mt-1 block text-sm text-slate-600 hover:text-red-700">
                      info@hmfbf.co.zw
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-red-700 to-rose-700 p-6 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <MessageCircle size={20} />
                <h4 className="font-bold">Quick Response Guaranteed</h4>
              </div>
              <p className="mt-2 text-sm text-red-100">We typically respond within 24 hours during business days.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600">
                  ✓
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">Message Sent!</h3>
                <p className="mt-2 text-slate-500">We'll get back to you within 24 hours.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputBase}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputBase}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={inputBase}
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputBase} resize-none`}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

function About() {
  const values = [
    { icon: Info, title: 'Integrity & Trust', description: 'Building lasting relationships through transparency and honesty.' },
    { icon: Users, title: 'Community Growth', description: 'Empowering businesses to grow together.' },
    { icon: Award, title: 'Excellence', description: 'Delivering quality services and products.' },
    { icon: Zap, title: 'Innovation', description: 'Embracing new ideas and technologies.' },
  ];

  return (
    <PublicLayout
      title="About HMFBF"
      subtitle="Learn more about our platform and mission to transform Zimbabwean businesses"
      showBackButton
    >
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              The Heartfelt Marketplace Fellowship Business Forum is a platform dedicated to connecting
              Zimbabwean businesses, farmers, and entrepreneurs. We create opportunities for growth,
              collaboration, and sustainable economic development.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Our mission is to connect, support, and grow businesses across Zimbabwe by providing a secure
              digital platform for commerce, networking, and skills development.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Our Vision</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-lg leading-relaxed text-slate-600">
              To empower Zimbabwean businesses through a trusted, digital marketplace that fosters growth,
              innovation, and sustainable economic development.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Core Values</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
                  <value.icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { value: '500+', label: 'Active Members', accent: 'text-red-600' },
            { value: '2,400+', label: 'Transactions', accent: 'text-blue-600' },
            { value: '$2.4M', label: 'Trade Volume', accent: 'text-green-600' },
            { value: '98%', label: 'Satisfaction', accent: 'text-purple-600' },
          ].map((stat, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className={`text-3xl font-bold ${stat.accent}`}>{stat.value}</div>
              <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}

function ProductsServices() {
  return (
    <PublicLayout
      title="Products & Services"
      subtitle="Browse our wide range of products and services from verified sellers"
    >
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={Store} title="Easy Marketplace" description="List products and services. Connect with buyers instantly." color="red" />
          <FeatureCard icon={Users} title="Verified Network" description="Trusted members vetted and approved by administrators." color="blue" />
          <FeatureCard icon={TrendingUp} title="Grow Sales" description="Reach 500+ potential customers in your industry." color="green" />
          <FeatureCard icon={Globe} title="Smart Location" description="Find businesses and suppliers near you on the map." color="purple" />
          <FeatureCard icon={Award} title="Ratings & Reviews" description="Build trust with transparent ratings from customers." color="orange" />
          <FeatureCard icon={Zap} title="Business Tools" description="Request quotes, track sales, generate reports." color="red" />
        </div>

        <div className="mt-12 rounded-2xl border border-slate-900 bg-slate-950 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-bold tracking-tight text-white">Ready to start trading?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Join hundreds of successful businesses already trading on the HMFBF platform.
          </p>
          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
          >
            Login to Browse <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}

function Events() {
  return (
    <PublicLayout
      title="Upcoming Events"
      subtitle="Join our monthly forums, workshops, and business networking events"
    >
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
            <div className="flex gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-700">15</div>
                  <div className="text-[10px] font-bold uppercase text-red-700">Jun</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-red-700">Livestream</div>
                <h3 className="mt-2 text-xl font-bold text-slate-900">HMFBF Monthly Business Forum</h3>
                <p className="mt-2 text-sm text-slate-500">Monthly forum for business discussion and networking</p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={14} />
                  <span>10:00 AM - 1:00 PM · Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
            <div className="flex gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">22</div>
                  <div className="text-[10px] font-bold uppercase text-blue-700">Jun</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-700">Workshop</div>
                <h3 className="mt-2 text-xl font-bold text-slate-900">Financial Literacy for SMEs</h3>
                <p className="mt-2 text-sm text-slate-500">Learn financial management for small and medium enterprises</p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={14} />
                  <span>2:00 PM - 4:00 PM · Harare</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-900 bg-slate-950 p-8 text-center sm:p-12">
          <Calendar size={40} className="mx-auto text-red-500" />
          <h3 className="mt-4 text-2xl font-bold text-white">More events coming soon</h3>
          <p className="mx-auto mt-2 max-w-xl text-slate-300">
            Join our community to stay updated on upcoming workshops, seminars, and networking events.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
          >
            Login to Register <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}

function Blog() {
  const posts = [
    {
      id: 1,
      title: "How to Grow Your SME in Zimbabwe's Current Economy",
      category: 'Business Tips',
      author: 'Admin',
      date: '2024-06-01',
      image: '📊',
      excerpt: 'Strategies for sustainable growth in challenging economic times',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: '5 Ways HMFBF Membership Transformed These Businesses',
      category: 'Networking',
      author: 'Editor',
      date: '2024-05-22',
      image: '🤝',
      excerpt: 'Success stories from our member businesses',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'Digital Payment Methods: A Guide for Vendors',
      category: 'Technology',
      author: 'Admin',
      date: '2024-05-15',
      image: '💳',
      excerpt: 'Understanding digital payments and how to implement them',
      readTime: '6 min read',
    },
  ];

  return (
    <PublicLayout title="Business Blog" subtitle="Insights, tips, and success stories from our business community">
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-white transition duration-500 group-hover:scale-105">
                <div className="flex h-full items-center justify-center text-5xl">{post.image}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-red-700">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-red-700">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <BookOpen size={16} />
            Read Full Articles <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-500 text-lg font-bold text-white shadow-lg shadow-red-900/20">
              H
            </span>
          </Link>
          <h1 className="mt-4 text-xl font-bold text-slate-900">Platform</h1>
          <p className="text-sm text-slate-500">Fellowship Business Forum</p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {!submitted ? (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700">
                <Key size={22} />
              </div>
              <h2 className="mt-6 text-center text-2xl font-bold text-slate-900">Reset Password</h2>
              <p className="mx-auto mt-1 max-w-xs text-center text-sm text-slate-500">
                Enter your email and we will send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputBase}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30"
                >
                  Send Reset Link
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-800">
                  <ArrowLeft size={14} /> Back to login
                </Link>
              </div>
            </>
          ) : (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600">
                ✓
              </div>
              <h2 className="mt-6 text-2xl font-bold text-slate-900">Check Your Email</h2>
              <p className="mt-2 text-slate-500">
                We've sent a password reset link to <span className="font-semibold text-slate-900">{email}</span>
              </p>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { PublicLayout, Contact, About, ProductsServices, Events, Blog, ForgotPassword };
