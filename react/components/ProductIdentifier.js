import React from 'react';
import Essential8BuilderTemplate from '../pages/essential8-builder/Essential8BuilderTemplate';
import BundleBuilder from '../pages/bundle-builder/BundleBuilder';
import ProductPage from '../pages/product-page/ProductPage';

class ProductIdentifier extends React.Component {
  render() {
    const { productHandle } = this.props.match.params;
    if (productHandle.includes('the-essential-mix')) {
      return <BundleBuilder />
    }else if (productHandle.includes('essential-') || productHandle.includes('essentials')) {
      return <Essential8BuilderTemplate />
    } else {
      return <ProductPage />
    }
    return <></>
  }
}

export default ProductIdentifier;