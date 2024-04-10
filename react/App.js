import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SideCart from './pages/side-cart/SideCart';
import PaymentOption from "./components/PaymentOption";
import SideCartSubscriptionPopup from "./components/SideCartSubscriptionPopup";
import Quiz from './pages/quiz/Quiz';
import ShopByLook from './pages/shop-by-look/ShopByLook';
// import {initBlackcart} from './BlackCartInit';
import {clearCart} from './redux/cart/cartAction';
import SubscriptionCollection from './pages/Subscription-collection-list/SubscriptionCollection';
import ProductIdentifier from './components/ProductIdentifier';
class App extends Component {
  state = {
    blackCart : null
  }
  handleCartChange = (cart) => {
    if (!this.state.blackCart) {
      return;
    }
    // Inform Blackcart of the changes
    this.state.blackCart?.setCart(cart);
  };


  render() {
    
    return (
      <>
        <PaymentOption/>
        <SideCartSubscriptionPopup/>
        <div className='black-bg'>
        </div>
        {simply.sideCart.type == 'react-cart' && <SideCart handleCartChange={this.handleCartChange} />}
        <main className='main-react-content'>
        <Switch>
          <Route path="*/collections/makeup-refills" component={SubscriptionCollection} />
          <Route path="*/pages/routine-finder" component={Quiz} />
          <Route path='*/products/:productHandle' component={ProductIdentifier} />
          <Route path='*/pages/shop-by-looks' component={ShopByLook} />
        </Switch>
        </main>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(clearCart()),
  };
 };
export default connect(null,mapDispatchToProps)(App);