// src/types/order.ts

export interface Order {
    id: number;
    status: string;
    total: number;
    currency: string;
    date_created: string;
    customer_id: number;
    line_items: LineItem[];
    billing: BillingDetails;
    shipping: ShippingDetails;
}

export interface LineItem {
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    subtotal: number;
    total: number;
}

export interface BillingDetails {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
}

export interface ShippingDetails {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}