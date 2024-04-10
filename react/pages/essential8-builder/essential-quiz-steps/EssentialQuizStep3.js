import React from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import {changeQuizStep,getQuizFormData,setQuizFormData} from '../../../redux/quiz/quizAction';
import Srcset from '../../../components/Srcset';
import {showToast,handleize,readCookie} from '../../../components/Helper';
import MediaQuery from '../../../components/MediaQuery';
import Loader from '../../../components/Loader';
import {  Thumbs,Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

class EssentialQuizStep3 extends React.Component{
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
        let {setQuizFormData,formData,changeQuizStep,settings} = this.props;
        const {products,shadowProductsDetails} = settings;
        const selectedProducts = products.map((product)=> product.product_handle)
        const {shadow_product_handle} = shadowProductsDetails;
        formData['skinTone'] = skinTone;
        formData['selectedProducts'] = selectedProducts;
        setQuizFormData(formData);
        if(next){
            if(selectedProducts.includes(shadow_product_handle)){
                changeQuizStep('shadow');
            }else if(this.checkLipsExist()){
                changeQuizStep('lips');
            }else if(selectedProducts.includes('cruelty-free-brow-pencil-gel')){
                changeQuizStep(4);
            }else{
                changeQuizStep(5);
            }
        }
    }

    checkLipsExist = () =>{
        let lipsExist = false;
        const {settings,formData} = this.props;
        const {lipsProductsDetails} = settings;
        let lipsProducts = lipsProductsDetails.product_handles.split(',');
        let {selectedProducts} = formData;
        selectedProducts.map((item)=>{
            lipsProducts.map((handle)=>{
                if(handle == item){
                    lipsExist = true;
                }
            })
        })
        return lipsExist;
    }
    gotoBack = () =>{
        const {currentQuizStep} = this.props;
        this.props.changeQuizStep(currentQuizStep - 1);
    }
    gotoNext = () =>{
        const {setQuizFormData,changeQuizStep,skinTone,settings,formData} = this.props;
        const {products,shadowProductsDetails} = settings;
        const selectedProducts = products.map((product)=> product.product_handle)
        const {shadow_product_handle} = shadowProductsDetails;
        if(cn(skinTone)){
            showToast('Please select your skintone');
        }else{
            formData['selectedProducts'] = selectedProducts;
            formData['crayons'] = [];
            formData['lips'] = [];
            formData['eyeBrow'] = '';
            setQuizFormData(formData);
            if(selectedProducts.includes(shadow_product_handle)){
                changeQuizStep('shadow');
            }else if(this.checkLipsExist()){
                changeQuizStep('lips');
            }else if(selectedProducts.includes('cruelty-free-brow-pencil-gel')){
                changeQuizStep(4);
            }else{
                changeQuizStep(5);
            }
            // changeQuizStep(currentQuizStep + 1);  
        }
    }  
    render(){
        const {settings,currentQuizStep,changeQuizStep,formData,skinTone} = this.props;
        const {screen_3_title,screen_3_text} = settings;
        let options = [];
        let {thumbsSwiper} = this.state;
        options = settings.skinTypesDetails[handleize(formData.skinType)];
        let width = '100%';
        if(options.length < 4 && screen.width > 767 ){
            width = `${options.length * 25}%`;
        }
        return(
            <div className="essential-quiz-step-3 essential-shade-quiz-main">
            <div className="essential-shade-quiz-main-details">
                <span className="close-quiz">
                  <img className='back-arrow' onClick={this.gotoBack} src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector_5_53276ce9-7b50-424f-ab51-1b2b25e4acfe.png?v=1661772655" alt="back-arrow" />
                  <img className='close-icon'  onClick={this.props.closeEssentialQuiz} src="//cdn.shopify.com/s/files/1/0114/0621/3220/files/side-cart-close-icon.svg?v=8501096318584868990" alt="close" />
                </span>
                {this.props.loader && <Loader show={true}/> }
                <div className="essential-quiz-step-3-block" style={{'width':width}}>
                  <div className='title-wrap'>
                      {screen_3_title && <h3 className='essential-quiz-title'>{ReactHtmlParser(screen_3_title)}</h3>}
                      {screen_3_title && <div className='essential-quiz-text'>{ReactHtmlParser(screen_3_title)}</div>}
                  </div>
                    {options.length > 0 && 
                    <ul className="essential-quiz-step-3-options">
                        <Swiper onSwiper={(swiper) => this.moveSlideToSelectedItem(swiper)} className="step-3-main-slider" breakpoints={{ 768: { slidesPerView: options.length }}} mousewheel={true}  modules={[Thumbs,Mousewheel]} thumbs={{ swiper: thumbsSwiper }} slidesPerView={1.5}>
                            {options.map((item,i)=>{
                                return <SwiperSlide key={i}><li key={item.text} className={`${handleize(skinTone) === handleize(item.text) ? 'active': ''}`} onClick={()=>this.selectTone(item.text,true)}>
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
                                    return <SwiperSlide key={i}><li className={`${handleize(skinTone) === handleize(item.text) ? 'active': ''}`} onClick={()=>this.selectTone(item.text)}>
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
    skinTone: state.quiz.formData.skinTone,
    loader: state.quiz.loader
});
  

const mapDispatchToProps = dispatch => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
    setQuizFormData: data => dispatch(setQuizFormData(data)),
    getQuizFormData: data => dispatch(getQuizFormData(data)),
});
  

export default connect(mapStateToProps,mapDispatchToProps)(EssentialQuizStep3);