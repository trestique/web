import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import SubscriptionRefillItem from './SubscriptionRefillItem';
import HtmlParser from "react-html-parser";
import Srcset from '../../components/Srcset';

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className="slick-arrow slick-next">
        <svg width="15" height="15" version="1.0" viewBox="0 0 512 512">
          <g transform="translate(0 512) scale(.1 -.1)">
            <path d="m1294 5110c-38-15-64-59-64-109v-46l2395-2395-1198-1198c-902-903-1197-1203-1199-1222-3-51 4-76 29-102 34-36 81-45 125-24 19 9 573 556 1269 1253 914 915 1238 1245 1241 1265 3 16 3 40 0 56-3 20-327 350-1241 1265-680 681-1248 1245-1263 1253-30 16-62 17-94 4z" />
          </g>
        </svg>
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className="slick-arrow slick-prev">
        <svg width="15" height="15" version="1.0" viewBox="0 0 512 512">
          <g transform="translate(0 512) scale(.1 -.1)">
            <path d="m2478 3873c-1323-1325-1269-1267-1253-1345 6-27 242-268 1223-1252 670-670 1235-1231 1256-1247 98-73 215-3 191 113-6 27-237 263-1198 1226l-1192 1192 1192 1193c1064 1064 1192 1196 1198 1230 15 79-35 137-119 137h-51l-1247-1247z" />
          </g>
        </svg>
      </div>
    );
  };

class SubscriptionRefill extends React.Component{
    constructor(props) {
        super(props);
        this.slider = React.createRef();
        this.state = {
          visible: false
        }
    }
    getSubscriptionData = (allRefills,items) =>{
        let subscriptionArray = [];
        for(let i = 0; i < items.length; i++ ){
            let item = items[i];
            let productVariants = allRefills[`${item.handle}`];
            if(productVariants){
                let matchVariant = productVariants.find((v)=> v.variant_title === item.variant_title);
                if(matchVariant){
                    let checkmatchExistInCart = items.find((cartItem)=> cartItem.id === matchVariant.id);
                    if(!checkmatchExistInCart){
                        subscriptionArray.push(matchVariant);
                    }
                }
            }
        }
        return subscriptionArray;
    }
    openPopup = () => {
      this.setState({visible:true});
    }
    closePopup = () => {
      this.setState({visible:false});
    }
    render(){
        const {bestseller} = simply.sideCart;
        let {allRefills,subscriptionTitle,subscriptionEnable,subscriptionText,popupEnable,popupTitle,popupText,popupDesc,popupImage} = bestseller;
        if(!subscriptionEnable){
            return null;
        }
        let { visible } = this.state;
        let cartData = this.props.cart;
        let items = cartData.cart.items;
        let subscriptionArray = this.getSubscriptionData(allRefills,items);
        if(subscriptionArray.length <= 0 ){
            return null;
        }
        let config =  {
            dots: false,
            infinite: true,
            speed: 750,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: <PrevArrow />,
            nextArrow: <NextArrow />,
        };
        return(
          <div className="cart-subcription-refill">
            {!cn(subscriptionTitle) && 
              <div className="subscription-refill-title-wrap">
                <h3 className="subscription-refill-title">{HtmlParser(subscriptionTitle)}</h3>
                {popupEnable && <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/info-icon-red.png?v=1639640551" alt="info red icon" />}
              </div>
            }    
            {!cn(subscriptionText) && <p className="subscription-refill-text">{HtmlParser(subscriptionText)}</p> }
            {subscriptionArray.length > 3 ?
              <div className="items">
                <Slider ref={(slider) => (this.slider = slider)} {...config}>
                  {subscriptionArray.map((product)=> <SubscriptionRefillItem key={product.id} product={product} />)}
                </Slider>    
              </div>
              :
              <div className="items no-slider">{subscriptionArray.map((product)=> <SubscriptionRefillItem key={product.id} product={product} />)}</div>
            }
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      cart: state.cart
    }
};
export default connect(mapStateToProps, null)(SubscriptionRefill);
  