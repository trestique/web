import { formatMoney } from "../../../components/Helper";
import React from "react";
import ProductRating from "./ProductRating";
import ProductOffer from "./ProductOffer";
import MediaQuery from "../../../components/MediaQuery";
const ProductName = ({ topSpace, query, base_review, settings, base_product, removePadding }) => {
  const {
    offer_badge_msg,
    offer_badge_msg_bg_color,
    offer_badge_msg_text_color,
    badge_visible
  } = settings;
  let style= {}
  if(topSpace){
    style ={
      paddingTop: '15px'
    }
  }
  if(removePadding){
    style['padding-left'] = 0;
    style['padding-right'] = 0;
    style['padding-bottom'] = '10px';
  }
  
  return (
    <MediaQuery query={query}>
      <div className="product-es8-title-wrapper" style={style}>
        {offer_badge_msg && (
          <ProductOffer
            bgColor={offer_badge_msg_bg_color}
            msg={offer_badge_msg}
            color={offer_badge_msg_text_color}
            badge_visible={badge_visible}
          />
        )}
        <div className="product-es8-details-text-title-price">
        <Title settings={settings} base_product={base_product} base_review={base_review} />
        
        </div>
      </div>
    </MediaQuery>
  )
};

export default ProductName;

const Title = ({ settings, base_product, base_review }) => {
  const {price_visibility_on_title} = settings;
  let classPrice = "";
  let reviewClass = ""
  if(price_visibility_on_title == 'show_on_desk_only'){
    classPrice = "xs-hide";
    reviewClass = "full";
  }else if(price_visibility_on_title == 'show_on_xs_only'){
    classPrice = "xs-show";
  }else if(price_visibility_on_title == 'hide_on_both'){
    classPrice = "hide hidden";
    reviewClass = "full";
  }
  return (
      <>
      <h2 className="product-es8-details-text-title">{settings?.title_text}</h2>
      <div className={`${classPrice} product-es8-details-text-priceContainer`}>
        {base_product.compare_at_price > base_product.price && (
          <span className="product-es8-details-text-originalPrice">
            {formatMoney(base_product.compare_at_price)}
          </span>
        )}

        <span className="product-es8-details-text-discoutedPrice">
          {formatMoney(base_product.price)}
        </span>
      </div>
      {base_review && <ProductRating reviewClass={reviewClass} base_review={base_review} />}
    </>
  );
}