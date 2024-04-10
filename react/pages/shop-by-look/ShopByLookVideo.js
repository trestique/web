import React from "react";
import ReactHtmlParser from "react-html-parser";
import Srcset from '../../components/Srcset';
import MediaQuery from '../../components/MediaQuery';
const ShopByLookVideo = (item) => {
  let data = item.item;
  return (
    <div className={`shop-look-video shop-look-banner-${data.id}`}>
      <div className="shop-look-items">
        <div className="shop-look-video">
          {data.video_url && 
            <MediaQuery query="lap-and-up">
              <video loop muted controls autoPlay>
              <source src={data.video_url}></source>
            </video>
            </MediaQuery>
          }
          {!data.video_url && data.background_img_desk &&  <MediaQuery query="lap-and-up"><Srcset src={data.background_img_desk} /></MediaQuery>}
          {data.video_url_mobile && 
           <MediaQuery query="phone-and-tablet">
              <video loop muted controls autoPlay>
                <source src={data.video_url}></source>
              </video>
            </MediaQuery>
          }
          {!data.video_url_mobile && data.background_img_mob &&  <MediaQuery query="phone-and-tablet"><Srcset src={data.background_img_mob} /></MediaQuery>}
        </div>
        <div className="shop-look-content">
          <div className="shop-look-content-block">
            <div className="shop-look-heading">{data.heading_text}</div>
            <div className="shop-look-desc">
              {ReactHtmlParser(data.heading_description)}
            </div>
            <div className="shop-look-btn">
              <a className="button button--secondary" href={data.button_link} >
                {data.button_text}
              </a>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByLookVideo;
