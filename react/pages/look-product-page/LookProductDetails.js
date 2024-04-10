import React,{useEffect, useRef, useState} from 'react';
import ReactHtmlParser from "react-html-parser";
import {formatMoney} from '../../components/Helper';
import LookBundleProducts from'./LookBundleProducts';
import {getPrices,makeBundleProcess} from './LookHelper';
import { connect } from "react-redux";
import {addToCart} from '../../redux/cart/cartAction';


const LookProductDetails = ({productData,addToCart}) => {
    let [products,setProducts] = useState([]);
    let [loading,setLoading] = useState(false);
    let [bundleAvailable,setBundleAvailable] = useState(true);
    let {product,settings} = productData;
    let {title,productReview,description} = product;
    let updateBundleProducts = (popupProduct) =>{
        // let newProducts = [...products];
        // console.log('I',i);
        // newProducts.splice(i, 1, popupProduct);
        let newProducts = products.map((item)=> {
            if(item.index == popupProduct.index){
                return popupProduct
            }
            return item;
        })
        setProducts([...newProducts]);
    }
    let handleForm = (e) =>{
        e.preventDefault();
        setLoading(true);
        makeBundleProcess(product,products,addToCart,setLoading);
    }
    useEffect(()=>{
        let {bundleProducts} = settings;
        if(bundleProducts){
            // Find if any product if OOS
            let outOfStockProduct = bundleProducts.find((item)=> !item.selectedVariant.available );
            if(outOfStockProduct || !product.variants[0].available){
                setBundleAvailable(false);
            }
            setProducts(bundleProducts);
        }
        if(bundleProducts?.length <= 0){
            setBundleAvailable(false);
        }
    },[]);
    let {price, compare_at_price} = getPrices(products);
    return (
      <div className='look-product-details-wrapper'>
          <div className='look-product-details'>
            <h1 className='product-title'>{title}</h1>
            <div className="product-review">{ReactHtmlParser(productReview)}</div>
            <LookBundleProducts updateBundleProducts={updateBundleProducts} products={products} />
            <div className='product-description'>
                {ReactHtmlParser(description)}
            </div>
            <form onSubmit={(e)=> handleForm(e)}>
                {bundleAvailable ? 
                    <button type='submit' className={`add-to-cart btn${loading ? ' loading' : ''}`}>
                        ADD TO CART | {formatMoney(price)} <span className='compare-price'>{compare_at_price > price && formatMoney(compare_at_price)}</span>
                    </button>
                :
                    <button type='submit' disabled className='add-to-cart btn'>
                        Soldout
                    </button>
                }
            </form>
            {settings?.services &&  <ul className='services-list'>
                {settings.services.map((item)=>{
                    return <li>
                        <div className='img'>
                            <img src={item.service_icon} />
                        </div>
                        <div className='service-text'>{ReactHtmlParser(item.service_text)}</div>
                    </li>
                })}
            </ul>}
          </div>
      </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addToCart: data => dispatch(addToCart(data))
});
export default connect(null, mapDispatchToProps)(LookProductDetails);
