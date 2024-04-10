import React from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import {readCookie} from '../../../components/Helper';
class QuizHeader extends React.Component{
    closeQuiz = () => {
        let previousPageUrl = readCookie('previousPageUrl');
        if(!previousPageUrl && previousPageUrl == window.location.href){
          previousPageUrl = "/";
        }
        window.location.href = previousPageUrl;
    }
    render(){
        const {settings, text, title, back,changeQuizStep,currentQuizStep } = this.props;
        return(
            <div className="quiz-header">
                    {back ?
                        <span className="back" onClick={()=>{changeQuizStep(currentQuizStep-1)}}>
                            <img src={simply.reactBackArrowIcon} alt="Back" />
                        </span>
                    :
                    <span className='quiz-trestique-logo'>
                        <img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector_796ff3b1-9868-494e-8c37-f55ff96529bd.png?v=1649054112" alt="trestique" />
                    </span>
                    }
                    <div className='text-center'>
                    {title && <h2 className='quiz-header-title'>{title}</h2>}
                    {text && <div className='quiz-header-text'>{text}</div>}
                    </div>
                    <span className="close-quiz" onClick={this.closeQuiz}>
                        <img src={simply.reactCloseIcon} alt="close" />
                    </span>
            </div>
        )
    }
}
  
  
export default QuizHeader;