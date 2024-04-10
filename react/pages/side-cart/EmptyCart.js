import React, { Component } from 'react';
import FreeMini from './FreeMini';
class EmptyCart extends React.Component{
    render(){
        return(
            <div className="empty-cart">
                <div className="empty-msg-wrap">
                    <div className="empty-msg">
                        <div className="img">
                        <img src={simply.sideCart.sideCartImg} />
                        </div>
                        <p className="text">
                            {simply.sideCart.empty_msg}
                        </p>
                    </div>
                </div>
                <FreeMini />
            </div>
        )   
    }
}
export default EmptyCart;