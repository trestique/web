import React, { Component } from "react";
import { connect } from "react-redux";
import { readCookie } from "../../components/Helper";
import MediaQuery from '../../components/MediaQuery';
import CartPopup from "./CartPopup";
import { addLocalBag, addLocalItem } from "../../redux/global/globalAction";
import {getTotalProducts} from './bundleHelper';
class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "",
      reviewTitle:"",
      showCartPopup:false
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      titleText: nextProps.settings.title_text,
      reviewTitle:nextProps.settings.review_page_title_text
    };
  }
  closeBtn = () => {
    let previousPageUrl = readCookie('previousPageUrl');
    if(!previousPageUrl && previousPageUrl == window.location.href){
      previousPageUrl = "/";
    }
    window.location.href = previousPageUrl;
  }
  closePopup = () => {
    let { selectedBag,selectedItems, addLocalItem, addLocalBag } = this.props;
    addLocalBag(selectedBag);
    addLocalItem(selectedItems);
    this.setState({showCartPopup:false},()=>{
    });
  }
  showCartPopup = () => {
    this.setState({showCartPopup:true});
  }
  render() {
    let { titleText, reviewTitle, showCartPopup } = this.state;
    let { localBag,localItems, selectedItems } =this.props;
    let { activeStep } = this.props.settings;
    let originalCount = getTotalProducts(selectedItems);
    let productCount = getTotalProducts(localItems);
    let bagCount = 0;
    if(productCount != localItems.length){
      bagCount = 1;
    }
    return (
        <>
        <div className="header-bar">
          <div className="header-logo-wrap">
            <MediaQuery query="tablet-and-up">
              <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/trestique-t-mark-rgb-blue-2020_3x_7d5b10dc-ee73-43e4-acd4-c06378ec93cf.jpg?v=1624957219" alt="header-logo" />
            </MediaQuery>
            <h1 className="page-title">{activeStep === 3 ? reviewTitle : titleText}</h1>
          </div>
          <div className="header-icon-wrap">
            <div className="cart-icon-wrap" onClick={this.showCartPopup}>
              <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/bag-cart-bundle.png?v=1646726269" alt="cart" />
              <span>{originalCount + bagCount}</span>
            </div>
            <div className="close-icon-wrap" onClick={this.closeBtn}>
              <img src="//cdn.shopify.com/s/files/1/0114/0621/3220/files/side-cart-close-icon.svg?v=8501096318584868990" alt="close"/>
            </div>
          </div>
        </div>
        {showCartPopup && 
          <>
            <div className={`black_bg${showCartPopup ? ' active' : ''}`} onClick={this.closePopup}></div>
            <CartPopup productCount={productCount} bagCount={bagCount} reviewTitle={reviewTitle} closePopup={this.closePopup} />
          </>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.global.settings,
  selectedItems: state.global.selectedItems,
  localItems: state.global.localItems,
  localBag: state.global.localBag,
  selectedBag: state.global.selectedBag
});
const mapDispatchToProps = (dispatch) => ({
  addLocalBag: (settings) => dispatch(addLocalBag(settings)),
  addLocalItem: (settings) => dispatch(addLocalItem(settings)),
});
export default connect(mapStateToProps,mapDispatchToProps)(HeaderBar);
