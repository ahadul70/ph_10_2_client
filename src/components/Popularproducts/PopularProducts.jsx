import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import axios from "axios";

export const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/popularproducts`);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch popular products", error);
        // Fallback or empty state
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Market Listings</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover top-rated commodities available for immediate import/export.
            Verified quality and competitive pricing.
          </p>
        </div>

        {/* Search - Optional in Home, but kept since it was there (better in Explore page) */}
        {/* <div className="mb-10 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 rounded-full border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800"
          />
        </div> */}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden h-96 animate-pulse">
                <div className="h-48 bg-slate-200 dark:bg-slate-800"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                  <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.slice(0, 8).map((p) => (
              <div
                key={p._id}
                className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col"
              >
                <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={p.image || "https://placehold.co/400x300?text=No+Image"}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/50 backdrop-blur px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                    <FaStar className="text-amber-400" /> {p.rating || "N/A"}
                  </div>
                  {/* Quick Action Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent flex justify-center gap-2">
                    <Link to={`/productdetails/${p._id}`} className="btn btn-sm btn-circle btn-ghost text-white bg-white/20 hover:bg-white/40">
                      <FaEye />
                    </Link>
                    {/* <button className="btn btn-sm btn-circle btn-primary text-white">
                           <FaShoppingCart />
                       </button> */}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{p.category || 'Product'}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-xl text-slate-800 dark:text-slate-200">${p.price}</p>
                    <p className="text-xs text-slate-500">Available: {p.quantity}</p>
                  </div>

                  <div className="mt-auto">
                    <Link to={`/productdetails/${p._id}`} className="w-full btn btn-outline border-slate-200 dark:border-slate-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-xl">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/allproducts" className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-blue-500/20">
              Explore All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
