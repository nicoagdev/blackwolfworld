import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  onClick: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, price, onClick, className }) => {
  return (
    <div
      className={cn(
        'group bg-bw-dark rounded-apple-lg overflow-hidden cursor-pointer',
        'border border-white/5 hover:border-bw-gold/20',
        'transition-all duration-500 ease-apple',
        'hover:shadow-2xl hover:shadow-bw-gold/5',
        className
      )}
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-apple group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bw-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-lg uppercase tracking-wide text-bw-cream group-hover:text-bw-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="font-body text-sm text-bw-muted mt-1 line-clamp-2">{description}</p>
        <p className="font-serif text-xl text-bw-gold mt-3">{price}</p>
      </div>
    </div>
  );
};

export default Card;