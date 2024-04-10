import React from "react";
import { connect } from "react-redux";

/* Custom Components Import */
import Srcset from "../../components/Srcset";
import { handleize } from "../../components/Helper";
import { filePath } from "../../settings";

/* Actions */
import {
  addChildProduct,
  setSelectAllItemsError,
} from "../../redux/essential8/essentialAction";

class ChildProduct extends React.Component {
  state = {
    selectedShade: undefined,
    variantInfo: undefined,
  };

  componentDidMount() {
    // if (window.location.pathname !== "/products/the-essential-5-basics-starter-kit") return
    const { product, selectedItems } = this.props;
    const { metadata } = product;
    const selectedProduct = selectedItems.find(
      (item) => item.handle === product.productData.handle
    );
    if (selectedProduct) {
      const id = selectedProduct.id;
      const variant = product.productData.variants.find(
        (variant) => variant.id === id
      );
      if (variant) {
        let isAvailable = variant.available;
        let variant_info = "";
        if (metadata.info) {
          variant_info = metadata.info[variant.title];
        }
        this.setState(() => ({
          selectedShade: variant.title,
          variantInfo: isAvailable
            ? variant_info
            : "This Variant is Out of Stock !",
        }));
      }
    }
  }

  /* Update State shade & store it in redux */
  updateShade = (variant) => {
    const { product, selectedItems, addChildProduct, setSelectAllItemsError } =
      this.props;
    const { metadata } = product;

    let productHandle = product.productData.handle;

    let obj = {
      handle: productHandle,
      id: variant.id,
    };

    let isAvailable = variant.available;
    let variant_info = "";
    if (metadata.info) {
      variant_info = metadata.info[variant.title];
    }
    this.setState(
      () => ({
        selectedShade: variant.title,
        variantInfo: isAvailable
          ? variant_info
          : "This Variant is Out of Stock !",
      }),
      () => {
        if (!isAvailable) {
          return;
        }
        let variantExist = false;
        /* Check if variant already exists in selectedItems */
        let updatedItems = selectedItems.map((selectedItem) => {
          if (selectedItem.handle === productHandle) {
            /* Mutate that object with updated one */
            variantExist = true;
            return obj;
          }

          return selectedItem;
        });

        /* if variant doesnt exist push it in the Array */
        if (!variantExist) {
          updatedItems.push(obj);
        }

        addChildProduct(updatedItems);

        /* Change Error state in redux */
        setSelectAllItemsError(false);
      }
    );
  };

  /* Get Selected Swatch Image */
  getVariantSwatchImage = () => {
    const { product } = this.props;

    return product.productData.variants.find(
      (variant) => variant.title === this.state.selectedShade
    ).featured_image.src;
  };

  /* Render Swatches for the products */
  renderShades = (variants) => {
    let { selectedShade } = this.state;

    return variants.map((variant, i) => (
      <div
        key={variant.title + "_" + i}
        className={`color-swatch${
          selectedShade === variant.title ? " active" : ""
        } ${!variant.available && " out_of_stock"}`}
        data-handle={handleize(variant.title)}
        onClick={() => this.updateShade(variant)}
      >
        <Srcset
          alt={variant.title}
          src={filePath + handleize(variant.title) + ".png"}
          className="swatch-image"
        />
      </div>
    ));
  };

  render() {
    const { product, index, lastProduct, selectedItemsError, sectionData } =
      this.props;

    if (!product) {
      return <div></div>;
    }

    const { productData } = product;
    const { type } = productData;
    return (
      <div className="product-container" key={index}>
        <div className="product-item">
          <div className="col-sm-2 col-xs-5">
            <div className="product-image ">
              <img
                src={
                  this.state.selectedShade
                    ? this.getVariantSwatchImage()
                    : productData.featured_image
                }
              />
            </div>
          </div>
          <div className="col-sm-6 col-xs-7">
            <div className="product-info">
              <h4 className="child-product-title">
                {index + 1 + " ."} {productData.title}
              </h4>
              {type == "Bag" && (
                <div className="variant-title">{this.state.variantInfo}</div>
              )}
              <div className="variant-title">{this.state.selectedShade}</div>
              <div className="swatches-wrapper ">
                {this.renderShades(productData.variants)}
              </div>
              {type != "Bag" && (
                <div className="variant-info">{this.state.variantInfo}</div>
              )}
              {selectedItemsError && !this.state.selectedShade && (
                <div className="error-message ">
                  {type == "Bag" ? (
                    <p>{sectionData.settings.error_bag_text}</p>
                  ) : (
                    <p>{sectionData.settings.error_text}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sectionData: state.essential_8.sectionData,
  selectedItems: state.essential_8.selectedItems,
  selectedItemsError: state.essential_8.selectedItemsError,
});

/* Action Dispatchers */
const mapDispatchToProps = (dispatch) => ({
  addChildProduct: (data) => dispatch(addChildProduct(data)),
  setSelectAllItemsError: (data) => dispatch(setSelectAllItemsError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildProduct);
