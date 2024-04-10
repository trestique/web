import React from 'react';
import { connect } from 'react-redux';
import Srcset from '../../components/Srcset';
import Slider from "react-slick";

class BundleProductImageSlider extends React.Component {
  render() {
    let {product,currentVariant} = this.props;
    if(cn(currentVariant)){
      currentVariant = product.variants.find((item)=> item.available == true);
    }
    let {media,tags} = product;
    let {title} = currentVariant;
    let images = media.filter((item)=> item.alt == title && item.media_type == "image" );
    let config =  {
        dots: true,
        infinite: true,
        speed: 750,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,
        adaptiveHeight: true,
    };
    return (
      <div className="product-slider">
            <div className="slider-images">
                <Slider className="main-slide"  {...config}>
                    {images.map((image,i) => <Srcset key={i} alt={title} src={image.src}/>)}
                </Slider>
            </div>
      </div>
    )
  }
}

export default BundleProductImageSlider;