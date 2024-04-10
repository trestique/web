import React, { Component } from "react";
import { connect } from "react-redux";
import VariantSelector from '../../components/VariantSelector';
import { showToast,getItemLimit, getBigProductCount, isBiggerProduct, checkItemLimit  } from "../../components/Helper";
import { setActiveProduct, addSelectedItem, toggleDescriptionPopup,toggleHowToUsePopup,toggleIngredientsPopup,toggleSustainibilityPopup } from "../../redux/global/globalAction";
import BundleProductImageSlider from './BundleProductImageSlider';
import {maxProducts,bigProducts} from './builderSettings';
import MediaQuery from '../../components/MediaQuery';
import HtmlParser from "react-html-parser";
import {selectItems, checkProductAlreadyAdded} from './bundleHelper';
class ProductSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVariant: null
    };
  }

  selectItem = () => {
    selectItems(this.props);
  }
  componentDidMount(){
    if(this.props.activeProduct){
      let currentVariant = this.props.activeProduct.currentVariant;
      this.setState({currentVariant})
    }
  }
  componentDidUpdate(){
    if(this.state.currentVariant){
      let vid = this.props.product.data.variants.find((item)=> item.id === this.state.currentVariant.id);
      if(cn(vid)){
        this.setState({currentVariant: null});
      }
    }
  }
  updateVariant = (variant) => {
    let { product,setActiveProduct } = this.props;
    this.setState({ currentVariant: variant },() => {
        setActiveProduct({...product,currentVariant:variant});
      }
    );
  };
  getCurrentVariantData = () =>{
    let { product} = this.props;
    let prod = product.data;
    let { currentVariant } = this.state;
    if(cn(currentVariant)){
      currentVariant = prod.variants[0];
    }
    let image = prod.featured_image;
    let shadeDescription = '';
    let alt = '';
    let {metadata} = product;
    let title = currentVariant.title;
    if(!cn(currentVariant.featured_image)){
      image = currentVariant.featured_image.src;
      alt = currentVariant.title;
    }
    if(!cn(metadata)){
      if(!cn(metadata.info)){
        shadeDescription = metadata.info[`${title}`];
      }
    }
    return {title,image,shadeDescription,alt};
  }
  render() {
    let { product, isActive, learnMore,activeProduct } = this.props;
    let { currentVariant } = this.state;
    let prod = product.data;
    let {title,image,shadeDescription,alt} = this.getCurrentVariantData();

    let activecurrentVariant = {};
    if(!cn(activeProduct)){
      activecurrentVariant = activeProduct.currentVariant;
    }

    let buttonText = "ADD THIS PRODUCT";
    if (activeProduct) {
      let alreadyAdded = checkProductAlreadyAdded(this.props);
      if(alreadyAdded){
        buttonText = "ADDED";
      }
    }
    let {toggleHowToUsePopup, toggleDescriptionPopup, toggleIngredientsPopup, toggleSustainibilityPopup} = this.props;
    return (
      <div className="product-slide" data-handle={prod.handle}>
        <div className="product-image-wrapper">
          <BundleProductImageSlider currentVariant={currentVariant} product={prod} />
        </div>
      <div className="bundle-product-details">
        <h3 data-handle={prod.handle} data-isactive={isActive} className="product-title" >
          {prod.title}
        </h3>
        <div className="product-review">
        {HtmlParser(product.review)}  
        </div>
        <MediaQuery query="lap-and-up">
        <div className="short-info">
        {HtmlParser(product.metadata.short_info)}
        </div>
        <div className="selected-swatch">
            <p className="v-title">{title}</p>
            {shadeDescription !== "" && <p className="v-desc">{shadeDescription}</p>}
        </div>
        </MediaQuery>
        
        {/* 'Color' option selector */}
        <div className="option-selector">
          <div className="swatches-wrapper">
            {/* {this.renderShades(product.data.variants)} */}
            {product.options.map((option, index) => {
                  return (
                    <ul key={index} className={`swatch-wrap`}>
                      {product.data.variants.map((variant) => {
                        return (
                          <VariantSelector
                            key={variant.id}
                            option={option.name}
                            selectedVariant={activecurrentVariant}
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
        <MediaQuery query="phone-and-tablet">
        <div className="selected-swatch">
            <p className="v-title">{title}</p>
            {shadeDescription !== "" && <p className="v-desc">{shadeDescription}</p>}
        </div>
        <div className="short-info">
        {HtmlParser(product.metadata.short_info)}
        </div>
        </MediaQuery>
        <div className="btn-wrap">
          <button type="button" className="btn"  onClick={this.selectItem} >{buttonText}</button>
        </div>
        {/* <div className="learn-more-btn-wrap">
            <p className="learn-more-btn" onClick={learnMore}>+ Learn more</p>
          </div> */}
              <MediaQuery query="phone">
                <ul className="slide-footer-tags">
                {product.metadata.how_to_use && <li onClick={()=> toggleHowToUsePopup(true)}>HOW TO USE</li> }
                {product.data.description && <li onClick={()=> toggleDescriptionPopup(true)}>DESCRIPTION</li>}
                {product.metadata.ingredients && <li onClick={()=> toggleIngredientsPopup(true)}>INGREDIENTS</li>}
                {product.metadata.sustainability && <li onClick={()=> toggleSustainibilityPopup(true)}>SUSTAINABILITY</li>}
                </ul>
            </MediaQuery>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeProduct : state.global.activeProduct,
  selectedItems: state.global.selectedItems,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveProduct: (product) => dispatch(setActiveProduct(product)),
  addSelectedItem: (settings) => dispatch(addSelectedItem(settings)),
  toggleDescriptionPopup: (value) => dispatch(toggleDescriptionPopup(value)),
  toggleHowToUsePopup: (value) => dispatch(toggleHowToUsePopup(value)),
  toggleIngredientsPopup: (value) => dispatch(toggleIngredientsPopup(value)),
  toggleSustainibilityPopup: (value) => dispatch(toggleSustainibilityPopup(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductSlide);
