import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client'; 

const FooterBanner = ({footerBanner : {
  discount, largeText1, largeText2, saleTime ,desc, smallText, midText, product, buttonText, image 
}}) => {
     
   const imageUrl = image ? urlFor(image).url() : '';
    
  return (
    <div className='footer-banner-container'>
        <div className='banner-desc'>
          <div className='left'>
            <p>{discount} off</p>
            <h3>{largeText1}</h3>
            <h3>{largeText2}</h3>
            <p>{saleTime}</p>
          </div>
             <div className="right">
              <p>{smallText}</p>
              <p>{midText}</p>
              <p>{desc}</p>
              </div>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link> 
          <img src={imageUrl} alt="" className='footer-banner-image' />  
         </div>
    </div>
  )
}

export default FooterBanner