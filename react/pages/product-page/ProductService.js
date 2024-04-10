import React from 'react';
import ReactHtmlParser from "react-html-parser";

const ProductService = props =>{
    const {settings,planType} = props;
    const {services} = settings;
    if(cn(services[planType])){
        return null;
    }
    const openSubscriptionPopup = () =>{
        if(window.openSubscriptionPopup){
          window.openSubscriptionPopup();
        }
    }
    return(
        <div className={`product-services${planType === "subscribe" ? ' subscribe-plan': ''}`}>
            <ul className="service-items">
                {services[planType].map((item,i)=>{
                    if(item.service_icon){
                        return <li key={i}>
                            <img src={item.service_icon} />
                            {item.service_text && <span>{ReactHtmlParser(item.service_text)}
                            {item.learn_more_show && <a onClick={openSubscriptionPopup} className='xs-show service-learn-more'>Learn more</a>}
                            </span>}
                        </li>
                    }else{
                        return null;
                    } 
                })}
            </ul>
        </div>
    )
}

export default ProductService;