import {miniCartOpen,miniCartClose,queryString} from './helper';
class sideCart{
    constructor(){
        this.init()
    }
    
    clickEvent = () =>{
        $(document).on('click', '[data-ajax-cart-trigger]', (e)=> {
            e.preventDefault();
            miniCartOpen();
        });
        $(document).on('click', '.black_bg', (e)=> {
            e.preventDefault();
            miniCartClose();
        });
        $(document).on('click', '.side-cart-wrap .close-icon', (e)=> {
            e.preventDefault();
            miniCartClose();
        });
        $(document).on("click",".subscription-refill-title-wrap img",(e)=>{
            window.showSubscriptionPopup();
        })
    }
    checkAutoOpen = function(){
        var query = queryString().cart;
        if(query){
            if(query.value == 'open'){
                setTimeout(function(){ miniCartOpen(); 
                }, 3000);
            }
        }
    };
    init = () =>{
        this.checkAutoOpen();
        this.clickEvent();
    }
}

$(document).ready(function(){
    // if(simply.sideCart.type == 'react-cart'){
        new sideCart();
    // }
})