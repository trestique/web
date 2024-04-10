import React from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import QuizHeader from './QuizHeader';
import {changeQuizStep,setQuizFormData} from '../../../redux/quiz/quizAction';
import Srcset from '../../../components/Srcset';
import MediaQuery from '../../../components/MediaQuery';
import {showToast} from '../../../components/Helper';
import Loader from '../../../components/Loader';
import Slider from "react-slick";
class QuizStep6 extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        selectedProducts : []
    }

    componentDidMount(){
        const {formData} = this.props;
        const {selectedProducts} = formData;
        this.setState({selectedProducts});
        let aiPage = document.querySelector('.ai-quiz-page');
        if(aiPage){
            aiPage.scrollTo(0, 0);
        }
    }
    
    selectProducts = (product) =>{
        let selectedProducts  = [...this.state.selectedProducts];
        let findItem = selectedProducts.indexOf(product);
        if (findItem > -1) {
            selectedProducts.splice(findItem, 1);
        }else{
            selectedProducts.push(product);
        }
        this.setState({selectedProducts});
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
        const {currentQuizStep,changeQuizStep} = this.props;
        this.props.changeQuizStep(5);
    }
    gotoNext = () =>{
        // selected_makeup_essential_id
        let {selectedProducts} = this.state;
        const {currentQuizStep,changeQuizStep,setQuizFormData,formData,settings} = this.props;
        const {shadowProductsDetails} = settings;
        const {shadow_product_handle} = shadowProductsDetails;
        if(selectedProducts.length <= 0){
            showToast('Please select your product');
        }else{
            formData['selectedProducts'] = this.state.selectedProducts;
            formData['crayons'] = [];
            formData['lips'] = [];
            formData['eyeBrow'] = '';
            setQuizFormData(formData);
            if(selectedProducts.includes(shadow_product_handle)){
                this.props.changeQuizStep('shadow');
            }else if(this.checkLipsExist()){
                this.props.changeQuizStep('lips');
            }else if(selectedProducts.includes('cruelty-free-brow-pencil-gel')){
                this.props.changeQuizStep(7);
            }else{
                this.props.changeQuizStep(8);
            }       
        }
    }
    readBadge = badge =>{
        let {bg_color,color,text} = badge;
        if(!cn(text)){
            let Style = {color,backgroundColor:bg_color}
            return <p className="col-product-badge-msg" style={Style}>{text}</p>
        }else{
            return null;
        }
    }
    render(){
        const {settings,currentQuizStep,changeQuizStep,formData,currentStep6} = this.props;
        const {screen_6_title,screen_6_text,screen_6_save_msg,products,products_display_style,collections} = settings;
        let config =  {
            dots: false,
            infinite: false,
            speed: 750,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
        };
        if(screen.width <= 767 ){
            config['slidesToShow'] = 2;
            config['centerMode'] = true;
            config['infinite'] = true;
            config['centerPadding'] = '20px';
        }
        return(
            <>
            {this.props.loader && <Loader show={true}/> }
               <div className="quiz-step-6">
                <QuizHeader back={true} title={screen_6_title} text={screen_6_text} currentQuizStep={currentQuizStep} changeQuizStep={changeQuizStep} progress={55} settings={settings}/>
                {products_display_style === "products_grid" ?
                <div className="quiz-step-6-block list-blocks">
                    {screen_6_save_msg && <div className='step-6-save-msg'>{ReactHtmlParser(screen_6_save_msg)}</div> }
                    {collections.map((collection,index)=>{
                    return <div key={index} className='collection-list'>
                            <h3 className='collection-title'>
                                <span>{collection.title}</span>
                            </h3>
                            <div className='products-list'>
                                <Slider className="products-list-slider" {...config}>
                                {collection.products.map((product,i)=>{
                                    return <div key={i} className='product'>
                                        <div className={`product-item${this.state.selectedProducts.includes(product.product_handle) ? ' active': ''}`} onClick={()=>this.selectProducts(product.product_handle)}>
                                            {product.metaData &&
                                            <>
                                            {this.readBadge(product.badge)}
                                            </>}
                                            <div className='img'>
                                                <div className='floating-icon'>
                                                <span className='icon'>
                                                    {this.state.selectedProducts.includes(product.product_handle) ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path  fill="#fff" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                                                    :
                                                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.62052 0.0222168C4.7044 0.0232338 3.8261 0.370587 3.1783 0.988078C2.53051 1.60557 2.16611 2.44278 2.16504 3.31604H3.31687C3.31687 2.73366 3.55957 2.17512 3.99159 1.76332C4.42361 1.35151 5.00955 1.12016 5.62052 1.12016C6.23149 1.12016 6.81743 1.35151 7.24945 1.76332C7.68147 2.17512 7.92418 2.73366 7.92418 3.31604H9.076C9.07494 2.44278 8.71053 1.60557 8.06274 0.988078C7.41494 0.370587 6.53664 0.0232338 5.62052 0.0222168V0.0222168Z" fill="white"/>
                                                        <path d="M10.2276 15.3931H7.67051C7.0927 15.3929 6.53605 15.1858 6.11093 14.8128L0.812528 10.1652C0.688821 10.0574 0.591258 9.9252 0.526636 9.77778C0.462015 9.63036 0.43189 9.47129 0.438359 9.31164C0.444828 9.15199 0.487737 8.9956 0.564094 8.85337C0.640452 8.71114 0.748424 8.5865 0.880486 8.48811C1.10674 8.33011 1.3841 8.25303 1.66398 8.2704C1.94387 8.28776 2.20841 8.39845 2.41126 8.58308L4.46843 10.3738V3.31571C4.46843 3.02452 4.58978 2.74526 4.80579 2.53935C5.0218 2.33345 5.31477 2.21777 5.62025 2.21777C5.92574 2.21777 6.21871 2.33345 6.43472 2.53935C6.65073 2.74526 6.77208 3.02452 6.77208 3.31571V7.15851C6.77208 6.86731 6.89343 6.58805 7.10944 6.38214C7.32545 6.17624 7.61843 6.06056 7.92391 6.06056C8.22939 6.06056 8.52236 6.17624 8.73837 6.38214C8.95438 6.58805 9.07574 6.86731 9.07574 7.15851V7.70748C9.07574 7.41628 9.19709 7.13702 9.4131 6.93111C9.62911 6.72521 9.92208 6.60954 10.2276 6.60954C10.533 6.60954 10.826 6.72521 11.042 6.93111C11.258 7.13702 11.3794 7.41628 11.3794 7.70748V8.25645C11.3794 7.96525 11.5007 7.68599 11.7168 7.48008C11.9328 7.27418 12.2257 7.15851 12.5312 7.15851C12.8367 7.15851 13.1297 7.27418 13.3457 7.48008C13.5617 7.68599 13.683 7.96525 13.683 8.25645V12.0992C13.683 12.9728 13.319 13.8106 12.671 14.4283C12.0229 15.046 11.144 15.3931 10.2276 15.3931Z" fill="white"/>
                                                        </svg>
                                                    }
                                                </span>
                                                <span className='text'>tap to select</span>
                                            </div> 
                                                <Srcset src={product.product_image} />
                                            </div>
                                            <p className='title'>{product.product_title}</p>
                                            {product.metaData && <>{product.metaData.short_info && <div className='short-info'>{product.metaData.short_info}</div>}</>}
                                        </div>
                                    </div>
                                })}
                                </Slider>
                            </div>
                        </div>
                    })}
                </div>
                :
                <div className="quiz-step-6-block">
                    <h2 className="title">
                        {ReactHtmlParser(screen_6_title)}
                    </h2>
                    <div className="text-wrap">
                        <div className="text">
                            {ReactHtmlParser(screen_6_text)}
                        </div>
                    </div>
                    {products.length > 0 && 
                    <ul className="quiz-step-6-options">
                    {products.map((item,index)=>{
                        return <li key={index} >
                            <div className="img item-img">
                                {item.image_top_text && <div className="item-top-text xs-hide">{ReactHtmlParser(item.image_top_text)}</div>}
                                {item.image_bottom_text && <div className="item-bottom-text xs-show">{ReactHtmlParser(item.image_bottom_text)}</div>}
                                <Srcset className={`${item.visible_image_Xs ? ' img-xs-hide' :''}`} src={item.image} alt={item.product_handle}/>
                                {item.image_bottom_text && <div className="item-bottom-text xs-hide">{ReactHtmlParser(item.image_bottom_text)}</div>}
                            </div>
                            <div className={`img product-img ${this.state.selectedProducts.includes(item.product_handle) ? ' active': ''}`}>
                            {item.image_top_text && <div className="item-top-text xs-show">{ReactHtmlParser(item.image_top_text)}</div>}
                                <div className="img-wrap" onClick={()=>this.selectProducts(item.product_handle)}>
                                    <div className="img-relative">
                                        <span className="select-text">Select</span>
                                        <div className="check-mark">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path  fill="#fff" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                                        </div>
                                        <Srcset src={item.product_image} alt={item.product_handle}/>
                                        <h4 className="product-title">{item.product_title}</h4>
                                    </div>
                                </div>
                            </div>
                        </li>
                    })}
                    </ul>}
                </div>
                }
                <div className='btn-wrapper-bg'>
                    <div className="btn-wrapper">
                        <button onClick={this.gotoBack} className="light-color ai-quiz-next-btn" type="button">
                        Back
                        </button>
                        <button onClick={this.gotoNext} className="ai-quiz-next-btn" type="button">
                        Next
                        </button>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    settings : state.quiz.settings,
    currentQuizStep: state.quiz.currentQuizStep,
    formData:state.quiz.formData,
    loader: state.quiz.loader,
    currentStep6:state.quiz.formData.currentStep6
});
  

const mapDispatchToProps = dispatch => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
    setQuizFormData: data => dispatch(setQuizFormData(data)),
});
  

export default connect(mapStateToProps,mapDispatchToProps)(QuizStep6);