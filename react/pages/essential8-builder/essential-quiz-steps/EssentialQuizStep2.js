import React from 'react';
import {connect} from 'react-redux';
import {changeQuizStep,setQuizFormData} from '../../../redux/quiz/quizAction';
import Srcset from '../../../components/Srcset';
import {showToast,handleize,readCookie} from '../../../components/Helper';
import Loader from '../../../components/Loader';
import MediaQuery from '../../../components/MediaQuery';
// import Slider from "react-slick";
import {  Thumbs,Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';




// import UploadClient from '@uploadcare/upload-client'

class EssentialQuizStep2 extends React.Component{
    constructor(props){
        super(props);
         this.state = {
            thumbsSwiper : null
          };
    }
    setThumbsSwiper = (thumbsSwiper) =>{
        this.setState({thumbsSwiper});
    }
    moveSlideToSelectedItem = (swiper) =>{
        const {settings,skinType} = this.props;
        const {skinTypes} = settings;
        let index = skinTypes.findIndex((item)=> handleize(item.text) == handleize(skinType));
        swiper.slideTo(index);
    }
    selectType = (skinType,trigger,next) =>{
        let {formData,settings,setQuizFormData} = this.props;
        let {skinTypes} = settings;
        let aiOption = skinTypes.find((item)=> handleize(item.text) == handleize(skinType));
        formData['skinType'] = skinType;
        if(aiOption.text == skinType){
            trigger = false;
        }
        if(trigger){
            formData['skinTone'] = "";
        }
        setQuizFormData(formData);
        if(next){
            this.gotoNext();
        }
    }
    gotoNext = () =>{
        const {skinType} = this.props;
        if(cn(skinType)){
            showToast('Please select your match');
        }else{
            const {currentQuizStep} = this.props;
            this.props.changeQuizStep(currentQuizStep + 1);
        }
    }

    gotoBack = () =>{
        const {currentQuizStep} = this.props;
        this.props.changeQuizStep(currentQuizStep - 1);
    }
    componentDidMount(){
        const {settings,formData,skinType} = this.props;
        const {skinTypes} = settings;
        let option = skinTypes.find((item)=> handleize(item.text) == handleize(skinType));
        if(option){
            this.selectType(option.text,false)
        }
    }
    render(){
        let {settings,currentQuizStep,changeQuizStep,skinType} = this.props;
        const {skinTypes,screen_2_title,screen_2_subtitle} = settings;
        let {thumbsSwiper} = this.state;
        let options = skinTypes;
        // skinType = "Medium";
        return(
            <div className="essential-quiz-step-2 essential-shade-quiz-main">
                <div className="essential-shade-quiz-main-details">
                <span className="close-quiz">
                  <img className='back-arrow'  onClick={this.gotoBack} src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector_5_53276ce9-7b50-424f-ab51-1b2b25e4acfe.png?v=1661772655" alt="back-arrow" />
                  <img className='close-icon'  onClick={this.props.closeEssentialQuiz} src="//cdn.shopify.com/s/files/1/0114/0621/3220/files/side-cart-close-icon.svg?v=8501096318584868990" alt="close" />
                </span>
                {this.props.loader && <Loader show={true}/> }
                <div className="essential-quiz-step-2-block">
                  <div className='title-wrap'>
                      {screen_2_title ? <h2 className='essential-quiz-title'>{screen_2_title}</h2> : null}
                      {screen_2_subtitle ? <span className='.essential-quiz-text'>{screen_2_subtitle}</span> : null}
                  </div>
                    {options.length > 0 && 
                    <ul className="essential-quiz-step-2-options">
                    <Swiper className="essential-step-2-main-slider" onSwiper={(swiper) => this.moveSlideToSelectedItem(swiper) } breakpoints={{ 768: { slidesPerView: 4 }}} mousewheel={true} modules={[Thumbs,Mousewheel]} thumbs={{ swiper: thumbsSwiper }} slidesPerView={1.5}>
                    {options.map((item,i)=>{
                        return <SwiperSlide key={i}><li key={item.text}  className={`${handleize(skinType) == handleize(item.text) ? 'active': ''}`} onClick={()=>this.selectType(item.text,true, true)}>
                                    <div className='select-text'>
                                        That's me
                                    </div>
                                    <MediaQuery query="tablet-and-up">
                                        <div className="img">
                                        <Srcset src={item.image} alt={item.text} />
                                        </div>
                                    </MediaQuery>
                                    <MediaQuery query="phone">
                                        <div className="img">
                                            <Srcset src={item.image_xs} alt={item.text} />
                                        </div>
                                    </MediaQuery>
                                    <div className='text-box' style={{'background':`${item.bg_color}`,color:`${item.text_color}`}}>
                                    <p>{item.text}</p>
                                    <span>{item.info}</span>
                                    </div>
                                </li></SwiperSlide>
                        })}
                    </Swiper>
                    </ul>}
                    <ul className='swatches-quiz'>
                        <Swiper slidesPerView={options.length} onSwiper={this.setThumbsSwiper} modules={[Thumbs]}>
                            {options.map((item,i)=>{
                                return <SwiperSlide key={i}><li className={`${handleize(skinType) == handleize(item.text) ? 'active': ''}`} onClick={()=>this.selectType(item.text,true,false)}>
                                    <img src={item.swatch_img} />
                                </li></SwiperSlide>
                            })}
                        </Swiper>
                    </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    settings : state.quiz.settings,
    currentQuizStep: state.quiz.currentQuizStep,
    formData:state.quiz.formData,
    skinType: state.quiz.formData.skinType,
    loader: state.quiz.loader
});
  

const mapDispatchToProps = dispatch => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
    setQuizFormData: data => dispatch(setQuizFormData(data))
});
  

export default connect(mapStateToProps,mapDispatchToProps)(EssentialQuizStep2);