import React, { Component } from "react";
import { connect } from "react-redux";
import {setQuizFormData,changeQuizStep,setQuizLoading} from '../../../redux/quiz/quizAction';
import Loader from '../../../components/Loader';
import EssentialQuizProduct from './EssentialQuizProduct';
import {formatMoney,generateUniqueId,showToast,miniCartOpen,readCookie} from '../../../components/Helper';
import {addToCart} from '../../../redux/cart/cartAction';
import {  Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
class EssentialQuizStep6 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  removeItem = (id) =>{
    const {formData,setQuizFormData,changeQuizStep} = this.props;
    let {selectedBag,resultProducts} = formData;
    resultProducts = resultProducts.filter((product)=> product.id != id);
    formData['resultProducts'] = resultProducts;
    setQuizFormData(formData);
    if(resultProducts.length < 11 && selectedBag.type == "large"){
      changeQuizStep(8);
    }
  }
  removeBag = () =>{
    const {formData,setQuizFormData,changeQuizStep} = this.props;
    let {selectedBag} = formData;
    formData['selectedBag'] = null;
    setQuizFormData(formData);
    // changeQuizStep(8);
  }
  getPrice = () =>{
    const {resultProducts,selectedBag} = this.props;
    let price = 0;
    resultProducts.map((product)=>{
      let {currentVariant} = product;
      price = price + currentVariant.price;
    });
    if(!cn(selectedBag)){
      price = price + selectedBag.currentVariant.price;
    }
    return price;
  }
  normalProductsAddToCart = () =>{
    const {resultProducts,selectedBag} = this.props;
    let items = [];
    resultProducts.map(product=>{
      let productObj = {};
      let {currentVariant} = product;
      productObj['id'] = currentVariant.id;
      productObj['quantity'] = 1;
      items.push(productObj);
    });
    if(!cn(selectedBag)){
      let productObj = {};
      let {currentVariant} = selectedBag;
      productObj['id'] = currentVariant.id;
      productObj['quantity'] = 1;
      items.push(productObj);
    }
    const form = {items};
    this.props.addToCart({form:form,callback:()=>{
      this.clearQuiz();
      miniCartOpen();
    }});
  }
  addTocart = () =>{
    const {resultProducts,setQuizLoading,selectedBag} = this.props;
    let productsCount = resultProducts.length;
    if(productsCount <= 0){
      return;
    }
    if(!cn(selectedBag)){
      productsCount = productsCount + 1;
    }
    if(productsCount < 4){
      // If products counts less than 4 then products will added as a normal
      this.normalProductsAddToCart();
    }else{
      // If products counts greater than 4 then products will added as a Bundle
      setQuizLoading(true);
      this.makeBundleProcess();
    }
  }
  makeBundleProcess = () =>{
    const {resultProducts,selectedBag,settings,setQuizFormData} = this.props;
    const {masterProduct} = settings;
    let bid = generateUniqueId();
    let items = [];

    // Matser product data
    let masterId = masterProduct.variants[0].id;
    let masterHandle = masterProduct.handle;
    let masterObj = {id:masterId,quantity:1};

    // Bag product Data
    let bagId,bagObj = {};
    let productIds = '';
    resultProducts.map(product =>{
      if(cn(productIds)){
        productIds = `${product.currentVariant.id}`;
      }else{
        productIds = `${productIds},${product.currentVariant.id}`;
      }
    });
    productIds = `${productIds}`;
    if(!cn(selectedBag)){
      bagId = selectedBag.currentVariant.id;
      bagObj = {id:bagId,quantity:1};  
      productIds = `${productIds},${bagId}`;
    }
    let bundleType = 'essential 8';
    if(window.location.pathname == '/products/essential-6'){
      bundleType = "essential 6";
    };
    if(window.location.pathname == '/products/the-essential-5-basics-starter-kit'){
      bundleType = "essential 5";
    }
    
    let childProperties = {'_master_handle': masterHandle,'_bid':`es8_${bid}`,'_bundle_type':bundleType,'_type':'child','_products':productIds};

    resultProducts.map(product=>{
        let productObj = {};
        let {currentVariant} = product;
        productObj['id'] = currentVariant.id;
        productObj['quantity'] = 1;
        productObj.properties = childProperties;
        items.push(productObj);
    });
    masterObj.properties ={'_bid':`es8_${bid}`,'_bundle_type':bundleType,'_type':'master','_products':productIds};
    if(window.location.pathname == '/products/essential-6'){
      masterObj['isTBYB'] = true;
    };
    bagObj.properties = childProperties;
    items.push(masterObj);
    if(!cn(selectedBag)){
      items.push(bagObj);
    }
    const form = {items};
    this.props.addToCart({form:form,callback:()=>{
      this.clearQuiz();
      miniCartOpen();

      // //call back for close popup
      this.props.closeEssentialQuiz();
    }});
  }
  clearQuiz = () =>{
    // Clear quiz and go to step 1 
    const {setQuizLoading,changeQuizStep,setQuizFormData} = this.props;
    changeQuizStep(1);
    setQuizFormData({
        selectedProducts:[],
        skinType: "Light",
        skinTone : "",
        crayons : [],
        lips:[],
        eyeBrow: '',
        fromEmail: false,
        makeup: [],
        askedUserData: false
    });
    setQuizLoading(false);
  }
  goToBack = () =>{
      const {currentQuizStep} = this.props;
      this.props.changeQuizStep(currentQuizStep - 1);
  }
  render() {
    const {settings,resultProducts,selectedBag} = this.props;
    let products = resultProducts;
    let productsCount = products?.length || 0;
    let originalPrice = products ? this.getPrice() : 0;
    let price = originalPrice;
    if(!cn(selectedBag)){
      productsCount = productsCount + 1;
    }
    if(productsCount > 3){
      price = originalPrice  - ((originalPrice*15)/100);
    }
    let {screen_6_title,screen_6_bag_text} = settings;
    
    return (
      <div className={`essential-quiz-step-6 essential-shade-quiz-main`}>
        <div className="essential-shade-quiz-main-details">
        <span className="close-quiz">
          <img className='back-arrow' onClick={this.goToBack} src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector_5_53276ce9-7b50-424f-ab51-1b2b25e4acfe.png?v=1661772655" alt="back-arrow" />
          <img className='close-icon'  onClick={this.props.closeEssentialQuiz} src="//cdn.shopify.com/s/files/1/0114/0621/3220/files/side-cart-close-icon.svg?v=8501096318584868990" alt="close" />
        </span>
          {
            screen_6_title ? 
            <div className="title-wrap">
              {screen_6_title ? <h2 className="screen-2-title">{screen_6_title}</h2> : null }
              {screen_6_bag_text ? <span className="screen-2-subtitle">{screen_6_bag_text}</span> : null }
          </div> : null
          }

            {this.props.loader && <Loader show={true}/> }
            <div className="products">
                {products && 
                <Swiper className="step-4-main-slider" breakpoints={{ 768: { slidesPerView: 5.5 }}} mousewheel={true} modules={[Mousewheel]}  slidesPerView={2.2}>
                {products.map((product,index) => {
                    return <SwiperSlide key={index}><EssentialQuizProduct key={index} productsCount={productsCount} removeItem={this.removeItem} index={product.id} product={product} hideVariantTitle={true}/></SwiperSlide>
                })}
                {!cn(selectedBag) && <SwiperSlide><EssentialQuizProduct productsCount={productsCount} removeItem={this.removeBag} index={selectedBag.id} product={selectedBag} hideVariantTitle={true}/></SwiperSlide>}
                </Swiper>}
            </div>
            <div className="review-bottom-bar">
                <div className="flex-view-xs center middle">
                    <button className="start-over btn" onClick={this.goToBack}>BACK</button>
                    <button onClick={this.addTocart} className="add-to-cart btn">ADD TO CART</button>
                </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    currentQuizStep: state.quiz.currentQuizStep,
    formData:state.quiz.formData,
    resultProducts: state.quiz.formData.resultProducts,
    settings : state.quiz.settings,
    selectedBag: state.quiz.formData.selectedBag,
    loader: state.quiz.loader
});
const mapDispatchToProps = (dispatch) => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
    setQuizFormData: data => dispatch(setQuizFormData(data)),
    setQuizLoading: value=> dispatch(setQuizLoading(value)),
    addToCart: data => dispatch(addToCart(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(EssentialQuizStep6);
