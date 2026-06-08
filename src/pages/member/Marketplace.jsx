import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Heart,
  MapPin,
  Star,
  Plus,
  ShoppingCart,
  X,
  ArrowUpDown,
  SlidersHorizontal,
} from 'lucide-react';
import { mockProducts, mockCategories } from '../../data/mockData';
import EmptyState from '../../components/ui/EmptyState';

function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartItems, setCartItems] = useState([]);
  const [viewQuoteId, setViewQuoteId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    const results = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-asc') return results.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return results.sort((a, b) => b.price - a.price);
    return results;
  }, [searchTerm, selectedCategory, sortBy]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id];
      localStorage.setItem('favs', JSON.stringify(next));
      return next;
    });
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const next = [...prev, { ...product, cartId: Date.now() }];
      alert(`${product.name} added to cart`);
      return next;
    });
  };

  const requestQuote = (product) => {
    setViewQuoteId(viewQuoteId === product.id ? null : product.id);
  };

  const submitQuote = (product) => {
    alert(`Quotation requested for ${product.name}`);
    setViewQuoteId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 page-enter">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Marketplace</h1>
            <p className="mt-1 text-slate-500">Find products and services from trusted suppliers</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/my-listings"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={16} /> New Listing
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search products, services, suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="">All Categories</option>
                {mockCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <div className="hidden sm:flex rounded-xl border border-slate-200 bg-slate-50">
                <button className="rounded-l-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                  <SlidersHorizontal size={16} />
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="rounded-r-xl border-l border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  <Filter size={16} />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <ArrowUpDown size={16} />
                  Sort by
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No products found"
            subtitle="Try adjusting your search or filters to find what you're looking for."
          />
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                  <div className="flex h-full items-center justify-center text-6xl transition duration-500 group-hover:scale-105">
                    {product.image}
                  </div>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-slate-400 backdrop-blur-sm transition hover:text-red-500"
                  >
                    <Heart size={18} fill={favorites.includes(product.id) ? '#ef4444' : 'transparent'} />
                  </button>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-red-700">
                    {product.category}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{product.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-slate-900">${product.price}</span>
                      {product.priceUnit && (
                        <span className="ml-1 text-xs text-slate-500">{product.priceUnit}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <MapPin size={14} />
                      {product.location}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => requestQuote(product)}
                      className="flex-1 rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Request Quote
                    </button>
                  </div>

                  {viewQuoteId === product.id && (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <textarea
                        placeholder="Describe your requirements..."
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          onClick={() => setViewQuoteId(null)}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => submitQuote(product)}
                          className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;
