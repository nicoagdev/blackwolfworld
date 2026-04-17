import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.WORDPRESS_URL;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        let url = `${API_URL}/wp-json/wc/v3/products`;
        if (slug) {
            url += `?slug=${slug}`;
        }

        const response = await axios.get(url, {
            params: {
                consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
                consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
            }
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}