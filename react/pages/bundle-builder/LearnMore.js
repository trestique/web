import React, { Component } from "react";
import SlickSlider from "../../components/SlickSlider";
import MediaQuery from '../../components/MediaQuery';
import ReactHtmlParser from "react-html-parser";
class LearnMore extends Component {
  render() {
    let { closePopup, product } = this.props;
    let { title, description, images } = product.learn_more;
    images = images.split(',');
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const { data } = product;
    return (
      <div className="learn-more-popup-wrap">
        <div className="learn-more-inner">
          <div className="header-section-wrap">
            <div className="learn-more-logo">
              <p>learn more</p>
            </div>
            <div className="close-icon-wrap">
              <img src="//cdn.shopify.com/s/files/1/0114/0621/3220/files/side-cart-close-icon.svg?v=8501096318584868990" alt="close" onClick={closePopup} />
            </div>
          </div>
          <MediaQuery query="phone">
            <div className="main-img-title-wrap">
              <div className="main-img-wrap">
                <img src={data.featured_image} alt="product-img" />
              </div>
              <div className="product-title-wrap">
                <h3>{ReactHtmlParser(data.title)}</h3>
              </div>
            </div>
          </MediaQuery>
          <div className="middle-section-wrap">
            <h4 className="learn-more-title">{ReactHtmlParser(title)}</h4>
            <div className="learn-more-description">{ReactHtmlParser(description)}</div>
          </div>
          <div className="bottom-section-wrap">
            <h4 className="learn-more-image-title">THE FULL COLLECTION</h4>
            <div className="learn-more-slider-wrap">
              <SlickSlider {...settings}>
                {images.map((item,i)=>{
                  return <img alt={`images-${i}`} src={item} key={`img-${i}`}/>
                })}
              </SlickSlider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LearnMore;
