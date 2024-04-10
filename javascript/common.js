import { writeCookie,readCookie,miniCartClose, ajaxCart, miniCartOpen } from "./helper";
class Common{
  constructor(){
    this.init();
  }

  setUrl = () =>{
    let currentPageUrl = window.location.href;
    let prevUrl = readCookie("previousPageUrl");
    if(currentPageUrl != prevUrl && !currentPageUrl.includes('the-essential-mix') && !currentPageUrl.includes('routine-finder')){
      writeCookie("previousPageUrl",currentPageUrl,10);
    }
  }
  clickEvent = () =>{
    
    $(document).on('click','.ajax-cart__button',function(){
      $(this).addClass('loading');
    });
    $(document).on('click','.payment-option-popup-open',()=>{
      try{
        miniCartClose();
        window.showPaymentOptions();
      }catch(e){

      }
    })
  }
  submitEvent = () =>{
    $(document).on('submit','.common-ajax-cart',async(e)=>{
      // let target = e.target;
      e.preventDefault();
      let form = $(e.target);
      var button = $('[data-add-to-cart-trigger]',form);
      if(button.length <= 0){
        button = $('.add-to-cart',form);
      }
      let url = '/cart/add.js';
      let quantity = parseInt($('[name="quantity"]').val());
      button.addClass('disabled');
      button.addClass('loading');
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
      button.removeClass('loading');
      $('.checkmark',button).removeClass('checkmark-active');
      $('.text',button).removeClass('animated zoomOut');
      $('.icon',button).removeClass('animated zoomOut');
      miniCartOpen();
    })
  }
  init = () => {
    this.setUrl();
    this.clickEvent();
    this.submitEvent();
  }
}
new Common;