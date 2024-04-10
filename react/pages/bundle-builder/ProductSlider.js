import React, { Component } from "react";
import { connect } from "react-redux";
import ProductSlide from "./ProductSlide";
import SlickSlider from "../../components/SlickSlider";
import { setCurrentProduct, setCurrentCollection,toggleDescriptionPopup,toggleHowToUsePopup,toggleIngredientsPopup,toggleSustainibilityPopup } from "../../redux/global/globalAction";
import {getTotalProducts} from './bundleHelper';
import DetailsPopup from './DetailsPopup';
import { minProductsToDiscount } from "./builderSettings";

class ProductSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      learnMorePopup:false
    };
  }
  learnMore = () => {
    this.setState({learnMorePopup:true});
  }
  closeLearnMore = () => {
    this.setState({learnMorePopup:false});
  }
  updateCurrentProduct = (i) => {
    let { bundleBuilderData,  setCurrentProduct, setCurrentCollection } = this.props;
    let { currentCollection , settings} = bundleBuilderData;
    let {all_products, collections} = settings;
    let currentProduct = all_products[i];
    collections.map((collection)=>{
      collection.collection_products.map((product)=>{
        if(product.data.handle == currentProduct.data.handle){
          currentCollection = collection;
        }
      })
    })
    
    setCurrentCollection({currentProduct,currentCollection});
  };

  mobileRemainProductMsg = () =>{
    let {selectedItems} = this.props;
    let totalProducts = getTotalProducts(selectedItems)
    if(totalProducts < minProductsToDiscount){
      return <div className="xs-discount-msg text-center xs-show">
        <p> CHOOSE {minProductsToDiscount - totalProducts } MORE PRODUCTS TO GET 15% OFF</p>
      </div>
    } else{
      return null;
    }
  }

  render() {
    let {howToUsePopup,descriptionPopup,ingredientsPopup,sustainibilityPopup,toggleHowToUsePopup, toggleDescriptionPopup, toggleIngredientsPopup, toggleSustainibilityPopup, activeProduct} = this.props;
    let { currentCollection, currentProduct,settings } = this.props.bundleBuilderData;
    if(cn(currentCollection) || cn(currentProduct)){
      return null;
    }
    let {all_products} = settings;
    let slider_settings = {
      speed: 750,
      draggable:false,
      swipe: false,
      beforeChange: (current, next) => {
        console.log("Before", current, next);
        // this.props.updateCurrentProduct({...this.props.settings,currentProductVariant:null});
      },
      afterChange: (current, next) => {
        console.log("After", current, next);
        this.updateCurrentProduct(current);
      },
      responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
      ]
    };

    
    let howTouse = activeProduct.metadata.how_to_use;
    let description = activeProduct.metadata.description;
    let ingredients = activeProduct.metadata.ingredients;
    let sustainability = activeProduct.metadata.sustainability;
    let variantMetaData = activeProduct?.metadata?.variantMeta[activeProduct?.currentVariant?.title];
    if(variantMetaData){
      if(variantMetaData.how_to_use){
        howTouse = variantMetaData.how_to_use;
      }
      if(variantMetaData.description){
        description = variantMetaData.description;
      }
      if(variantMetaData.ingredients){
        ingredients = variantMetaData.ingredients;
      }
      if(variantMetaData.sustainability){
        sustainability = variantMetaData.sustainability;
      }
    }
    return (
      <div className="builder-main-product">
        {all_products && (
            <SlickSlider childrens={this.mobileRemainProductMsg} config={slider_settings} productName="essential-mix">
              {all_products.map((product, i) => (
                <ProductSlide
                  key={product.data.handle + "_" + i}
                  product={product}
                  isActive={product.data.handle === currentProduct.data.handle}
                  collectionHandle={currentCollection.collection_handle}
                  learnMore={this.learnMore}
                />
              ))}
            </SlickSlider>
        )}
        {currentProduct && <>
          {howToUsePopup && <DetailsPopup video={currentProduct.metadata.how_to_use_video} content={howTouse} title="How to use" closePopup={toggleHowToUsePopup} />}
          {descriptionPopup && <DetailsPopup content={description} title="Description" closePopup={toggleDescriptionPopup} />}
          {ingredientsPopup && <DetailsPopup content={ingredients} title="Ingredients" closePopup={toggleIngredientsPopup} />}
          {sustainibilityPopup && <DetailsPopup video={currentProduct.metadata.sustainability_video} content={sustainability} title="Sustainability" closePopup={toggleSustainibilityPopup} />}
        </>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bundleBuilderData: state.global,
  activeProduct: state.global.activeProduct,
  currentProduct: state.global.currentProduct,
  descriptionPopup: state.global.descriptionPopup,
  howToUsePopup: state.global.howToUsePopup,
  ingredientsPopup: state.global.ingredientsPopup,
  sustainibilityPopup: state.global.sustainibilityPopup,
  selectedItems: state.global.selectedItems
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentProduct: (settings) => dispatch(setCurrentProduct(settings)),
  setCurrentCollection: (settings) => dispatch(setCurrentCollection(settings)),
  toggleDescriptionPopup: (value) => dispatch(toggleDescriptionPopup(value)),
  toggleHowToUsePopup: (value) => dispatch(toggleHowToUsePopup(value)),
  toggleIngredientsPopup: (value) => dispatch(toggleIngredientsPopup(value)),
  toggleSustainibilityPopup: (value) => dispatch(toggleSustainibilityPopup(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductSlider);
