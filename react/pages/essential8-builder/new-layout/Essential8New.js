import React, { createRef } from "react";
import ImageSlider from "./ImageSlider";
import Essential8Service from "../Essential8Services";
import ProductName from "./ProductName";

import EssenatialNewItems from "./EssenatialNewItems";
import ProductBenifits from "./ProductBenifits";
import ReviewSlider from "./ReviewSlider";

import ProductDescription from "./ProductDescription";
import { formatMoney } from "../../../components/Helper";
import MediaQuery from "../../../components/MediaQuery";
import { addToCart, setLoader, setSelectAllItemsError, updateUpsellProducts } from "../../../redux/essential8/essentialAction";
import { connect } from "react-redux";
import ProductTabs from "../../../components/ProductTabs";
import EssentialAccordion from "../EssentialAccordion";
import HalfImages from "./HalfImages";
import FullImages from "./FullImages";
class Essential8New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenIndex: -1,
      optionsArray: [],
      itemNotSelected: "",
    };
  }

  componentDidMount() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.scrollY;
    const buttonElement = document.querySelector('.es8-new-layout-form');
    if(!buttonElement){
      return;
    }
    const formPassed = buttonElement.offsetTop + buttonElement.clientHeight + 50;
    const btn = document.querySelector('.product-es8-details-add-to-cart-btn-wrapper')
    if (scrollY > formPassed) {
      if(btn){
        btn.classList.add('active')
      }
    } else {
      if(btn){
        btn.classList.remove('active')
      }
    }
  }



  checkAddToCart = (e) => {
    e.preventDefault();
    const { sectionData, selectedItems, setSelectAllItemsError } = this.props;
    const {selectable_products} = sectionData;
    let selectableItemsLength = selectable_products.length;
    if (selectedItems.length !== selectableItemsLength) {
      /* All items are not selected */
      setSelectAllItemsError(true);
      for (let index = 0; index < selectable_products.length; index++) {
        let handle = selectable_products[index]?.productData?.handle;
        const foundObject = selectedItems.find((item) => item.handle === handle);
        if (!foundObject) {
          this.setState({ itemNotSelected: handle });
          document.getElementById(index).scrollIntoView({ behavior: "smooth" });
          break;
        }
      }
      return;
    }

    this.handleAddToCart();
  };
  /* Add to cart */
  handleAddToCart = (sellingPlan = false) => {
    const {
      sectionData,
      selectedItems,
      setSelectAllItemsError,
      addToCart,
      setLoader,
      upsellProducts,
    } = this.props;

    let selectableItemsLength = sectionData.selectable_products.length;
    let btnAction = sectionData.settings?.btn_action;
    if (selectedItems.length !== selectableItemsLength) {
      /* All items are not selected */
      setSelectAllItemsError(true);
      return;
    }

    /* Saga for add to cart */
    /* Set loading */
    setLoader(true);
    this.setState({ ...this.state, showSubscriptionPopup: false });

    let allProducts = sectionData.selectable_products;
    let allProductIds = [];
    let upsellProductsList = [];
    selectedItems.map((selectedItem, idx) => {
      let obj = {
        id: selectedItem.id,
        pos: idx + 1,
      };
      if (sellingPlan) {
        const sellingplanHandle = sellingPlan[selectedItem.handle];
        if (sellingplanHandle) {
          obj["selling_plan"] = +sellingplanHandle;
        }
      }
      allProductIds.push({ ...obj });
    });
    /* preselected Product ids */
    upsellProducts.map((upsellProduct, idx) => {
      if (upsellProduct.selected) {
        const obj = {
          id: parseInt(upsellProduct.selected_variant.id),
          pos: idx,
        };
        upsellProductsList.push(obj);
      }
    });

    // this.setState({ showTytb: false });
    addToCart({
      bundleType: sectionData.bundle_type,
      baseProduct: sectionData.base_product,
      allProducts,
      allProductIds,
      upsellProductsList,
      btnAction:btnAction
    });
  };

  checkShadeSelected = () => {
    this.setState({ itemNotSelected: "" });
  };


  checkBundleAvaiable = () => {
    const { sectionData } = this.props;
    let bundleSoldOut = false;
    if (sectionData.base_product) {
      if (!sectionData.base_product.available) {
        bundleSoldOut = true;
      }
    }
    this.props.sectionData.selectable_products.map((item) => {
      if (!item.productData.available) {
        bundleSoldOut = true;
      }
    });
    return bundleSoldOut;
  };

  render() {
    const {sectionData, upsellProducts} = this.props
    if(!sectionData){
      return null;
    }
    const {
      base_product,
      base_review,
      settings,
      services,
      benifits,
      benifits2,
      reviews,
      selectable_products,
      half_images,
      full_images
    } = sectionData;

    
    let bundleSoldOut = this.checkBundleAvaiable();
    const {btn_width, btn_font_size, btn_font_size_xs, add_to_cart_text, add_to_cart_text_color, add_to_cart_bg_color, soldout_text, soldout_text_color, soldout_bg_color, show_price_on_button} = settings;
    const addToCartStyle = {
      background: add_to_cart_bg_color,
      color:add_to_cart_text_color,
      borderColor:add_to_cart_bg_color,
      fontSize: window.innerWidth <= 767 ? btn_font_size_xs : btn_font_size,
      width: window.innerWidth <= 767 ? '100%' : `${btn_width}%`,
    }
    const soldOutStyle = {
      background: soldout_bg_color,
      color:soldout_text_color,
      borderColor:soldout_bg_color,
      fontSize: window.innerWidth <= 767 ? btn_font_size_xs : btn_font_size,
      width: window.innerWidth <= 767 ? '100%' : `${btn_width}%`,
    }
    return (
      <div
        className="
      essential-8-new-layout"
      >
        {settings.mobile_title_position == 'above_image' && 
        <ProductName base_review={base_review} query={"phone-and-tablet"} settings={settings} base_product={base_product} />
        }

        <div className="layout-left">
          <div className="image-slider">
            <ImageSlider />
          </div>
          {settings.mobile_title_position == 'bottom_image' && 
            <ProductName removePadding={true} topSpace={true} base_review={base_review} query={"phone-and-tablet"} settings={settings} base_product={base_product} />
          }
          <ProductBenifits benifits={benifits} />

          <MediaQuery query="lap-and-up">
            <ProductTabs settings={sectionData} />
            <div className="product-features">
              <Essential8Service settings={{ services: services }} />
            </div>
            <ReviewSlider reviews={reviews || []} />
            {half_images?.length > 0 && <HalfImages half_image={half_images}/>}
            {full_images?.length > 0 && <FullImages full_image={full_images} />}
           
          </MediaQuery>
          

        </div>

        <div className="product-es8-details">
          <div className="product-es8-details-text">
            <ProductName  base_review={base_review} query={"lap-and-up"} settings={settings} base_product={base_product} />
           
            <ProductDescription settings={settings} />
          </div>
          <div className="product-es8-details-display">
            <h4 className="choose-your-shade-title xs-show">CHOOSE YOUR SHADES</h4>
            {selectable_products.map((selectable_product, key) => {
              return (
                <EssenatialNewItems
                  product={selectable_product}
                  key={key}
                  index={key}
                  lastProduct={selectable_products.length - 1 === key}
                  hanldeNotSelected={this.state.itemNotSelected}
                  checkShadeSelected={this.checkShadeSelected}
                  id={key.toString()}
                 
                />
              );
            })}
            <EssentialAccordion />
          </div>
          <form
          onSubmit={(e) => this.checkAddToCart(e)}
          method="post"
          action="/cart/add"
          className="es8-new-layout-form"
          id={`product-form-template--${base_product.id}__main`}
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          noValidate="novalidate"
          data-type="add-to-cart-form"
        >
          <div  className={`product-es8-details-add-to-cart-btn-wrapper ${upsellProducts.length > 0 && ' upsell-exit' }`}>
            {bundleSoldOut ? (
              <div className="sold-out" style={soldOutStyle}>{soldout_text}</div>
            ) : (
              <button
              type="submit" style={addToCartStyle}
                className="add-to-cart-button"
              >
                {add_to_cart_text}
                {show_price_on_button && base_product?.price
                  && <span className="add-to-cart-button-price">{formatMoney(base_product?.price)}</span>}
              </button>
            )}
          </div>
          </form>
        </div>
        <MediaQuery query="phone-and-tablet">
          <div className="layout-left">
            <ProductBenifits benifits={benifits2} />
            <ProductTabs settings={sectionData} />
            <ReviewSlider reviews={reviews || []} />
            {half_images?.length > 0 && <HalfImages half_image={half_images}/>}
            {full_images?.length > 0 && <FullImages full_image={full_images} />}
          </div>
        </MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sectionData: state.essential_8.sectionData,
  upsellProducts: state.essential_8.sectionData.upsell_products,
  selectedItems: state.essential_8.selectedItems,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectAllItemsError: (data) => dispatch(setSelectAllItemsError(data)),
  addToCart: (data) => dispatch(addToCart(data)),
  setLoader: (data) => dispatch(setLoader(data)),
  updateUpsellProducts: (data) => dispatch(updateUpsellProducts(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Essential8New);

// componentDidMount() {
//   let optionsArray = [];
//   const selectable_products =
//   selectable_products.forEach((element, index) => {
//     let options = {};
//       options.mainImage = element?.productData?.featured_image;
//       options.title = element?.productData?.title;
//       options.count = index + 1;
//       options.productLevelText =
//         "A medium-coverage & buildable refillable foundation with a smooth, cake-free finish.";
//       let variant = {
//         mainImage: element?.productData?.variants[index]?.featured_image?.src,
//         text: element?.metaData?.info[
//           element?.productData?.variants[index]?.title
//         ],
//       };

//       options.variant = variant;
//       optionsArray.push(options);
//   }
// }
