import React, { Component } from "react";
import { connect } from "react-redux";
import FooterTexts from './FooterTexts';
import FooterButtonAction from './FooterButtonAction';
import {minProductsToDiscount} from './builderSettings';
class FooterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  totalBundlePrice = () =>{
    let { selectedItems,selectedBag, settings } = this.props;
    let {discount} = settings;
    let comparePrice=0,mainPrice=0,discountPrice = 0;
    let productCount = selectedItems.length;
    selectedItems.map((item) => {
      comparePrice += item.currentVariant.price;
    });
    if(selectedBag){
      comparePrice += selectedBag.price;
    }
    if(discount && productCount >= minProductsToDiscount){
      discountPrice = comparePrice * (discount / 100);
      mainPrice = comparePrice - discountPrice;
    }else{
      mainPrice = comparePrice;
    }
    return {comparePrice,mainPrice,discountPrice}
  }
  render() {
    let {settings,currentProduct, activeProduct, selectedItems} = this.props;
    let {
      activeStep,
      discount
    } = settings;
    let { selectedBag } = this.props;
    let {comparePrice,mainPrice,discountPrice} = this.totalBundlePrice();
    let productCount = selectedItems.length;
    return (
      <div className={`footer-bar${activeStep === 3 ? ' review-page-footer-bar' : ''}`}>
          <div className="footer-bar-wrap">
            <FooterTexts discount={discount} productCount={productCount} discountPrice={discountPrice} activeProduct={activeProduct} selectedBag={selectedBag} activeStep={activeStep}/>
            <FooterButtonAction discount={discount} productCount={productCount} comparePrice={comparePrice} mainPrice={mainPrice} />
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.global.settings,
  activeProduct: state.global.activeProduct,
  currentProduct: state.global.currentProduct,
  selectedBag: state.global.selectedBag,
  selectedItems: state.global.selectedItems
});
export default connect(mapStateToProps)(FooterBar);
