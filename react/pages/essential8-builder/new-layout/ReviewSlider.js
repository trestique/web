import React from "react";
import { Thumbs, Mousewheel, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

const ReviewSlider = ({ reviews }) => {
  if(reviews?.length <= 0){
    return;
  }
  return (
    <div className="review-slider">
      <Swiper
        mousewheel={true}
        modules={[Thumbs, Mousewheel, Pagination]}
        slidesPerView={1}
      >
        {reviews.map((item, key) => {
            return (
              <SwiperSlide key={key}>
                <div className="review-wrapper">
                  <div className="review-left">
                    <div className="reviewer-image-wrapper">
                      <img src={item?.review_author_logo} alt="author-logo" />
                    </div>
                  </div>
                  <div className="review-right">
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.review_text }}
                    ></div>
                    <span className="reviewer-name">{item?.review_author}</span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
