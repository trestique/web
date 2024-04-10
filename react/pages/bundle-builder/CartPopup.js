import React, { Component } from "react";
import { connect } from "react-redux";
import { addSelectedItem, addItem, addSelectedBag } from "../../redux/global/globalAction";
import ReviewSection from "./ReviewSection";
import { formatMoney, findBagType } from "../../components/Helper";
import {minProductsToDiscount,minProducts,maxProducts} from './builderSettings';
class CartPopup extends Component {
  state = {
    updateButtonLoading: false
  }
  updateSelection = () => {
    if(this.state.updateButtonLoading){
      return false;
    }
    let {localBag, localItems, selectedItems, addSelectedBag, addSelectedItem, settings, setGlobalSettings } = this.props;
    let totalCount = localItems.length;
    this.setState({updateButtonLoading: true},()=>{
      addSelectedItem(localItems);
      let new_settings = { ...settings };
      setGlobalSettings(new_settings);
      setTimeout(()=>{ 
        this.setState({updateButtonLoading: false});
       }, 3000);
    })
  }
  closeBtn = () => {
    
  }
  render() {
    let { reviewTitle, productCount, bagCount, localItems, localBag, settings, closePopup } =this.props;
    let {discount} = settings;
    let comparePrice=0,mainPrice=0,discountPrice = 0;
    localItems.map((item) => {
        comparePrice += item.currentVariant.price;
    });
    if(localBag && localBag.variants){
      comparePrice += localBag.price;
    }
    if(discount && productCount >= minProductsToDiscount){
      discountPrice = comparePrice * (discount / 100);
      mainPrice = comparePrice - discountPrice;
    }else{
      mainPrice = comparePrice;
    }
    return (
      <div className="cart-popup-wrap">
        <div className="arrow-up"></div>
        <div className="custom-container">
          <div className="popup-title-wrap">
            <h2 className="page-title">{reviewTitle}</h2>
            <div className="close-icon-wrap" onClick={closePopup}>
              <img src="//cdn.shopify.com/s/files/1/0114/0621/3220/files/side-cart-close-icon.svg?v=8501096318584868990" alt="close"/>
            </div>
          </div>
          <div className="selected-item-count">
            <p>{productCount+' products + '+bagCount+' bag'}</p>
          </div>
        </div>
        <ReviewSection productCount={productCount} cartPopup={true} />
        <div className="cart-bottom-section">
          <button className="button btn-update-cart" onClick={this.updateSelection}>
            {this.state.updateButtonLoading ? 'UPDATING' : 'UPDATE SELECTION'} - 
            {discount && productCount >= minProductsToDiscount && <span className="compare-price-wrap">{formatMoney(comparePrice)}</span>}
            <span className="main-price-wrap"> {formatMoney(mainPrice)}</span>
          </button>
          <p className="cart-popup-offer-text">
          {discount && productCount >= minProductsToDiscount 
          ? `YOU SAVE ${formatMoney(discountPrice)} BY BUYING THESE ITEMS TOGETHER`
          : `Add ${minProductsToDiscount-productCount} MORE Products and get ${discount}% OFF`
          }
            </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  settings: state.global.settings,
  selectedItems: state.global.selectedItems,
  localItems: state.global.localItems,
  localBag: state.global.localBag
});
const mapDispatchToProps = (dispatch) => ({
  addSelectedItem: (settings) => dispatch(addSelectedItem(settings)),
  addSelectedBag: (settings) => dispatch(addSelectedBag(settings)),
  setGlobalSettings: (settings) => dispatch(addItem(settings)),
});
export default connect(mapStateToProps,mapDispatchToProps)(CartPopup);
