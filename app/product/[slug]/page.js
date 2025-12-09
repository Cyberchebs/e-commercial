
import React from 'react'

 
import {client} from '@/lib/client';
import Details from '@/components/Details';

export async function generateStaticParams() {
 const products = await client.fetch(
    `*[_type == "product"]{ "slug": slug.current }`
  );

  return products.map((product)=>{
     return {
      slug: product.slug  
    }
  })
}

const ProductDetails = async({params}) => {

  const { slug } = await params;

    const products = await client.fetch(
      `*[_type == "product"]`
    );
   const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]{
        _id,
        name,
        slug,
        image,
        price,
        details
      }`,
      { slug }
    );

     if (!product) {
      notFound();
    }
  
  return (
    <div>
      <Details product={product} products={products}/>
    </div>
  );
}


export default ProductDetails;