import React from "react";
import { connect } from "react-redux";
import Srcset from "../../components/Srcset";
import Slider from "react-slick";

class ProductSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainSlider: null,
      thumbSlider: null,
    };
  }

  componentDidMount() {
    this.setState({
      mainSlider: this.mainSlider,
      thumbSlider: this.thumbSlider,
    });
  }
  render() {
    let { product, currentVariant, settings } = this.props;
    let { floatingImages } = settings;
    let { media, tags } = product;
    let { mainSlider, thumbSlider } = this.state;
    let { title } = currentVariant;
    // let images = media.filter((item)=> item.alt == title && item.media_type == "image" );
    let mediaArr = media.filter((item) => item.alt == title);
    // if(images.length <= 0 ){
    //     images = media
    // }
    if (!mediaArr.length) mediaArr = media;
    let config = {
      dots: true,
      infinite: true,
      speed: 750,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      focusOnSelect: true,
      adaptiveHeight: true,
      asNavFor: thumbSlider,
    };
    let thumbConfig = {
      dots: false,
      infinite: true,
      speed: 750,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      focusOnSelect: true,
      asNavFor: mainSlider,
      vertical: true,
    };
    if (screen.width <= 767) {
      config["dots"] = true;
    }
    let thumbMaxHeight = `100%`;
    if (mediaArr.length <= 4) {
      thumbConfig["infinite"] = false;
      thumbMaxHeight = `${mediaArr.length * 80}px`;
    }

    return (
      <div className="product-slider">
        <div className="thumb-slider">
          <div className="thumb-images" style={{ maxHeight: thumbMaxHeight }}>
            <Slider
              className="thumb-slide"
              {...thumbConfig}
              ref={(slider) => (this.thumbSlider = slider)}
            >
              {mediaArr.map((item, key) =>
                item.media_type == "image" ? (
                  <Srcset key={key} alt={item.alt} src={item.src} />
                ) : (
                  <div className="product-image-swatch" key={key}>
                    <video loop autoPlay playsInline muted controls>
                      <source
                        src={item.sources[item.sources.length - 2]?.url}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )
              )}
            </Slider>
          </div>
        </div>
        <div className="main-slider">
          {floatingImages.length > 0 && (
            <div className="product-floating-img">
              {floatingImages.map((item,i) => {
                if (tags.includes(item.tag_text) && item.floating_image) {
                  return (
                    <div className="float-img" key={i}>
                      <img src={item.floating_image} />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          <div className="slider-images">
            <Slider
              className="main-slide"
              {...config}
              ref={(slider) => (this.mainSlider = slider)}
            >
              {/* {images.map((image,i) => <Srcset key={i} alt={image.alt} src={image.src}/>)} */}
              {mediaArr.map((item, key) =>
                item.media_type == "image" ? (
                  <Srcset key={key} alt={item.alt} src={item.src} />
                ) : (
                  <div className="product-image-swatch" key={key}>
                    <video loop autoPlay playsInline muted controls>
                      <source
                        src={item.sources[item.sources.length - 2]?.url}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )
              )}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
  currentVariant: state.product.currentVariant,
  settings: state.product.settings,
});

export default connect(mapStateToProps, null)(ProductSlider);
