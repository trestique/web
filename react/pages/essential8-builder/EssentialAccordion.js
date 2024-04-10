import React from 'react';
import { connect } from 'react-redux';
import HtmlParser from 'react-html-parser';
import UpsellProductItem from './UpsellProductItem';
/* Import Custom Components */
import { updateUpsellProducts } from "../../redux/essential8/essentialAction";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';


class EssentialAccordion extends React.Component {
  state = {
    accordionOpen : true
  }

  handleAccordion = () => {
    this.setState((prevState) => ({
      accordionOpen : !prevState.accordionOpen
    }))
  }


 
  render() {

    const { sectionData, upsellProducts, updateUpsellProducts } = this.props;
    const {settings} = sectionData;
    const {upsell_discount} = settings;
    if(upsellProducts.length <= 0){
      return null;
    }
    return (
        <div className="accordion-container">
          <div className="accordion-title" onClick={() => this.handleAccordion()}>
            <div className='title-part'>
              <span className='lock-icon'>
                  <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/lock-trestique.png?v=1635502731" />
                  </span>
                  <span className='title-text'>{HtmlParser(sectionData.settings.accordion_title)}</span>
            </div>
              
              <span className="accordion-icon">
                {this.state.accordionOpen ? <p className="icon">—</p> : <p className="icon">+</p>}
              </span>
          </div>
          {
            this.state.accordionOpen && 
              <div className="child-products-section">
               <Swiper  breakpoints={{ 768: { slidesPerView: 3 }}}  slidesPerView={1.5}>
                {
                  upsellProducts.map((product, key) => <SwiperSlide key={key}><UpsellProductItem updateUpsellProducts={updateUpsellProducts} index={key} upsellProducts={upsellProducts} upsell_discount={upsell_discount} key={key} product={product} /></SwiperSlide>)
                }
              </Swiper>
              </div>
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  sectionData : state.essential_8.sectionData,
  upsellProducts : state.essential_8.sectionData.upsell_products
});

const mapDispatchToProps = dispatch => ({
  updateUpsellProducts : (data) => dispatch(updateUpsellProducts(data)),
});
export default connect(mapStateToProps,mapDispatchToProps)(EssentialAccordion);