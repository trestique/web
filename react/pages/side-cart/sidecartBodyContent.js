import React, { Component } from 'react';
import SideCartImageText from './SideCartImageText';
import CartItem from './CartItem';
// import Loader from '../loader/loader';
import FreeMini from './FreeMini';
import BestSeller from './BestSeller';
import SubscriptionRefill from './SubscriptionRefill';
class SideCartBodyContent extends Component {
 render() {
  const { cartData } = this.props;
  const loading = cartData.loading;
  const cartItems = cartData.cart;
  // if (loading) {
  //     return <Loader />;
  // }
  if (cartItems.item_count === 0) {
   return (
    <div className='mini-cart-data'>
     <div className='empty-cart-msg'>Your cart is empty</div>
    </div>
   );
  }
  let es6Found = cartItems?.items.find((item)=> item?.properties['_bundle_type'] == "essential 6" && item?.properties['_type'] == 'master')
  return (
   <div className='mini-cart-data'>
    <form>
     <input type='hidden' name='update' value='' />
     <div className='cart-data'>
      {cartItems.items.map((item, index) => (
       <CartItem cartItems={cartItems.items} item={item} key={`${item.id}-${index}`} index={index} />
      ))}
     </div>
    </form>
    <FreeMini />
    {!es6Found && <SubscriptionRefill />}
    <BestSeller />
   </div>
  );
 }
}

export default SideCartBodyContent;
