import React from "react";
import { formatMoney } from "../../components/Helper";
import VariantSelector from "../../components/VariantSelector";
import Srcset from "../../components/Srcset";

class FreeGiftItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVariant: null,
    };
  }
  componentDidMount() {
    let product = this.props.product;
    this.setState({
      currentVariant: product.selected_or_first_available_variant,
    });
  }
  updateVariant = (currentVariant) => {
    this.setState({ currentVariant });
  };
  render() {
    if (cn(this.state.currentVariant)) {
      return null;
    }
    let product = this.props.product;
    let { currentVariant } = this.state;
    let image = product.image;
    let title = product.title;
    let alt = product.title;
    if (!cn(currentVariant)) {
      if (!cn(currentVariant.featured_image)) {
        image = currentVariant.featured_image.src;
        alt = currentVariant.title;
      }
    }
    let defaultVariant = false;
    if(product.variants.length === 1){
      if(product.variants[0].title == 'Default Title'){
        defaultVariant = true;
      }
    }
    return (
      <div className="free-gift-item">
        <div className="img">
          <Srcset src={image} alt={alt} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="title">{title}</h3>
          {/* 'Color' option selector */}
          {defaultVariant === false && <>
          <div className="swatches-wrapper">
            {/* {this.renderShades(product.data.variants)} */}
            {product.options.map((option, index) => {
              return (
                <ul key={index} className={`swatch-wrap`}>
                  {product.variants.map((variant) => {
                    return (
                      <VariantSelector
                        key={variant.id}
                        option={option}
                        selectedVariant={currentVariant}
                        variant={variant}
                        setSelectedVariant={this.updateVariant}
                      />
                    );
                  })}
                </ul>
              );
            })}
          </div></>}
          {this.props.eligible ? 
          <button onClick={()=> this.props.addTocart(currentVariant.id)} className={`add-btn ${this.props.checkFreeGiftAlreadyExist ? ' free-gift-exist':''}`}>Add</button>
          :
          <button className={`add-btn not-eligible`}>Add</button>
          }
        </div>
      </div>
    );
  }
}

export default FreeGiftItem;
