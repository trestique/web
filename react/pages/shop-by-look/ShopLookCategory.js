import React, { useRef, useState } from "react";
import ShopByLookCategoryList from "./ShopByLookCategoryList";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
// import required modules
import { Navigation } from "swiper";

const ShopLookCategory = ({ categories }) => {
  let swiperRef = useRef(null);
  let scrollToItem = (name) =>{
    let category = document.querySelector(`[data-name="category-${name}"]`);
    if (category){
      let header = 158;
      if(window.innerWidth <= 767){
        header = 245;
      }
      window.scrollTo({ top: category.offsetTop - header, behavior: 'smooth' })
    }
  }
  return (
    <div className="category-list">
      <div className="shop-product-reviews-wrap">
        {categories?.settings?.title && <h3 className="list-slide-title">
          <span>{categories.settings.title}</span>
        </h3>}
        {categories.blocks.length <= 8 ? 
        <div className="swiper-block-wrapper slides">
          {categories.blocks.map((category, i) => {
              return (
                  <div className="category-item">
                    <div className={`category-icon`} key={i} onClick={() => { scrollToItem(category.name)}} >
                      <img src={category.icon} />
                      <div className="category-name"> {category.name}</div>
                    </div>
                  </div>
              );
            })}
        </div>
        :
        <div className="swiper-block-wrapper">
          <div className="swiper-button-prev" onClick={() => swiperRef.current.swiper.slidePrev()} />
          <div className="swiper-button-next" onClick={() => swiperRef.current.swiper.slideNext()} />
          <Swiper ref={swiperRef} slidesPerView={4.2} breakpoints={{ 768: { slidesPerView: 8 }}} className="product-reviews-slide">
            {categories.blocks.map((category, i) => {
              return (
                <SwiperSlide>
                  <div className="category-item">
                    <div className={`category-icon`} key={i} onClick={() => { scrollToItem(category.name)}} >
                      <img src={category.icon} />
                      <div> {category.name}</div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>}
      </div>
      <ShopByLookCategoryList categories={categories.blocks} />
    </div>
  );
};

export default ShopLookCategory;
