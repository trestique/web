import React, { useState } from 'react';
import ReactHtmlParser from "react-html-parser";
import { connect } from 'react-redux';

const TytbPopup = (props) => {

    let subscriptionProducts = props.cart?.cart?.items.filter((item)=> item?.selected_selling_plan);
    return (
        <div className='tytb-popup'>
            <div className='tytb-popup-content'>
                <h3 className='title'>PLEASE NOTE:</h3>
                <p className='tytb-msg-1'>
                    We are unable to process orders that include the following items together:
                </p>
                <ul className='tytb-products-list'>
                    <li>
                        The Essential 6 Starter Kit
                    </li>
                    {props.item && <li>{props.item}</li>}
                    {subscriptionProducts.map((item)=> <li>{item.product_title}</li>)}
                </ul>
                <p className='tytb-msg-2'>{props.msg}</p>
                {props.confirm && 
                <div className='confirm-btns-wrapper'>
                    <button onClick={()=> props.closePopup()} className='btn second-bg'>no, keep my cart</button>
                    <button onClick={()=> props.proceed()} className='btn'>yes, add the essential 6</button>
                </div>}
                {props.inform && 
                <div className='inform-btns-wrapper'>
                        <button className='btn' onClick={()=> props.closePopup()}>got it!</button>
                </div>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart
});

  
  export default connect(mapStateToProps)(TytbPopup);