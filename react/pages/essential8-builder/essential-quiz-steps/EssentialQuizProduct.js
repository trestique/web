import React, { Component } from "react";
import { connect } from "react-redux";
import Srcset from "../../../components/Srcset";
import { filePath } from "../../../settings";
import { formatMoney, handleize, showToast } from "../../../components/Helper";
import VariantSelector from '../../../components/VariantSelector';
class EssentialQuizProduct extends Component {
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
    return (
        <div className="item">
            <div className="img">
              <img
                src={img}
                alt={currentVariant.title}
              />
            </div>
              <div className="details">
                <div className="product-title-wrap">
                  <p className="product-title">
                    {product.product_title}
                  </p>
                </div>
                {!this.props.hideVariantTitle && <p className="current-swatch">
                  {currentVariant.title}
                </p>}
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
export default connect(mapStateToProps, mapDispatchToProps)(EssentialQuizProduct);
