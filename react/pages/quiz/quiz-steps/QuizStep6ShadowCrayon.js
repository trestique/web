import React from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import QuizHeader from './QuizHeader';
import {changeQuizStep,setQuizFormData} from '../../../redux/quiz/quizAction';
import Srcset from '../../../components/Srcset';
import MediaQuery from '../../../components/MediaQuery';
import {showToast} from '../../../components/Helper';
import Loader from '../../../components/Loader';
class QuizStep6ShadowCrayon extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        shadowCrayonShade: []
    }

    updateCrayonShade = (item) =>{
        let selectedItems  = [...this.state.shadowCrayonShade];
        let findItem = selectedItems.indexOf(item);
        if (findItem > -1) {
            selectedItems.splice(findItem, 1);
        }else{
            selectedItems.push(item);
        }
        this.setState({shadowCrayonShade:selectedItems});
    }
    moveToBackStep = (step) =>{
        if(this.state.shadowCrayonSelected){
            this.setState({shadowCrayonSelected:false})
        }else{
            this.props.changeQuizStep(step)
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
    gotoNext = () =>{
        if(this.state.shadowCrayonShade.length <= 0 ){
            showToast('Please select 1 item');
        }else{
            const {settings,formData,changeQuizStep,setQuizFormData} = this.props;
            let lipsExist = this.checkLipsExist();
            let {selectedProducts} = formData;
            formData['crayons'] = this.state.shadowCrayonShade;
            setQuizFormData(formData);
            if(lipsExist){
                changeQuizStep('lips');
            }else if(selectedProducts.includes('cruelty-free-brow-pencil-gel')){
                changeQuizStep(7);
            }else{
                changeQuizStep(8);
            }
        }
    }
    goToBack = () =>{
        const { changeQuizStep } = this.props;
        changeQuizStep(6)
    }
    render(){
        const {settings,formData,currentQuizStep} = this.props;
        const {shadowProductsDetails} = settings;
        const {mate_desk_img,mate_xs_img,shimmer_desk_img,shimmer_xs_img,title,text} = shadowProductsDetails;
        const shadowCrayonOptions = [{text:"Shimmer",img:shimmer_desk_img,xs_img:shimmer_xs_img},{text:"Matte",img:mate_desk_img,xs_img:mate_xs_img}]
        return(
            <div className="quiz-step-6">
            <QuizHeader back={true} title={ReactHtmlParser(title)} text={ReactHtmlParser(text)} currentQuizStep={currentQuizStep} changeQuizStep={this.goToBack} progress={55} settings={settings}/>
            <div className="quiz-step-6-shadow-block">
                    <ul className="quiz-step-6-shadow-options">
                    {shadowCrayonOptions.map((item,index)=>{
                        return <li key={index} onClick={()=> this.updateCrayonShade(item.text)} className={`${this.state.shadowCrayonShade.includes(item.text)?'active':''}`}>
                           <div className="img">
                            <div className='floating-icon'>
                                <span className='icon'>
                                    {this.state.shadowCrayonShade.includes(item.text) ? 
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
                            <MediaQuery query="tablet-and-up">
                                    
                                    <Srcset src={item.img} alt={item.text} />
                            </MediaQuery>
                            <MediaQuery query="phone">
                                    <Srcset src={item.xs_img} alt={item.text} />
                                
                            </MediaQuery>
                            </div>
                            <span className="text">{item.text}</span>
                        </li>
                    })}
                    </ul>
                    <div className="btn-wrapper">
                    <button onClick={this.gotoNext} className="ai-quiz-next-btn" type="button">
                    Next
                    </button>
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
    loader: state.quiz.loader
});
  

const mapDispatchToProps = dispatch => ({
    changeQuizStep : (step) => dispatch(changeQuizStep(step)),
    setQuizFormData: data => dispatch(setQuizFormData(data)),
});
  

export default connect(mapStateToProps,mapDispatchToProps)(QuizStep6ShadowCrayon);