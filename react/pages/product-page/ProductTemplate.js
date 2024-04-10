import React from 'react';
import {connect} from 'react-redux';
import ProductDetails from './ProductDetails';
import ProductSlider from './ProductSlider';
import ProductReviewSlider from "../../components/ProductReviewSlider";
import LookProductTemplate from '../look-product-page/LookProductTemplate';
import GiftCardDetails from './GiftCardDetails';
import MediaQuery from '../../components/MediaQuery';
class ProductTemplate extends React.Component {
  render() {
    const {templateType,settings} = this.props;
    if(templateType == "product-look"){
      return <LookProductTemplate />
    }
    return (
      <div className="react-product-template">
        <div className="react-product-wrapper">
          <div className="image-details">
            <ProductSlider />
            <MediaQuery query="tablet-and-up">
              <ProductReviewSlider settings={settings} />
            </MediaQuery>
          </div>
          {templateType === "product-gift-card" ? <GiftCardDetails /> : <ProductDetails />  }
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  templateType: state.product.templateType,
  settings: state.product.settings,
});

export default connect(mapStateToProps)(ProductTemplate);