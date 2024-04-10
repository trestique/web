import quizTypes from "./quizTypes";

const INITIAL_STATE = {
  loader : true,
  currentQuizStep: 0,
  settings: null,
  formData:{
    fromEmail: false,
    selectedBag: null,
    selectedProducts:[],
    skinType: "Light",
    skinTone : "",
    crayons : [],
    lips:[],
    eyeBrow: '',
    makeup: [],
    askedUserData: false
  }
};

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case quizTypes.SET_LOADER:
      return {
        ...state,
        loader: action.payload
      }
    case quizTypes.SET_QUIZ_SETTINGS:
      return {
        ...state,
        loader: false,
        settings : action.payload
      }
    case quizTypes.CHANGE_QUIZ_STEP:
      return{
        ...state,
        currentQuizStep: action.payload
      }  
    case quizTypes.SET_QUIZ_FORM_DATA:{
      return{
        ...state,
        formData:action.payload
      }
    }  
    case quizTypes.SET_QUIZ_LOADING:{
      return{
        ...state,
        loader: action.payload
      }
    }

    default:
      return state;
  }
};
export default quizReducer;
