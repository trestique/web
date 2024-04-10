import { manageHeight } from "./helper"

class EssentialMix {


  constructor() {

    this.init()
    this.videoStatus = false
  }

  init = () => {

    this.essentialMixSliders()
    this.playVideo()
  }

  slider = (wrapper) => {

    let sliderWrapper = $(wrapper)

    if (sliderWrapper.length > 0) {

      const slidesInDesktop = parseInt(sliderWrapper.attr('data-slide-lg'))
      const slidesInMobile = parseInt(sliderWrapper.attr('data-slide-sm'))
      const slidesInTablet = parseInt(sliderWrapper.attr('data-slide-md'))
      const slideDots = sliderWrapper.attr('data-dots')
      const slideArrows = sliderWrapper.attr('data-arrows')
      const slideAutoplay = sliderWrapper.attr('data-auto-play')
      let centerMode = false;
      let infiniteScroll = true
      if($(sliderWrapper).hasClass('client-review-slider') && $(window).width() > 767){
        centerMode = true
      }
      if($(sliderWrapper).hasClass('special-block-wrapper') && $(window).width() <= 767){
        centerMode = true
      }

      if($(sliderWrapper).hasClass('essential-mix-slider')) {

        centerMode = true
      }

      // if($(sliderWrapper).hasClass('setp-block-wrapper')){

      //   infiniteScroll = false
      // }      
      sliderWrapper.slick({
        dots: slideDots === "true" ? true : false,
        autoplay: slideAutoplay === "true" ? true : false,
        autoplaySpeed: 2000,
        pauseOnFocus: false,
        pauseOnHover: false,
        dotsClass: 'slide-dots',
        infinite: infiniteScroll,
        speed: 750,
        centerMode,
        slidesToShow: slidesInDesktop,
        swipeToSlide: true,
        swipe: true,
        arrows: slideArrows ? true : false,
        prevArrow: `<button class="slick-prev slick-arrow" aria-label="Previous" type="button">
                    <img src='https://cdn.shopify.com/s/files/1/0114/0621/3220/files/prev_b4b2c5ed-2824-48fd-befc-c2ae13501459.png?v=1645079100' />
        </button>`,
        nextArrow: `<button class="slick-next slick-arrow" aria-label="Previous" type="button">
                    <img src ='https://cdn.shopify.com/s/files/1/0114/0621/3220/files/next-arrow.png?v=1645079100' />
                </button>`,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: slidesInTablet,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: slidesInMobile,
            }
          }
        ]
      })
    }
  }

  essentialMixSliders = () => {

    const sliderArray = ['.special-block-wrapper', '.setp-block-wrapper', '.client-review-slider']
    if(sliderArray){

      sliderArray.forEach(slide => {
        this.slider(slide)
      })
    }

    let wrapperHeight = document.querySelectorAll('.how-it-work-wrapper')
    if(wrapperHeight){

      manageHeight(wrapperHeight)
    }

    let blockHeight = document.querySelectorAll('.trestique-special-block')
    if(blockHeight) {

      manageHeight(blockHeight)
    }

    const marqueeSlider = document.querySelector('.essential-mix-slider')
    $(marqueeSlider).slick({
      speed: 3000,
      autoplay: true,
      autoplaySpeed: 0,
      cssEase: 'linear',
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      buttons: false,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 430,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    })

    /**
     * Hide animation for now
     */
    // let animationBlocks = document.querySelectorAll('.trestique-special-block')
    // if(animationBlocks) {

    //   animationBlocks.forEach(block => {
  
    //     block.addEventListener('mouseout', () => {
  
    //       block.classList.add('animation')
    //     })
  
    //     block.addEventListener('mouseover', () => {
  
    //       block.classList.remove('animation')
    //     })
    //   })
    // }

  }

  playVideo = () => {

    let videoWrapper = document.querySelectorAll('.video-wrapper-essential-mix')
    let videos = document.querySelectorAll('.video')

    videoWrapper.forEach((item)=>{
      let btn = item.querySelector('.play-btn-wrapper');
      btn.addEventListener('click',(e)=>{
        let video = item.querySelector('video');
        if(video && !btn.classList.contains('active')){
          video.play();
          btn.classList.add('active');  
        }else if(video && btn.classList.contains('active')){
          video.pause();
          btn.classList.remove('active');  
        }
      })
    });
    // if (playBtn && videos) {

    //   let mediaWrapper = document.querySelector('.media-wrapper')

    //   mediaWrapper?.addEventListener('click', () => {

    //     if (!this.videoStatus) {

    //       videos.forEach(video => {
    //         video.play()
    //       })
    //       playBtn.classList.add('hide')
    //     }
    //     else {

    //       videos.forEach(video => video.pause())
    //       playBtn.classList.remove('hide')
    //     }
    //     this.videoStatus = !this.videoStatus
    //   })
    // }
  }
}

let essentialMixPage = document.querySelector('.page-essential-mix-landing')
if (essentialMixPage) {

}
new EssentialMix