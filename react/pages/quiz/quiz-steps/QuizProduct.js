import React, { Component } from "react";
import { connect } from "react-redux";
import Srcset from "../../../components/Srcset";
import { filePath } from "../../../settings";
import { formatMoney, handleize, showToast } from "../../../components/Helper";
import VariantSelector from '../../../components/VariantSelector';
class QuizProduct extends Component {
  state = {
    product : null,
}
updateVariant = (variant) =>{
  let product = this.state.product;
  product.currentVariant = variant;
  this.setState({product});
}
componentDidMount(){
    const {product} = this.props;
    this.setState({product});
}
componentDidUpdate(prevProps){
  if(JSON.stringify(prevProps.product) != JSON.stringify(this.props.product)){
    let product =  this.props.product;
    this.setState({product});
  }
}
render() {
    if(cn(this.state.product)){
        return null;
    }
    let { product } = this.state;
    let {currentVariant} = product;
    let discount = 15;
    let img = product.featured_image;
    if(currentVariant.featured_image){
        img = currentVariant.featured_image.src;
    }
    let {metaData} = product;
    let variantInfo = '';
    if(metaData){
      if(metaData.info){
        variantInfo = metaData.info[`${currentVariant.title}`];
      }
    }
    let {productsCount} = this.props;
    return (
      <div className='col-sm-6'>
        <div className="item">
          <div className="flex-view-xs space">
            <div className="col-sm-5 col-xs-4 col-4 no-xs-space">
              <div className="img">
                <img
                  src={img}
                  alt={currentVariant.title}
                />
              </div>
            </div>
            <div className="col-sm-7 col-xs-8 col-8">
              <div className="details">
                <div className="product-title-wrap">
                  <p className="product-title">
                    {product.product_title}
                  </p>
                  <div className="product-price-wrap">
                    {discount && productsCount > 3? 
                      <>
                        <p className="compare-price">
                          {formatMoney(currentVariant.price)}
                        </p>
                        <p className="main-price">
                          {formatMoney(currentVariant.price - (currentVariant.price * (discount/100)))}
                        </p>
                      </>
                      :
                      <p className="main-price">
                        {formatMoney(currentVariant.price)}
                      </p>
                    }
                  </div>
                </div>
                <p className="current-swatch">
                  {currentVariant.title}
                </p>
                <div className="option-selector">
                <div className="swatches-wrapper">
                  {/* {this.renderShades(product.data.variants)} */}
                  {product.options.map((option, index) => {
                        return (
                          <ul key={index} className={`swatch-wrap review-swatch-wrap`}>
                            {product.variants.map((variant) => {
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
                </div>
                {variantInfo && <p className="variant-info">{variantInfo}</p> }
                <div className="remove-btn" onClick={(e) => this.props.removeItem(product.id)}>Remove</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(QuizProduct);
