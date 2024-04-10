import React, { useState, useEffect } from "react";
import Srcset from "../../components/Srcset";
import { formatMoney, generateUniqueId } from "../../components/Helper";
import {addToCart} from '../../redux/cart/cartAction';

class ProductBuyTogether extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comboProductVariants: [],
      variantsIds: [],
      allVariantsAvailable: true,
    };
  }

  handleBuyTogether = () =>{
    const { settings, addToCart, currentVariant, product } = this.props;
    const { comboProduct, combo_product_title } = settings;
    let selectedVariants = [];
    let variantsIds = [];
    let allVariantsAvailable = true;
    if (!currentVariant.available) {
      allVariantsAvailable = false;
    }
    comboProduct.map((item,i) => {
      let variant = item.variants.find(
        (variant) => variant.title == currentVariant.title
      );
      if (variant) {
        variant["product_title"] = item.title;
        selectedVariants.push(variant);
        if (variantsIds.length <= 0 && variant.available) {
          variantsIds.push(`${variant.id}-${i}`);
        }
        if (!variant.available) {
          allVariantsAvailable = false;
        }
      }
    });
    this.setState({
      comboProductVariants: selectedVariants,
      allVariantsAvailable,
      variantsIds,
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps.currentVariant.id != this.props.currentVariant.id){
      this.handleBuyTogether();
    }
  }
  componentDidMount() {
    this.handleBuyTogether();
  }
  updateComboProducts = (vid) => {
    let items = [...this.state.variantsIds];
    let findItem = items.indexOf(vid);
    if (findItem > -1) {
      items.splice(findItem, 1);
    } else {
      items.push(vid);
    }
    this.setState({ variantsIds: items });
  };
  addToCart = () => {
    const { currentVariant } = this.props;
    let { variantsIds, allVariantsAvailable } = this.state;

    if (variantsIds.length <= 0 || !allVariantsAvailable) {
      return;
    }
    let gid = `_bundle_${generateUniqueId()}`;
    let items = [
      {
        quantity: 1,
        id: currentVariant.id,
        properties: {
          _bougth_together: gid,
          _bought_type: "master",
          _products: variantsIds.toString()
        },
      },
    ];
    variantsIds.map((item,i) => {
      let id = item.split('-');
      id = id[0];
      items.push({
        quantity: 1,
        id,
        properties: {
          _bougth_together: gid,
          _bought_type: "child",
          _pos: i
        },
      });
    });
    let form = { items: items };
    this.props.addToCart(form);
  };
  render() {
    const { settings, currentVariant, product } = this.props;
    const { comboProduct, combo_product_title, combo_enable } = settings;
    let { variantsIds, comboProductVariants, allVariantsAvailable } =
      this.state;
    if (comboProduct.length < 0) {
      return null;
    }
    if (comboProductVariants.length < 0) {
      return null;
    }
    let totalPrice = currentVariant.price;
    comboProductVariants.map((item,i) => {
      if (variantsIds.includes(`${item.id}-${i}`)) {
        totalPrice += item.price;
      }
    });
    if(totalPrice > 0){
      let discount = (totalPrice * 10) / 100;
      totalPrice = totalPrice - discount;
    }
    let selectedNumber = "One";
    if (variantsIds.length === 1) {
      selectedNumber = "Two";
    } else if (variantsIds.length === 2) {
      selectedNumber = "Three";
    }
    if(!combo_enable){
      return null;
    }
    return (
      <div className="product-buy-together">
        {combo_product_title && (
          <h3 className="main-title">{combo_product_title}</h3>
        )}
        <div className="product-buy-together-details">
          <ul className="items">
            <li className="item">
              <div className="img">
                {allVariantsAvailable && (
                  <div className="check-mark active">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#fff"
                        d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                      />
                    </svg>
                  </div>
                )}
                {currentVariant.featured_image && (
                  <Srcset src={currentVariant.featured_image.src} />
                )}
              </div>
              <h3 className="combo-product-title">{product.title}</h3>
            </li>
            {comboProductVariants.map((item,i) => {
              return (
                <li
                  className="item"
                  key={i}
                  onClick={() => this.updateComboProducts(`${item.id}-${i}`)}
                >
                  <div className="img">
                    <div className="check-mark" >
                      {variantsIds.includes(`${item.id}-${i}`) && allVariantsAvailable ? 
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#fff"
                            d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                          />
                        </svg>
                        :<p className="select-text">Select</p>
                      }
                      
                    </div>
                    {item.featured_image && (
                      <Srcset src={item.featured_image.src} />
                    )}
                  </div>
                  <h3 className="combo-product-title">{item.product_title}</h3>
                </li>
              );
            })}
          </ul>
          <div className="total-prices">
            <div className="price-wrap">
              <h3 className="price">Total Price : {formatMoney(totalPrice)}</h3>
            </div>
            {allVariantsAvailable ? (
              <>
                {selectedNumber === "One" ? (
                  <button className="buy-together-btn">Select REFILLS</button>
                ) : (
                  <button className="buy-together-btn" onClick={this.addToCart}>
                    Add all {selectedNumber} to cart
                  </button>
                )}
              </>
            ) : (
              <button className="buy-together-btn" disabled>
                Soldout
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

  
  export default ProductBuyTogether;