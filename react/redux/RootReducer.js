import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from './cart/cartReducer';
import globalReducer from "./global/globalReducer";
import essentialReducer from "./essential8/essentialReducer";
import quizReducer from "./quiz/quizReducer";
import productReducer from './product-page/productReducer';

const presistConfig = {
  key: "root",
  storage,
  whitelist: [],
};
const rootReducer = combineReducers({
  global: globalReducer,
  cart: cartReducer,
  essential_8 : essentialReducer,
  quiz: quizReducer,
  product: productReducer
});
export default persistReducer(presistConfig, rootReducer);
