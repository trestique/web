import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import Slider from "react-slick";

class ProductReviewSlider extends React.Component {
  render() {
    let {settings} = this.props;
    if(!settings){
        return false;
    }
    let { reviews } = settings;
    if(!(reviews && reviews.length > 2)){
        return false;
    }
    let config =  {
        dots: true,
        infinite: true,
        speed: 750,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };
    return (
        <div className="product-reviews-wrap">
            <Slider className="product-reviews-slide" {...config}>
                {reviews.map((review,index)=>{
                    return(
                        <div className='review-inner-wrap' key={index}>
                            <div className='review-inner'>
                                {review.review_author_logo &&
                                    <div className='author-img'>
                                        <img src={review.review_author_logo} alt={review.review_author ? review.review_author : "author image"} />
                                    </div>
                                }
                                {review.review_text && review.review_author &&
                                    <div className="review-text-wrap">
                                        <div className='author-name-country'>
                                            <p className='author-name'>{review.review_author}</p>
                                            {review.review_author_country_logo && 
                                                <div className='author-country'>
                                                    <img src={review.review_author_country_logo} alt={review.review_author_country_logo.alt} />
                                                </div>
                                            }
                                        </div>
                                        <div className='author-review'>{ReactHtmlParser(review.review_text)}</div>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
  }
}
export default ProductReviewSlider;