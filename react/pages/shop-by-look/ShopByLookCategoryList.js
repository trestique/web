import React, { useEffect } from "react";
import ShopLookItem from "./ShopLookItem";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

const ShopByLookCategoryList = ({ categories, activeCollection }) => {
  let collection = categories.find((item) => item.name == activeCollection);
  useEffect(()=>{
    // setTimeout(() => {
    //   let items = document.querySelectorAll('.single-category-items');
    //   items.forEach((item)=>{
    //     let selector = item.querySelectorAll('.product-list-ul li.look-item-li .look-card-content');
    //     var max = 0;
    //     selector.forEach((el)=>{
    //         if (el.offsetHeight > max) {
    //           max = el.offsetHeight;
    //         }
    //       });
    //       selector.forEach((el)=>{
    //           el.style['height'] = `${max}px`;
    //       })
    //   })  
    // }, 1000);
  })
  return (
    <div className="categories-list-items">
      {categories.map((item)=>{
        return <div data-name={`category-${item.name}`} className="single-category-items">
          <h3 className="category-title">
            <span>{item.name}</span>
          </h3>
          <ul className="product-list-ul">
            <Swiper slidesPerView={1.2} breakpoints={{ 768: { slidesPerView: 2.3 }}}  className="product-reviews-slide">
              {item.products.map((product, j) => (
                <SwiperSlide>
                  <li className="look-item-li">
                    <ShopLookItem
                      key={j}
                      product={product}
                      name={item.name}
                      icon={item.icon}
                    />
                  </li>
                </SwiperSlide>
              ))}
            </Swiper>
          </ul>
        </div>})}
    </div>
  );
};

export default ShopByLookCategoryList;
