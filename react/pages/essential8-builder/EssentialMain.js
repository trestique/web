import React from "react";
import { connect } from "react-redux";
import HtmlParser from "react-html-parser";
import { changeQuizStep } from "../../redux/quiz/quizAction";
import Srcset from "../../components/Srcset";

/* Import Custom Components */
import ChildProducts from "./ChildProducts";
import EssentialAccordion from "./EssentialAccordion";
import { formatMoney } from "../../components/Helper";
import Essential8ExtraData from "./Essential8ExtraData";
import MediaQuery from "../../components/MediaQuery";
import TytbPopup from "../../components/TytbPopup";

/* Action */
import {
  addToCart,
  setSelectAllItemsError,
  setLoader,
} from "../../redux/essential8/essentialAction";
import QuizStep3 from "../quiz/quiz-steps/QuizStep3";
import EssentialQuizTemplate from "./essential-quiz-steps/EssentialQuizTemplate";
import ProductSubscriptionPopupSets from "../product-page/ProductSubscriptionPopupSets";
class EssentialMain extends React.Component {
  state = {
    showMore: false,
    showTytb: false,
    showEssentialQuiz: false,
    showSubscriptionPopup: false,
  };

  handleShowMore = (e) => {
    e.preventDefault();
    this.setState(() => ({ showMore: true }));
  };

  handleShowLess = (e) => {
    e.preventDefault();
    this.setState(() => ({ showMore: false }));
  };

  handlePopup = (e) => {
    this.setState({ ...this.state, showSubscriptionPopup: e });
    if (e) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
  };

