import React from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import QuizHeader from './QuizHeader';
import {changeQuizStep,getQuizFormData,setQuizFormData} from '../../../redux/quiz/quizAction';
import Srcset from '../../../components/Srcset';
import {showToast,handleize} from '../../../components/Helper';
import Loader from '../../../components/Loader';
// import UploadClient from '@uploadcare/upload-client'

class QuizStep3 extends React.Component{
    constructor(props){
        super(props);
        this.publicKey = 'f43dc6f4379a4cfbd958';
    }
    state = {
        user_image : '',
        imageUploading: false,
        dataLoader: false,
        base64Img: ""
    }
    convertToBase64 = async (blob)=> {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({base64Img: e.target.result})
            };
            reader.readAsDataURL(blob);
    }
    openFiles = () =>{
        if(window.uploadcare){
            let dialog = uploadcare.openDialog(null, '', {
                multiple: false,
                imagesOnly: true,
                tabs:'file facebook instagram gdrive gphotos url dropbox box'
            });
            dialog.done(res => {
                // once a file or group is uploaded, get its CDN URL
                this.setState({imageUploading: true})
                res.progress((progressInfo) => {
                    if (progressInfo.progress === 0) {
                      const blob = progressInfo.incompleteFileInfo.sourceInfo.file;
                      this.convertToBase64(blob);
                    }
                });
                res.promise().done(info => {
                        setTimeout(()=>{
                            this.setState({imageUploading:false},()=>{
                                this.gotoNext();
                            })
                        },3000)
                });
                res.promise().fail((type,data) => {
                    if(!data.isImage){
                        showToast('Only images allowed!')
                    }else{
                        showToast('Something went wrong please try again later!');
                    }
                    this.setState({user_image : '',imageUploading:false})
                });
            });
            dialog.fail(function(result) {
                showToast('Something went wrong please try again later!');
            });
        }
    }
    openSelfie = () =>{
        if(window.uploadcare){
            let dialog =  uploadcare.openDialog(null, '', {
                multiple: false,
                imagesOnly: true,
                tabs:'camera'
            });
            
            dialog.done(res => {
                // once a file or group is uploaded, get its CDN URL
                this.setState({imageUploading: true});
                res.progress((progressInfo) => {
                    if (progressInfo.progress === 0) {
                        const blob = progressInfo.incompleteFileInfo.sourceInfo.file;
                        this.convertToBase64(blob);
                    }
                });
                res.promise().done(info => {
                    console.log(info);
                        setTimeout(()=>{
                            this.setState({imageUploading:false},()=>{
                                this.gotoNext();
                            })
                        },3000)
                });
                res.promise().fail((type,data) => {
                    if(!data.isImage){
                        showToast('Only images allowed!')
                    }else{
                        showToast('Something went wrong please try again later!');
                    }
                    this.setState({user_image : '',imageUploading:false})
                });
            });
            dialog.fail(function(result) {
                showToast('Something went wrong please try again later!');
            });
        }
    }
    changeImage = () =>{
        this.setState({imageUploading: false,user_image:''});
    }
    checkSkinType = (score) =>{
        const {settings} = this.props;
        let skinType = "";
        let skinTone = "";
        if(score >= 29){
            skinType = "Light";
            let options = settings.skinTypesDetails[handleize(skinType)];
            if(score > 41){
                skinTone= options[0].text;
            }else if(score >= 35 && score < 41){
                skinTone= options[1].text;
            }else if(score >= 33 && score < 35){
                skinTone= options[2].text;
            }else if(score >= 29 && score < 35){
                skinTone= options[3].text;
            }
        }else if(score >=23 && score < 29){
            skinType = "Light-Medium";
            let options = settings.skinTypesDetails[handleize(skinType)];
            if(score >= 26 && score < 29){
                skinTone= options[0].text;
            }else if(score >= 23 && score < 26){
                skinTone= options[1].text;
            }
        }else if(score >=18 && score < 23){
            skinType = "Medium";
            let options = settings.skinTypesDetails[handleize(skinType)];
            if(score >= 20 && score < 23){
                skinTone= options[0].text;
            }else if(score >= 18 && score < 20){
                skinTone= options[1].text;
            }
        }else if(score >=16 && score < 18){
            skinType = "Medium - deep";
            let options = settings.skinTypesDetails[handleize(skinType)];
            skinTone= options[0].text;
        }else if(score<16){
            skinType = "Deep";
            let options = settings.skinTypesDetails[handleize(skinType)];
            if(score >= 14 && score < 16){
                skinTone= options[0].text;
            }else if(score >= 12 && score < 14){
                skinTone= options[1].text;
            }else if(score < 12){
                skinTone= options[2].text;
            }
        }
        return {skinType,skinTone};
    }
    gotoNext = () =>{
        const {currentQuizStep,changeQuizStep,getQuizFormData,formData} = this.props;
        const {makeup_characteristics} = formData;
        // const form = { makeup_characteristics,user_image}
        let form = {
            imageBS64: this.state.base64Img
        };
        getQuizFormData({url:'/upload-selfie',form,nextStep:currentQuizStep+1,callback:(res)=>{
            if(res.status == 200){
                let formData = this.props.formData;
                formData['skinData'] = {...res.response[0]};
                let {skinTone,skinType} = this.checkSkinType(res.response[0].beta.ita); 
                formData['skinType'] = skinType;
                formData['skinTone'] = skinTone;
                formData['form_id'] = res.id;
                this.props.setQuizFormData(formData);
                this.props.changeQuizStep(this.props.currentQuizStep + 1);
            }else{
                showToast(res.description);
            }
        }});
    }
    
    render(){
        const {settings,currentQuizStep,changeQuizStep} = this.props;
        const {user_image,imageUploading} = this.state;
        const {screen_3_main_image_1,screen_3_main_image_2,screen_3_main_image_3} = settings;
        const {screen_3_image_1,screen_3_text_1} = settings;
        const {screen_3_image_2,screen_3_text_2} = settings;
        const {screen_3_image_3,screen_3_text_3} = settings;
        const {screen_3_image_4,screen_3_text_4} = settings;
        let options = [];
        if(screen_3_image_1 && screen_3_text_1){
            options.push({img:screen_3_image_1,text:screen_3_text_1})
        }
        if(screen_3_image_2 && screen_3_text_2){
            options.push({img:screen_3_image_2,text:screen_3_text_2})
        }
        if(screen_3_image_3 && screen_3_text_3){
            options.push({img:screen_3_image_3,text:screen_3_text_3})
        }
        if(screen_3_image_3 && screen_3_text_3){
            options.push({img:screen_3_image_4,text:screen_3_text_4})
        }
        let progress = 20;
        if(!cn(user_image) || imageUploading){
            progress = 25;
        }
        return(
            <div className="quiz-step-3">
                {this.props.loader && <Loader show={true}/> }
                <QuizHeader text="Upload or take a picture and get your match!" title="Upload a selfie"  currentQuizStep={2} changeQuizStep={changeQuizStep} progress={progress} settings={settings}/>
                <div className='quiz-step-3-details'>
                {this.state.imageUploading ? 
                <div className="image-loader">
                    <div className="img">
                        <img src={simply.loaderImage} alt="Image upload"/>
                        <div className='loading-text'>
                        One sec! <br/><br/>
                        Analyzing your shades<br/>using our color-matching<br/> technology
                        </div>
                    </div>
                </div>
                : 
                <>
                {!cn(user_image) ? 
                    <div className="quiz-step-3-block">
                        {/* <input type="file" onChange={(e)=> console.log(e.target.files[0])}/> */}
                        <div className="user-image">
                            <Srcset src={user_image.cdnUrl} alt="selfie"/>
                        </div>
                        <div className="btn-wrapper-bg">
                            <div className="btn-wrapper">
                                <button onClick={this.changeImage} className="light-color ai-quiz-next-btn" type="button">
                                Change Image
                                </button>
                                <button onClick={()=> this.gotoNext()} className="ai-quiz-next-btn" type="button">
                                Next
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="quiz-step-3-block">
                            <div className='images'>
                                <div className='img'>
                                    <Srcset src={screen_3_main_image_1}/>
                                </div>
                                <div className='img'>
                                    <Srcset src={screen_3_main_image_2}/>
                                </div>
                                <div className='img'>
                                    <Srcset src={screen_3_main_image_3} />
                                </div>
                            </div>
                            {options.length > 0 && 
                            <ul className="quiz-step-3-options">
                            {options.map((item)=>{
                                return <li key={item.text}>
                                    <div className="img">
                                        <Srcset src={item.img} alt={item.text}/>
                                    </div>
                                    <p>{item.text}</p>
                                </li>
                            })}
                            </ul>}
                            <div className="btn-wrapper-bg">
                                <div className="btn-wrapper">
                                    <button onClick={this.openFiles} className="light-color ai-quiz-next-btn" type="button">
                                    Upload a picture
                                    </button>
                                    <button onClick={this.openSelfie} className="ai-quiz-next-btn" type="button">
                                    Take a selfie
                                    </button>
                                </div>
                            </div>
                    </div>
                    }</>
                }
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
    getQuizFormData: data => dispatch(getQuizFormData(data)),
    setQuizFormData: data => dispatch(setQuizFormData(data))
});
  

export default connect(mapStateToProps,mapDispatchToProps)(QuizStep3);