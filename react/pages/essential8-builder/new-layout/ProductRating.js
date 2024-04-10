import React from "react";
import HtmlParser from "react-html-parser";
const ProductRating = ({base_review, reviewClass}) => {
  return (
    <div className={`${reviewClass} product-es8-details-text-reviews`}>
    {HtmlParser(base_review)}  
    </div>
  );
};

export default ProductRating;
