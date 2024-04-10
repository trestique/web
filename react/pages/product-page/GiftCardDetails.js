import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import VariantSelector from '../../components/VariantSelector';
import ProductSubscribe from './ProductSubscribe';
import ProductService from './ProductService';
import ProductTabs from '../../components/ProductTabs';
import {updateVariant} from '../../redux/product-page/productAction';
import { formatMoney, miniCartOpen } from '../../components/Helper';
import {addToCart} from '../../redux/cart/cartAction';
import Srcset from '../../components/Srcset';

class GiftCardDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        planType: "one-time",
        selling_plan : ""
    }
  }



  updateVariant = (currentVariant) => {
    // Update event for bag variants change
    this.props.updateVariant(currentVariant);
  };

  addToCartProcess = () =>{
    let form = {};
    let {currentVariant} = this.props;
    form = { id: currentVariant.id, quantity: 1 };
    this.addToCart(form);
  }
  addToCart = form =>{
    this.props.addToCart({form,callback:()=>{
      miniCartOpen();
    }});
  }

  render() {
    let {product,currentVariant,settings} = this.props;
    let {title,short_info,productReview,info,variants,options} = product;
    let variantTitle = currentVariant.title;
    let variantInfo  = "";
    let {gift_suggestion_enable,suggestionProduct,gift_product_title} = settings;
    return (
      <div className="react-product-details">
        <h2 className="product-title">{title}</h2>
        <div className="product-review">{ReactHtmlParser(productReview)}</div>
        <div className="short-info">{ReactHtmlParser(short_info)}</div>
        <div className="variants-details">
          {options.map((option)=>{
              let optionType = "normal";
              if(option == "Color" || option == "color" || option == "Colour" || option == "colour"){
                optionType = 'color'
              }
              
              return <><h3 className="option-name">{option}</h3> <ul className={`swatch-wrap swatch-type-${optionType}`}>
              {variants.map((variant) => {
                return (
                  <VariantSelector
                    key={variant.id}
                    option={option}
                    selectedVariant={currentVariant}
                    variant={variant}
                    changeUrl={true}
                    setSelectedVariant={this.updateVariant}
                  />
                );
              })}
            </ul></>
          })}
        </div>
          {!currentVariant.available ?  
            <button className="test gift-cart-add-to-cart add-to-cart disabled soldout" disabled>
            <span className="text">Soldout</span>
            </button>
          : 
            <button className="test gift-cart-add-to-cart add-to-cart" onClick={this.addToCartProcess}>
            <span className="text">send as a gift</span>
            </button>
          }
        <ProductService settings={settings} />
        <ProductTabs settings={settings} />
        {suggestionProduct.length > 0 && gift_suggestion_enable && 
        <>
        <div className="gift-suggestion-product">
            <h3 className="gift-suggest-title">{ReactHtmlParser(gift_product_title)}</h3>
            <ul className="gift-product-items">
                {suggestionProduct.map((sugeestionProduct)=>{
                    return <li className="product-item">
                        <div className="img">
                          <a href={`/products/${sugeestionProduct.handle}`}>
                              <Srcset src={sugeestionProduct.featured_image} alt={sugeestionProduct.title} />
                          </a>
                        </div>
                        <h3 className="suggest-product-title"><a href={`/products/${sugeestionProduct.handle}`}>{sugeestionProduct.title}</a></h3>
                    </li>
                })}
            </ul>
        </div>
        </>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  product: state.product.product,
  currentVariant: state.product.currentVariant,
  settings: state.product.settings,
});

const mapDispatchToProps = dispatch => {
  return {
    updateVariant: variant => dispatch(updateVariant(variant)),
    addToCart: data => dispatch(addToCart(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftCardDetails);