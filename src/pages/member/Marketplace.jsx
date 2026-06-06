import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, MapPin, Star, Plus, ShoppingCart } from 'lucide-react';
import { mockProducts, mockCategories } from '../../data/mockData';
import EmptyState from '../../components/ui/EmptyState';

function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
            <p className="text-gray-600 mt-1">Find products and services from trusted suppliers</p>
          </div>
          <Link to="/my-listings" className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 transition flex items-center gap-2">
            <Plus size={18} /> My Listings
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products, services, suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
              <Filter size={18} /> Filters
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                !selectedCategory ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {mockCategories.slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-600">
            {filteredProducts.length} results {selectedCategory ? `in ${selectedCategory}` : ''}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl group-hover:scale-105 transition">
                  <div className="text-6xl">{product.image}</div>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50"
                  >
                    <Heart size={18} className={favorites.includes(product.id) ? 'fill-red-700 text-red-700' : 'text-gray-400'} />
                  </button>
                </div>

                <div className="p-4">
                  <div className="text-xs text-red-700 font-bold uppercase tracking-wider mb-1">{product.category}</div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300 text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm text-gray-600">Price</div>
                        <div className="text-lg font-bold text-red-700">
                          ${product.price}
                          {product.priceUnit ? `/${product.priceUnit}` : ''}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-1 mb-3">
                      <MapPin size={14} /> {product.location}
                    </div>
                    <div className="text-xs font-medium text-gray-700 mb-3">by {product.seller}</div>
                    <div className="flex gap-2">
                      <button onClick={() => requestQuote(product)} className="flex-1 px-3 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 transition text-sm">
                        Request Quote
                      </button>
                      <button onClick={() => addToCart(product)} className="flex-1 px-3 py-2 border border-red-700 text-red-700 rounded-lg font-bold hover:bg-red-50 transition text-sm">
                        Add to Cart
                      </button>
                    </div>
                    {viewQuoteId === product.id && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg text-sm">
                        <label className="block text-xs font-semibold text-gray-900 mb-1">Your message / quantity</label>
                        <textarea className="w-full px-2 py-2 border border-gray-300 rounded mb-2" rows="3" placeholder="I need..." />
                        <button onClick={() => submitQuote(product)} className="w-full px-3 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 text-sm">
                          Send RFQ
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <EmptyState
              icon="🔍"
              title="No products found"
              subtitle="Try adjusting your search or filters"
            />
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="mt-4 px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800"
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="text-center">
          <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition">Load More Products</button>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
