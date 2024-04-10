import React from 'react';
const LookProductTextDetails = ({product}) => {
    if(!product){
        return null;
    }
    let {shop_by_look_info,shop_by_look_paragraph_1,shop_by_look_paragraph_2} = product;
    let para1Show = false;
    if(shop_by_look_paragraph_1 || shop_by_look_info){
      para1Show = true;
    }
    return (
      <>
        {para1Show && 
          <div className='look-para-1'>
            <ul className='info-list'>
              {shop_by_look_info.map((item)=> <li>{item}</li>)}
            </ul>
            <p className='text'>{shop_by_look_paragraph_1}</p>
        </div>}
        {shop_by_look_paragraph_2 && 
        <div className='look-para-2'>
          {shop_by_look_paragraph_2}
        </div>}
      </>
    )
}
export default LookProductTextDetails;
