import React,{ useState, useEffect} from 'react';
import LookProduct from './LookProduct';
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import LookBundlePopup from './LookBundlePopup';

const LookBundleProducts = ({products,updateBundleProducts}) => {
    const [activePopup, setActivePopup] = useState('')
    const handlePopupClick = (value) => {
      setActivePopup(value)
    }
    // useEffect(() => {
    // }, [activePopup]);
    console.log(activePopup);
    return (
      <div className='look-bundle-products'>
        <Swiper spaceBetween={4} slidesPerView={3.4}  className="look-bundle-products-slider">
          {products.map((product,index)=> <SwiperSlide key={index}><LookProduct product={product} handlePopupClick={handlePopupClick} /></SwiperSlide>)}
        </Swiper>
        {products.map((product, index)=>{
          return <LookBundlePopup key={index} index={index} updateBundleProducts={updateBundleProducts} activePopup={activePopup} handlePopupClick={handlePopupClick} popupData={product} />
        })}
      </div>
    )
}
export default LookBundleProducts;
