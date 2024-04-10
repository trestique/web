import React from "react";
import ReactHtmlParser from "react-html-parser";
import Srcset from '../../components/Srcset';
import MediaQuery from '../../components/MediaQuery';
const ShopByLookBanner = (item) => {
  let data = item.item;
  return (
    <div className={`shop-look-banner shop-look-banner-${data.id}`}>
      <div className="shop-look-items">
        <div className="shop-look-image">
          {data.background_img_desk && 
            <MediaQuery query="lap-and-up"><Srcset src={data.background_img_desk} /></MediaQuery>
          }
          {data.background_img_mob && <MediaQuery query="phone-and-tablet"><Srcset src={data.background_img_mob} /></MediaQuery>}
        </div>
        <div className="shop-look-content">
          {data.heading_text && <div className="shop-look-heading">{data.heading_text}</div>}
          {data.heading_description && <div className="shop-look-desc">
            {ReactHtmlParser(data.heading_description)}
          </div>}
          <div className="shop-look-btn">
            <a className="button button--secondary" href={data.button_link} >
              {data.button_text}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByLookBanner;
