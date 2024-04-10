import React from "react";
const ProductOffer = ({ badge_visible, bgColor, color, msg }) => {
  return (
    <div
      className={`${badge_visible} product-es8-new-offer-badge`}
      style={{
        backgroundColor: bgColor,
        color: color,
      }}
    >
      {msg}
    </div>
  );
};

export default ProductOffer;
