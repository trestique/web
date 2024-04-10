import React from 'react';
import {connect} from 'react-redux';
import EssentialQuizStep1 from './EssentialQuizStep1';
import EssentialQuizStep2 from './EssentialQuizStep2';
import EssentialQuizStep3 from './EssentialQuizStep3';
import EssentialQuizStep3ShadowCrayon from './EssentialQuizStep3ShadowCrayon';
import EssentialQuizStep3Lips from './EssentialQuizStep3Lips';
import EssentialQuizStep4 from './EssentialQuizStep4';
import EssentialQuizStep5 from './EssentialQuizStep5';
import EssentialQuizStep6 from './EssentialQuizStep6';

import {queryString} from '../../../components/Helper';
import Loader from '../../../components/Loader';
import {changeQuizStep,setQuizFormData,getQuizFormData,setQuizLoader} from '../../../redux/quiz/quizAction';
class EssentialQuizTemplate extends React.Component{
    renderCurrentQuiz = () =>{
        const {currentQuizStep,closeEssentialQuiz} = this.props;
        switch(currentQuizStep){
            case 1:
                return <EssentialQuizStep1 closeEssentialQuiz={closeEssentialQuiz}/>
                break;    
            case 2:
                return <EssentialQuizStep2 closeEssentialQuiz={closeEssentialQuiz}/>     
            case 3:
                return <EssentialQuizStep3 closeEssentialQuiz={closeEssentialQuiz}/>  
            case 'shadow':
                return <EssentialQuizStep3ShadowCrayon closeEssentialQuiz={closeEssentialQuiz}/>   
            case 'lips':
                return <EssentialQuizStep3Lips closeEssentialQuiz={closeEssentialQuiz}/>  
            case 4:
                return <EssentialQuizStep4 closeEssentialQuiz={closeEssentialQuiz}/>
            case 5:
                return <EssentialQuizStep5 closeEssentialQuiz={closeEssentialQuiz}/>
            case 6:
                return <EssentialQuizStep6 closeEssentialQuiz={closeEssentialQuiz} />    
            default:
                break;
        }
    }
    componentDidMount(){
        this.props.changeQuizStep(0);
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
  
export default connect(mapStateToProps,mapDispatchToProps)(EssentialQuizTemplate);