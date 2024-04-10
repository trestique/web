import React from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import QuizHeader from './QuizHeader';
import {changeQuizStep,getQuizFormData,setQuizFormData} from '../../../redux/quiz/quizAction';
import {showToast,emailValidate} from '../../../components/Helper';
import Loader from '../../../components/Loader';
import QuizStep9Results from './QuizStep9Results';

class QuizStep9 extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        email:"",
        formErrors:{}
    }
    setBirthDate = (birthdate) =>{
        this.setState({birthdate})
    }
    setData = (e) =>{
        const { name, value } = e.target;
        const { formErrors } = this.state;
        let Errors = formErrors;
        Errors[name] = "";
        this.setState({ [name]: value, formErrors: Errors });
    }
    gotoNext = (e) =>{
        e.preventDefault();
        const { formErrors, email, name, phone } = this.state;
        let submitform = true;
        // if (email === "" || !emailValidate(email)) {
        //   if (email === "") {
        //     formErrors.email = "Email address can't be blank";
        //   }
        //   else if (!emailValidate(email)) {
        //     formErrors.email = "Please enter valid email address";
        //   }
        //   submitform = false;
        // }
        if(!submitform){
            this.setState({formErrors})
        }else{
            const {currentQuizStep,getQuizFormData,changeQuizStep,formData,setQuizFormData,settings} = this.props;
            const {products} = settings;
            let {email} = this.state;
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
                crayons.map((item)=>{
                    tags.push(`shadow_crayon_${item}`);
                })
            }
            
            if(lips.length > 0){
                lips.map((item)=>{
                    tags.push(`lips_${item}`);
                })
            }
            const data = {
                id:form_id,
                form:{email},
                tags: tags
            };
            const form = {responses: data, form_id:"selfie-quiz",shop_id:"11406213220",};
            getQuizFormData({url:'/submit-responses',type:"submit-response",form,callback:(res)=>{
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
                    // changeQuizStep(currentQuizStep + 1);
                }else{
                    showToast(res.message);
                }
            }});
        }
    }
    render(){
        const { email,formErrors} = this.state;
        const {settings,askedUserData} = this.props;
        const {screen_9_results_title,screen_9_results_text,screen_9_title,screen_9_text,screen_9_email_placeholder,screen_9_btn_text,screen_9_privacy_policy_text} = settings;
        return(
            <>
            <QuizHeader  title={screen_9_results_title} text={screen_9_results_text} />
            {this.props.loader && <Loader show={true}/> }
            {!askedUserData &&
            <div className="quiz-step-9">
                <div className="quiz-step-9-block">
                    <span className="close-user-form" onClick={this.gotoNext}>
                        <img src={simply.reactCloseIcon} alt="close" />
                    </span>
                    <form autoComplete="off" className="customer-details-form" onSubmit={(e)=>this.gotoNext(e)}>
                        {screen_9_title && <h2 className="title">
                            {ReactHtmlParser(screen_9_title)}
                        </h2>}
                        {screen_9_text && <div className="text-wrap">
                            <div className="text">
                                {ReactHtmlParser(screen_9_text)}
                            </div>
                        </div>}
                        <div className="input-wrap">
                        <input autoComplete="off" value={email} onChange={(e)=>this.setData(e)} type="email" name="email" placeholder={screen_9_email_placeholder} />
                        {formErrors.email && <p className="error">{formErrors.email}</p>}
                        </div>
                        <div className="privacy-text">
                            {ReactHtmlParser(screen_9_privacy_policy_text)}
                        </div>
                        <div className="btn-wrapper">
                            <button  className="ai-quiz-next-btn" type="submit">
                                {screen_9_btn_text}
                            </button>
                        </div>
                        <div className="skip-btn-wrapper">
                            <button  className="btn" type="submit">
                            SKIP
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
            <QuizStep9Results />
            </>
        )
    }
}

const mapStateToProps = state => ({
    settings : state.quiz.settings,
    askedUserData: state.quiz.formData.askedUserData,
    currentQuizStep: state.quiz.currentQuizStep,
    formData:state.quiz.formData,
    loader: state.quiz.loader
});
  

const mapDispatchToProps = dispatch => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
    getQuizFormData: data => dispatch(getQuizFormData(data)),
    setQuizFormData: data => dispatch(setQuizFormData(data))
});
  

export default connect(mapStateToProps,mapDispatchToProps)(QuizStep9);