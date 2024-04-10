

import React from "react";
import {connect} from 'react-redux';
import Srcset from "../../components/Srcset";
import VariantSelector from "../../components/VariantSelector";
import {setEditCartItem,updateEditItem} from '../../redux/cart/cartAction';
import {
  getVariantSwatchImg,
  getVariantImg,
  getCurrentVariant,
  formatMoney,
  showToast
} from "../../components/Helper";
class EditCartBundleItem extends React.Component {
  state = {
    update: false,
    currentVariant: null,
    quantity : 1,
    btnLoading: false
  };
  setCurrentVariant = () => {
    const { item } = this.props;
    const {  currentVariant } = item;
    this.setState({ currentVariant });
  };
  updateVariant = currentVariant =>{
    // check same product variant exist.
    //If in bundle same product is more then 2 times then we are not allowing cutomer to select same variant of both product
    const { item } = this.props;
    const {id} = item;
    const sameItem = this.props.items.find((cartItem)=> id == cartItem.id);
    let canUpdate = true;
    if(!cn(sameItem)){
      if(sameItem){
        if(sameItem.currentVariant.id === currentVariant.id){
          canUpdate = false;
        }
      }
    }
    if(canUpdate){
      this.setState({ currentVariant },()=>{
        this.props.updateItem(currentVariant,this.props.index);
      });
    }else{
      showToast(`Oops you have already selected this variant in your bundle`);
    }
  }
  componentDidMount() {
    this.setCurrentVariant();
  }
  render() {
    const { item } = this.props;
    const {currentVariant} = this.state;
    if(cn(currentVariant)){
      return null;
    }
    const { featured_image, price,id } = currentVariant;
    let src = "";
    if(!cn(featured_image)){
      src = featured_image.src;
    }else{
      if(item.featured_image){
        src = item.featured_image.src;
      }
    }
    return (
        <div className="product-data">
        <div className="flex-view-xs space">
          <div className="col-xs-4 col-sm-4">
            <div className="img">
              <Srcset src={src} />
            </div>
          </div>
          <div className="col-xs-8 col-sm-8">
            <div className="details">
              <h3 className="product-title">{item.title}</h3>
              <p className="variant-title">{currentVariant.title}</p>
              <div className={`variants-wrapper`}>
                {item.options.map((option, index) => {
                  return (
                    <ul key={index} className={`swatch-wrap`}>
                      {item.variants.map((variant) => {
                        return (
                          <VariantSelector
                            key={variant.id}
                            option={option}
                            selectedVariant={currentVariant}
                            variant={variant}
                            variantImages={item.variantImages}
                            setSelectedVariant={this.updateVariant}
                          />
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
              {
                item?.selected_selling_plan && <p className="selected-selling-plan">{ item.selected_selling_plan.name }</p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


  const mapDispatchToProps = dispatch => {
    return {
        setEditCartItem: value => dispatch(setEditCartItem(value)),
        updateEditItem: data => dispatch(updateEditItem(data))
    };
   };
export default connect(null,mapDispatchToProps)(EditCartBundleItem);