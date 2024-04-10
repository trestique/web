import { all, call } from "redux-saga/effects";

// import {productSagas} from './product/productSaga';
import { cartSagas } from './cart/cartSaga';
import { essentialSaga } from './essential8/essentialSaga';
import {quizSagas} from './quiz/quizSaga';
import {productSagas} from './product-page/productSaga';
export function* rootSaga() {
  yield all([
    // call(productSagas),
    call(cartSagas),
    call(essentialSaga),
    call(quizSagas),
    call(productSagas)
  ]);
}
