import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.WORDPRESS_URL;
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function GET(request: NextRequest) {
    try {
        if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
            console.error('Missing env vars:', {
                WORDPRESS_URL: !!API_URL,
                WOOCOMMERCE_CONSUMER_KEY: !!CONSUMER_KEY,
                WOOCOMMERCE_CONSUMER_SECRET: !!CONSUMER_SECRET,
            });
            return NextResponse.json(
                { error: 'Server configuration error: missing environment variables' },
                { status: 500 }
            );
        }

        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        const url = `${API_URL}/wp-json/wc/v3/products`;

        const response = await axios.get(url, {
            auth: {
                username: CONSUMER_KEY!,
                password: CONSUMER_SECRET!,
            },
            params: slug ? { slug } : undefined,
            timeout: 15000,
        });
        return NextResponse.json(response.data);
    } catch (error: any) {
        const detail = {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data,
            url: `${API_URL}/wp-json/wc/v3/products`,
            hasKey: !!CONSUMER_KEY,
            hasSecret: !!CONSUMER_SECRET,
        };
        console.error('Error fetching products:', detail);
        return NextResponse.json({ error: 'Failed to fetch products', detail }, { status: 500 });
    }
}