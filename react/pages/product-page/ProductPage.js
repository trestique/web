import React from 'react';
import { connect } from 'react-redux';

import ProductTemplate from './ProductTemplate';
class ProductPage extends React.Component {
  render() {
    const {product,currentVariant,settings} = this.props;
    if(cn(product) || cn(currentVariant) || cn(settings)){
      return null;
    }
    return (
      <div className="react-product-page">
        <ProductTemplate />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
  currentVariant: state.product.currentVariant,
  settings: state.product.settings,
});

export default connect(mapStateToProps)(ProductPage);