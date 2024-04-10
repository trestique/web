import React from 'react';
import Srcset from '../../components/Srcset';
const LookUserDetails = ({product}) => {
    if(!product){
        return null;
    }
    let {shop_by_look_insta_handle,shop_by_look_insta_followers,featured_image,shop_by_look_handle,short_info} = product;
    return (
      <div className="look-product-user-info">
          {featured_image &&
          <div className='img'>
              <Srcset src={featured_image} />
          </div>}
        <div className='user-details'>
            {shop_by_look_handle && <h3 className='user-name'>{shop_by_look_handle}</h3>}
            {shop_by_look_insta_handle && shop_by_look_insta_followers &&
            <div className='insta-details'>
                <div className='insta-img'>
                    <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector_1.png?v=1651647340" />
                </div>
                <div className='insta-handle-followers'>
                    {shop_by_look_insta_handle && <p className='insta-handle'>{shop_by_look_insta_handle}</p>}
                    {shop_by_look_insta_followers && <p className='insta-followers'>{shop_by_look_insta_followers}</p>}
                </div>
            </div>}
            {short_info &&  <div className='short-info'> {short_info}</div>}
        </div>
      </div>
    )
}
export default LookUserDetails;
