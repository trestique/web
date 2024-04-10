import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Pagination } from "swiper";
import ReactHtmlParser from "react-html-parser";
import VariantSelector from '../../components/VariantSelector';

const LookBundlePopup = (props) => {
  const { activePopup, popupData, handlePopupClick, updateBundleProducts, index } = props;
  const swiperRef = useRef(null);
  const [product,setProduct] = useState(popupData);
  let {selectedVariant} = product;
  let updateProduct = (variant) =>{
    let newProduct = product;
    newProduct['selectedVariant'] = variant;
    setProduct({...newProduct});
  }
  useEffect(() => {
    // if (activePopup === product.handle) {
    //   document.body.classList.add(`active-popup`);
    // } else {
    //   document.body.classList.remove(`active-popup`);
    // }
    if(swiperRef.current){
      swiperRef.current.swiper.slideTo(0);
    }
  }, [product]);
  let confirmChange = () =>{
    updateBundleProducts(product); handlePopupClick("");
  }
  let images = [];
  if(selectedVariant.title == 'Default Title'){
    images = product.media.filter((item)=> item.media_type == "image" );
  }else{
    images = product.media.filter((item)=> item.media_type == "image" && item.alt == selectedVariant.title );
  }
  console.log('Indexing=>',index);
  return (
    <>
      <div className={`popup-backdrop${activePopup === product.index ? " active" : ""}`} onClick={() => handlePopupClick("")}></div>
      <div className={`look-bundle-product-popup${activePopup === product.index ? " active" : ""}`}>
        <div className="product-popup">
          <div className="close-popup" onClick={() => handlePopupClick("")}>
            {ReactHtmlParser(`<span>&times</span>`)}
          </div>
          <Swiper ref={swiperRef} pagination={true} modules={[Pagination]}>
            {images?.map( (img, i) => (
                  <SwiperSlide key={i}>
                    <div className="img-wrapper">
                      <img src={img.src} alt="" />
                    </div>
                  </SwiperSlide>
                )
            )}
          </Swiper>
          <h4 className="product-popu-title">{product?.title}</h4>
          <div className="swatches-wrapper">
            {/* {this.renderShades(product.data.variants)} */}
              {product.options.map((option, index) => {
                    return (
                      <ul key={index} className={`swatch-wrap`}>
                        {product.variants.map((variant) => {
                          return (
                            <VariantSelector
                              key={variant.id}
                              option={option}
                              selectedVariant={selectedVariant}
                              variant={variant}
                              setSelectedVariant={updateProduct}
                            />
                          );
                        })}
                      </ul>
                    );
                  })}
            </div>
            <div className="active-variant-details">
              <p className="variant-title">{selectedVariant.title}</p>
              {product?.info && <p className="variant-info">{product?.info[selectedVariant.title]}</p>}
            </div>
          <div className="short-info">{ReactHtmlParser(product?.short_info)}</div>
          {selectedVariant.available ? 
          <button className="variant-btn" onClick={()=> confirmChange()}>confirm changes</button>
          :
          <button className="variant-btn disabled" disabled>Soldout</button>
          }
          
        </div>
      </div>
    </>
  );
};

export default LookBundlePopup;
