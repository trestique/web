import { takeLatest, put, call, all, takeEvery } from "redux-saga/effects";
import quizConfig from './quizConfig';
import quizTypes from "./quizTypes";
import {showToast} from '../../components/Helper';
import {
    setQuizFormData,
    changeQuizStep,
    setQuizLoading
  } from "./quizAction";

  // sidecart data set
function* quizStartAction(action) {
    let {url,form,type} = action.payload;
    url = quizConfig.baseUrl + url;
    let data;
    try {
      if(!action.payload.notLoad){
        yield put(setQuizLoading(true));
      }
      if(type == "submit-response"){
        data = yield quizAjax(url,form);
        url = `${quizConfig.baseUrl}/get-products?resp_id=${data.resp_id}`;
        data = yield quizGet(url);
        if(action.payload.callback){
          action.payload.callback(data);
        }
      }else if(type == "email-submit-response"){
        url = `${quizConfig.baseUrl}/get-products?resp_id=${ action.payload.resp_id}`;
        data = yield quizGet(url);
        if(action.payload.callback){
          action.payload.callback(data);
        }
      }else{
        data = yield quizAjax(url,form);
        if(action.payload.callback){
          action.payload.callback(data);
        }
      }
      yield put(setQuizLoading(false));
    } catch (e) {
      showToast(e);
      yield put(changeQuizStep(1));
      yield put(setQuizLoading(false));
      console.log(e);
    }
    

  }
  function* quizStart() {
    try {
      yield takeLatest(quizTypes.GET_QUIZ_FORM_DATA, quizStartAction);
    } catch (e) {
      console.log(e);
    }
  }

  export function* quizSagas() {
    yield all([
      call(quizStart),
    ]);
  }
  
  
  /* shopify cart actions */
  function* quizAjax(url,data){
    try{
      let res = yield fetch(url,{
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Content-Type": "application/json",
          "Authorization":  "Basic " + btoa("trestique:p72Ud2u2Sa")
        },
        body: JSON.stringify(data)
      })
      let statusCode = res.status;
      res = yield res.json();
      res['status'] = statusCode;
      return res;
    }
    catch(e){
  
    }
  }

  /* shopify cart actions */
  function* quizGet(url){
    try{
      let res = yield fetch(url,{
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Content-Type": "application/json",
          "Authorization":  "Basic " + btoa("trestique:p72Ud2u2Sa")
        }
      })
      let statusCode = res.status;
      res = yield res.json();
      res['status'] = statusCode;
      return res;
    }
    catch(e){
  
    }
  }
  


  // const data = {
  //   "looking_for": "looking for help",
  //   "makeup_characteristics": "Cleaningredients",
  //   "user_image": "",
  // }
  // form = new FormData();
  // form.append("looking_for","looking for help")
  // form.append("makeup_characteristics","Clean ingredients")
  // form.append("user_image","")
  // fetch(`https://aiselfie.trestique.com/api/v1/user-quiz-response/page-1`, {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: form,
  //     })
  //     .then((data)=> data.json())
  //     .then((data)=>{
  //     debugger;
  //     })