
import React from 'react'
import { urlFor, client } from "../../../lib/client"
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar,  } from 'react-icons/ai';
import { Product } from '@/components';
import ProductImageGallery from '@/components/ProductImageGallery';

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
  
  
  

  const { image, name, details, price } = product;
 
  

    
    
  return (
    <div>
      <div className='product-detail-container'>
        <ProductImageGallery image={image} />
       < div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                 <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
               <span className='minus' onClick=""><AiOutlineMinus /></span>
              <span className='num'>0</span>
              <span className='plus' onClick=""><AiOutlinePlus /></span>
            </p>
             
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick=''>Add to Cart</button>
            <button type='button' className='buy-now' onClick=''>Buy Now</button>
            </div>
          </div>
      </div>
      <div className='maylike-products-wrapper'>
       <h2>You may also like</h2>
       <div className='marquee'>
        <div className='maylike-products-container track'>
          {products.map((item) => (
            <Product key={item._id} product={item} />
          ))}
        </div>
       </div>
      </div>
    </div>
  );
}


export default ProductDetails;