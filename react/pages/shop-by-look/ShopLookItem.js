import React, { useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import Srcset from '../../components/Srcset';
const ShopLookItem = (props) => {
  let product = props.product;
  const [videoHover, setVideoHover] = useState(false)
  let videoRef = useRef()
  let { metaData } = product

  const handleVideo = (e, control) => {

    if(metaData?.shop_look_landing_video) {

      let target = videoRef.current
      setVideoHover(control)
      if(control) {
        target.play()
      } else {
        target.pause()
      }
    }
  }

  return (
    <div className="look-card-item">
      <div className="look-card-images image-fix-height">
        <a href={`/products/${product.handle}`} onMouseOver={(e) => handleVideo(e, true)} onMouseOut={(e) => handleVideo(e, false)}>
          <Srcset src={product.image} />
          { metaData?.shop_look_landing_video && <video loop muted ref={videoRef} className={`${videoHover ? ` active`: ``}`}>
            <source src={metaData.shop_look_landing_video}></source>
          </video>}
        </a>
      </div>
      <div className="look-card-content">
      <div className="product-content-details">
        <div className="product-content">
          <div className="img">
              <Srcset className="round-img" src={product.alt_image} />
          </div>
          <div className="product-details">
            <h6 className="product-title">{product.title}</h6>
            <h5 className="author-name">{product.metaData.shop_by_look_handle}</h5>
            <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector_1.png?v=1651647340" className="insta-icon" />
            <span className="insta-followers">{product.metaData.shop_by_look_insta_handle} {product.metaData.shop_by_look_insta_followers}</span>
          </div>
        </div>
        <div className="desc">
          <p>{ReactHtmlParser(product.description)}</p>
        </div>
        </div>
        <div className="btn-details">
          <a className="button button--secondary" href={`/products/${product.handle}`} >
            SHOP THIS LOOK
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopLookItem;
