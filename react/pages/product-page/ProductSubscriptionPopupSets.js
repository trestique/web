import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import Slider from "react-slick";
import ProductSubscriptionPopup from "./ProductSubscriptionPopup";
import SubscriptionProduct from "./SubscriptionProduct";

const settings = {
  'subscribr_popup_details': subscribePopup.popupInfoExtra,
  'popupTitle': subscribePopup.popupTitle,
  'content': subscribePopup.popupContent,
  'addToCartTxt': subscribePopup.addToCartBtnText,
  'subscribeTxt': subscribePopup.subscribeBtnText,
  'extraInfo': subscribePopup.textExtra,
  'showButton': true
}

let config = {
  infinite: false,
  speed: 750,
  slidesToShow: 4.2,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3.2,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2.2,
        dots: true,
        arrows: false,
      },
    },
  ],
};

const ProductSubscriptionPopupSets = (props) => {
  const [sellingPlans, setSellingPlans] = useState({})
  const { activeVariants, all_products, preselectedItems, handleAddToCart, handlePopup } = props;
  const products = [...all_products, ...preselectedItems]
  const title = settings.popupTitle || "Save 35% with Auto-Refill";
  

  function updateSellingPlan(sellingPlan, productHandle) {
    if (sellingPlan && productHandle) {
      let updatedSellingPlan = { ...sellingPlans }
      updatedSellingPlan[productHandle] = sellingPlan
      setSellingPlans({ ...updatedSellingPlan })
    }
  }

  function removeSellingPlan(handle) {
    if(handle){
      const confSellingPlan = { ...sellingPlans }
      delete confSellingPlan[handle]
      setSellingPlans(confSellingPlan)
    }
  }

  if (!(activeVariants && products)) {
    return null;
  }

  return (
    <>
      <div onClick={handleAddToCart} className="subscription-popup-sets-bg"></div>
      <div className="subscription-popup-sets-wrapper">
        <span onClick={handleAddToCart} className="close-popup">
          <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector.png?v=1644490775" />
        </span>
        <div className="subscription-popup-sets-content">
          <div className="product-popup-title-wrapper">
            <h2 className="product-popup-title">{ReactHtmlParser(title)}</h2>
            <div className="product-popup-description">
              {ReactHtmlParser(settings.content)}
              <a className="learn-more" onClick={openSubscriptionPopup}>
              {` `}<span>Learn More</span>{` `}
                <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/info-icon.svg?v=1669963878" />
              </a>
            </div>
          </div>
          <div className="product-silder-wrapper">
            <Slider className="product-popup-slider" {...config}>
              {products.map(product => (
                product.productData.selling_plan_groups.length && <SubscriptionProduct productVariant={product?.productVariant} handlePopup={handlePopup} sellingPlans={sellingPlans} updateSellingPlan={updateSellingPlan} removeSellingPlan={removeSellingPlan} productData={product.productData} selectedItems={activeVariants} key={product.productData.id} />
              ))}
            </Slider>
          </div>
          <div className="button-wrapper">
            <div className="button-block">
              <button onClick={handleAddToCart} type="button" className="custom-btn custom-border-btn" >
                {settings.subscribeTxt || 'NO, THANK YOU'}
              </button>
            </div>
            <div className="button-block">
              <button type="button" className="custom-btn custom-fill-btn" onClick={() => handleAddToCart(sellingPlans)}>
                {settings.addToCartTxt || 'SUBSCRIBE'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductSubscriptionPopup settings={settings} />
    </>
  );
};
export default ProductSubscriptionPopupSets;
