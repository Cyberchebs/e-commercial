"use client"

import { useState } from 'react'
import { urlFor } from '../lib/client';

export default function ProductImageGallery({ image}) {
  const [index, setIndex] = useState(0)
  
  return (
    <div>
              <div className='image-container'>
                <img 
                  src={image && image[index] ? urlFor(image[index]).url() : ''} 
                  alt=""
                  className='product-detail-image'
                />
              </div>
              <div className='small-images-container'>
                {
                image?.map((item, i) => (
                  <img 
                   src={item ? urlFor(item).url() : ''}
                    key={i}
                    className={i === index ? 'small-image selected-image' : 'small-image'}
                    onMouseEnter={()=> setIndex(i)}
                    />
                ))}
              </div>
            </div>
  )
}