import React from 'react';
import { connect } from 'react-redux';
import SideCartHeader from './sidecartHeader';
import SideCartBodyContent from './sidecartBodyContent';
import SideCartFooter from './sidecartFooter';
import { setCartStart } from '../../redux/cart/cartAction';
import EmptyCart from './EmptyCart';
import EditCartProduct from './EditCartProduct';
import Loader from '../../components/Loader';
import EditCartBundle from './EditCartBundle';

class SideCartTemplate extends React.Component {
  componentDidMount() {
    this.props.setCartStart();
  }
  componentDidUpdate(prevProps){
    const {cartData} = this.props;
    if(JSON.stringify(cartData.cart) != JSON.stringify(prevProps.cartData.cart)){
      this.props.handleCartChange(cartData.cart);
    }
  }

  render() {
    const {cartData} = this.props;
    const {editItem,editType,editItemData,editBundleData} = cartData;
    let loading = false;
    if(cartData.loading){
      // let sideCart = document.querySelector('.side-cart-wrap');
      // if(sideCart){
      //   if(sideCart.classList.contains('active')){
      //     loading = true;
      //   }
      // }
    }
    return (
      <>
        <Loader show={loading}/>
        <SideCartHeader cartData={cartData} />
        {cartData.cart.item_count > 0 ? (
          <>
          {editItem && !cn(editItemData.product) || editItem && !cn(editBundleData.products) ?
            <> 
            {editType == 'normal' ? <EditCartProduct editItemData={editItemData} />: <EditCartBundle editBundleData={editBundleData} />}
            </>
          :
          <>
          <SideCartBodyContent cartData={cartData}/>
          <SideCartFooter cartData={cartData.cart}/>
          </>}
          </>
        ):(<>
        <EmptyCart cartData={cartData} />
        <SideCartFooter cartData={cartData.cart}/>
        </>)}
        
      </>
    )
  }
}

const mapStateToProps = state => (
  {
    cartData: state.cart
  }
)
const mapDispatchToProps = dispatch => {
  return {
   setCartStart: () => dispatch(setCartStart()),
  };
 };
export default connect(mapStateToProps,mapDispatchToProps)(SideCartTemplate);