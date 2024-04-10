class Checkout{
  constructor(){
    this.init();
  }
  init = () => {
    $(document).on('page:load page:change', (e)=> {
      this.setSubscriptionPrice();
    });
  }
  setSubscriptionPrice = () => {
    if(Shopify.Checkout.hasSellingPlan){
      var mainParentsEle = document.querySelectorAll(".section__shipping-methods .section__delivery-option-group");
      var parentEle = mainParentsEle[1].querySelector(".content-box");
      var spanEle = parentEle.querySelector(".content-box__small-text");
      if(spanEle){
        var shippingText = spanEle.innerText.split(" ");
        var newShippingText = "";
        shippingText.map(function(item){
          let itemText = item;
          if(item.includes("$")){
            itemText = "$0.00";
          }
          newShippingText += itemText;
          newShippingText += " ";
        })
        spanEle.innerText = newShippingText;
      }
    }
  }
}
new Checkout;