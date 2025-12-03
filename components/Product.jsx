import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const Product = ({product: {image, name, slug, price}}) => {

   const imageUrl = image && image[0] ? urlFor(image[0]).url() : '';
  return (
    <div>
        <Link href={`/product/${slug.current}`}>
            <div className='product-card'>
                <img src={imageUrl} width={250} height={250} className="product-image"/>
                </div>
                <p className="product-name">
                  {name}
                </p>
                <p className="product-price">
                  ${price}
                </p>
                </Link>
    </div>
  )
}

export default Product