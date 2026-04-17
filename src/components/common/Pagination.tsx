import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl border border-white/10 text-bw-muted hover:text-bw-cream hover:border-bw-gold/30 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl font-display text-sm font-semibold transition-all duration-300 ${
            currentPage === page
              ? 'bg-bw-gold text-bw-black'
              : 'text-bw-muted hover:text-bw-cream border border-white/10 hover:border-bw-gold/30'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl border border-white/10 text-bw-muted hover:text-bw-cream hover:border-bw-gold/30 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;