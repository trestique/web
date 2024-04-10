import React from 'react';
import LookUserDetails from './LookUserDetails';
import LookProductTextDetails from './LookProductTextDetails';

const LookExtraInfo = ({productData}) => {
    let {product,settings} = productData;
    return (
      <div className="look-product-extra-info">
          <LookUserDetails  product={product} />
          <LookProductTextDetails product={product} />
      </div>
    )
}
export default LookExtraInfo;
