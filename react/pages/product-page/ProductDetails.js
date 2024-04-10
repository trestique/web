import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import ProductSubscribe from './ProductSubscribe';
import ProductService from './ProductService';
import ProductTabs from '../../components/ProductTabs';
import ProductBuyTogether from './ProductBuyTogether';
import { miniCartOpen } from '../../components/Helper';
import {addToCart} from '../../redux/cart/cartAction';
import MobileBottomBar from "./MobileBottomBar";
import MediaQuery from "../../components/MediaQuery";
import ProductReviewSlider from "../../components/ProductReviewSlider";
import VariantDetails from './VariantDetails';
import ProductButtons from './ProductButtons';
import ProductSubscriptionPopup from './ProductSubscriptionPopup';
import TytbPopup from '../../components/TytbPopup';

class ProductDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        planType: "one-time",
        selling_plan : "",
        sellingPlanError: false,
        quantity:1,
        showTytb: false
    }
  }

  changePlan = planType =>{
    this.setState({planType})
  }
  changeSubscription = (e) =>{
    let selling_plan = e.target.value;
    this.setState({selling_plan})
  }

  setSellingPlans = () => {
    let { product, currentVariant } = this.props;
    let { selling_plan_groups, oneTimeDisable } = product;
    let selling_plans = [];
    if(selling_plan_groups[0]){
      selling_plans = selling_plan_groups[0].selling_plans;
      if(!cn(oneTimeDisable[currentVariant.id])){
        this.setState({selling_plan:true,planType:'subscribe'});
      }else{
        this.setState({selling_plan:selling_plans[0].id});
      }
    }
  }
  callBack = (currentVariant) => {
    let { product } = this.props;
    let { selling_plan_groups, subscriptionShow } = product;
    let hideSubscription = false;
    if (subscriptionShow[currentVariant.id] == "false") {
      hideSubscription = true;
    }
    if(cn(selling_plan_groups) || hideSubscription == true){
      this.setState({planType:'one-time',selling_plan:""});
      return null;
    } else { 
      this.setSellingPlans();
    }
  }

  componentDidMount() {
    let { product, currentVariant } = this.props;
    let { selling_plan_groups, subscriptionShow } = product;
    let hideSubscription = false;

    if (subscriptionShow[currentVariant.id] == "false") {
      hideSubscription = true;
    }
    if(cn(selling_plan_groups) || hideSubscription == true){
      this.setState({planType:'one-time'});
      return null;
    }
    this.setSellingPlans();
  }

  addToCartProcess = () =>{
    let {selling_plan,planType,quantity} = this.state;
    let form = {};
    let {currentVariant, cart} = this.props;
    form = { id: currentVariant.id, quantity: quantity };
    if(planType == "subscribe"){
      if(!cn(selling_plan)){
        if(typeof this.state.selling_plan === "boolean") {
          this.setState({sellingPlanError: true}, () => {
            setTimeout(() => {
              this.setState({sellingPlanError: false})
            }, 1500)
          })
          return
        } 
        form['selling_plan'] = selling_plan;
      }
      form['quantity'] = 1;
      let es6Found = cart?.cart?.items?.length > 0 ? cart?.cart?.items.find((item)=> item?.properties['_bundle_type'] == "essential 6" && item?.properties['_type'] == 'master') : null;
      if(es6Found){
        this.setState({showTytb: true});
        return;
      }
    }
    this.addToCart(form);
  }
  addToCart = form =>{
    this.props.addToCart({form,callback:()=>{
      miniCartOpen();
    }});
  }
  changeQty = (qty) => {
    this.setState({ quantity: qty });
  };
  render() {
    
    let {product,currentVariant,settings} = this.props;
    let {title,productReview, variantMeta} = product;
    let { quantity, planType, selling_plan,showTytb, sellingPlanError } = this.state;
    let productPrice = currentVariant.price;
    if(selling_plan && planType == "subscribe"){
      currentVariant.selling_plan_allocations.map(item=>{
        if(item.selling_plan_id === Number(selling_plan)){
          productPrice = item.price;
        }
      })
    }
    return (
      <div className={`react-product-details ${planType === "subscribe" ? 'subscribe-product': ''}`}>
        <h2 className="product-title">{title}</h2>
        <div className="product-review">{ReactHtmlParser(productReview)}</div>
          <VariantDetails callBack={this.callBack} changePlan={this.changePlan} />
          
          <ProductSubscribe sellingPlanError={sellingPlanError} settings={settings} currentVariant={currentVariant} planType={planType} selling_plan={selling_plan} product={product} changePlan={this.changePlan} changeSubscription={this.changeSubscription}/>
          <ProductService  planType={planType} settings={settings} />
          <MediaQuery query="tablet-and-up">
            <ProductButtons addToCartProcess={this.addToCartProcess} selling_plan={selling_plan} quantity={quantity} planType={planType} currentVariant={currentVariant} changeQty={this.changeQty}/>
          </MediaQuery>
          <ProductTabs variantMeta={variantMeta} currentVariant={currentVariant} settings={settings}/>
          <ProductBuyTogether addToCart={this.addToCart} product={product} currentVariant={currentVariant} settings={settings} />
          <MediaQuery query="phone">
            <MobileBottomBar productPrice={productPrice} quantity={quantity} changeQty={this.changeQty} addToCartProcess={this.addToCartProcess} settings={settings} currentVariant={currentVariant} planType={planType} selling_plan={selling_plan} product={product} changePlan={this.changePlan} changeSubscription={this.changeSubscription} />
            <ProductReviewSlider settings={settings} />
          </MediaQuery>
          <ProductSubscriptionPopup settings={settings}/>
          {showTytb && <TytbPopup item={title} closePopup={()=>{this.setState({showTytb:false})}} inform={true} msg={'To order auto-refill items, a new order must be placed. You will not lose the free shipping offer.'}/>}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  product: state.product.product,
  currentVariant: state.product.currentVariant,
  settings: state.product.settings,
  cart: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    addToCart: data => dispatch(addToCart(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);