import React from 'react';
import { Spinner } from "../../components/Form";
import { formatMoney, miniCartOpen } from '../../components/Helper';
class ProductButtons extends React.Component {
    render() {
        let {planType,currentVariant,quantity,changeQty,selling_plan,addToCartProcess } = this.props;
        let productPrice = currentVariant.price;
        let currentSellingPlan  =  currentVariant.selling_plan_allocations.find(item=> item.selling_plan_id === Number(selling_plan));
        if(currentSellingPlan){
            if(currentSellingPlan.price < productPrice && planType == 'subscribe'){
                productPrice = currentSellingPlan.price;
            }
        }
        return (
            <div className={`quantity-cart-btn-wrap${planType == 'subscribe' ? ' subscription-plan' :''}`}>
              <Spinner id="quantity"
                label='Quantity'
                name="quantity"
                value={quantity}
                callbackFun={changeQty} 
              />
              {!currentVariant.available ?  
                  <button className="add-to-cart disabled soldout" disabled>
                  <span className="text">Soldout</span>
                  <span className="price">{formatMoney(productPrice)}</span>
                  {currentVariant.compare_at_price && currentVariant.compare_at_price > currentVariant.price &&  <span className="compare-price">{formatMoney(currentVariant.compare_at_price)}</span>}
                  </button>
                : 
                  <button className="add-to-cart" onClick={addToCartProcess}>
                  <span className="text">Add to cart</span>
                  <span className="price">{formatMoney(productPrice)}</span>
                  {currentVariant.compare_at_price && currentVariant.compare_at_price > currentVariant.price &&  <span className="compare-price">{formatMoney(currentVariant.compare_at_price)}</span>}
                  </button>
              }
            </div>
        )
    }
}


export default ProductButtons;