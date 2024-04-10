import React from "react";
import { connect } from "react-redux";
import Srcset from "../../components/Srcset";
import VariantSelector from "../../components/VariantSelector";
import { Spinner } from "../../components/Form";
import { setEditCartItem, updateEditItem } from "../../redux/cart/cartAction";
import ItemLoader from './ItemLoader';
import {
  getVariantSwatchImg,
  getVariantImg,
  getCurrentVariant,
  formatMoney,
} from "../../components/Helper";
class EditCartProduct extends React.Component {
  state = {
    currenrVariant: null,
    quantity: 1,
    btnLoading: false,
    sellingPlan:{},
    currentPlan : null
  };
  setCurrentVariant = () => {
    const { editItemData } = this.props;
    const { product, id, quantity,selected_selling_plan } = editItemData;
    const { variants } = product;
    const currenrVariant = getCurrentVariant(variants, id);
    this.setState({ currenrVariant, quantity, currentPlan:selected_selling_plan });
  };
  updateVariant = (currenrVariant) => {
    this.setState({ currenrVariant });
  };
  componentDidMount() {
    this.setCurrentVariant();
  }
  changeQty = (qty) => {
    this.setState({ quantity: qty });
  };
  updateProduct = () => {
    this.setState({ btnLoading: true }, () => {
      const { currenrVariant, quantity,currentPlan } = this.state;
      const { editItemData, updateEditItem } = this.props;
      const {selected_selling_plan,index} = editItemData;
      let oldId = editItemData.id;
      let id = currenrVariant.id;
      if (oldId == id && JSON.stringify(currentPlan) == JSON.stringify(selected_selling_plan)) {
        // If only quanity updated
        let qtyArray = this.props.cart.items.map((item, item_index) => {
          if (item_index === index) {
            return quantity
          }
          return item.quantity;
        });
        let oldData = { updates: qtyArray };
        updateEditItem({
          type: "qty_update",
          oldData,
          callback: () => {
            this.setState({ btnLoading: false });
          },
        });
      } else {
        // If item updated
        let qtyArray = this.props.cart.items.map((item, item_index) => {
          if (item_index === index) {
            return 0
          }
          return item.quantity;
        });
        let oldData = { updates: qtyArray };
        let newData = { id: id, quantity: quantity };
        if(!cn(currentPlan)){
          newData['selling_plan'] = currentPlan.id;
        }
        updateEditItem({
          type: "item_update",
          oldData,
          newData,
          callback: () => {
            this.setState({ btnLoading: false });
          },
        });
      }
    });
  };
  updateSubscription = (e) =>{
    const { editItemData } = this.props;
    const { product } = editItemData;
    const {selling_plans} = product;
    const sellingPlan = selling_plans[`${this.state.currenrVariant.id}`];
    let target = e.target;
    let id = parseInt(target.value);
    let currentPlan = sellingPlan.find((plan)=> plan.id == id);
    if(currentPlan){
      this.setState({currentPlan});
    }
  }
  render() {
    const { editItemData } = this.props;
    const { currenrVariant, quantity, btnLoading,currentPlan  } = this.state;
    if (cn(currenrVariant)) {
      return (
        <div className="edit-cart-item">
          <ItemLoader />
        </div>
      );
    }
    const { product,selected_selling_plan } = editItemData;
    const {selling_plans} = product;
    const { title, featured_image, price, id } = currenrVariant;
    let src = "";
    if (!cn(featured_image)) {
      src = featured_image.src;
    } else {
      if (product.featured_image) {
        src = product.featured_image.src;
      }
    }
    const sellingPlan = selling_plans[`${currenrVariant.id}`];
    console.log(sellingPlan);
    return (
      <div className="edit-cart-item">
        <div className="product-data">
        <div className="main-title-wrap">
          <h3 className="main-title">
            {product.title}
            <span className="price">{formatMoney(price)}</span>
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
            <div className="item">
              <div className="flex-view-xs space">
                <div className="col-xs-4 col-sm-4">
                  <div className="img">
                    <Srcset src={src} />
                  </div>
                </div>
                <div className="col-xs-8 col-sm-8">
                  <div className="details">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="variant-title">{currenrVariant.title}</p>
                    <div className={`variants-wrapper`}>
                      {product.options.map((option, index) => {
                        return (
                          <ul key={index} className={`swatch-wrap`}>
                            {product.variants.map((variant) => {
                              return (
                                <VariantSelector
                                  key={variant.id}
                                  option={option}
                                  selectedVariant={currenrVariant}
                                  variant={variant}
                                  variantImages={product.variantImages}
                                  setSelectedVariant={this.updateVariant}
                                />
                              );
                            })}
                          </ul>
                        );
                      })}
                    </div>
                    {sellingPlan.length > 0 && !cn(currentPlan) && 
                      <select className="subscription-details" value={currentPlan.id} onChange={(e)=> this.updateSubscription(e)}>
                      {sellingPlan.map((item)=> <option key={item.id} value={item.id}>{item.name}</option>)}
                      </select>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-qty-data">
          <div className="flex-view-xs">
            <Spinner
              label="Quantity"
              name="updates[]"
              value={quantity}
              callbackFun={this.changeQty}
            />
            {quantity != editItemData.quantity || id != editItemData.id ||  JSON.stringify(currentPlan) != JSON.stringify(selected_selling_plan) ? (
              <button
                onClick={this.updateProduct}
                className={`button button--primary ${
                  btnLoading ? " loading" : ""
                }`}
              >
                Update Selection - {formatMoney(quantity * price)}
              </button>
            ) : (
              <button disabled className="button button--primary disabled">
                Update Selection - {formatMoney(quantity * price)}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEditCartItem: (value) => dispatch(setEditCartItem(value)),
    updateEditItem: (data) => dispatch(updateEditItem(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCartProduct);
