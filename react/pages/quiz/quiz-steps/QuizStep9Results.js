import React, { Component } from "react";
import { connect } from "react-redux";
import QuizHeader from './QuizHeader';
import {setQuizFormData,changeQuizStep,setQuizLoading} from '../../../redux/quiz/quizAction';
import Loader from '../../../components/Loader';
import QuizProduct from './QuizProduct';
import {formatMoney,generateUniqueId,showToast,miniCartOpen} from '../../../components/Helper';
import {addToCart} from '../../../redux/cart/cartAction';
class QuizStep9Results extends Component {
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
    productIds = `${productIds},${masterId}`;
    if(!cn(selectedBag)){
      bagId = selectedBag.currentVariant.id;
      bagObj = {id:bagId,quantity:1};  
      productIds = `${productIds},${bagId}`;
    }
    let childProperties = {'_master_handle': masterHandle,"_quiz":"true",'_bid':`emix${bid}`,'_bundle_type':"bundle builder",'_type':'child','_products':productIds};

    resultProducts.map(product=>{
        let productObj = {};
        let {currentVariant} = product;
        productObj['id'] = currentVariant.id;
        productObj['quantity'] = 1;
        productObj.properties = childProperties;
        items.push(productObj);
    });
    masterObj.properties ={'_bid':`emix${bid}`,"_quiz":"true",'_bundle_type':"bundle builder",'_type':'master','_products':productIds};
    bagObj.properties = childProperties;
    items.push(masterObj);
    if(!cn(selectedBag)){
      items.push(bagObj);
    }
    const form = {items};

    try{
      gtag('event', "bundle_add_to_cart", {
        'event_category': "Bundle add to cart",
        "bundle_type": "Quiz builder",
        'event_label': "Routine",
        'value': `${masterId}`
      });
    }catch(e){
  
    }
    this.props.addToCart({form:form,callback:()=>{
      this.clearQuiz();
      miniCartOpen();
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
    let {screen_9_start_over_text,screen_9_add_to_cart_text} = settings;
    return (
        <div className="quiz-review-section">
            {this.props.loader && <Loader show={true}/> }
            <div className="products">
                {products && 
                <div className="flex-view-xs">
                {products.map((product,index) => {
                    return <QuizProduct productsCount={productsCount} removeItem={this.removeItem} index={product.id} product={product}/>
                })}
                {!cn(selectedBag) && <QuizProduct productsCount={productsCount} removeItem={this.removeBag} index={selectedBag.id} product={selectedBag}/>}
                </div>}
            </div>
            <div className="review-bottom-bar">
                <div className="flex-view-xs center middle">
                    <button className="start-over btn" onClick={()=>this.clearQuiz(1)}>{screen_9_start_over_text}</button>
                    {/* {productsCount < 4 ?
                    <p className="text">
                      Just {4 - productsCount } add more products  to save 15%!
                    </p>
                    :
                    <p className="text">
                    You save {formatMoney(originalPrice - price)} by buying these items together
                    </p>
                    } */}
                    
                    <button id="essential-quiz-add-to-cart" onClick={this.addTocart} className="add-to-cart btn">{screen_9_add_to_cart_text} <span className="xs-hide">-</span> {productsCount > 3 && <span className="compare">{formatMoney(originalPrice)}</span>} <span className="price">{formatMoney(price)}</span></button>
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
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
export default connect(mapStateToProps, mapDispatchToProps)(QuizStep9Results);
