import {miniCartOpen,ajaxCart} from './helper';
class ProductPage {
  constructor(){
    this.init();
  }
  productAddToCart = () =>{
    const that = this;
    $(document).on('submit','.product_section .shopify-product-form',async(e)=>{
      // let target = e.target;
      e.preventDefault();
      let form = $(e.target);
      var button = $('[data-add-to-cart-trigger]',form);
      let url = '/cart/add.js';
      let quantity = parseInt($('[name="quantity"]').val());
      button.addClass('disabled');
      button.attr('disabled','disabled');
      $('.text',button).addClass('animated zoomOut');
      $('.icon',button).addClass('animated zoomOut');
      $('.checkmark',button).addClass('checkmark-active');
      var data = {}
      for(const pair of new FormData(form[0])){
        // console.log(pair)
       data[`${pair[0]}`] = pair[1];
     }
      await ajaxCart(url,data);
      await window.updateSidecart();
      button.removeClass('disabled');
      button.removeAttr('disabled');
      $('.checkmark',button).removeClass('checkmark-active');
      $('.text',button).removeClass('animated zoomOut');
      $('.icon',button).removeClass('animated zoomOut');
      miniCartOpen();
    })
    $(document).on("click",".react-product-details .info-popup-open",(e)=>{
      window.showSubscriptionPopup();
    })
  }
  clickEvent = () =>{
    window.openSubscriptionPopup = () =>{
      const popupOverlay = $('.subscription-popup-bg');
      const popupContent = $('.subscription-popup-details');
      popupOverlay.fadeIn();
      popupContent.fadeIn();
    }
    window.closeSubscriptionPopup = () =>{
      const popupOverlay = $('.subscription-popup-bg');
      const popupContent = $('.subscription-popup-details');
      popupOverlay.fadeOut();
      popupContent.fadeOut();
    }
  }
  init = ()=>{
    if(simply.sideCart.type == 'react-cart'){
      this.productAddToCart();
    }
    this.clickEvent();
  }
}
$(document).ready(function(){
  if($('.template-product').length > 0){
    new ProductPage;
  }
})