import React from "react";
import { connect } from "react-redux";
import Srcset from "../../components/Srcset";
import VariantSelector from "../../components/VariantSelector";
import { setEditCartItem, updateEditItem } from "../../redux/cart/cartAction";
import EditCartBundleItem from "./EditCartBundleItem";
import {
  getVariantSwatchImg,
  getVariantImg,
  getCurrentVariant,
  formatMoney,
} from "../../components/Helper";

class EditCartBundle extends React.Component {
  state = {
    items: [],
    price: 0,
    btnLoading: false,
    initialItems: [],
  };
  componentDidMount() {
    const { editBundleData } = this.props;
    let { masterProduct } = editBundleData;
    const products = editBundleData.products.slice();
    let bundlePrice = masterProduct.price;
    if(masterProduct.handle == "the-essential-mix"){
      products.map((item)=>{
        bundlePrice = bundlePrice + item.currentVariant.price
      });
        bundlePrice = bundlePrice - (bundlePrice * 15 / 100) ;
    }
    this.setState({ items: products.slice(),initialItems: products.slice(),price:bundlePrice });
  }
  updateItem = (currentVariant,index) =>{
      let items = [...this.state.items];
      let item = {...items[index]};
      item.currentVariant = currentVariant
      items[index] = item;
      this.setState({items});
  }
  updateProduct = () =>{
    let oldData = {};
    let newData = [];
    let {initialItems,items} = this.state;
    this.setState({btnLoading:true},()=>{
      for(let i = 0;i<initialItems.length;i++){
        let initialItem = initialItems[i];
        let item = items[i];
        if(initialItem.id == item.id){
            if(initialItem.currentVariant.id != item.currentVariant.id){
              oldData[`${initialItem.currentVariant.id}`] = 0;
              let obj = {
                id:item.currentVariant.id,
                properties: item.properties,
                quantity: 1
              }
              const sellingPlan = item.selected_selling_plan
              if(typeof sellingPlan === "object") {
                obj['selling_plan'] = sellingPlan.id
              }
              newData.push(obj);
            }
          }
      }
      // Updating items of bundle
      this.props.updateEditItem({
        type: "item_update",
        oldData:{updates:oldData},
        newData:{items:newData},
        callback: () => {
          this.setState({ btnLoading: false });
        },
      });
    })
  }
  render() {
    const { editBundleData } = this.props;
    let { masterProduct } = editBundleData;
    const { btnLoading,items,initialItems,price } = this.state;
    
    return (
      <div className="edit-cart-item edit-cart-item-bundle">
        <div className="product-data">
        <div className="main-title-wrap">
          <h3 className="main-title">
            {masterProduct.title}
            <span className="price">{price > 0 && formatMoney(price)}</span>
            <span
              className="close-edit-cart-icon"
              onClick={() => {
                document.querySelector('.side-cart-wrap').classList.remove('overflow-hidden');
                this.props.setEditCartItem(false);
              }}
            >
              <img src={simply.sideCart.closeIcon} alt="close cart" />
            </span>
          </h3>
          </div>
          <div className="items">
            {items.map((item,index) => (
              <EditCartBundleItem items={items} index={index} key={item.id} item={item} updateItem={this.updateItem} />
            ))}
          </div>
        </div>
        <div className="product-qty-data">
          <div className="flex-view-xs">
            {(JSON.stringify(initialItems) != JSON.stringify(items)) ? (
              // When user updates variants
              <button
                onClick={this.updateProduct}
                className={`button button--primary ${
                  btnLoading ? " loading" : ""
                }`}
              >
                Update Selection - {price > 0 && formatMoney(price)}
              </button>
            ) : (
              <button disabled className="button button--primary disabled">
                Update Selection - {price > 0 && formatMoney(price)}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEditCartItem: (value) => dispatch(setEditCartItem(value)),
    updateEditItem: (data) => dispatch(updateEditItem(data)),
  };
};
export default connect(null, mapDispatchToProps)(EditCartBundle);
