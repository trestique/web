import {manageHeight} from './helper';
class sections {
    constructor(){
        this.init();
    }
    productReviews = () =>{
        if($('.product-review-slider').length > 0){
            $('.product-review-slider .review-items').slick({
                dots: true,
                infinite: true,
                speed: 750,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                focusOnSelect: true,
            })
        }
    }
    imageWithTextSlider = () =>{
        if($('.image-with-text-slider').length > 0){
            $('.image-with-text-slider .text-wrapper-block').slick({
                dots: false,
                infinite: true,
                speed: 750,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                focusOnSelect: true,
                prevArrow: `<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><svg width="20" height="67" viewBox="0 0 20 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18.6753" y1="65.7037" x2="1.67533" y2="33.7037" stroke="#00263A" stroke-width="3"/>
                <line x1="1.67533" y1="33.2963" x2="18.6756" y2="1.29641" stroke="#00263A" stroke-width="3"/>
                </svg>
                </button>`,
                nextArrow: `<button class="slick-next slick-arrow" aria-label="Previous" type="button" style=""><svg width="20" height="67" viewBox="0 0 20 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.32473" y1="1.29651" x2="18.3247" y2="33.2965" stroke="#00263A" stroke-width="3"/>
                <line x1="18.3247" y1="33.704" x2="1.32443" y2="65.7038" stroke="#00263A" stroke-width="3"/>
                </svg>
                </button>`,
                responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }    
            ]
            })
        }
    }
    productHeightManage = () =>{
        let parent = document.querySelectorAll('.product-grid .collection-wrapper');
        parent.forEach((item)=>{
            let selector = item.querySelectorAll('.simply-product .variants-details');
            let titleSelector = item.querySelectorAll('.simply-product .product-title');
            if(selector.length > 0){
                manageHeight(selector);
            }
            if(titleSelector.length > 0){
                manageHeight(titleSelector);
            }
        })
    }
    productImageWithText = () =>{
        let parent = document.querySelector('.product-image-with-text');
        if(parent){
            let items = parent.querySelectorAll('.item');
            items.forEach((item)=>{
                let selector = item.querySelectorAll('.logo');;
                if(selector.length > 0){
                    var max = 0;
                    selector.forEach((el)=>{
                        if (el.offsetWidth > max) {
                            max = el.offsetWidth;
                        }
                        }
                    );
                    max = max + 1;
                    selector.forEach((item)=>{
                        item.style['width'] = `${max}px`;
                    })
                }
            })
        }
    }
    videoGrid = () =>{
        if($('.image-with-video-grid').length > 0){
            $(document).on('click','.image-with-video-grid .open-video',function(e){
                e.preventDefault();
                let parent = $(this).closest('.image-video-wrapper');
                let video = $('video',parent);
                parent.addClass('active');
                video.get(0).play();
            })
        }
    }
    init = () =>{
        this.productReviews();
        this.imageWithTextSlider();
        this.productHeightManage();
        this.productImageWithText();
        this.videoGrid();
    }
}
$(document).ready(function(){
      new sections;
})