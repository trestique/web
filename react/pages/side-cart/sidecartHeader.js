import React from 'react';
import {formatMoney} from '../../components/Helper';

class SideCartHeader extends React.Component {

  getProgressBar = () =>{
    let { cartData } = this.props;
    if(cartData.loading){
      return null;
    }
    let total_price = 0;
    if(cartData.cart){
      total_price = cartData.cart.total_price;
    }
    let {shipping,freeMini,title,progressType} = simply.sideCart;
    if(progressType == "shipping"){
      let {charge,away_msg,earned_msg} = shipping;
      charge = parseInt(charge) * 100;
      let progress = (total_price / charge) * 100;
      if(progress > 100 ){
        progress = 100;
      }
      let remaining_price = charge - total_price;
      away_msg = away_msg.replace('XX',formatMoney(remaining_price));
      return (
      <div className="side-cart-shipping-bar-wrapper">
        <p className="msg">
          {total_price >= charge && earned_msg}
          {total_price < charge && away_msg}
        </p>
        <div className="side-cart-shipping-bar">
          <div className="side-cart-shipping-bar-progress" style={{'width':`${progress}%`}}> 
          </div>
        </div>
      </div>
      )
    }else{
    let {charge,away_msg,earned_msg,get_product_msg} = freeMini;
    charge = parseInt(charge) * 100;
    let progress = (total_price / charge) * 100;
    if(progress > 100 ){
      progress = 100;
    }
    let remaining_price = charge - total_price;
    away_msg = away_msg.replace('XX',formatMoney(remaining_price));
    let findItem = cartData.cart.items.find((item)=> !cn(item.properties['_free_mini']));
    let msg = "";
    if(findItem && total_price >= charge ){
      msg = get_product_msg;
    }else if(total_price >= charge){
      msg = earned_msg;
    }else{
      msg = away_msg;
    }
    return (
      <div className="side-cart-shipping-bar-wrapper">
        <p className={`msg${total_price < charge ? " away":""}`}>
          {msg}
        </p>
        <div className="side-cart-shipping-bar">
          <div className="side-cart-shipping-bar-progress" style={{'width':`${progress}%`}}> 
          </div>
        </div>
      </div>
      )
    }
  }
  render() {
    let { closeCart,cartData } = this.props;
    let {title,sideCartImg} = simply.sideCart;
    return (
      <>
      <div className="side-cart-header">
        <h5>
          <span className="close-icon">
            <img src={simply.sideCart.closeIcon} alt="close cart"/>
          </span>
          <span className="cart-icon">
            <img src={sideCartImg} alt="cart"/>
          </span>
          <span className='side-cart-title'>
          {title}
          </span>
          <span className="cart-item-count">{cartData.cart.item_count} items</span>
        </h5>
          {cartData.cart && <>{this.getProgressBar()}</>}
      </div>
      </>
    )
  }
}

export default SideCartHeader;