  showQuiz = () => {
    this.setState({ showEssentialQuiz: true });
  };
  checkAddToCart = (e) => {
    e.preventDefault();
    const { sectionData, selectedItems, setSelectAllItemsError } = this.props;
    let selectableItemsLength = sectionData.selectable_products.length;
    if (selectedItems.length !== selectableItemsLength) {
      /* All items are not selected */
      setSelectAllItemsError(true);
      return;
    }
    let es6Product =
      window.location.pathname == "/products/essential-6" ? true : false;
    if (es6Product) {
      let subscriptionFound = this.props.cart?.cart?.items.find(
        (item) => item?.selected_selling_plan
      );
      if (subscriptionFound) {
        this.setState({ showTytb: true });
        return;
      }
    }
    if (sectionData.settings.enable_subscription_popup) {
      this.handlePopup(true);
    } else {
      this.handleAddToCart();
    }
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

    this.setState({ showTytb: false });
    addToCart({
      bundleType: sectionData.bundle_type,
      baseProduct: sectionData.base_product,
      allProducts,
      allProductIds,
      upsellProductsList,
    });
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
  componentDidMount() {
    this.props.changeQuizStep(1);
  }
  closeQuiz = () => {
    this.setState({ showEssentialQuiz: false });
  };
  render() {
    const { sectionData, selectedItems, upsellProducts } = this.props;
    let { showTytb } = this.state;

    if (!sectionData) {
      /* if data is not present */
      return <div></div>;
    }
    let base_product = sectionData.base_product;
    let bundleSoldOut = this.checkBundleAvaiable();
    let totalItems = 0;
    if (sectionData?.selectable_products?.length) {
      totalItems =
        sectionData?.selectable_products?.length +
        this.props.upsellProducts.length;
    }
    let es6Found =
      window.location.pathname == "/products/essential-6" ? true : false;

    let essentialQuizStyle = { display: "none" };
    if (this.state.showEssentialQuiz) {
      essentialQuizStyle = { display: "block" };
    }

    let btnId = sectionData.bundle_type;
    // if (window.location.pathname ==  '/products/essential-8'){
    //   btnId = 'essential-8-add-to-cart';
    // }else if(window.location.pathname ==  '/products/essential-6'){
    //   btnId = 'essential-6-add-to-cart';
    // }else if(window.location.pathname ==  '/products/the-essential-5-basics-starter-kit'){
    //   btnId = 'essential-5-add-to-cart';
    // }
    const { settings } = sectionData;
    const {
      offer_badge_msg,
      offer_badge_msg_bg_color,
      offer_badge_msg_text_color,
    } = settings;
    return (
      <div className="essential-main">
        {this.state.showSubscriptionPopup && (
          <ProductSubscriptionPopupSets
            handlePopup={this.handlePopup}
            handleAddToCart={this.handleAddToCart}
            all_products={sectionData.selectable_products}
            upsellProducts={upsellProducts}
            activeVariants={selectedItems}
          />
        )}
        {offer_badge_msg && (
          <div className="offer-badge-msg-wrap">
            <p
              className="offer-badge-msg"
              style={{
                backgroundColor: offer_badge_msg_bg_color,
                color: offer_badge_msg_text_color,
              }}
            >
              {offer_badge_msg}
            </p>
          </div>
        )}
        <div className="product-title-price-wrap">
          <h1 className="product-title">{sectionData.settings.title_text}</h1>
          {!es6Found && (
            <div className="price-wrapper">
              {base_product.compare_at_price > base_product.price && (
                <span className="og-price">
                  {formatMoney(base_product.compare_at_price)}
                </span>
              )}{" "}
              <span className="discounted-price">
                {formatMoney(base_product.price)}
              </span>
            </div>
          )}
        </div>
        <div className="rating-section">
          {HtmlParser(sectionData.review_section)}
        </div>
        <div
          className={
            this.state.showMore ? "product-content" : "product-content p-hide"
          }
        >
          {HtmlParser(sectionData.settings.content_text)}
        </div>
        {this.state.showMore ? (
          <a onClick={(e) => this.handleShowLess(e)}>Show less</a>
        ) : (
          <a onClick={(e) => this.handleShowMore(e)}>Show more</a>
        )}

        <ChildProducts showQuiz={this.showQuiz} />

        {/* Accordion part */}
        <EssentialAccordion />
        <form
          onSubmit={(e) => this.checkAddToCart(e)}
          method="post"
          action="/cart/add"
          id={`product-form-template--${base_product.id}__main`}
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          noValidate="novalidate"
          data-type="add-to-cart-form"
        >
          {bundleSoldOut ? (
            <button className="add-to-cart soldout">Soldout</button>
          ) : (
            <div>
              <button
                id={`${btnId}`}
                name="add"
                className={`add-to-cart${es6Found ? " es-6-add-to-cart" : ""}`}
              >
                {es6Found ? (
                  <div>TRY BEFORE YOU BUY</div>
                ) : (
                  <div>ADD ITEMS TO CART</div>
                )}
              </button>
              {/* tytb BUTTON WILL CALL HERE */}
              {es6Found && <div id="tbyb-button" data-tbyb="tbyb-button"></div>}
            </div>
          )}
        </form>
        <MediaQuery query="phone-and-tablet">
          <Essential8ExtraData settings={sectionData} />
        </MediaQuery>
        {showTytb && (
          <TytbPopup
            proceed={() => this.handleAddToCart()}
            closePopup={() => {
              this.setState({ showTytb: false });
            }}
            confirm={true}
            msg={
              "To order auto-refill items, a new order must be placed. You will not lose the free shipping offer."
            }
          />
        )}
        <div style={essentialQuizStyle}>
          <EssentialQuizTemplate closeEssentialQuiz={this.closeQuiz} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sectionData: state.essential_8.sectionData,
  selectedItems: state.essential_8.selectedItems,
  upsellProducts: state.essential_8.sectionData.upsell_products,
  cart: state.cart,
});

/* Action Dispatchers */
const mapDispatchToProps = (dispatch) => ({
  setSelectAllItemsError: (data) => dispatch(setSelectAllItemsError(data)),
  addToCart: (data) => dispatch(addToCart(data)),
  setLoader: (data) => dispatch(setLoader(data)),
  changeQuizStep: (step) => dispatch(changeQuizStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EssentialMain);
