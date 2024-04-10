import React, { forwardRef } from "react";
import { connect } from "react-redux";

/* Custom Components Import */
import Srcset from "../../../components/Srcset";
import { handleize } from "../../../components/Helper";
import { filePath } from "../../../settings";

// Actions
import {
  addChildProduct,
  setSelectAllItemsError,
} from "../../../redux/essential8/essentialAction";
import MediaQuery from "../../../components/MediaQuery";

class EssenatialNewItems extends React.Component {
  state = {
    selectedShade: undefined,
    variantInfo: undefined,
    productLevelInfo: undefined,
    selectedVariantSrc: undefined,
    isColorDropdownOpen: false,
  };
  selectRef = React.createRef();

  handleClickOutside = (event) => {
    if (this.selectRef.current && !this.selectRef.current.contains(event.target)) {
      this.setState((prevState) => ({
        isColorDropdownOpen: false,
      }));
    }
  };
  componentDidMount() {
    // if (window.location.pathname !== "/products/the-essential-5-basics-starter-kit") return
    const { product, selectedItems } = this.props;
    const { metadata } = product;

    this.setState(() => ({
      productLevelInfo: metadata?.short_info,
      selectedVariantSrc:
        filePath + handleize(product.productData.variants[0].title) + ".png",
    }));

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
    document.addEventListener('click', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }


  /* Update State shade & store it in redux */
  updateShade = (variant) => {
    const {
      product,
      selectedItems,
      addChildProduct,
      setSelectAllItemsError,
      checkShadeSelected,
    } = this.props;
    const { metadata } = product;

    let productHandle = product.productData.handle;
    console.log("Inside updateshade", productHandle);

    let obj = {
      handle: productHandle,
      id: variant.id,
    };

    let isAvailable = variant.available;
    let variant_info = "";
    if (metadata.info) {
      variant_info = metadata.info[variant.title];
    }
    let indexOfSelectedShade = product.productData.variants.findIndex(
      (obj) => obj?.title === variant.title
    );
    console.log("updatee", indexOfSelectedShade);
    this.setState(
      () => ({
        selectedShade: variant.title,
        selectedVariantSrc: filePath + handleize(variant.title) + ".png",
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

    checkShadeSelected(productHandle);

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
        className={`color-swatch${selectedShade === variant.title ? " active" : ""
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

  // Handle the Color Swatches on from dropdown
  handleSwatchColorDropdown = () => {
    this.setState((prevState) => ({
      isColorDropdownOpen: !prevState.isColorDropdownOpen,
    }));
  };

  render() {
    const {
      product,
      index,
      hanldeNotSelected,
      id,
      selectedItems
    } = this.props;

    if (!product) {
      return <div></div>;
    }
    const { productData, number } = product;
    const { type } = productData;

    const isShadeSelected = selectedItems && selectedItems.find(item => item.handle === productData?.handle)

    return (
      <div id={id} className="product-es8-details-display-product" key={index}>
        <MediaQuery query="lap-and-up">
          <div className="product-display-image">
            <img
              src={
                this.state.selectedShade
                  ? this.getVariantSwatchImage()
                  : productData.featured_image
              }
            />
          </div>
        </MediaQuery>
        <div className="product-display-details">
          <div className="product-display-name">
            <div className="product-display-name-index">
              {number}
            </div>
            <div
              className={`product-display-name-indexValue`}
            >
              <span>{productData?.title}</span>
            </div>
          </div>
          <MediaQuery query="phone-and-tablet">
            <div className="product-display-image">
              <img
                src={
                  this.state.selectedShade
                    ? this.getVariantSwatchImage()
                    : productData.featured_image
                }
              />
            </div>
          </MediaQuery>
          <MediaQuery query="lap-and-up">
          <div className="product-display-options">
            <div className="product-display-options-zoomedImage">
              <img src={this.state.selectedVariantSrc} />
            </div>
            <div className="swatches-wrapper ">
              {this.renderShades(productData.variants)}
            </div>
            <div className="product-display-options-detail">
              <div className="product-display-option-detail-text">
                {this.state.variantInfo
                  ? <>
                  <h4 className="selected-variant-name">{this.state.selectedShade}</h4>
                  {this.state.variantInfo}
                  </>
                  : <>
                  <h4 className="selected-variant-name">{this.state.selectedShade}</h4>
                  {this.state.productLevelInfo}
                  </>}
              </div>
            </div>
          </div>
          </MediaQuery>
          <MediaQuery query="phone-and-tablet">
            <div className="product-display-options">
              <div className="product-display-options-zoomedImage">
                <img src={this.state.selectedVariantSrc} />
              </div>
              <div className="swatches-wrapper" ref={this.selectRef}>
                <div
                  className={`swatches-dropdown ${
                    this.state.isColorDropdownOpen && ""
                  }`}
                  
                >
                  <div onClick={this.handleSwatchColorDropdown}>
                  {isShadeSelected ? this.state.selectedShade : "Select your shade"} 
                  <span
                    className={`dropdown-arrow ${
                      this.state.isColorDropdownOpen && "active"
                    }`}
                  >
                    <svg
                      width="15"
                      height="7"
                      viewBox="0 0 15 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.30497 0.612626L14.1988 6.51776L0.411131 6.51776L7.30497 0.612626Z"
                        fill="#00263A"
                      />
                    </svg>
                  </span>
                  </div>
                  
                  {this.state.isColorDropdownOpen && (
                    <div className="dropdown-options">
                      {this.renderShades(productData.variants)}
                    </div>
                  )}
                </div>
              </div>
              <div className="product-display-options-detail">
                <div className="product-display-option-detail-text">
                  {this.state.variantInfo
                    ?
                    <>
                    <h4 className="selected-variant-name">{this.state.selectedShade}</h4>
                    {this.state.variantInfo}
                    </>
                    : this.state.productLevelInfo }
                </div>
              </div>
            </div>
        </MediaQuery>
          {hanldeNotSelected === productData?.handle && (
            <div className="select-your-shade-error">Please select your shade</div>
          )}
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
  addToCart: (data) => dispatch(addToCart(data)),
  addChildProduct: (data) => dispatch(addChildProduct(data)),
  setSelectAllItemsError: (data) => dispatch(setSelectAllItemsError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EssenatialNewItems);

// import { useEffect, useState } from "react";
// import React from "react";
// import Srcset from "../../../components/Srcset";
// import { handleize } from "../../../components/Helper";
// import { filePath } from "../../../settings";

// const EssentialNewItems = (props) => {
//   const { products } = props;
//   const [featuredImage, setFeaturedImage] = useState("");
//   const [selectedShade, setSelectedShade] = useState("");

//   const RenderShades = ({ variants }) => {
//     return variants.map((variant, i) => (
//       <div
//         key={variant.title + "_" + i}
//         className={`color-swatch${
//           selectedShade === variant.title ? " active" : ""
//         } ${!variant.available && " out_of_stock"}`}
//         data-handle={handleize(variant.title)}
//         // onClick={() => this.updateShade(variant)}
//       >
//         <Srcset
//           alt={variant.title}
//           src={filePath + handleize(variant.title) + ".png"}
//           className="swatch-image"
//         />
//       </div>
//     ));
//   };

//   console.log("ggg", props);
//   return (
//     <div>
//       {products.map((item, idx) => {
//         const { productData } = item;
//         return (
//           <div className="product-es8-details-display-product">
//             <div className="product-display-image">
//               <img
//                 src={featuredImage ? featuredImage : productData.featured_image}
//                 alt="Product Image"
//               />
//             </div>
//             <div className="product-display-details">
//               <div className="product-display-name">
//                 <div className="product-display-name-index">{idx + 1}.</div>
//                 <div
//                   className={`product-display-name-indexValue ${
//                     idx === 0 && "fullWidth"
//                   }`}
//                 >
//                   {productData?.title}
//                 </div>
//               </div>
//               <div className="product-display-options">
//                 <div className="product-display-options-image"></div>
//                 <div className="swatches-wrapper">
//                   <RenderShades variants={productData.variants} />
//                 </div>
//                 <div className="product-display-options-detail">
//                   <div className="product-display-option-detail-text">
//                     A medium-coverage & buildable refillable foundation with a
//                     smooth, cake-free finish.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default EssentialNewItems;
