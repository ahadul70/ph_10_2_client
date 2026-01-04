import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-2xl mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">IE</div>
            ImpExp<span className="text-blue-500">Hub</span>
          </div>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Connecting global markets with seamless import and export solutions.
            Reliable, fast, and secure trade management for modern businesses.
          </p>
          <div className="flex gap-4">
            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Services</h3>
          <ul className="space-y-3">
            {['Global Shipping', 'Warehousing', 'Customs Clearance', 'Supply Chain', 'Trade Finance'].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Company</h3>
          <ul className="space-y-3">
            {['About Us', 'Careers', 'Latest News', 'Contact Support', 'Terms of Service'].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-blue-400 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Stay Updated</h3>
          <p className="text-slate-400 mb-4 text-sm">Subscribe to our newsletter for the latest trade insights.</p>
          <div className="form-control w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered w-full pr-12 bg-slate-800 border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
              <button className="absolute top-0 right-0 rounded-l-none btn btn-primary h-full min-h-0 text-white">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} ImpExp Hub. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
          <Link to="#" className="hover:text-white transition-colors">Security</Link>
        </div>
      </div>
    </footer>
  );
}
