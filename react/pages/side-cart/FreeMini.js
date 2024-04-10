import React from "react";
import { formatMoney, manageHeight } from "../../components/Helper";
import HtmlParser from "react-html-parser";
import Slider from "react-slick";
import FreeGiftItem from "./FreeGiftItem";
import { connect } from "react-redux";
import { addToCart, updateCart } from '../../redux/cart/cartAction';

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
class FreeMini extends React.Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }
  getQtyArray = (qty) => {
    const { index } = this.props;
    let cartData = this.props.cart;
    let items = cartData.cart.items;
    let qtyArray = items.map((item, item_index) => {
      if (item_index === index) {
        return qty
      }
      return item.item.quantity;
    })
    return qtyArray;
  }
  checkFreeGiftShouldExist = () =>{
    let { freeMini } = simply.sideCart;
    let { charge } = freeMini;
    charge = parseInt(charge) * 100;
    let { cartData } = this.props;
    if(!cartData.cart.items){
      return;
    }
    let findItem = cartData.cart.items.find((item)=> !cn(item.properties['_free_mini']));
    let total_price = cartData.cart.items.reduce((price, item) => {
      if(item.properties['_free_mini']) {
        return 0
      }
      return price + (item.price*item.quantity)
    }, 0)
    if(charge > total_price && findItem){
      let items = cartData.cart.items;
      let qtyArray = items.map((item, item_index) => {
        if (item.properties['_free_mini']) {
          return 0;
        }
        return item.quantity;
      });
      let qtyArrays = {updates: qtyArray}
      this.props.updateCart(qtyArrays);
    }
  }
  setVariantsWrapperHeight = () =>{
    let selector = document.querySelectorAll('.free-mini-gift .free-mini-items .free-gift-item .swatches-wrapper');
    if(selector.length > 0){
      manageHeight(selector);
    }
  }

  componentDidUpdate(){
    this.checkFreeGiftShouldExist();
    this.setVariantsWrapperHeight();
  }
  addTocart = (id) =>{
    let { cartData } = this.props;
    let total_price = 0;
    if(cartData.cart){
      total_price = cartData.cart.total_price;
    }
    let { freeMini } = simply.sideCart;
    let { charge } = freeMini;
    charge = parseInt(charge) * 100;
    let findItem = cartData.cart.items.find((item)=> !cn(item.properties['_free_mini']));
    if(total_price >= charge && cn(findItem)){
      this.props.addToCart({form:{id,quantity:1,properties:{'_free_mini':'gift'}}});
    }
  }
  render() {
    let { freeMini, progressType } = simply.sideCart;
    let { cartData } = this.props;
    if(!cartData.cart.items){
      return null;
    }
    let total_price = 0;
    if(cartData.cart){
      // total_price = cartData.cart.items.reduce((val, e) => val + !e.properties['_free_mini'] && e.price, total_price);
      total_price = cartData.cart.total_price;
    }
    if (progressType == "shipping") {
      return null;
    }
    let { products,charge,away_overlay_msg,title,lockImage } = freeMini;
    charge = parseInt(charge) * 100;
    let eligible = false;
    if(total_price>=charge){
      eligible = true;
    }
    let remaining_price = charge - total_price;
    away_overlay_msg = away_overlay_msg.replace('XX',formatMoney(remaining_price));
    let checkFreeGiftAlreadyExist = false;
    let findItem = cartData.cart.items.find((item)=> !cn(item.properties['_free_mini']));
    if(findItem){
      checkFreeGiftAlreadyExist = true;
    }
    let slidesToShow = 3;
    if(screen.width <= 767 ){
      slidesToShow = 2;
    }
    if(products.length <= 1){
      slidesToShow = 1;
    }
    let config =  {
      dots: false,
      infinite: true,
      speed: 750,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };

    return (
      <div className={`free-mini-gift${!eligible ? ' not-eligible':''}`}>
        {!cn(title) && <h3 className="free-mini-title">{HtmlParser(title)}</h3>}
        {!eligible && <div className="away-msg-wrapper"><div className="lock-img"><img src={lockImage}/></div><p className="away-msg">{away_overlay_msg}</p></div>}
        <div className="free-mini-items">
          <Slider ref={(slider) => (this.slider = slider)} {...config}>
            {products.map((product) => {
              if (!product.available) {
                return null;
              }
              return <FreeGiftItem checkFreeGiftAlreadyExist={checkFreeGiftAlreadyExist} eligible={eligible} addTocart={this.addTocart} key={product.id} product={product} />;
            })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cart,
});

const mapDispatchToProps = dispatch => {
  return {
      addToCart: data => dispatch(addToCart(data)),
      updateCart: data => dispatch(updateCart(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FreeMini);
