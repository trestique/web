import React from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import QuizHeader from './QuizHeader';
import {changeQuizStep,getQuizFormData,setQuizFormData} from '../../../redux/quiz/quizAction';
import Srcset from '../../../components/Srcset';
import {showToast,handleize} from '../../../components/Helper';
import Loader from '../../../components/Loader';
import MediaQuery from '../../../components/MediaQuery';


// "Blonde / Grey"
// "Brunette / Brown"
// "Dark Brown / Black"
// "Very Dark Brown / Black"
class QuizStep6EyeBrow extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        eyeBrow : ''
    }
    selectEyeBrow = (eyeBrow) =>{
        this.setState({eyeBrow},()=>{
            this.gotoNext();
        })
    }
    gotoNext = () =>{
        if(cn(this.state.eyeBrow)){
            showToast('Please select your eyebrow color');
        }else{
            const {currentQuizStep,getQuizFormData,changeQuizStep,setQuizFormData,formData} = this.props;
            formData['eyeBrow'] = this.state.eyeBrow;
            this.props.setQuizFormData(formData);
            this.props.changeQuizStep(currentQuizStep + 1);
        }
    }
    render(){
        const {settings,currentQuizStep,changeQuizStep,formData} = this.props;
        const {screen_7_title,screen_7_text} = settings;
        const options = settings.eyeBrows;
        return(
            <div className="quiz-step-7">
                {this.props.loader && <Loader show={true}/> }
                <QuizHeader  currentQuizStep={currentQuizStep} changeQuizStep={changeQuizStep} progress={80} settings={settings}/>
                <div className="quiz-step-7-block">
                    <h2 className="title">
                        {ReactHtmlParser(screen_7_title)}
                    </h2>
                    <div className="text-wrap">
                        <div className="text">
                            {ReactHtmlParser(screen_7_text)}
                        </div>
                    </div>
                    {options.length > 0 && 
                    <ul className="quiz-step-7-options">
                    {options.map((item,index)=>{
                        return <li key={index} className={`${handleize(this.state.eyeBrow) === handleize(item.api_text) ? 'active': ''}`} onClick={()=>{this.selectEyeBrow(item.api_text)}} >
                            
                            <MediaQuery query="tablet-and-up">
                            <div className="img item-img">
                                    <Srcset src={item.image} alt={item.text} />
                                    </div>
                                </MediaQuery>
                                <MediaQuery query="phone">
                                <div className="img item-img">
                                        <Srcset src={item.image_Xs} alt={item.text} />
                                    </div>
                                </MediaQuery>
                            <p className="text">{item.text}</p>
                        </li>
                    })}
                    </ul>}
                </div>
                <div className="btn-wrapper hide">
                    <button onClick={this.gotoNext} className="ai-quiz-next-btn" type="button">
                    Next
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    settings : state.quiz.settings,
    currentQuizStep: state.quiz.currentQuizStep,
    formData:state.quiz.formData,
    loader: state.quiz.loader
});
  

const mapDispatchToProps = dispatch => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
    setQuizFormData: data => dispatch(setQuizFormData(data)),
    getQuizFormData: data => dispatch(getQuizFormData(data))
});
  

export default connect(mapStateToProps,mapDispatchToProps)(QuizStep6EyeBrow);