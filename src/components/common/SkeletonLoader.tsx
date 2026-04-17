import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = "h-4 bg-white/5 rounded-lg",
  count = 1
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse ${className}`}
        />
      ))}
    </>
  );
};

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-bw-dark rounded-apple-lg overflow-hidden border border-white/5">
    <SkeletonLoader className="aspect-[4/3] bg-white/5" />
    <div className="p-5 space-y-3">
      <SkeletonLoader className="h-3 bg-white/5 w-1/4 rounded-full" />
      <SkeletonLoader className="h-5 bg-white/5 w-3/4 rounded-lg" />
      <div className="flex justify-between items-center pt-2">
        <SkeletonLoader className="h-5 bg-white/5 w-1/4 rounded-lg" />
        <SkeletonLoader className="h-10 bg-white/5 w-24 rounded-xl" />
      </div>
    </div>
  </div>
);

export const CartItemSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 p-4 bg-bw-dark rounded-apple border border-white/5">
    <SkeletonLoader className="w-16 h-16 bg-white/5 rounded-xl" />
    <div className="flex-1 space-y-2">
      <SkeletonLoader className="h-4 bg-white/5 w-3/4 rounded-lg" />
      <SkeletonLoader className="h-4 bg-white/5 w-1/4 rounded-lg" />
    </div>
    <div className="flex items-center gap-2">
      <SkeletonLoader className="h-8 w-8 bg-white/5 rounded-lg" />
      <SkeletonLoader className="h-4 bg-white/5 w-8 rounded-lg" />
      <SkeletonLoader className="h-8 w-8 bg-white/5 rounded-lg" />
    </div>
  </div>
);

export default SkeletonLoader;