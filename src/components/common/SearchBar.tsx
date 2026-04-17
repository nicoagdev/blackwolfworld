import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import useProducts from '../../hooks/useProducts';

interface SearchBarProps {
  onSearch: (query: string, results: any[]) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Buscar productos..."
}) => {
  const [query, setQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const { products } = useProducts();

  useEffect(() => {
    if (query.trim() === '') {
      onSearch('', []);
      return;
    }

    setIsSearching(true);
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.categories.some(cat => cat.name.toLowerCase().includes(query.toLowerCase()))
    );

    const timer = setTimeout(() => {
      onSearch(query, filteredProducts);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, products, onSearch]);

  const clearSearch = () => {
    setQuery('');
    onSearch('', []);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-md"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bw-muted w-4 h-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-10 py-3 font-body text-sm text-bw-cream placeholder:text-bw-muted/40 focus:outline-none focus:border-bw-gold/30 focus:ring-2 focus:ring-bw-gold/10 backdrop-blur-xl transition-all duration-300"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-bw-muted hover:text-bw-cream transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-full left-0 right-0 mt-2 bg-bw-dark/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 text-xs text-bw-muted text-center"
        >
          Buscando...
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;