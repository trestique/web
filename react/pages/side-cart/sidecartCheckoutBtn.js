import React from 'react';

class SideCartCheckoutBtn extends React.Component {

 handleCheckout = (e) => {
    e.preventDefault();
    if (window.blackCart?.isTBYBQualifiedCart) {
        window.blackCart?.goToBlackcartCheckout();
    }
    else {
      window.location.href = '/checkout';
    }
}

 render() {
  return (
   <div className='side-cart-checkout-btn'>
    <button className='side-cart-btn' onClick={(e) => this.handleCheckout(e)}>
     Checkout
    </button>
   </div>
  );
 }
}

export default SideCartCheckoutBtn;
