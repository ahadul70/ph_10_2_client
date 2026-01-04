import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import LatestNews from "./components/LatestNews";
import FAQ from "./components/FAQ";
import { PopularProducts } from "../../components/Popularproducts/PopularProducts";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Features Section */}
      <Features />

      {/* 3. Popular Products Section */}
      <PopularProducts />

      {/* 4. Stats Section */}
      <Stats />

      {/* 5. About / Mission Preview Section */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-custom flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
              alt="Our Team"
              className="rounded-3xl shadow-2xl"
            />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Bridging the Gap Between Markets</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              At ImpExp Hub, we believe that global trade should be accessible, secure, and efficient for businesses of all sizes.
              Our platform connects you with trusted suppliers and buyers worldwide, backed by cutting-edge technology and a dedicated support team.
            </p>
            <ul className="space-y-3">
              {['Verified Partners', 'Transparent Pricing', '24/7 Global Support'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 font-medium">
                  <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn btn-outline rounded-full px-8 mt-4">
              Read our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <Testimonials />

      {/* 7. Latest News Section */}
      <LatestNews />

      {/* 8. CTA to Register Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Expand Your Business?</h2>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
            Join 15,000+ companies using ImpExp Hub to manage their global trade operations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/registration" className="btn bg-white text-blue-600 border-none hover:bg-slate-100 btn-lg rounded-full px-10">
              Create Free Account
            </Link>
            <Link to="/contact" className="btn btn-outline text-white hover:bg-white/10 btn-lg rounded-full px-10">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <FAQ />

      {/* 10. Partners Section */}
      <section id="partners" className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container-custom">
          <p className="text-center text-slate-400 font-semibold uppercase tracking-widest mb-8">Trusted over 2,000 companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            ].map((logo, i) => (
              <img key={i} src={logo} alt="Partner" className="h-8 md:h-10 object-contain hover:scale-110 transition-transform cursor-pointer" />
            ))}
          </div>
        </div>
      </section>

      {/* 11. Newsletter Section */}
      <Newsletter />
    </div>
  );
}
