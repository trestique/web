import React from "react";
import { formatMoney } from "../../components/Helper";
import SideCartCheckoutBtn from "./sidecartCheckoutBtn";
import HtmlParser from "react-html-parser";

class SideCartFooter extends React.Component {
  comparePrice = (items) => {
    let price = 0;
    items.map((data) => {
      let item = data.item;
      price = price + (data.compare_at_price - item.price);
    });
    return price;
  };
  render() {
    const { cartData } = this.props;
    let total_price = 0;
    let original_total_price = 0;
    if (cartData.total_price) {
      total_price = cartData.total_price;
      original_total_price = cartData.original_total_price;
    }
    let shipping_msg = "";
    try {
      shipping_msg = window.pwaSettings.cart.shipping_msg;
    } catch (e) {}
    if (window.reactMode) {
      shipping_msg = "Free shipping on orders above Rs.500 on a cart";
    }
    let { klarnaImg, afterPayImg, installmentText } = simply.sideCart;
    return (
      <div className="footer">
        <div className="footer-details">
          <div className="cart-total-details">
            <h5 className="price-label">
              <span>Subtotal</span>{" "}
              <img
                className="payment-option-popup-open"
                src={simply.informationIcon}
                alt="Information"
              />
            </h5>
            <p className="installment-text">{HtmlParser(installmentText)}</p>
            <div className="installment-pay-wrap">
              <div className="klarna-img">
                <img src={klarnaImg} alt="klarna" />
              </div>
              <div className="afterpay-img">
                <img src={afterPayImg} alt="klarna" />
              </div>
            </div>
          </div>
          <div className="cart-total">
            {original_total_price > total_price && <h5 className="compare-price">{formatMoney(original_total_price)}</h5> }
            <h5 className="price">{formatMoney(total_price)}</h5>
          </div>
        </div>
        <SideCartCheckoutBtn  />
      </div>
    );
  }
}

export default SideCartFooter;
