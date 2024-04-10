import quizTypes from './quizTypes';

export const changeQuizStep = step =>{
    return{
        type: quizTypes.CHANGE_QUIZ_STEP,
        payload: step
    }
}

export const setQuizLoading = step =>{
    return{
        type: quizTypes.SET_QUIZ_LOADING,
        payload: step
    }
}

export const setQuizSettings = data =>{
    return {
        type: quizTypes.SET_QUIZ_SETTINGS,
        payload: data
    }
}

export const setQuizFormData = data =>{
    return {
        type: quizTypes.SET_QUIZ_FORM_DATA,
        payload: data
    }
}

export const getQuizFormData = data =>{
    return {
        type: quizTypes.GET_QUIZ_FORM_DATA,
        payload: data
    }
}

export const setQuizLoader = data =>{
    return {
        type: quizTypes.SET_LOADER,
        payload: data
    }
}
