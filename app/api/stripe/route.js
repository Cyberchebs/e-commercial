import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
 
  try {
       const body = await request.json();
    const line_items = body.map((item) => {
      
     const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
      
      
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [newImage],
          },
          unit_amount: item.price, // Use DB price!
        },
        quantity: item.quantity,
      };
    });

    const headersList = await headers();
    const origin = headersList.get('origin') || 'http://localhost:3000';

    const params = {
      line_items,
      mode: 'payment',
      submit_type: 'pay',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1SckUpJhUo5kLjImwnKeP7yP' }
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ id: session.id, url: session.url });
    
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: err.message }, 
      { status: 500 }
    );
  }
}