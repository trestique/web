import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cart/cartAction';
import Srcset from '../../components/Srcset';
import {formatMoney} from '../../components/Helper';
class SubscriptionRefillItem extends React.Component{
    state = {
        subscription : null
    }
    componentDidMount(){
        const {product} = this.props;
        const {subscriptionPlans} = product;
        this.setState({subscription: subscriptionPlans[0]})
    }
    subscriptionChange = (e) =>{
        let value = parseInt(e.target.value);
        const {product} = this.props;
        const {subscriptionPlans} = product;
        let subscription = subscriptionPlans.find((item)=> value === item.id);
        this.setState({subscription});
    }
    addToCart = () =>{
        const {product} = this.props;
        const {id} = product;
        let {subscription} = this.state;
        this.props.addToCart({form:{id,quantity:1,selling_plan:subscription.id, properties:{"_cart_refill_item": true}}});
    }
    render(){
        const {product} = this.props;
        const {variant_title,title,subscriptionPlans,image,price} = product;
        let {subscription} = this.state;
        if(cn(subscription)){
            return null;
        }
        return(
            <div className="subcription-refill-item">
                <div className="img">
                    <Srcset src={image} alt={variant_title} />
                </div>
                <p className="title">{title}</p>
                <p className="v-title">{variant_title}</p>
                <select value={this.state.subscription.id} onChange={(e)=>this.subscriptionChange(e)}>
                    {subscriptionPlans.map((data,i)=> <option value={data.id} key={i}>{data.name.replace("Delivery ","").replace("every ","Every ").replace("Weeks","weeks")}</option>)}
                </select>
                <button onClick={this.addToCart} className="add-btn">ADD {formatMoney(price)}</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: data => dispatch(addToCart(data))
    }
}
export default connect(null, mapDispatchToProps)(SubscriptionRefillItem);
  