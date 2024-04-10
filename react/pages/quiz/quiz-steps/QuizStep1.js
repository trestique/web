import React from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import {changeQuizStep} from '../../../redux/quiz/quizAction';
import {readCookie} from '../../../components/Helper';
import Srcset from '../../../components/Srcset';
import MediaQuery from '../../../components/MediaQuery';

class QuizStep1 extends React.Component{
    closeQuiz = () => {
        let previousPageUrl = readCookie('previousPageUrl');
        if(!previousPageUrl && previousPageUrl == window.location.href){
          previousPageUrl = "/";
        }
        window.location.href = previousPageUrl;
    }
    gotoEssentialMix = () =>{
        const {settings} = this.props;
        let {screen_1_left_btn_link} = settings;
        window.location.href = screen_1_left_btn_link;
    }
    render(){
        const {settings} = this.props;
        const {screen_image_1_left,screen_image_1_left_xs,screen_1_left_title,screen_1_left_text,screen_1_left_btn_text,
            screen_image_1_right,screen_image_1_right_xs,screen_1_right_title,screen_1_right_text,screen_1_right_btn_text, 
            screen_type, screen_image, screen_title, screen_image_xs, screen_text, screen_btn_text,
            screen_image_1, screen_title_1, screen_image_xs_1, screen_text_1, screen_btn_text_1
          } = settings;

        if (screen_type === "video_consultation") {
          return (
            <div className="quiz-step-1">
              <div className="quiz-step-1-block w-full">
                <div className="img">
                  <MediaQuery query="lap-and-up">
                    <Srcset src={screen_image} alt={screen_title} />
                  </MediaQuery>
                  <MediaQuery query="phone-and-tablet">
                    <Srcset src={screen_image_xs} alt={screen_title} />
                  </MediaQuery>
                </div>
                <div className="text-wrap">
                  <h2 className="title">{ReactHtmlParser(screen_title)}</h2>
                  <div className="text">{ReactHtmlParser(screen_text)}</div>
                  <div className="btn-wrap">
                    <button
                      className="left-quiz-step-1-btn ai-quiz-next-btn"
                      type="button"
                      onClick={() => {
                        this.gotoEssentialMix(2);
                      }}
                    >
                      {ReactHtmlParser(screen_btn_text)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (screen_type === "meet_your_match") {
          return (
            <div className="quiz-step-1">
              <div className="quiz-step-1-block w-full">
                <div className="img">
                  <MediaQuery query="lap-and-up">
                    <Srcset src={screen_image_1} alt={screen_title_1} />
                  </MediaQuery>
                  <MediaQuery query="phone-and-tablet">
                    <Srcset src={screen_image_xs_1} alt={screen_title_1} />
                  </MediaQuery>
                </div>
                <div className="text-wrap">
                  <h2 className="title">{ReactHtmlParser(screen_title_1)}</h2>
                  <div className="text">{ReactHtmlParser(screen_text_1)}</div>
                  <div className="btn-wrap">
                    <button
                      className="right-quiz-step-1-btn ai-quiz-next-btn"
                      type="button"
                      onClick={() => {
                        this.props.changeQuizStep(3);
                      }}
                    >
                      {ReactHtmlParser(screen_btn_text_1)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
          return (
            <div className="quiz-step-1">
              <span className="close-quiz" onClick={this.closeQuiz}>
                <img src={simply.reactCloseIcon} alt="close" />
              </span>
              <div className="quiz-step-1-block">
                <div className="img">
                  <MediaQuery query="lap-and-up">
                    <Srcset
                      src={screen_image_1_left}
                      alt={screen_1_left_title}
                    />
                  </MediaQuery>
                  <MediaQuery query="phone-and-tablet">
                    <Srcset
                      src={screen_image_1_left_xs}
                      alt={screen_1_left_title}
                    />
                  </MediaQuery>
                </div>
                <div className="text-wrap">
                  <h2 className="title">
                    {ReactHtmlParser(screen_1_left_title)}
                  </h2>
                  <div className="text">
                    {ReactHtmlParser(screen_1_left_text)}
                  </div>
                  <div className="btn-wrap">
                    <button
                      className="left-quiz-step-1-btn ai-quiz-next-btn"
                      type="button"
                      onClick={() => {
                        this.gotoEssentialMix(2);
                      }}
                    >
                      {ReactHtmlParser(screen_1_left_btn_text)}
                    </button>
                  </div>
                </div>
              </div>
              <div className="quiz-step-1-block">
                <div className="img">
                  <MediaQuery query="lap-and-up">
                    <Srcset
                      src={screen_image_1_right}
                      alt={screen_1_right_title}
                    />
                  </MediaQuery>
                  <MediaQuery query="phone-and-tablet">
                    <Srcset
                      src={screen_image_1_right_xs}
                      alt={screen_1_right_title}
                    />
                  </MediaQuery>
                </div>
                <div className="text-wrap">
                  <h2 className="title">
                    {ReactHtmlParser(screen_1_right_title)}
                  </h2>
                  <div className="text">
                    {ReactHtmlParser(screen_1_right_text)}
                  </div>
                  <div className="btn-wrap">
                    <button
                      className="right-quiz-step-1-btn ai-quiz-next-btn"
                      type="button"
                      onClick={() => {
                        this.props.changeQuizStep(3);
                      }}
                    >
                      {ReactHtmlParser(screen_1_right_btn_text)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
}

const mapStateToProps = state => ({
    settings : state.quiz.settings,
    currentQuizStep: state.quiz.currentQuizStep
});
  
const mapDispatchToProps = dispatch => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
});
  
  
export default connect(mapStateToProps,mapDispatchToProps)(QuizStep1);
