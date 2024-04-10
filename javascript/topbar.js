class Topbar {
  constructor(parent){
    if (!parent) {
      return;
    }
    this.parent = parent;
    this.textSlider();
  }
  textSlider = () => {
    let speed = parseInt(document.querySelector('.text-carousel-js')?.dataset?.speed);
    let slider = $('.text-carousel-js').flickity({
      pageDots: false,
      wrapAround: true,
      adaptiveHeight: true,
      autoPlay: speed ? speed * 1000 : 3000
    });
    slider.addClass('show-all-slide');
    slider.flickity('resize');
  }
}

new Topbar(document.querySelector('.shopify-section.top-bar'));