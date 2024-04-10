import React from 'react';
import {connect} from 'react-redux';
import QuizStep1 from './quiz-steps/QuizStep1';
// import QuizStep2 from './quiz-steps/QuizStep2';
import QuizStep3 from './quiz-steps/QuizStep3';
import QuizStep4 from './quiz-steps/QuizStep4';
import QuizStep5 from './quiz-steps/QuizStep5';
import QuizStep6 from './quiz-steps/QuizStep6';
import QuizStep7 from './quiz-steps/QuizStep7';
import QuizStep8 from './quiz-steps/QuizStep8';
import QuizStep9 from './quiz-steps/QuizStep9';
// import QuizStep10 from './quiz-steps/QuizStep9Results';
import QuizStep6ShadowCrayon from './quiz-steps/QuizStep6ShadowCrayon';
import QuizStep6Lips from './quiz-steps/QuizStep6Lips';
import {queryString} from '../../components/Helper';
import Loader from '../../components/Loader';
import {changeQuizStep,setQuizFormData,getQuizFormData,setQuizLoader} from './../../redux/quiz/quizAction';
class QuizTemplate extends React.Component{
    renderCurrentQuiz = () =>{
        const {currentQuizStep} = this.props;
        switch(currentQuizStep){
            case 1:
                return <QuizStep1/>
                break;
            case 2:
                return null
                break;
            case 3:
                return <QuizStep3/>
                break;    
            case 4:
                return <QuizStep4/>     
            case 5:
                return <QuizStep5/>  
            case 6:
                return <QuizStep6/>  
            case 'shadow':
                return <QuizStep6ShadowCrayon/>   
            case 'lips':
                return <QuizStep6Lips/>  
            case 7:
                return <QuizStep7/>
            case 8:
                    return <QuizStep8/>               
            case 9:
                    return <QuizStep9/>
            default:
                break;
        }
    }
    goTOLastStep = (resp_id) =>{
        const {settings,getQuizFormData,setQuizFormData,changeQuizStep,setQuizLoader} = this.props;
        setQuizLoader(true);
        const {products,bagProducts} = settings;
        let formData = {};
        getQuizFormData({resp_id,url:'/submit-responses',type:"email-submit-response",form:formData,callback:(res)=>{
            if(res.status == 200){
                let bagid = "",bagProductId = "";
                res.tags.map((tag)=>{
                    if(tag.includes('bag_productid_')){
                        let id = tag.replace('bag_productid_','');
                        bagProductId = parseInt(id);
                    }
                    if(tag.includes('bagid_')){
                        let id = tag.replace('bagid_','');
                        bagid = parseInt(id);
                    }
                })
                if(!cn(bagProductId) && !cn(bagid)){
                    let bag = null;
                    if(!cn(bagProducts.largeBag)){
                        if(bagProducts.largeBag.id == bagProductId){
                            bag = bagProducts.largeBag;
                        }
                    }
                    if(!cn(bagProducts.smallBag)){
                        if(bagProducts.smallBag.id == bagProductId){
                            bag = bagProducts.smallBag;
                        }
                    }
                    if(!cn(bag)){
                        let currentVariant = bag.variants.find((variant)=> variant.id == bagid);
                        bag['currentVariant'] = currentVariant;
                        formData['selectedBag'] = bag;
                    }
                }
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
               1
                setQuizFormData(formData);
                formData['fromEmail'] = true;
                formData['askedUserData'] = true;
                changeQuizStep(9);
                setQuizLoader(false);
            }else{
                showToast(res.message);
            }
        }});
    }
    componentDidMount(){
        let resp_id = queryString().resp_id;
        if(resp_id){
            if(!cn(resp_id.value)){
                // when user come from email with direct response id
                this.goTOLastStep(resp_id.value);
            }
        }else{
            this.props.changeQuizStep(1);
        }
    }
    render(){
        let {currentQuizStep} = this.props;
        if(this.props.loader){
            return <Loader show={true}/> 
        }  
        if(currentQuizStep == 0){
            return <></>;
        }
        return(
            <>
            {this.renderCurrentQuiz()}
            </>
        )
    }
}


const mapStateToProps = state => ({
    settings : state.quiz.settings,
    currentQuizStep: state.quiz.currentQuizStep,
    loader: state.quiz.loader
});
  
const mapDispatchToProps = dispatch => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
    getQuizFormData: data => dispatch(getQuizFormData(data)),
    setQuizFormData: data => dispatch(setQuizFormData(data)),
    setQuizLoader: value => dispatch(setQuizLoader(value))
});
  
export default connect(mapStateToProps,mapDispatchToProps)(QuizTemplate);