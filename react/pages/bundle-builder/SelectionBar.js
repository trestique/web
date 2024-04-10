import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem, setCurrentCollection, setActiveProduct } from "../../redux/global/globalAction";
import {minProducts,maxProducts,minProductsToDiscount} from './builderSettings';
import {changeStep} from './bundleHelper';
class SelectionBar extends Component {
  changeStep = (step) => {
    changeStep(step,settings,addItem)
  }
  setFirstProduct = () =>{
    let { settings,setCurrentCollection, step,addItem,activeProduct } = this.props;
    let { collections } = settings;
    let currentCollection = collections[0]
    if(currentCollection){
      let currentProduct = currentCollection.collection_products[0];
      setCurrentCollection({currentProduct,currentCollection});
      if(cn(activeProduct)){
        setActiveProduct({...currentProduct,currentVariant:currentProduct.selected_or_first_available_variant});
      }
      if(step != 1){
        let new_settings = { ...settings, activeStep: 1};
        addItem(new_settings);
      }
    }
  }
  setBag = () =>{
    let { settings,setCurrentCollection, step, addItem } = this.props;
    let { collections } = settings;
    let currentCollection = collections.find((collection)=> collection.collection_handle == 'bags');
    if(currentCollection){
      let currentProduct = currentCollection.collection_products[0];
      setCurrentCollection({currentProduct,currentCollection});
      if(step != 1){
        let new_settings = { ...settings, activeStep: 1};
        addItem(new_settings);
      }
    }
  }
  render() {
    let { step, selectedItems, currentProduct} = this.props;
    let Style = {width:'3px'};
    if(selectedItems.length > 0){
      Style['width'] = `${selectedItems.length * 25}%`;
    }
    return (
      <div className={`selection-bar ${step == 3 ? ' review-selection-bar':''}`}>
        <div className="builder-progress-bar">
          <p>{selectedItems.length >= minProductsToDiscount ?
          `CONGRATS! YOU EARNED 15% OFF!`
          :
          `CHOOSE ${minProductsToDiscount - selectedItems.length} MORE PRODUCTS TO GET 15% OFF`
          }</p>
          <div className="builder-current-progress"><div className="builder-current-progress-bar" style={Style}></div></div>
        </div>
        <nav>
          <ul className="selection-bar-list">
            {currentProduct && step != 3 && 
              <>
                <li onClick={()=>{this.setFirstProduct(1)}} className={`selection-bar-step${ step === 1 && !currentProduct.type_bag ? " active" : "" }`}> Your Products</li>
                <li onClick={()=>{this.setBag()}} className={`selection-bar-step${ step === 1 && currentProduct.type_bag ? " active" : "" }`}>Your Bag</li>
              </>
            }
            {screen.width > 767 && step == 3 && 
              <>
                <li onClick={()=>{this.setFirstProduct(1)}} className={`selection-bar-step${ step === 1 && !currentProduct.type_bag ? " active" : "" }`}> Your Products</li>
                <li onClick={()=>{this.setBag()}} className={`selection-bar-step${ step === 1 && currentProduct.type_bag ? " active" : "" }`}>Your Bag</li>
              </>
            }
            <li onClick={()=>{this.changeStep(3)}} className={`selection-bar-step${ step === 3 ? " active" : "" }`}>Review Your Set</li>
          </ul>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  settings: state.global.settings,
  selectedItems: state.global.selectedItems,
  currentProduct: state.global.currentProduct,
  activeProduct: state.global.activeProduct
});
const mapDispatchToProps = (dispatch) => ({
  addItem: (settings) => dispatch(addItem(settings)),
  setCurrentCollection: (collection) => dispatch(setCurrentCollection(collection)),
  setActiveProduct: (product) => dispatch(setActiveProduct(product))
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectionBar);