import React from 'react'
import { Thumbs, Mousewheel } from "swiper";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import Srcset from '../../../components/Srcset';

const FullImages = ({full_image}) => {
  return (
    <div className='full-images'>
         <Swiper
          className="step-4-main-slider"
          mousewheel={true}
          modules={[Thumbs, Mousewheel, Pagination]}
          slidesPerView={1}
          pagination={true}
        >
          {full_image.map((item, key) => {
            if(!item.img){
              return null;
            }
            return (
              <SwiperSlide key={key}>
                <div className='full-image-item'>
                <a href={item?.link} className="full-image-container">
                    {typeof item?.img === 'object' && item?.img?.src  ? 
                    <Srcset className="full-image" src={item?.img?.src}/>
                   :
                   <Srcset className="full-image" src={item?.img}/>
                  }
                </a>
            </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
    </div>
  )
}

export default FullImages