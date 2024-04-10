import React from "react";
import { connect } from "react-redux";

import Srcset from "../../../components/Srcset";
import { Thumbs, Mousewheel } from "swiper";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
class ImageSlider extends React.Component {
  render() {
    const { sectionData } = this.props;

    if (!sectionData) {
      /* if data is not present */
      return <div></div>;
    }
    const { settings } = sectionData;

    return (
      <div className="essential-8-slider">
        <Swiper
          className="step-4-main-slider"
          mousewheel={true}
          modules={[Thumbs, Mousewheel, Pagination]}
          slidesPerView={1.2}
          pagination={true}
        >
          {sectionData.base_product.media.map((item, key) => {
            return (
              <SwiperSlide key={key}>
                {item.media_type == "image" ? (
                  <div className="product-image-swatch">
                    <Srcset src={item.src} />
                  </div>
                ) : (
                  <div className="product-image-swatch" key={key}>
                    <video loop autoPlay playsInline muted controls>
                      <source
                        src={item.sources[item.sources.length - 1]?.url}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sectionData: state.essential_8.sectionData,
});

export default connect(mapStateToProps)(ImageSlider);
