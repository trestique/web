import React from "react";
import VariantSelector from "../../components/VariantSelector";
import Srcset from "../../components/Srcset";
import { formatMoney } from "../../components/Helper";
class UpsellProductItem extends React.Component {
  findImage = () => {
    const { product } = this.props;
    const { selected_variant, productData } = product;
    let image = productData.featured_image;
    let variant = selected_variant;
    if (variant) {
      if (variant.featured_image?.src) {
        image = variant.featured_image?.src;
      }
    }
    return image;
  };
  updateVariant = (i, currentVariant) => {
    const { upsellProducts, updateUpsellProducts } = this.props;
    const newUpsellProducts = upsellProducts.map((item, key) => {
      if (key == i) {
        item["selected_variant"] = currentVariant;
      }
      return item;
    });
    updateUpsellProducts(newUpsellProducts);
  };
  selectProduct = (value, i) => {
    console.log("add to cart", value, i);
    const { upsellProducts, updateUpsellProducts } = this.props;
    const newUpsellProducts = upsellProducts.map((item, key) => {
      if (key == i) {
        item["selected"] = value;
      }
      return item;
    });
    updateUpsellProducts(newUpsellProducts);
  };

  render() {
    const { product, upsell_discount, index } = this.props;
    const { selected_variant, productData, metadata, selected } = product;
    const price = selected_variant.price;
    let comparePrice = (price * upsell_discount) / 100;
    comparePrice = price - comparePrice;
    let info = "";
    if (metadata.info) {
      info = metadata?.info[selected_variant.title];
    }
    return (
      <div className="child-product">
        <Srcset src={this.findImage()} />
        <div className="product-details">
          <h3 className="product-title">{productData.title}</h3>
          <p className="variant-title hide">{selected_variant.title}</p>
          {info && <p className="variant-info">{info}</p>}
        </div>
        <ul className={`swatch-wrap`}>
          {productData.variants.map((variant, key) => {
            return (
              <VariantSelector
                key={variant.id}
                option={"color"}
                selectedVariant={selected_variant}
                variant={variant}
                setSelectedVariant={(variant) =>
                  this.updateVariant(index, variant)
                }
              />
            );
          })}
        </ul>
        {selected ? (
          <button
            onClick={() => this.selectProduct(false, index)}
            className="select-upsell-btn selected"
          >
            Selected <span className="compare-price">{formatMoney(price)}</span>{" "}
            <span className="price">{formatMoney(comparePrice)}</span>
          </button>
        ) : (
          <button
            onClick={() => this.selectProduct(true, index)}
            className="select-upsell-btn"
          >
            Select <span className="compare-price">{formatMoney(price)}</span>{" "}
            <span className="price">{formatMoney(comparePrice)}</span>
          </button>
        )}
      </div>
    );
  }
}
export default UpsellProductItem;
