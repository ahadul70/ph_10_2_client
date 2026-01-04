import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaSearch, FaFilter, FaStar, FaSortAmountDown } from "react-icons/fa";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle Filters & Sort
  useEffect(() => {
    let result = [...products];

    // Search
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter(p => p.category === category);
    }

    // Sort
    if (sort === "price-asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === "price-desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }
    // "newest" assumes default order or a date field if available

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page
  }, [search, category, sort, products]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Extract unique categories
  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Marketplace</h1>
          <p className="text-slate-600 dark:text-slate-400">Find the best import/export opportunities.</p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">

          {/* Search */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {/* Category Filter */}
            <div className="relative w-full md:w-48">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 appearance-none outline-none cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Sort */}
            <div className="relative w-full md:w-48">
              <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 appearance-none outline-none cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((p) => (
                <div key={p._id} className="card-hover bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
                  <div className="relative h-56 bg-slate-100 dark:bg-slate-800">
                    <img src={p.image || "https://placehold.co/400?text=No+Image"} alt={p.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-white dark:bg-black/50 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      <FaStar className="text-amber-400" /> {p.rating || "N/A"}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs font-bold text-blue-600 uppercase mb-2 tracking-wider">{p.category || "General"}</div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">{p.name}</h3>
                    <div className="flex justify-between items-end mb-4">
                      <div className="text-xl font-bold">${p.price}</div>
                      <div className="text-xs text-slate-400">Qty: {p.quantity}</div>
                    </div>
                    <Link to={`/productdetails/${p._id}`} className="mt-auto btn btn-outline w-full rounded-xl hover:bg-blue-600 hover:border-blue-600 hover:text-white">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                <button
                  className="btn btn-square"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(c => c - 1)}
                >
                  «
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`btn btn-square ${currentPage === i + 1 ? "btn-primary" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="btn btn-square"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(c => c + 1)}
                >
                  »
                </button>
              </div>
            )}

            {paginatedProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-slate-500">No products found matching your criteria.</p>
                <button onClick={() => { setSearch(""); setCategory("All"); }} className="mt-4 text-blue-600 hover:underline">Clear Filters</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
