import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Handle the webhook data from WooCommerce
        // You can add your logic here to process the data
        console.log('Received webhook data:', data);

        // Respond with a success status
        return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
    }
}