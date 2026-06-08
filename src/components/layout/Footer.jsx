import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-16 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-rose-500 text-sm font-bold text-white">
                H
              </span>
              <div>
                <div className="text-sm font-bold tracking-tight text-white">Platform</div>
                <div className="text-xs text-slate-500">Fellowship Business Forum</div>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Connecting businesses, customers, and suppliers across Zimbabwe.
            </p>
            <div className="mt-5 flex gap-4">
              <a href="#" className="text-slate-500 transition hover:text-red-500"><Facebook size={18} /></a>
              <a href="#" className="text-slate-500 transition hover:text-red-500"><Twitter size={18} /></a>
              <a href="#" className="text-slate-500 transition hover:text-red-500"><Linkedin size={18} /></a>
              <a href="#" className="text-slate-500 transition hover:text-red-500"><Instagram size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-200">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/" className="text-sm transition hover:text-red-500">Home</Link></li>
              <li><Link to="/about" className="text-sm transition hover:text-red-500">About Us</Link></li>
              <li><Link to="/products" className="text-sm transition hover:text-red-500">Products</Link></li>
              <li><Link to="/events" className="text-sm transition hover:text-red-500">Events</Link></li>
              <li><Link to="/blog" className="text-sm transition hover:text-red-500">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-200">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/contact" className="text-sm transition hover:text-red-500">Contact Us</Link></li>
              <li><a href="#" className="text-sm transition hover:text-red-500">Terms of Service</a></li>
              <li><a href="#" className="text-sm transition hover:text-red-500">Privacy Policy</a></li>
              <li><a href="#" className="text-sm transition hover:text-red-500">Code of Conduct</a></li>
              <li><a href="#" className="text-sm transition hover:text-red-500">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-200">Contact</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-slate-500" />
                <p className="text-sm leading-relaxed text-slate-400">20 Dan Judson, Milton Park, Harare, Zimbabwe</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-slate-500" />
                <p className="text-sm text-slate-400">+263 779 830 017</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-slate-500" />
                <p className="text-sm text-slate-400">info@hmfbf.co.zw</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-900 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-slate-500">
              © 2024 Heartfelt Marketplace Fellowship Business Forum. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">Payment Partners: PayPal • Visa • Bank Transfer • EcoCash</p>
            <p className="text-xs text-slate-500">Made for Zimbabwean Businesses</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
