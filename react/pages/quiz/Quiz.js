import React from 'react';
import QuizTemplate from './QuizTemplate';
import {setQuizSettings} from '../../redux/quiz/quizAction';
import {connect} from 'react-redux';
class Quiz extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.setQuizSettings(window.quiz.settings);
        window.addEventListener("resize", this.updateResize);
    }
    setQuizPageHeight = () =>{
        let headerHeight = 0;
        let announcementBar = document.querySelector('#shopify-section-announcement-bar');
        let topBar = document.querySelector('.shopify-section.top-bar');
        let hedader = document.querySelector('.shopify-section.header-section');
        if(announcementBar){
            headerHeight = headerHeight + announcementBar.offsetHeight
        }
        if(topBar){
            headerHeight = headerHeight + topBar.offsetHeight
        }
        if(hedader){
            headerHeight = headerHeight + hedader.offsetHeight
        }
        return headerHeight;
    }
    updateResize = () =>{
        let {currentQuizStep} = this.props;
        let headerHeight = this.setQuizPageHeight();
        let page = document.querySelector('.ai-quiz-page');
        if(page && currentQuizStep == 1){
            page.style['max-height'] = `calc(100% - ${headerHeight}px)`;
        }else{
            page.style['max-height'] = `100%`;
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateResize);
    }
    hideHeader = () =>{
        let announcementBar = document.querySelector('#shopify-section-announcement-bar');
        let topBar = document.querySelector('.shopify-section.top-bar');
        let header = document.querySelector('.shopify-section.header-section');
        if(announcementBar) announcementBar.classList.add('hide');
        if(topBar) topBar.classList.add('hide');
        if(header) header.classList.add('hide');
    }
    showHeader = () =>{
        let announcementBar = document.querySelector('#shopify-section-announcement-bar');
        let topBar = document.querySelector('.shopify-section.top-bar');
        let header = document.querySelector('.shopify-section.header-section');
        if(announcementBar) announcementBar.classList.remove('hide');
        if(topBar) topBar.classList.remove('hide');
        if(header) header.classList.remove('hide');
    }
    componentDidUpdate = (prevProps) =>{
        if(this.props.currentQuizStep != prevProps.currentQuizStep){
            if(this.props.currentQuizStep === 1){
               this.showHeader();
               this.updateResize();
            }else{
                this.hideHeader();
               this.updateResize();
            }
        }
    }
    render(){
        if(!this.props.settings){
            return null;
        }
        let {currentQuizStep} = this.props;
        // maxHeight: `calc(100vh - ${headerHeight}px)`,
        return(
            <div className={`ai-quiz-page${currentQuizStep === 1 ? ' no-scroll':''}`}>
                <QuizTemplate/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loader : state.quiz.loader,
    settings: state.quiz.settings,
    currentQuizStep: state.quiz.currentQuizStep
});
  
  /* Action Dispatchers */
const mapDispatchToProps = dispatch => ({
    setQuizSettings : (data) => dispatch(setQuizSettings(data)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);