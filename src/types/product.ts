// src/types/product.ts

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    regular_price: string;
    sale_price: string;
    images: Array<{
        id: number;
        src: string;
        alt: string;
    }>;
    stock_quantity: number;
    in_stock: boolean;
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    attributes: Array<{
        id: number;
        name: string;
        options: string[];
    }>;
}

export interface ProductListResponse {
    products: Product[];
    total: number;
    page: number;
    per_page: number;
}

export interface ProductDetailsResponse {
    product: Product;
}

export interface CartItemType extends Product {
    quantity: number;
}