import React from 'react';
import Srcset from '../../components/Srcset';
const LookProduct = (props) => {

    let {product} = props
    let {selectedVariant,title,featured_image, images} = product;
    let image = selectedVariant.featured_image?.src;
    if(!image){
        image = featured_image;
    }
    return (
      <div className='look-bundle-product'>
            <h4 className='product-title'>{title}</h4>
            <div className='img'>
                <Srcset src={image} alt={title} />
            </div>
            {selectedVariant.title != 'Default Title' && <h4 className='variant-title'>{selectedVariant.title}</h4>}
            <span className='change-shade-btn' onClick={() => props.handlePopupClick(product.index)}>Change shade</span>
      </div>
    )
}
export default LookProduct;
