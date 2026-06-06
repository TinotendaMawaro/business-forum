import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-xl">
                H
              </div>
              <div>
                <div className="text-white text-sm font-bold">Heartfelt Marketplace</div>
                <div className="text-xs text-gray-400">Fellowship Business Forum</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Connecting businesses, customers, and suppliers across Zimbabwe.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-red-500"><Facebook size={18} /></a>
              <a href="#" className="hover:text-red-500"><Twitter size={18} /></a>
              <a href="#" className="hover:text-red-500"><Linkedin size={18} /></a>
              <a href="#" className="hover:text-red-500"><Instagram size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-red-500">Home</Link></li>
              <li><Link to="/about" className="hover:text-red-500">About Us</Link></li>
              <li><Link to="/products" className="hover:text-red-500">Products</Link></li>
              <li><Link to="/events" className="hover:text-red-500">Events</Link></li>
              <li><Link to="/blog" className="hover:text-red-500">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-red-500">Contact Us</Link></li>
              <li><a href="#" className="hover:text-red-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-red-500">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <p className="text-sm">20 Dan Judson, Milton Park, Harare, Zimbabwe</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <p className="text-sm">+263 779 830 017</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <p className="text-sm">info@hmfbf.co.zw</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-sm text-gray-400">
              © 2024 Heartfelt Marketplace Fellowship Business Forum. All rights reserved.
            </div>
            <div className="text-sm text-gray-400 text-center">
              Payment Partners: PayPal • Visa • Bank Transfer • EcoCash
            </div>
            <div className="text-sm text-gray-400 text-right">
              Made with ❤️ for Zimbabwean Businesses
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;