import React from "react";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import {
  changeQuizStep,
  getQuizFormData,
  setQuizFormData,
} from "../../../redux/quiz/quizAction";
import Srcset from "../../../components/Srcset";
import { showToast, handleize,readCookie } from "../../../components/Helper";
import Loader from "../../../components/Loader";
import MediaQuery from "../../../components/MediaQuery";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import {filePath} from '../../../settings';
import {  Thumbs,Mousewheel } from "swiper";

class EssentialQuizStep5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bag: null,
      thumbsSwiper : null,
      loader: false
    };
  }
  setThumbsSwiper = (thumbsSwiper) =>{
      this.setState({thumbsSwiper});
  }
  
   componentWillMount(){
    const { formData, settings } = this.props;
    const { bagProducts } = settings;
    const { selectedProducts } = formData;
    const { bag, } = bagProducts;
    this.setState({ bag });
  }   
  componentDidMount() {
    this.setState({  mainSlider: this.mainSlider, thumbSlider: this.thumbSlider });
  }
  goToResult = () =>{
    const { changeQuizStep,currentQuizStep } = this.props;
    changeQuizStep(currentQuizStep + 1);
  }

  gotoNext = (e) =>{
    e.preventDefault();
    const bag = this.state.bag;
    if (cn(bag.currentVariant)) {
      // showToast("Please Choose your favorite bag");
        changeQuizStep(currentQuizStep + 1);
        return
    } 
    this.setState({loader:true});
    const {currentQuizStep,getQuizFormData,changeQuizStep,formData,setQuizFormData,settings} = this.props;
    let selected_bag = this.state.bag;
    formData["selectedBag"] = selected_bag;
    const {products} = settings;
    let {form_id,skinType,skinTone,eyeBrow,makeup,selectedProducts,crayons,lips,selectedBag} = formData;
    let tags = [];
    
    if(!cn(skinType)){
        tags.push(`skintype_${skinType}`);
    }
    if(!cn(skinTone)){
        tags.push(`skintone_${skinTone}`);
    }
    if(!cn(eyeBrow)){
        tags.push(`eyebrow_${eyeBrow}`);
    }
    if(!cn(selectedBag)){
        tags.push(`bagid_${selectedBag.currentVariant.id}`);
        tags.push(`bag_productid_${selectedBag.id}`);
    }
    if(makeup.length > 0){
        makeup.map((item)=>{
            tags.push(`makeup_${item}`);
        })
    }
    if(selectedProducts.length > 0){
        selectedProducts.map((item)=>{
            tags.push(`product_${item}`);
        })
    }
    if(crayons.length > 0){
        tags.push(`shadow_crayon_${crayons}`);
    }
    
    if(lips.length > 0){
        tags.push(`lips_${lips}`);
    }
    const data = {
        id:form_id,
        form:{email:""},
        tags: tags
    };
    const form = {responses: data, form_id:"selfie-quiz",shop_id:"11406213220",};
    getQuizFormData({url:'/submit-responses',notLoad:true,type:"submit-response",form,callback:(res)=>{
        if(res.status == 200){
            const resultProducts = [];
            products.map((item)=>{
                res.products.map((resItem)=>{
                    if(resItem.handle === item.product_handle){
                        let selectedVariantId = res.selected_variants[item.id];
                        let currentVariants = item.variants.filter((variant)=> selectedVariantId.includes(variant.id.toString()));
                        if(currentVariants.length > 0){
                            currentVariants.map((variant)=>{
                                let finalItem = {...item};
                                finalItem['currentVariant'] = variant;
                                resultProducts.push(finalItem);
                            })
                        }
                    }
                })
            })
            formData['resultProducts'] = resultProducts;
            formData['askedUserData'] = true;
            setQuizFormData(formData);
            this.setState({loader:false});
            changeQuizStep(currentQuizStep + 1);
        }else{
            showToast(res.message);
        }
    }});
  }

  updateVariant = (variant) => {
    let bag = this.state.bag;
    if(JSON.stringify(bag.currentVariant) == JSON.stringify(variant)){
      bag.currentVariant = null;
      this.setState({ bag });
    }else{
      bag.currentVariant = variant;
      this.setState({ bag });
    }
  };
  goToProducts = () => {
    this.props.changeQuizStep(6);
  };
  goToBack = () =>{
    const { changeQuizStep, formData } = this.props;
    let {eyeBrow,lips,crayons} = formData;
    if(eyeBrow.length > 0){
      changeQuizStep(4)
    }else if(lips.length > 0){
      changeQuizStep('lips');
    }else if(crayons.length > 0){
      changeQuizStep('shadow');
    }else{
      changeQuizStep(6)
    }
  }
  render() {
    const { settings, currentQuizStep, changeQuizStep, formData } = this.props;
    const { screen_5_title,screen_5_bag_text, bagImages } = settings;

    let { bag, thumbsSwiper } = this.state;
    if (cn(bag)) {
      return null;
    }
    let { currentVariant } = bag;
    if (cn(currentVariant)) {
      currentVariant = { id: "" };
    }
   
    let images = bagImages[bag.type];
    let slidesToShow = 4;
    let variants = bag.variants.filter((item)=> item.available )
    if(variants.length < 4){
      slidesToShow = variants.length;
    }
    return (
      <div className={`essential-quiz-step-5 essential-shade-quiz-main`}>
        <div className="essential-shade-quiz-main-details">
        <span className="close-quiz">
          <img className='back-arrow' onClick={this.goToBack} src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector_5_53276ce9-7b50-424f-ab51-1b2b25e4acfe.png?v=1661772655" alt="back-arrow" />
          <img className='close-icon'  onClick={this.props.closeEssentialQuiz} src="//cdn.shopify.com/s/files/1/0114/0621/3220/files/side-cart-close-icon.svg?v=8501096318584868990" alt="close" />
        </span>
        <div className={`essential-quiz-step-5`}>
          {this.state.loader && <Loader show={true} />}
            
              <div className="essential-quiz-step-5-block essential-quiz-step-3-block">
              <div className='title-wrap'>
                  {screen_5_title && <h3 className='essential-quiz-title'>{ReactHtmlParser(screen_5_title)}</h3>}
                  {screen_5_bag_text && <div className='essential-quiz-text'>{ReactHtmlParser(screen_5_bag_text)}</div>}
              </div>
                <ul className="bags">
                <Swiper className="step-5-main-slider" breakpoints={{ 768: { slidesPerView: slidesToShow }}} mousewheel={true} modules={[Thumbs,Mousewheel]} thumbs={{ swiper: thumbsSwiper }} slidesPerView={1.5}>
                  {variants.map((variant,i) => {
                    return (
                      <SwiperSlide key={i}><li className={`${ currentVariant.id === variant.id ? "active" : "" }`} onClick={() => this.updateVariant(variant)} >
                        <div className="img">
                          {!cn(images[variant.title]) ? (
                            <Srcset
                              src={images[variant.title]}
                              alt={variant.title}
                            />
                          ) : (
                            <Srcset
                              src={variant.featured_image.src}
                              alt={variant.title}
                            />
                          )}
                        </div>
                        <p className="bag-title">{variant.title}</p>
                      </li></SwiperSlide>
                    );
                  })}
                  </Swiper>
                </ul>
                <div className='swatches-quiz-wrap'>
                  <ul className='swatches-quiz'>
                        <Swiper slidesPerView={variants.length} onSwiper={this.setThumbsSwiper} modules={[Thumbs]}>
                            {variants.map((variant,i)=>{
                                return <SwiperSlide key={i}><li onClick={() => this.updateVariant(variant)} className={`${ currentVariant.id === variant.id ? "active" : "" }`}>
                                    <img src={`${filePath}${handleize(variant.title)}.png`} />
                                </li></SwiperSlide>
                            })}
                        </Swiper>
                  </ul>
                </div>
              </div>
              <div className="btn-wrapper-bg">
                  <div className="btn-wrapper">
                    <button onClick={this.goToBack} className="light-color ai-quiz-next-btn" type="button">
                      Back
                      </button>
                      <button onClick={this.gotoNext} className="ai-quiz-next-btn second-btn-container" type="button">
                      Select
                    </button>
                  </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.quiz.settings,
  currentQuizStep: state.quiz.currentQuizStep,
  formData: state.quiz.formData,
  loader: state.quiz.loader,
});

const mapDispatchToProps = (dispatch) => ({
  changeQuizStep: (step) => dispatch(changeQuizStep(step)),
  getQuizFormData: (data) => dispatch(getQuizFormData(data)),
  setQuizFormData: (data) => dispatch(setQuizFormData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EssentialQuizStep5);
