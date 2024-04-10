import React from "react";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import QuizHeader from "./QuizHeader";
import {
  changeQuizStep,
  getQuizFormData,
  setQuizFormData,
} from "../../../redux/quiz/quizAction";
import Srcset from "../../../components/Srcset";
import { showToast, handleize } from "../../../components/Helper";
import Loader from "../../../components/Loader";
import MediaQuery from "../../../components/MediaQuery";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import {filePath} from '../../../settings';
import {  Thumbs,Mousewheel } from "swiper";

class QuizStep8 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bag: null,
      wantToNext: false,
      thumbsSwiper : null
    };
  }
  setThumbsSwiper = (thumbsSwiper) =>{
      this.setState({thumbsSwiper});
  }
  getTotalProductsCount = () =>{
    const { formData, settings } = this.props;
    const {selectedProducts,crayons,lips} = formData;
    let totalProductsCount = selectedProducts.length;
    if(crayons.length >= 1){
      totalProductsCount = totalProductsCount + 1;
    }
    if(lips.length > 1){
      const {lipsProductsDetails} = settings;
        let lipsProducts = lipsProductsDetails.product_handles.split(',');
        let {selectedProducts} = formData;
        selectedProducts.map((item)=>{
            lipsProducts.map((handle)=>{
                if(handle == item){
                  totalProductsCount = totalProductsCount + 1;
                }
            })
        })
    }
    return totalProductsCount;
  }
   componentWillMount(){
    const { formData, settings } = this.props;
    const { bagProducts } = settings;
    const { selectedProducts } = formData;
    const { smallBag, largeBag } = bagProducts;
    let bag;
    let totalProducts = this.getTotalProductsCount();
    if (totalProducts > 10) {
      bag = largeBag;
    } else {
      bag = smallBag;
    }
    this.setState({ bag });
  }   
  componentDidMount() {
    this.setState({  mainSlider: this.mainSlider, thumbSlider: this.thumbSlider });
  }
  goToResult = () =>{
    const { changeQuizStep,currentQuizStep } = this.props;
    changeQuizStep(currentQuizStep + 1);
  }
  gotoNext = () => {
    const bag = this.state.bag;
    const { currentQuizStep, getQuizFormData, changeQuizStep, formData } = this.props;
    let totalProducts = this.getTotalProductsCount();
    if (cn(bag.currentVariant)) {
      // showToast("Please Choose your favorite bag");
      if(totalProducts < 4){
        this.setState({wantToNext: true})
      }else{
        changeQuizStep(currentQuizStep + 1);
      }
    } else {
      const { user_quiz_id } = formData;
      let selected_bag = this.state.bag;
      let form = { user_quiz_id, selected_bag };
      formData["selectedBag"] = selected_bag;
      setQuizFormData(formData);
      if((totalProducts + 1) < 4){
        this.setState({wantToNext: true})
      }else{
        changeQuizStep(currentQuizStep + 1);
      }
    }
  };
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
  showBags = () =>{
      this.setState({wantToNext: true});
  }
  goToBack = () =>{
    const { changeQuizStep, formData } = this.props;
    let {eyeBrow,lips,crayons} = formData;
    if(eyeBrow.length > 0){
      changeQuizStep(7)
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
    const { screen_8_error_desk_img, screen_8_title, screen_8_error_btn_1_text , screen_8_error_title, screen_8_error_msg, screen_8_error_xs_img,
      bagImages,screen_8_error_btn_2_text
    } = settings;

    let { bag,wantToNext, thumbsSwiper } = this.state;
    if (cn(bag)) {
      return null;
    }
    let errorDetails = screen_8_error_title;
    let { currentVariant } = bag;
    if (cn(currentVariant)) {
      currentVariant = { id: "" };
    }
    let totalProducts = this.getTotalProductsCount();
    if (!cn(errorDetails)) {
      errorDetails = errorDetails.replace("XX", 4 - totalProducts);
    }
    let images = bagImages[bag.type];
    let slidesToShow = 4;
    let variants = bag.variants.filter((item)=> item.available )
    if(variants.length < 4){
      slidesToShow = variants.length;
    }
    return (
      <div className={`quiz-step-8${totalProducts < 4 ? ' no-margin':""}`}>
        {this.props.loader && <Loader show={true} />}
        <QuizHeader
        back={true}
        title={ReactHtmlParser(screen_8_title)}
        text={ReactHtmlParser(bag.text)}
          currentQuizStep={currentQuizStep}
          changeQuizStep={this.goToBack}
          progress={55}
          settings={settings}
        />
        {/* totalProducts < 4 && !wantToNext */}
            { wantToNext && <div className="error-screen-bg">
              <div className="error-screen">
                <h2 className="title">{ReactHtmlParser(errorDetails)}</h2>
                <div className="img">
                      <MediaQuery query="tablet-and-up">
                          <Srcset src={screen_8_error_desk_img}  />
                      </MediaQuery>
                      <MediaQuery query="phone">
                              <Srcset src={screen_8_error_xs_img} />
                      </MediaQuery>
                  </div>
                <div className="btn-wrapper">
                  
                  <button onClick={this.goToResult}  className="first-btn ai-quiz-next-btn" type="button">
                    {screen_8_error_btn_1_text}
                  </button>
                  <button onClick={this.goToProducts}  className="last-btn ai-quiz-next-btn" type="button">
                    {screen_8_error_btn_2_text}
                  </button>
                </div>
              </div>
            </div>}
            <div className="quiz-step-8-block">
              <ul className="bags">
              <Swiper className="step-4-main-slider" breakpoints={{ 768: { slidesPerView: slidesToShow }}} mousewheel={true} modules={[Thumbs,Mousewheel]} thumbs={{ swiper: thumbsSwiper }} slidesPerView={1}>
                {variants.map((variant) => {
                  return (
                    <SwiperSlide><li className={`${ currentVariant.id === variant.id ? "active" : "" }`} onClick={() => this.updateVariant(variant)} >
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
                              return <SwiperSlide><li onClick={() => this.updateVariant(variant)} className={`${ currentVariant.id === variant.id ? "active" : "" }`}>
                                  <img src={`${filePath}${handleize(variant.title)}.png`} />
                              </li></SwiperSlide>
                          })}
                      </Swiper>
                </ul>
              </div>
              <div className="btn-wrapper">
                <button
                  onClick={this.gotoNext}
                  className="ai-quiz-next-btn"
                  type="button"
                >
                  Next
                </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizStep8);
