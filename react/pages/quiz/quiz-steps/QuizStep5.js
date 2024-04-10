import React from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import QuizHeader from './QuizHeader';
import {changeQuizStep,getQuizFormData,setQuizFormData} from '../../../redux/quiz/quizAction';
import Srcset from '../../../components/Srcset';
import {showToast,handleize} from '../../../components/Helper';
import MediaQuery from '../../../components/MediaQuery';
import Loader from '../../../components/Loader';
import {  Thumbs,Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

class QuizStep5 extends React.Component{
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
        const {settings,formData,skinTone} = this.props;
        let options = settings.skinTypesDetails[handleize(formData.skinType)];
        let index = options.findIndex((item)=> handleize(item.text) == handleize(skinTone));
        swiper.slideTo(index);
    }
    selectTone = (skinTone,next) =>{
        let {setQuizFormData,formData,changeQuizStep,currentQuizStep} = this.props;
        formData['skinTone'] = skinTone;
        setQuizFormData(formData);
        if(next){
            changeQuizStep(currentQuizStep + 1);  
        }
    }
    gotoNext = () =>{
        const {currentQuizStep,changeQuizStep,skinTone} = this.props;
        if(cn(skinTone)){
            showToast('Please select your skintone');
        }else{
            changeQuizStep(currentQuizStep + 1);  
        }
    }
    
    render(){
        const {settings,currentQuizStep,changeQuizStep,formData,skinTone} = this.props;
        const {screen_5_title,screen_5_text} = settings;
        let options = [];
        let {thumbsSwiper} = this.state;
        options = settings.skinTypesDetails[handleize(formData.skinType)];
        let width = '100%';
        if(options.length < 4 && screen.width > 767 ){
            width = `${options.length * 25}%`;
        }
        return(
            <div className="quiz-step-5">
                {this.props.loader && <Loader show={true}/> }
                <QuizHeader back={true} title={ReactHtmlParser(screen_5_title)} text={ReactHtmlParser(screen_5_text)}  currentQuizStep={currentQuizStep} changeQuizStep={changeQuizStep} progress={40} settings={settings}/>
                <div className="quiz-step-5-block" style={{'width':width}}>
                    {options.length > 0 && 
                    <ul className="quiz-step-5-options">
                        <Swiper onSwiper={(swiper) => this.moveSlideToSelectedItem(swiper)} className="step-4-main-slider" breakpoints={{ 768: { slidesPerView: options.length }}} mousewheel={true}  modules={[Thumbs,Mousewheel]} thumbs={{ swiper: thumbsSwiper }} slidesPerView={1.2}>
                            {options.map((item)=>{
                                return <SwiperSlide><li key={item.text} className={`${handleize(skinTone) === handleize(item.text) ? 'active': ''}`} onClick={()=>this.selectTone(item.text,true)}>
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
                                    return <SwiperSlide><li className={`${handleize(skinTone) === handleize(item.text) ? 'active': ''}`} onClick={()=>this.selectTone(item.text)}>
                                        <img src={item.swatch_img} />
                                    </li></SwiperSlide>
                                })}
                        </Swiper>
                    </ul>
                    {/* <div className="btn-wrapper">
                    <button onClick={this.gotoNext} className="ai-quiz-next-btn" type="button">
                    Next
                    </button>
                    </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    settings : state.quiz.settings,
    currentQuizStep: state.quiz.currentQuizStep,
    formData:state.quiz.formData,
    skinTone: state.quiz.formData.skinTone,
    loader: state.quiz.loader
});
  

const mapDispatchToProps = dispatch => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
    setQuizFormData: data => dispatch(setQuizFormData(data)),
    getQuizFormData: data => dispatch(getQuizFormData(data)),
});
  

export default connect(mapStateToProps,mapDispatchToProps)(QuizStep5);