import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { updateCart } from '../../shopify/CartApi';
import { formatMoney } from '../../components/Helper';
import { Spinner } from '../../components/Form';
import Srcset from '../../components/Srcset';
import { updateCart, fetchEditItemData } from '../../redux/cart/cartAction';
import SubscriptionProductsNote from '../../components/SubscriptionProductsNote';
class CartItem extends Component {
  getQtyArray = (qty) => {
    const { index } = this.props;
    let cartData = this.props.cart;
    let items = cartData.cart.items;
    let qtyArray = [];
    const { item } = this.props;
    if(item.item_type == 'normal'){
      // remove normal item
      qtyArray = items.map((cartItem, item_index) => {
        if (item_index === index) {
          return qty
        }
        return cartItem.quantity;
      });
    }else{
      // Remove bundle
      qtyArray = items.map((cartItem, item_index) => {
        if (item.properties['_bid'] === cartItem.properties['_bid']) {
          return qty
        }
        return item.quantity;
      });
    }
    return qtyArray;
  }
  removeItem = () => {
    let qtyArray = this.getQtyArray(0);
    qtyArray = {updates: qtyArray}
    this.props.updateCart(qtyArray);
  }
  changeQty = qty => {
    if (qty === 0) {
      let qtyArray = this.getQtyArray(0);
      qtyArray = {updates: qtyArray}
      this.props.updateCart(qtyArray);
    } else {
      let qtyArray = this.getQtyArray(qty);
      qtyArray = {updates: qtyArray}
      this.props.updateCart(qtyArray);
    }
  }
  editItem = () =>{
    document.querySelector('.side-cart-wrap').classList.add('overflow-hidden');
    const { index, item,fetchEditItemData,cartItems } = this.props;
    let {handle,variant_id,quantity,item_type}  = item;
    let data = {};
    if(item_type == "normal"){
      let {selected_selling_plan} = item;
      data = { quantity,handle,type:item_type,variant_id,selected_selling_plan:selected_selling_plan,index }
    }else{
      data = {bid:item.properties['_bid'],handle,type:item_type }
    }
    fetchEditItemData(data);
  }

  render() {
    const { item,cartItems } = this.props;
    let { key, variant_id, product_title, variant_title, url, image, original_line_price, compare_at_price, line_price, quantity,item_type,variants_length,selected_selling_plan, handle } = item;
    let showSpinner = true;
    if(item_type == 'bundle-child'){
      return null;
    }
    let canEdit = false;
    if(variants_length > 1 || item_type == 'bundle-master'){
      canEdit = true;
    }
    if(item.properties){
      if(item.properties['_bundle_type']== "bundle builder" || item.properties['_bundle_name']== "essential 8"){
        if(item.properties['_type']== "master"){
          let bid = item.properties['_bid'];
          cartItems.map((cartItem)=>{
            if(cartItem.properties){
              if(cartItem.properties['_bid'] == bid){
                line_price = line_price + cartItem.line_price;
                original_line_price = original_line_price + cartItem.original_line_price;
              }
            }
          });
        }
      }
    }
    let freeMini = false;
    if(item.properties['_free_mini']){
      freeMini= true;
      canEdit = false;
    }
    let freeGift = item.properties?._free_gift || item.properties?._free_set
    let esUpsell = item?.properties['_upsell_bid']
    return (
      <div data-vid={variant_id} className="cart-item" data-product-type={item.product_type}>
            <div className="cart-item-image img">
              <a href={url} className="cart-image">
                <img alt={product_title} src={image} className='lazyload' />
              </a>
            </div>

              <div className="text-wrap">
                <div className="cart-item-name">
                    <a href={url} >
                      {product_title}
                    </a>
                    
                    <div className="price-wrapper">
                      {compare_at_price > line_price &&
                    <p className="product-price compare-price">
                      {formatMoney(compare_at_price)}</p>}
                    <p className="product-price original-price">
                    {handle == 'essential-6' && item_type == 'bundle-master' ? '$0'  :  `${formatMoney(line_price)}` }
                    </p>
                    </div>
                    {item.variant_title && item.variant_title != "Default Title" && <span className="variant-title">{item.variant_title}</span>}
                    {handle == 'essential-6' && item_type == 'bundle-master' && <div className='tbyb-label'>TRY Before YOU BUY</div>}
                    {!cn(selected_selling_plan)&& <p className="selected-selling-plan">Auto Refill:Refill Ships {selected_selling_plan.name.replace('Delivery ','')}</p>}
                    {item_type === 'bundle-master' && <SubscriptionProductsNote  id={item.properties._bid} cartItems={cartItems} />}
                </div>
                { !freeGift &&  <div className="details">
                {item_type == 'normal' && !freeMini &&  !esUpsell &&
                <div className='qty-part'>
                    {showSpinner && (
                      <div className="qty-label">
                        <div className='qty'>
                          <Spinner id={`updates-${key}`}
                            label='Quantity'
                            name="updates[]"
                            value={quantity}
                            callbackFun={this.changeQty} 
                          />
                        </div>
                      </div>
                    )}
                </div>}
                <p className="item-remove" onClick={this.removeItem}>
                REMOVE
                </p>
                {canEdit && 
                  <p className="edit-product" onClick={this.editItem}>
                    Edit
                  </p>}
                </div>}
            </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
};
const mapDispatchToProps = dispatch => {
  return {
    setCartStart: () => dispatch(setCartStart()),
    updateCart: qtyArray => dispatch(updateCart(qtyArray)),
    fetchEditItemData: data => dispatch(fetchEditItemData(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
