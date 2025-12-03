import "./globals.css";
import {client} from '../lib/client';
import {Product ,FooterBanner ,HeroBanner} from '../components';

const Home = async() => {
   const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    const serializedBanner = bannerData.length > 0 
  ? JSON.parse(JSON.stringify(bannerData[0])) 
  : null;
  return (
    <div>
    <HeroBanner heroBanner={serializedBanner}/>
    
    <div className="products-heading" >
      <h1>Best Selling products</h1>
      <p>Discover our amazing products!</p>
    </div>

    <div className="products-container">
      {products?.map((product)=><Product key={product._id} product={product}/>)}
    </div>
      
    <FooterBanner footerBanner={serializedBanner}/>
    </div>
  );

  
}

export default Home;
