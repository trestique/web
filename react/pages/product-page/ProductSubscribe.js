import React from "react";
import ReactHtmlParser from "react-html-parser";
import { formatMoney } from "../../components/Helper";
import MediaQuery from "../../components/MediaQuery";

class ProductSubscribe extends React.Component {
  state = {
    xsSubscriptionShow : false
  }
  toggleSubscriptionShow = xsSubscriptionShow =>{
    this.setState({xsSubscriptionShow})
  }
  subscribePriceWrap = (currentSellingPlan) =>{
    return <div className="right-side-wrap pdp-right-price-wrapper">
            {currentSellingPlan.price == currentSellingPlan.compare_at_price ?
            <p className="price-wrap">{formatMoney(currentSellingPlan.price)}</p>        
            :
            <div className="price-wrap">
              <p className="compare-price">{formatMoney(currentSellingPlan.compare_at_price)}</p>
              <p className="sale-price">{formatMoney(currentSellingPlan.price)}</p>
            </div>        
            }
          </div>
  }
  openSubscriptionPopup = () =>{
    if(window.openSubscriptionPopup){
      window.openSubscriptionPopup();
    }
  } 

  handleSubscriptionInput = () => {

  }

  
  render() {
    let {xsSubscriptionShow} = this.state;
    let { product,changePlan,changeSubscription, settings, currentVariant, sellingPlanError } = this.props;
    let { selling_plan_groups, oneTimeDisable } = product;
    let {planType,selling_plan} = this.props; 
    if(!selling_plan){
      return null;
    }
    if(cn(selling_plan_groups)){
        return null;
    }
    let selling_plans = [];
    if(selling_plan_groups[0]){
        selling_plans = selling_plan_groups[0].selling_plans;
    }
    let productPrice = currentVariant.price;
    let currentSellingPlan  =  currentVariant.selling_plan_allocations.find(item=> item.selling_plan_id === Number(selling_plan));
    
    let newSellingPlans = selling_plans.map((item)=>{
      let data = {...item};
      if(data.name === settings.subscription_recommended_selector){
        data.name += " (recommended)";
      }
      return data;
    });

    let sellingPlanValue = ""
    if(!cn(oneTimeDisable[currentVariant.id]) ) {
      newSellingPlans.forEach((item) => {
        if(item.id === selling_plan) {
          sellingPlanValue = item.options[0].value.replace(/\(|\)/g, '')
          return
        }
      })
    }

    return !cn(oneTimeDisable[currentVariant.id]) 
    ? <>
      <div className="purchase-type-wrapper">
        <div className="wrapper">
          <p className="plan-title">
            {settings.subscription_text
              ? settings.subscription_text
              : "Subscribe to save"}
          </p>
          <div className="select-wrapper">
            <p
              onClick={(e) => {
                e.currentTarget.nextElementSibling.classList.toggle("active");
              }}
              className="select-input"
              aria-label="Select Frequency"
            >
              {typeof selling_plan === "boolean"
                ? "Select Frequency"
                : sellingPlanValue}
            </p>
            <div className="options-wrapper">
              {newSellingPlans.map((item) => (
                <p
                  onClick={(e) => {
                    e.currentTarget.parentElement.classList.toggle("active");
                    changeSubscription({ target: { value: item.id } });
                  }}
                  className="option"
                  value={item.id}
                  key={item.id}
                >
                  {item.options[0].value.replace(/\(|\)/g, "")}
                </p>
              ))}
            </div>
          </div>
          <p className="discount-info xs-show">Save 25%</p>
          <p className="extra-info">
            Modify, pause or cancel.{" "}
            <a href="#" onClick={this.openSubscriptionPopup}>
              Learn more.
            </a>
          </p>
          {sellingPlanError && (
            <p className="error-message xs-show">Please select Frequency*</p>
          )}
        </div>
        <div className="discount-info xs-hide">
          <p>Save 25%</p>
        </div>
      </div>
      {sellingPlanError && <p className="error-message xs-hide">Please select Frequency*</p>}
    </>
    : <div className="product-selling-plans">
        <div className={`subscribe-type purchase-type${planType === 'subscribe' ? ' active' : ''}`}>
          {settings.subscription_badge_text && <p className="badge-wrap">{settings.subscription_badge_text}</p>}
          <div className="left-side-label-wrap">
            <div className="label-item">
              <div className="item" onClick={()=>changePlan('subscribe')}>
                <div className="subscribe-radio-wrapper"><span className="outer-circle"><span className="inner-circle"></span></span></div>
                <div className="subscribe-text-wrap" style={{"width": "calc(100% - 32px)"}}>
                  <p className="plan-title">{settings.subscription_text ? settings.subscription_text : "Subscribe to save "}</p>
                  <p className="subscribe-offer xs-hide">{settings.subscription_offer_text ? ReactHtmlParser(settings.subscription_offer_text) : "10% on future refills."}</p>
                  <p className="subscribe-offer xs-show">{settings.subscription_offer_text_xs ? ReactHtmlParser(settings.subscription_offer_text_xs) : "10% on future refills."}<a onClick={()=> this.toggleSubscriptionShow(true)} className="edit-subscribe">(Edit)</a></p>
                </div>
              </div>
              <MediaQuery query="phone">{this.subscribePriceWrap(currentSellingPlan)}</MediaQuery>
              <span onClick={()=> this.toggleSubscriptionShow(false)} className={`close-subscibe-xs${xsSubscriptionShow ? ' active':''}`}><img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Group.png?v=1644486407" /></span>
            </div>
            <div className={`select-box-wrap${xsSubscriptionShow ? ' active':''}`}>
              <select value={selling_plan} className="subscribe-option" onChange={(e)=>{changeSubscription(e)}}>
                {newSellingPlans.map((item)=>{
                  return <option value={item.id} key={item.id}>{item.name}</option>
                })}
              </select>
              <p className="subscribe-info xs-hide">
                {ReactHtmlParser(settings.subscription_offer_info)}
                <a onClick={this.openSubscriptionPopup} className="shipping-info-learn-more">Learn more</a>
              </p>
              <p className="subscribe-info xs-show">
              {ReactHtmlParser(settings.subscription_offer_info_xs)}
              <a onClick={this.openSubscriptionPopup} className="shipping-info-learn-more">Learn more</a>
              </p>
            </div>
          </div>  
          <MediaQuery query="tablet-and-up">
          {this.subscribePriceWrap(currentSellingPlan)}
          </MediaQuery>
        </div>
        <div className={`purchase-type ${planType === 'one-time' ? ' active' : ''}`}>
          
              <div className="left-side-label-wrap">
                <div className="label-item">
                  <p className="item" onClick={()=>changePlan('one-time')}>
                    <div><span className="outer-circle"><span className="inner-circle"></span></span></div>
                    <div style={{"width": "calc(100% - 32px)"}}><span className="plan-title">{settings.one_time_purchase_text ? settings.one_time_purchase_text : "One-time purchase"}</span></div>
                  </p>
                </div>
              </div>
              <div className="right-side-wrap">
                <p className="price-wrap">{formatMoney(productPrice)}</p>        
              </div>
        </div>
      </div>
  }
}

export default ProductSubscribe;
