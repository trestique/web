import React from 'react';
import { connect } from 'react-redux';

import SlickSlider from '../../components/SlickSlider'; 
import Essential8ExtraData from './Essential8ExtraData';
/* Custom Component Imports */
import Srcset from '../../components/Srcset';
import MediaQuery from '../../components/MediaQuery';

class BundleSlider extends React.Component {
  state = {
    slideIndex : 0
  }

  handleImageSwatch = (idx) => {
    this.setState(() => ({ slideIndex : idx  }));
  }

  render() {
    const { sectionData } = this.props;

    if(!sectionData){
      /* if data is not present */
      return <div></div>;
    }
    console.log("sectionData",sectionData);
    const {settings} = sectionData;
    const {top_offer_msg} = settings;
    let slider_settings = { 
      beforeChange: (current, next) => {
        console.log("Before", current, next);
      },
      afterChange: (current, next) => {
        console.log("After", current, next);
      },
      infinite: false,
      dots: true,
      responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll:1,
          arrows: false,
          adaptiveHeight: true
        }
      }
      ]
    };
    return (
      <div className="essential-8-slider">
        {top_offer_msg && 
        <MediaQuery query="phone">
        <p className='top-offer-msg'>{top_offer_msg}</p>
        </MediaQuery>}
        <SlickSlider config={slider_settings} productName="essential-8" slideIndex={this.state.slideIndex}>
        {
          sectionData.base_product.media.map((item , key) => {
            return item.media_type == 'image' ? 
            <div className="product-image-swatch" key={key}>
              <Srcset src={item.src} />
            </div>
            :
            <div className="product-image-swatch" key={key}>
              <video loop autoPlay playsInline muted controls>
                <source src={item.sources[item.sources.length - 2]?.url} type="video/mp4" />
              </video>
            </div>
          })
        }
        </SlickSlider>
        <div className="product-images">
        {
          sectionData.base_product.media.map((item , key) => {
            return item.media_type == 'image' ? 
            <div className="product-image-swatch" key={key}>
              <Srcset src={item.src} onClick={() => this.handleImageSwatch(key)} />
            </div>
            :
          <div className="product-image-swatch" key={key}>
              <Srcset src={item?.preview_image?.src} onClick={() => this.handleImageSwatch(key)} />
            </div>
          })
        }
        </div>
        <MediaQuery query="lap-and-up">
          <Essential8ExtraData settings={sectionData} />
        </MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sectionData : state.essential_8.sectionData
})

export default connect(mapStateToProps)(BundleSlider);