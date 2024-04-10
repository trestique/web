import React, { Component } from "react";
import { connect } from "react-redux";
import Srcset from "../../components/Srcset";
import { filePath } from "../../settings";
import { formatMoney, handleize, showToast } from "../../components/Helper";
import { addItem, addLocalItem } from "../../redux/global/globalAction";
import VariantSelector from '../../components/VariantSelector';
import {minProductsToDiscount} from './builderSettings';
import {getTotalProducts} from './bundleHelper';
class ReviewSectionProduct extends Component {
  updateVariant = variant =>{
    let {localItems,addLocalItem, index} = this.props;
    let itemFound = false;
    localItems.map((item)=>{
      if(item.currentVariant.id == variant.id){
        itemFound = true;
      }
    })
    if(itemFound){
      showToast("Oops! Looks like you already have a this shade. Choose another shade.");
       return;
    }
    let newItems = [...localItems];
    let item = {...newItems[index]};
    item['currentVariant'] = variant;
    newItems[index] = item;
    addLocalItem(newItems);
  }
  removeItem = id =>{
    const { localItems, addLocalItem } = this.props;
    if(localItems.length > 0){
      let newItems = [...localItems];
      let updatedItem = newItems.filter((item)=> item.currentVariant.id != id );
      addLocalItem(updatedItem);
    }
  }
  render() {
    let { settings, product, localItems, cartPopup } = this.props;
    let productCount = getTotalProducts(localItems);
    let { currentVariant,metadata } = product;
    let { discount } = settings;
    let shadeDescription  = '';
    if (metadata) {
      if (metadata.info) {
          shadeDescription = metadata.info[`${currentVariant.title}`];
      }
    }
    return (
      <div className={`${cartPopup ? 'col-sm-12' : 'col-sm-3 col-xs-6'}`}>
        <div className="item">
          <div className="flex-view-xs">
            <div className={`${cartPopup ? 'col-sm-4 col-xs-4 col-4' : 'col-sm-12 col-xs-12'}`}>
              <div className="img">
                <img
                  src={currentVariant.featured_image.src}
                  alt={currentVariant.featured_image.alt}
                />
              </div>
            </div>
            <div className={`${cartPopup ? 'col-sm-8 col-xs-8 col-8' : 'col-sm-12 col-xs-12'}`}>
              <div className="details">
                <div className="product-title-wrap">
                  <p className="product-title">
                    {product.data.title}
                  </p>
                  {cartPopup && 
                  <div className="product-price-wrap">
                    {discount ? 
                      <>
                      {productCount >= minProductsToDiscount &&
                        <p className="compare-price">
                          {formatMoney(currentVariant.price)}
                        </p>}
                        <p className="main-price">
                          {productCount >= minProductsToDiscount ?
                          formatMoney(currentVariant.price - (currentVariant.price * (discount/100)))
                          :
                          formatMoney(currentVariant.price)
                          }
                        </p>
                      </>
                      :
                      <p className="main-price">
                        {formatMoney(currentVariant.price)}
                      </p>
                    }
                  </div>}
                </div>
                <p className="current-swatch">
                  {currentVariant.title}
                </p>
                <div className={`option-selector ${!cartPopup ? 'hide':''}`}>
                <div className="swatches-wrapper">
                  {/* {this.renderShades(product.data.variants)} */}
                  {product.options.map((option, index) => {
                        return (
                          <ul key={index} className={`swatch-wrap review-swatch-wrap`}>
                            {product.data.variants.map((variant) => {
                              return (
                                <VariantSelector
                                  key={variant.id}
                                  option={option.name}
                                  selectedVariant={currentVariant}
                                  variant={variant}
                                  setSelectedVariant={this.updateVariant}
                                />
                              );
                            })}
                          </ul>
                        );
                      })}
                </div>
                  <div className="hide selected-swatch">
                    {shadeDescription !== "" && <p>{shadeDescription}</p>}
                  </div>
                </div>
                {cartPopup && 
                <div className="remove-btn" onClick={(e) => this.removeItem(currentVariant.id)}>Remove</div> }
                {!cartPopup && 
                  <div className="product-price-wrap">
                    {discount ? 
                      <>
                      {productCount >= minProductsToDiscount &&
                        <p className="compare-price">
                          {formatMoney(currentVariant.price)}
                        </p>}
                        <p className="main-price">
                          {productCount >= minProductsToDiscount ?
                          formatMoney(currentVariant.price - (currentVariant.price * (discount/100)))
                          :
                          formatMoney(currentVariant.price)
                          }
                        </p>
                      </>
                      :
                      <p className="main-price">
                        {formatMoney(currentVariant.price)}
                      </p>
                    }
                  </div>}
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
  global: state.global,
  settings: state.global.settings
});
const mapDispatchToProps = (dispatch) => ({
  setGlobalSettings: (settings) => dispatch(addItem(settings)),
  addLocalItem: (settings) => dispatch(addLocalItem(settings))
});
export default connect(mapStateToProps, mapDispatchToProps)(ReviewSectionProduct);
