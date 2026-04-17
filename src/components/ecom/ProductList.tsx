import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types/product';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          slug={product.slug}
          title={product.name}
          price={product.price}
          imageUrl={product.images[0]?.src || ''}
          category={product.categories[0]?.name}
          onAddToCart={() => {}}
        />
      ))}
    </div>
  );
};

export default ProductList;