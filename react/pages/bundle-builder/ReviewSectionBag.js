import React, { Component } from "react";
import { connect } from "react-redux";
import Srcset from "../../components/Srcset";
import { filePath } from "../../settings";
import { findBagType, handleize, formatMoney } from "../../components/Helper";
import { addItem, addLocalItem, addLocalBag } from "../../redux/global/globalAction";
import VariantSelector from '../../components/VariantSelector';
import {minProductsToDiscount} from './builderSettings';
class ReviewSectionBag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bagType:null
    };
  }
  componentDidMount(){
    this.setBagType();
  }
  setBagType = () => {
    let { localItems } = this.props;
    let bagType = findBagType(localItems);
    this.setState({bagType});
  }
  updateVariant = (variant) => {
    // Update event for bag variants change
    let { addLocalBag } = this.props;
    addLocalBag(variant)
  };
  removeItem = () =>{
    let { addLocalBag } = this.props;
    addLocalBag(null);
  }
  renderShades = () => {
    // This function render to show each variant as a separate products.EX:one product has 2 variant and second product has 1 variant so... total number of product need to display is 3. 
    let { settings, localBag } = this.props;
    let currentVariant = localBag;
    let bagData = settings[`${this.state.bagType}_bag`];
    const variants = bagData.map(product => {
      if(product.variants.length === 1 && product.variants[0].title === "Default Title"){
        return null;
      }
      return (
        <ul key={product.id} className={`swatch-wrap`}>
          {product.variants.map((variant) => {
            return (
              <VariantSelector
                key={variant.id}
                option={'color'}
                selectedVariant={currentVariant}
                variant={variant}
                setSelectedVariant={this.updateVariant}
              />
            );
          })}
        </ul>
      );
  });
  return variants;
}
  render() {
    let { settings, localBag, cartPopup, productCount  } = this.props;
    if(cn(localBag)){
      return false;
    }
    let { discount } = settings;
    let { bagType } = this.state;
    if(!bagType){
      return false;
    }
    let textData = settings[`${bagType}_bag_text`];
    let image = "";
    if(localBag.featured_image){
      image = localBag.featured_image.src;
    }
    let title = localBag.title ;
    let price = localBag.price;
    return (
      <div className={`${cartPopup ? 'col-sm-12' : 'col-sm-6'}`}>
        <div className="item">
          <div className="flex-view-xs">
            <div className="col-sm-4 col-xs-4 col-4">
              <div className="img">
                <img src={image} alt="img" className="bag-product-image" />
              </div>
            </div>
            <div className="col-sm-8 col-xs-8 col-8">
              <div className="details">
                <div className="product-title-wrap">
                  <p className="product-title">
                    {textData.main_title}
                  </p>
                  <div className="product-price-wrap">
                    {discount && productCount>=minProductsToDiscount ? 
                      <>
                        <p className="compare-price">
                          {formatMoney(price)}
                        </p>
                        <p className="main-price">
                          {formatMoney(price - (price * (discount/100)))}
                        </p>
                      </>
                      :
                      <p className="main-price">
                        {formatMoney(price)}
                      </p>
                    }
                  </div>
                </div>
                <p className="current-swatch">
                  {title}
                </p>
                <div className="option-selector">
                  <div className="swatches-wrapper bag-review-swatch-wrapper">
                    {this.renderShades()}
                  </div>
                </div>
                <div className="remove-btn" onClick={() => this.removeItem()}>Remove</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  localItems: state.global.localItems,
  settings: state.global.settings,
  localBag:state.global.localBag
});
const mapDispatchToProps = (dispatch) => ({
  setGlobalSettings: (settings) => dispatch(addItem(settings)),
  addLocalBag: (settings) => dispatch(addLocalBag(settings)),
  addLocalItem: (settings) => dispatch(addLocalItem(settings))
});
export default connect(mapStateToProps, mapDispatchToProps)(ReviewSectionBag);
