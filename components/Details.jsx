"use client";
import {useStateContext} from '@/context/stateContext';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar,  } from 'react-icons/ai';
import { Product } from '@/components';
import ProductImageGallery from '@/components/ProductImageGallery';

const Details = ({product, products}) => {
    const { decQty, incQty, qty, onAdd } = useStateContext();

    const { image, name, details, price } = product;
  return (
 
 <>
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
               <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
            </p>
             
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type='button' className='buy-now' onClick="">Buy Now</button>
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
      </>
  )
}

export default Details