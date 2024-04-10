import {manageHeight,slideDown,slideToggle} from '../helper';
class collectionPage{
    constructor(){
        this.init();
    }
    manageProductsHeight = () =>{
        let list = document.querySelectorAll('.product-list-ul');
        list.forEach((collection)=>{
          // let topProductsImg = collection.querySelectorAll('.collection-top-products .simply-collection-product .img');
          // manageHeight(topProductsImg);
          // let topProductsTitles = collection.querySelectorAll('.collection-top-products .simply-collection-product .product-title-details');
          // manageHeight(topProductsTitles);
          // let topProductsinfo = collection.querySelectorAll('.collection-top-products .simply-collection-product .product-short-info');
          // manageHeight(topProductsinfo);

          let productsLength = document.querySelectorAll('.product-list-ul .simply-collection-product').length;
          let deskLength = Math.ceil(productsLength / 4);
          let XSLength = Math.ceil(productsLength / 2);
          // desktop products height manage row by row
          if($(window).width()>767){
            for(let i=0;i<=deskLength;i++){
              let productsImg = document.querySelectorAll(`.product-list-ul .product-li[data-value="${i}"] .img`);
              manageHeight(productsImg);
              let productsTitles = document.querySelectorAll(`.product-list-ul .product-li[data-value="${i}"] .product-title-details`);
              manageHeight(productsTitles);
              let productsInfo = document.querySelectorAll(`.product-list-ul .product-li[data-value="${i}"] .product-short-info`);
              manageHeight(productsInfo);
              // let productsVariants = parent.querySelectorAll('.swatch-wrap ');
            }
          }

          // Mobile products height manage row by row
          if($(window).width()<=767){
            for(let i=0;i<=XSLength;i++){
              let productsImg = document.querySelectorAll(`.product-list-ul .product-li[data-xs-value="${i}"] .img`);
              manageHeight(productsImg);
              let productsTitles = document.querySelectorAll(`.product-list-ul .product-li[data-xs-value="${i}"] .product-title-details`);
              manageHeight(productsTitles);
              let productsInfo = document.querySelectorAll(`.product-list-ul .product-li[data-xs-value="${i}"] .product-short-info`);
              manageHeight(productsInfo);
              // let productsVariants = parent.querySelectorAll('.swatch-wrap ');
            }
          }
        })
        // manageHeight(productsVariants);
    }
    showAddToCart = () =>{
        let shadeBtn = document.querySelectorAll('.product-list-ul .simply-collection-product .multi-add-to-cart');
        shadeBtn.forEach((item)=>{
            item.addEventListener('click',(e)=>{
                let parent = e.target.closest('.product-li');
                let mainParent = parent.closest('.product-list-ul');
                let parentDataValue = parent.getAttribute('data-value');
                let products = mainParent.querySelectorAll(`.product-li[data-value="${parentDataValue}"]`);
                let variantListBlock = mainParent.querySelectorAll(`.product-li[data-value="${parentDataValue}"] .variants-details-block .variants-details`);
                if($(window).width() <= 767){
                  parentDataValue = parent.getAttribute('data-xs-value');
                  products = mainParent.querySelectorAll(`.product-li[data-xs-value="${parentDataValue}"]`);
                  variantListBlock = mainParent.querySelectorAll(`.product-li[data-xs-value="${parentDataValue}"] .variants-details-block .variants-details`);
                }
                products.forEach((item)=>{
                  let variantBlock = item.querySelector(`.variants-details-block`);
                  let shadeBtn = item.querySelector(`.multi-add-to-cart`);
                  if(shadeBtn){
                    slideToggle(shadeBtn);
                  }
                  slideDown(variantBlock);
                });
                setTimeout(function(){ 
                  let maxHeightItem = variantListBlock[0];
                  variantListBlock.forEach((item)=>{
                    if(item.clientHeight > maxHeightItem.clientHeight){
                      maxHeightItem = item;
                    }
                  });
                  variantListBlock.forEach((item)=>{
                      if(item.classList.contains('default-details')){
                        let btn = maxHeightItem.querySelector('.single-add-to-cart');
                        if(btn){
                          item.style['min-height'] = `${maxHeightItem.clientHeight - btn.offsetHeight}px`;
                        }else{
                          item.style['min-height'] = `${maxHeightItem.clientHeight}px`;
                        }
                      }else{
                        item.style['min-height'] = `${maxHeightItem.clientHeight}px`;
                      }
                  })
                }, 500);

                // setTimeout(function(){ 
                  
                //   let maxHeightItem = variantListBlock[0];
                //   variantListBlock.forEach((item)=>{
                //     if(item.clientHeight > maxHeightItem.clientHeight){
                //       maxHeightItem = item;
                //     }
                //   })
                //   let swatchHeight = parseInt(maxHeightItem.clientHeight) - maxHeightItem.querySelector('.single-add-to-cart').clientHeight;
                //   let activeSwatchHeight = parseInt(maxHeightItem.clientHeight);
                //   swatchListBlock.forEach((el)=>{
                //     let target = el.closest('.variants-details-block');
                //     if(target.classList.contains('active')){
                //       el.style['min-height'] = `${activeSwatchHeight}px`;
                //     }else{
                //       el.style['min-height'] = `${swatchHeight}px`;
                //     }
                //   });
                  
                // }, 500);
            })
        })
    }
    updateVariantData = () =>{
        $(document).on(
            "click",
            ".simply-collection-product .swatch-wrap .swatch-element",
            function () {
              $(this).siblings().removeClass("active");
              $(this).addClass("active");
              let parent = $(this).closest(".simply-collection-product");
              $('input[name="id"]', parent).val($(this).attr("data-id"));
              let available = $(this).attr("data-available") == "true" ? true : false;
              let btn = $(".single-add-to-cart", parent);
              let price = $(this).attr("data-price");
              if (available) {
                btn.html(`Add to cart ${price}`);
                btn.removeAttr("disabled");
                btn.removeClass('soldout');
              } else {
                btn.html("Soldout");
                btn.attr("disabled", true);
                btn.addClass('soldout');
              }
              var new_img = $(this).attr("data-img");
              if (!cn(new_img)) {
                parent.addClass("disabled");
                var image = new Image();
                image.onload = function () {
                let current_img = $('img',parent);
                  current_img.attr("src", new_img).attr("srcset", new_img);
                };
                image.src = new_img;
              }
            }
          );
    }
    sliderInit = () => {
      let productsEle = $('.subscription-favorites .collection-top-products');
      $(productsEle).slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        accessibility: false,
        swipeToSlide:true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      })
    }
    init = () =>{
        if(document.querySelector('.page-subscription-page')){
          this.sliderInit();
        }
        this.manageProductsHeight();
        this.showAddToCart();
        this.updateVariantData();
        $(window).on('resize',()=>{
          this.manageProductsHeight();
        })
    }
}
if(document.getElementById('collection-page') || document.querySelector('.page-subscription-page')){
  new collectionPage
}