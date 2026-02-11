import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { client } from '@/lib/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const cartData = await request.json();
    const productIds = cartData.map(item => item.productId);
    
    const products = await client.fetch(
      `*[_id in $productIds]{
        _id, 
        name, 
        price, 
        "imageUrl": image[0].asset->url
      }`,
      { productIds }
    );
    const productMap = {};
    products.forEach(product => {
      productMap[product._id] = product;
    });
    
    const line_items = cartData.map((item, index) => {
      const product = productMap[item.productId];
  
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      
    
      const priceNumber = Number(product.price);

      if (isNaN(priceNumber) || priceNumber <= 0) {
        console.error(`Invalid price for product ${product.name}:`, product.price);
        throw new Error(`Invalid price for product: ${product.name}. Price: ${product.price}`);
      }
      
    
      if (item.quantity < 1 || item.quantity > 100) {
        throw new Error('Invalid quantity');
      }
      
      const unitAmount = Math.round(priceNumber * 100);
     
      
      
      const lineItem = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            ...(product.imageUrl && { images: [product.imageUrl] }),
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
      
      console.log('Line item:', JSON.stringify(lineItem, null, 2));
      
      return lineItem;
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
        { shipping_rate: 'shr_1SckQOJhUo5kLjImtta0KPk2' }
      ],
      success_url: `${origin}/success`,
      
      cancel_url: `${origin}/product/${cartData[0].product.name}`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ id: session.id, url: session.url });
    
  } catch (err) {
    console.error('\n=== ERROR ===');
    console.error(err);
    return NextResponse.json(
      { error: err.message }, 
      { status: 500 }
    );
  }
}