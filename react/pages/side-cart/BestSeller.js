import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cart/cartAction';
import Srcset from '../../components/Srcset';
import {formatMoney} from '../../components/Helper';

class BestSeller extends React.Component{
    getFinalRefillData = (allRefills,items) =>{
        let foundItem = null;
        for(let i = 0; i< items.length; i++){
            let item = items[i];
            let productVariants = allRefills[`${item.handle}`];
            if(productVariants){
                for(let j = 0; j < items.length; j++ ){
                    let variant = items[j];
                    let matchVariant = productVariants.find((v)=> v.variant_title === variant.variant_title);
                    if(matchVariant){
                        let checkmatchExistInCart = items.find((cartItem)=> cartItem.id === matchVariant.id);
                        if(!checkmatchExistInCart){
                            foundItem = matchVariant;
                            break;
                        }
                    }
                }
                if(!cn(foundItem)){
                    break;
                }
            }
        }
        return foundItem;
    }
    getFinalData = (items,itemsIdArray) =>{
        let finalItem = null;
        for(let i=0;i< items.length;i++ ){
            let item = items[i];
            if(!itemsIdArray.includes(item.id)){
                finalItem = item;
                break;
            }
        }
        return finalItem;
    }
    addToCart = id =>{
        this.props.addToCart({form:{id,quantity:1, properties:{"_cart_best_seller": true}}});
    }
    render(){
        const {bestseller} = simply.sideCart;
        let {bundles,bundleEnable,refills,refillEnable,productEnable,allRefills,products,title,enable} = bestseller;
        if(!enable){
            return null;
        }
        let cartData = this.props.cart;
        let items = cartData.cart.items;
        let itemsIdArray = [];
        items.map((item)=> {
            if(cn(item.properties[`_bid`])){
                itemsIdArray.push(item.id);
            }
        });
        let finalArray = [];
        let bundle = bundleEnable ? this.getFinalData(bundles,itemsIdArray) : null;
        let refill = refillEnable ? this.getFinalRefillData(allRefills,items) : null;
        if(cn(refill) && refillEnable){
            refill = this.getFinalData(refills,itemsIdArray);
        }
        let product = productEnable ? this.getFinalData(products,itemsIdArray) : null;
        if(!cn(product)){
            finalArray.push(product);
        }
        if(!cn(refill)){
            finalArray.push(refill);
        }
        if(!cn(bundle)){
            finalArray.push(bundle);
        }
        if(!product && !refill && !bundle){
            return null;
        }
        return(
            <div className="best-seller">
                <h3 className="best-seller-title">{title}</h3>
                <ul className="best-seller-items">
                    {finalArray.map((item)=>{
                        return <li key={item.id} className="item">
                            <div className="img">
                                <Srcset src={item.image} alt={item.title} />
                            </div>
                            <div className="details">
                                <h3 className="title">{item.title} {item.variant_title != "Default Title" && `- ${item.variant_title}`}</h3>
                                <p className="desc">{item.description}</p>
                                <button className="btn" onClick={()=> this.addToCart(item.id)}><span>Add to bag </span> <span>{formatMoney(item.price)}</span></button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      cart: state.cart
    }
  };
  const mapDispatchToProps = dispatch => {
    return {
        addToCart: data => dispatch(addToCart(data))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);
  