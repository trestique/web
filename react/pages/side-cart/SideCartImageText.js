import React from 'react';
import Srcset from '../../components/Srcset';
import { connect } from 'react-redux';
import {addToCart} from '../../redux/cart/cartAction';
const SideCartImageText = (props) => {
        if(cn(simply.sideCart)){
            return null;
        }
        const {sideCartBtnVID,sideCartBtnAction,everyProductTitle,everyProductImg,sideCartBtnLink,everyProductBtnText} = simply.sideCart;
        const btnAction = (e) =>{
            e.preventDefault();
            if(sideCartBtnAction == 'link'){
                window.location = sideCartBtnLink;
            }else{
                if(sideCartBtnVID){
                    const form = {id:sideCartBtnVID,qty:1}
                    props.addToCart({form});
                }
            }
        }
        return(
            <div className="side-cart-image-text">
                <div className="flex-view-xs middle">
                        <div className="img">
                            <Srcset src={everyProductImg} />
                        </div>
                        <div className="text">
                            <h4>{everyProductTitle}</h4>
                            <a className="button button--primary" onClick={(e)=> btnAction(e)}>{everyProductBtnText}</a>
                        </div>
                </div>
            </div>
        )
}

const mapStateToProps = state => (
    {
      cartData: state.cart
    }
  )
const mapDispatchToProps = dispatch => {
    return {
        addToCart: (data) => dispatch(addToCart(data)),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(SideCartImageText);