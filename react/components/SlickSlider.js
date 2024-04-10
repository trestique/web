import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class SlickSlider extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }
  componentDidUpdate(prevProps) {

    let { currentProduct, currentCollection, settings } = this.props;
    let oldCurrentProduct = prevProps.currentProduct;
    let oldCurrentCollection = prevProps.currentCollection;
    /* Settings for Essential mix Product */
    if(this.props.productName === 'essential-mix'){
      let isSameProduct = oldCurrentProduct.data.handle === currentProduct.data.handle;
      let isSameCollection = oldCurrentCollection.collection_handle === currentCollection.collection_handle;
      let slidesElement = document.querySelector('.builder-main-product .slick-slider.main-bundle-slider .slick-list .slick-track').childNodes;
      if(slidesElement){
        let currentSlideHandle = ""; 
        slidesElement.forEach((item)=> {
          if(item.classList.contains('slick-active') && item.classList.contains('slick-current')){
            currentSlideHandle = item.querySelector('.product-slide').getAttribute('data-handle');
          }
        });
        if(currentSlideHandle){
          isSameProduct = currentSlideHandle === currentProduct.data.handle;
        }
      }
      
      if (!isSameProduct || !isSameCollection) {
        let {all_products} = settings;
        all_products.map((product, i) => {
          if (currentProduct.data.handle === product.data.handle) {
            this.updateSlider(i);
          }
        });
      }
    }

    /* Settings for Essential 8 Product */
    if(this.props.productName === 'essential-8'){
      this.slider.slickGoTo(this.props.slideIndex);
    }
  }

  updateSlider = (i) => {
    this.slider.slickGoTo(i);
  };

  render() {
    let {activeStep,childrens,config} = this.props;
    if(!config){
      config = {
        dots: false,
        infinite: true,
        speed: 750,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
      }
    }
    return (
      <div className="slider-wrapper">
        <Slider className="main-bundle-slider" ref={(slider) => (this.slider = slider)} {...config}>
          {this.props.children}
        </Slider>
        {childrens && childrens()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeStep : state.global.settings.activeStep,
  settings: state.global.settings,
  currentProduct: state.global.currentProduct,
  currentCollection: state.global.currentCollection
});
export default connect(mapStateToProps)(SlickSlider);
