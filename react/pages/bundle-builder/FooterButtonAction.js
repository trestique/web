import React, { Component } from "react";
import { connect } from "react-redux";
import {addToCart} from '../../redux/cart/cartAction';
import { addSelectedItem, addItem, setCurrentCollection } from "../../redux/global/globalAction";
import MediaQuery from "../../components/MediaQuery";
import {selectItems,getTotalProducts, goToBag, checkProductAlreadyAdded, changeStep} from './bundleHelper';
import { showToast, formatMoney, findBagType, generateUniqueId } from "../../components/Helper";
import {minProducts,maxProducts,bigProducts, minProductsToDiscount} from './builderSettings';
class FooterButtonAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateButtonLoading : false,
      addtoCartBundleLoading: false
    };
  }
  
  goTOBagStep = () => {
    let { settings,setCurrentCollection,selectedItems } = this.props;
    goToBag(settings,setCurrentCollection,selectedItems);
  };
  
  reviewSet = () => {
      let { settings, addItem } = this.props;
      changeStep(3,settings,addItem)
  };
  
  
  updateSelection = () => {
    if(this.state.updateButtonLoading){
      return false;
    }
    let {localItems, selectedItems, addSelectedItem, } = this.props;
    this.setState({updateButtonLoading: true},()=>{
      addSelectedItem(localItems);
      setTimeout(()=>{ 
        this.setState({updateButtonLoading: false})
       }, 2000);
    })
  }
  selectItem = () =>{
    selectItems(this.props);
  }
  addToCartBundle = () =>{
    if(this.state.addtoCartBundleLoading){
      return;
    }
    this.setState({addtoCartBundleLoading:true},()=>{
      this.addToCartBundleProcess();
    })
  }
  addToCartBundleProcess = () => {
    let {selectedItems,selectedBag,addToCart,settings,localBag,localItems} = this.props;
    if(JSON.stringify(selectedItems) !== JSON.stringify(localItems) || JSON.stringify(selectedBag) !== JSON.stringify(localBag)){
      showToast("Please update value");
      return false;
    }
    let {master_product} = settings;
    let productsCount = selectedItems.length;
    let bid = generateUniqueId();
    let items = [];
    let masterObj = {};
    let bagObj = {};
    let productIds = '';
    selectedItems.map(product =>{
      productIds = productIds.concat(product.currentVariant.id + ", ");
    });
    if(selectedBag){
      productIds = productIds.concat(master_product.variants[0].id + ", "+selectedBag.id);
    }
    masterObj['id'] = master_product.variants[0].id;
    masterObj['quantity'] = 1;
    let childProperties ={};
    if(productsCount >= minProductsToDiscount){
      masterObj.properties ={'_bid':`emix${bid}`,'_bundle_type':"bundle builder",'_type':'master','_products':productIds};
      childProperties = {'_master_handle': master_product.handle,'_bid':`emix${bid}`,'_bundle_type':"bundle builder",'_type':'child','_products':productIds};
      items.push(masterObj);
    }
    
    if(selectedBag){
      bagObj['id'] = selectedBag.id;
      bagObj['quantity'] = 1;
      bagObj.properties = childProperties;
      items.push(bagObj);
    }
    selectedItems.map(product=>{
        let productObj = {};
        let {currentVariant} = product;
        productObj['id'] = currentVariant.id;
        productObj['quantity'] = 1;
        productObj.properties = childProperties;
        items.push(productObj);
    })
    const form = {items};

    try{

      gtag('event', "bundle_add_to_cart", {
        'event_category': "Bundle add to cart",
        'bundle_type': "essential mix",
        'event_label': "Routine",
        'value': `${masterProductID}`
      });
    }catch(e){
  
    }
    addToCart({form:form,callback:()=>{
      window.location.href = '/?cart=open';
    }});
  }
  
  render() {
    let {settings, activeProduct, currentProduct, addItem} = this.props;
    let { activeStep, discount } = settings;
    let { selectedItems,selectedBag,comparePrice,mainPrice,localItems,localBag} = this.props;
    
    let count = getTotalProducts(selectedItems);
    let updateBtnShow = false;
    if(JSON.stringify(selectedItems) != JSON.stringify(localItems)){
      updateBtnShow = true;
    }
    if(JSON.stringify(localBag) != JSON.stringify(selectedBag)){
        updateBtnShow = true;
    }
    let buttonText = "ADD THIS PRODUCT";
    if (activeProduct) {
      let alreadyAdded = checkProductAlreadyAdded(this.props);
      if(alreadyAdded){
        buttonText = "ADDED";
      }
    }
    return (
          <div className="footer-actions">
            <MediaQuery query="tablet-and-up"><>
            {activeStep === 1 && currentProduct &&(
              <>
              {!currentProduct.type_bag ? 
              <button className={`button btn-checkout`} onClick={this.goTOBagStep}>
                Next Step
              </button>
              :
                <button className="button btn-checkout" onClick={this.reviewSet} >
                  Checkout
                </button>
              }
              </>
            )}</>
            </MediaQuery>
            <MediaQuery query="phone"><>
            {activeStep === 1 && currentProduct &&(
              <>
            {!currentProduct.type_bag ? 
            <>
                <button className="button btn-add-product" onClick={this.selectItem}>
                {buttonText}
                </button>
                <button className={`button btn-select-bag`} onClick={this.goTOBagStep}>
                  Next
                </button>
            </>
            :
              <>
                <button className="button btn-add-product" onClick={this.selectItem}>
                {buttonText}
                </button>
                <button className="button btn-checkout" onClick={this.reviewSet} >
                  Checkout
                </button>
                </>
              }</>)}</>
            </MediaQuery>
            
            {activeStep === 3 && (
              <>
                <button className={`button btn-update-cart ${updateBtnShow ? '' : ' hide'}`} onClick={this.updateSelection}>
                  {this.state.updateButtonLoading ? 'UPDATNG...' : 'UPDATE SELECTION'}
                </button>
                {count < maxProducts && 
                <button className={`button btn-add-to-cart ${this.state.addtoCartBundleLoading ? ' loading' :''}`} onClick={()=>{changeStep(1,settings,addItem)}} >
                  ADD MORE PRODUCTS 
                </button>}
                <button id="essential-mix-add-to-cart" className={`button btn-checkout ${this.state.addtoCartBundleLoading ? ' loading' :''}`} onClick={this.addToCartBundle} >
                  Checkout 
                  {count >= minProductsToDiscount && discount && <span className="compare-price-wrap">{formatMoney(comparePrice)}</span> }
                  <span className="main-price-wrap"> {formatMoney(mainPrice)}</span>
                </button>
              </>
            )}
          </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.global.settings,
  activeProduct: state.global.activeProduct,
  currentProduct: state.global.currentProduct,
  selectedItems: state.global.selectedItems,
  selectedBag: state.global.selectedBag,
  localItems: state.global.localItems,
  localBag: state.global.localBag
});
const mapDispatchToProps = (dispatch) => ({
  addSelectedItem: (settings) => dispatch(addSelectedItem(settings)),
  addToCart : data => dispatch(addToCart(data)),
  setCurrentCollection: (collection) => dispatch(setCurrentCollection(collection)),
  addItem: (settings) => dispatch(addItem(settings)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FooterButtonAction);
