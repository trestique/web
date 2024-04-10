import React from "react";
import ReactHtmlParser from "react-html-parser";

class ProductSubscriptionPopup extends React.Component{
    closeSubscriptionPopup = (e) =>{
        if(window.closeSubscriptionPopup){
          window.closeSubscriptionPopup();
        }
      }
    render(){
        const {settings} = this.props;
        const {subscribr_popup_details, extraInfo, showButton} = settings;
        if(cn(subscribr_popup_details)){
            return null
        }
        let data = subscribr_popup_details.split('##');
        return(
            <>
            <div onClick={this.closeSubscriptionPopup} className="subscription-popup-bg"></div>
            <div className="subscription-popup-details">
                <span onClick={this.closeSubscriptionPopup} className="close-popup">
                    <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector.png?v=1644490775"/>
                </span>
                <ul>
                {data.map((item, key)=> <li key={key}>{ReactHtmlParser(item)}</li>)}
                </ul>
                {
                    !showButton && <div className="btn-wrap">
                        <button onClick={this.closeSubscriptionPopup} type="button">Close</button>
                    </div>
                }
                {
                    extraInfo && <div>{ReactHtmlParser(extraInfo)}</div>
                }
            </div>
            </>
        )
    }
}
export default ProductSubscriptionPopup;