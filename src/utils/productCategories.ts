import { Product } from '@/types/product';

export type ProductCategory = {
  name: string;
  slug: string;
};

export const getAvailableCategories = (products: Product[]): ProductCategory[] => {
  const categoryMap = new Map<string, ProductCategory>();

  for (const product of products) {
    for (const category of product.categories) {
      if (category.slug.toLowerCase() === 'uncategorized') {
        continue;
      }

      if (!categoryMap.has(category.slug)) {
        categoryMap.set(category.slug, {
          name: category.name,
          slug: category.slug,
        });
      }
    }
  }

  return Array.from(categoryMap.values()).sort((firstCategory, secondCategory) =>
    firstCategory.name.localeCompare(secondCategory.name)
  );
};