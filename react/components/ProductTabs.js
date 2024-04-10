import React from 'react';
import ReactHtmlParser from "react-html-parser";
import {slideToggle,slideUp} from './Helper'
const ProductTabs = (props) =>{
    const {variantMeta,currentVariant,settings} = props;
    const {tabs} = settings;
    if(tabs.length <= 0){
        return null;
    }
    
    const tabToggle = (e) =>{
        let target = e.currentTarget;
        let parent = target.closest('li');
        let mainParent = parent.closest('.tabs-items');
        let allTabs = mainParent.querySelectorAll('.tab-item');
        allTabs.forEach((item) => {
            if(item != parent){
                let content = item.querySelector('.tab-info');
                slideUp(content);
                item.classList.remove('active');
            }
        });
        let desc = parent.querySelector('.tab-info');
        parent.classList.toggle('active');
        slideToggle(desc);
    }
    return(
        <div className="product-tabs">
            <ul className="tabs-items">
                {tabs.map((item,i)=>{
                let currentVariantTitle = currentVariant?.title;
                
                let tabDescription = item.tab_description;
                if(variantMeta && currentVariant) {
                    let variantDetails = variantMeta[currentVariantTitle];
                    let handle = item.tab_title.toLowerCase().trim().replace(/\s+/g, '_');
                    if(variantDetails[handle]){
                        tabDescription = variantDetails[handle];
                    }
                }
                if(cn(tabDescription)){
                    return null;
                }
                return <li className="tab-item" key={i}>
                            <h3 className="title" onClick={(e)=>tabToggle(e)}>
                                {item.tab_title}
                                <span className="plus-icon"><img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/plus-icon.png?v=1637136380" /> </span>
                                <span className="minus-icon"><img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/minus-icon.png?v=1637136380" /> </span>
                            </h3>
                            <div className="tab-info">{ReactHtmlParser(tabDescription)}</div>
                        </li>
                })}
            </ul>
        </div>
    )
}

export default ProductTabs;