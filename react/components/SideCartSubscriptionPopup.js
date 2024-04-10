import React, { useState } from 'react';
import ReactHtmlParser from "react-html-parser";
import Srcset from "./Srcset";

const SideCartSubscriptionPopup=()=> {
  const {bestseller} = simply.sideCart;
  let {popupEnable,popupTitle,popupText,popupDesc,popupImage} = bestseller;
  const [togglePopup, setTogglePopup] = useState(false);
  window.showSubscriptionPopup = function(){
    setTogglePopup(true);
  }
  window.hideSubscriptionPopup = function(){
    setTogglePopup(false);
  }
  return (
    <div className={`subscription-popup-main-wrap${popupEnable && togglePopup ? ' active' : ''}`}>
      <div className='black_bg' onClick={()=>setTogglePopup(false)}></div>
      <div className="subscription-popup-wrap">
        <div className="subscription-popup-inner">
          <div className="popup-close" onClick={()=>setTogglePopup(false)}>
            <img src="//cdn.shopify.com/s/files/1/0114/0621/3220/files/side-cart-close-icon.svg?v=8501096318584868990" alt="close" />
          </div>
          <div className="main-title-wrap">
            <h3 className="title-wrap">{popupTitle}</h3>
            <p className="text-wrap">{popupText}</p>
          </div>
          <div className="text-image-content-wrap">
            <div className="content-wrap">
              <div className="content-inner-wrap">
                {ReactHtmlParser(popupDesc)}
              </div>
            </div>
            <div className="image-wrap">
              <Srcset src={popupImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideCartSubscriptionPopup;