import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ArrowLeft, Key, ChevronRight, Users, Store, TrendingUp, Award, Zap, Globe, Star, Calendar, BookOpen, Info, MessageCircle } from 'lucide-react';

function PublicLayout({ title, subtitle, children, showBackButton = true }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:shadow-red-200 transition-all duration-300">
                H
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900">Heartfelt Marketplace</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Fellowship Business Forum</div>
              </div>
            </Link>
            {showBackButton && (
              <Link 
                to="/" 
                className="text-gray-700 hover:text-red-700 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline">Back</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {title && (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 opacity-60"></div>
          <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color = 'red' }) {
  const colorClasses = {
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-100 hover:-translate-y-1">
      <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <PublicLayout
      title="Contact Us"
      subtitle="We'd love to hear from you. Get in touch with us today and let's start a conversation."
    >
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-red-700 shadow-sm flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600 leading-relaxed">20 Dan Judson, Milton Park<br />Harare, Zimbabwe</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-red-700 shadow-sm flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+263779830017" className="text-gray-600 hover:text-red-700 transition-colors">
                      +263 779 830 017
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-red-700 shadow-sm flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@hmfbf.co.zw" className="text-gray-600 hover:text-red-700 transition-colors">
                      info@hmfbf.co.zw
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle size={20} />
                <h4 className="font-bold">Quick Response Guaranteed</h4>
              </div>
              <p className="text-red-100 text-sm">
                Our team typically responds within 24 hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-4xl">✓</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                <button 
                  type="button" 
                  onClick={() => setSubmitted(false)} 
                  className="px-6 py-3 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 transition-all duration-200 shadow-lg shadow-red-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows="6" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 transition-all duration-200 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-lg font-bold hover:from-red-800 hover:to-red-900 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-200 hover:shadow-xl"
                >
                  <Send size={18} />
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
      showBackButton={true}
    >
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-3xl p-8 sm:p-12 mb-12 border border-red-100">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Heartfelt Marketplace Fellowship Business Forum is a platform dedicated to connecting Zimbabwean businesses, farmers, and entrepreneurs. We create opportunities for growth, collaboration, and sustainable economic development.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to connect, support, and grow businesses across Zimbabwe by providing a secure digital platform for commerce, networking, and skills development.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              To empower Zimbabwean businesses through a trusted, digital marketplace that fosters growth, innovation, and sustainable economic development.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white mb-4">
                  <value.icon size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 text-center border border-red-100">
            <div className="text-3xl font-bold text-red-700 mb-1">500+</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-100">
            <div className="text-3xl font-bold text-blue-700 mb-1">2,400+</div>
            <div className="text-sm text-gray-600">Transactions</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
            <div className="text-3xl font-bold text-green-700 mb-1">$2.4M</div>
            <div className="text-sm text-gray-600">Trade Volume</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100">
            <div className="text-3xl font-bold text-purple-700 mb-1">98%</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
          </div>
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
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard 
            icon={Store} 
            title="Easy Marketplace" 
            description="List products and services. Connect with buyers instantly." 
            color="red"
          />
          <FeatureCard 
            icon={Users} 
            title="Verified Network" 
            description="Trusted members vetted and approved by administrators." 
            color="blue"
          />
          <FeatureCard 
            icon={TrendingUp} 
            title="Grow Sales" 
            description="Reach 500+ potential customers in your industry." 
            color="green"
          />
          <FeatureCard 
            icon={Globe} 
            title="Smart Location" 
            description="Find businesses and suppliers near you on the map." 
            color="purple"
          />
          <FeatureCard 
            icon={Award} 
            title="Ratings & Reviews" 
            description="Build trust with transparent ratings from customers." 
            color="orange"
          />
          <FeatureCard 
            icon={Zap} 
            title="Business Tools" 
            description="Request quotes, track sales, generate reports." 
            color="red"
          />
        </div>

        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-2xl p-8 sm:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Trading?</h3>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful businesses already trading on the HMFBF platform.
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-red-700 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg"
          >
            Login to Browse
            <ChevronRight size={20} />
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
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex flex-col items-center justify-center border border-red-200">
                  <div className="text-3xl font-bold text-red-700">15</div>
                  <div className="text-xs text-red-700 uppercase font-bold">Jun</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-red-700 font-bold mb-1 uppercase tracking-wider">Livestream</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">HMFBF Monthly Business Forum</h3>
                <p className="text-gray-600 text-sm mb-3">Monthly forum for business discussion and networking</p>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar size={14} />
                  <span>10:00 AM - 1:00 PM · Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex flex-col items-center justify-center border border-blue-200">
                  <div className="text-3xl font-bold text-blue-700">22</div>
                  <div className="text-xs text-blue-700 uppercase font-bold">Jun</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-blue-700 font-bold mb-1 uppercase tracking-wider">Workshop</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Literacy for SMEs</h3>
                <p className="text-gray-600 text-sm mb-3">Learn financial management for small and medium enterprises</p>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar size={14} />
                  <span>2:00 PM - 4:00 PM · Harare</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-2xl p-8 sm:p-12 text-white text-center">
          <Calendar size={48} className="mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-3">More Events Coming Soon</h3>
          <p className="text-red-100 mb-6 max-w-xl mx-auto">
            Join our community to stay updated on upcoming workshops, seminars, and networking events.
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-red-700 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg"
          >
            Login to Register
            <ChevronRight size={20} />
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
    <PublicLayout 
      title="Business Blog" 
      subtitle="Insights, tips, and success stories from our business community"
    >
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-48 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                {post.image}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">By {post.author}</span>
                  <span className="text-gray-400">{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 transition-all duration-200 shadow-lg shadow-red-200"
          >
            <BookOpen size={20} />
            Read Full Articles
            <ChevronRight size={20} />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg">
              H
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">HMFBF</h1>
          <p className="text-gray-500 text-sm">Heartfelt Marketplace Fellowship Business Forum</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {!submitted ? (
            <>
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-700">
                  <Key size={24} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Reset Password</h2>
              <p className="text-gray-600 text-center mb-6">Enter your email and we'll send you a reset link</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-3 rounded-lg font-bold hover:from-red-800 hover:to-red-900 transition-all duration-200 shadow-lg shadow-red-200"
                >
                  Send Reset Link
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-red-700 hover:text-red-800 font-medium inline-flex items-center gap-1 transition-colors">
                  <ArrowLeft size={16} />
                  Back to login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-4xl">✓</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>
              </p>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 transition-all duration-200"
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
