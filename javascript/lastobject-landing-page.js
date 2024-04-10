import { manageHeight } from "./helper"

class LastObjectLandingPage {

  constructor() {

    this.init()
    this.isVideoPlaying = false
  }

  init = () => {

    this.bannerVideoToggle()
    this.lastObjectSlider()
    this.manageHeightForBlocks()
  }

  bannerVideoToggle = () => {
    let videoWrapper = document.querySelectorAll('.video-wrapper-essential-mix')
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
}

  lastObjectSlider = () => {

    let centerMode = false
    if(window.innerWidth <= 768) {
      centerMode = true
    }

    $('.lastobject-block-slider').slick({
      dots: false,
      infinite: false,
      speed: 750,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      centerMode,
      focusOnSelect: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    })
  }
  
  manageHeightForBlocks = () => {

    let sliderBlocks = document.querySelectorAll('.block')
    if(sliderBlocks) {

      manageHeight(sliderBlocks)
    }
  }
}

let lastObjectLandingPage = document.body.classList.contains('page-lastobject-landing-page')

if (lastObjectLandingPage) {

  new LastObjectLandingPage
}