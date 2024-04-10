import React from "react";
import Srcset from "../../../components/Srcset";
const ProductBenifits = ({benifits}) => {
  if(benifits?.length <= 0){
    return null;
  }
  
  return (
    <div className="product-benefits">
      {benifits.map((item, idx) => {
        let image = "";
        if(typeof item?.service_icon === 'object' && item?.service_icon?.src){
          image = item?.service_icon?.src
        }else if(item?.service_icon){
          image = item?.service_icon
        }
        return (
          <div
            key={idx}
            className={`benefits benefits-bar`}
          >
            
            {image && <Srcset src={image} />}
            {item.service_text && !image && <span>{item.service_text}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default ProductBenifits;
