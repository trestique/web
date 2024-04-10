import { takeLatest, put, call, all, takeEvery } from "redux-saga/effects";
import { store } from '../store';
import cartTypes from "./cartTypes";
import {
  setCartStart,
  setCartData,
  setCartLoading,
  setSideCartToggle,
  setEditItemData,
  setEditBundleData,
  setEditCartType,
  setEditCartItem,
  TYTBUpdate,
  updateCart,
} from "./cartAction";
import { formatMoney } from "../../components/Helper";

// sidecart data set
export function* cartStartAction(cart) {
  try {
    if (cart.payload) {
      yield put(setSideCartToggle(true));
    }
    yield put(setCartLoading(true));
    let data = yield fetch(`/cart?view=drawer`);
    data = yield data.json();
    // yield put(TYTBUpdate(data));
    yield handleBlackFridayFreeGift(data);
    yield put(setCartData(data));
    yield put(setCartLoading(false));
  } catch (e) {
    console.log(e);
  }
}
function* cartStart() {
  try {
    yield takeLatest(cartTypes.SET_CART_START, cartStartAction);
  } catch (e) {
    console.log(e);
  }
}
// sidecart data set end
// update cart on quantity update on sidecart start
function* cartUpdateAction(action) {
  yield ajaxCart("/cart/update.js", action.payload );
  yield put(setCartStart(true));
}
function* updateCartData() {
  yield takeLatest(cartTypes.UPDATE_CART, cartUpdateAction);
}
// update cart on quantity update on sidecart start

// product add to cart on and sidecart update start
function* AddToCartAction(action) {
    yield ajaxCart("/cart/add.js", action.payload.form);
    yield put(setCartLoading(true));
    yield put(setCartStart(true));
    if(action.payload.callback){
      action.payload.callback();
    }
}
function* AddToCart() {
  yield takeLatest(cartTypes.ADD_TO_CART, AddToCartAction);
}

// TYTB check 
function* TYTBCheckAction(action){
  console.log('actiontest',action);
  let cart = action.payload;
  let es6Master = cart.items.find((item)=> item?.properties['_bundle_type'] == "essential 6" && item?.properties['_type'] == 'master');
  let subscriptionFound = cart.items.find((item)=> item?.selected_selling_plan);
  let qtyArray = [];
  if(subscriptionFound && es6Master){
    qtyArray = cart.items.map((item) => {
      if (item?.selected_selling_plan) {
        return 0
      }
      return item.quantity;
    });
    let qtyArrayData = {updates: qtyArray}
    yield put(updateCart(qtyArrayData));
  }
}
function* TYTBCheck(action){
  yield takeLatest(cartTypes.TYTB_UPDATE, TYTBCheckAction);
}

// product add to cart on and sidecart update start

function* FetchEditItemDataAction(action){
      yield put(setEditCartItem(true));
      yield put(setEditCartType(action.payload.type));
    if(action.payload.type == "normal"){
        let url = `/products/${action.payload.handle}?view=editproduct`;
        const {index,selected_selling_plan} = action.payload;
        const data = yield getAjax(url);
        yield put(setEditItemData({'product':data,quantity:action.payload.quantity,id:action.payload.variant_id,selected_selling_plan,index}));
    }else{
        let url = `/products/${action.payload.handle}?view=editbundle`;
        if(action.payload.handle == "essential-8" || action.payload.handle == "essential-6" || action.payload.handle === "the-essential-5-basics-starter-kit"){
          url = `/products/${action.payload.handle}?section_id=${window.essentialSecionId}`;
        }
        let res = yield fetch(url)
        res = yield res.text();
        let mainDiv = document.createElement('div');
        mainDiv.innerHTML = res;
        let scriptData = mainDiv.querySelector('#bundle-data-json');;
        let data = JSON.parse(scriptData.innerHTML);
        let itemsObj = [];
        let cartItems = data.cart.items.filter((line_item)=> line_item.properties['_bid'] == action.payload.bid && line_item.properties['_type'] == 'child' )
        for(let i = 0; i< cartItems.length;i++){
            let cartItem = cartItems[i];
            for(let j = 0; j<data.products.length;j++){
                let item = data.products[j];
                let id = parseInt(item.id);
                if(id == cartItem.product_id){
                    let currentVariant = item.variants.find((variant)=> cartItem.id == variant.id)
                    itemsObj.push({
                        ...item,
                        properties: cartItem.properties,
                        selected_selling_plan: cartItem.selling_plan_allocation?.selling_plan,
                        currentVariant
                    })
                    break;
                }
            }
        }
        yield put(setEditBundleData({products:itemsObj,masterProduct:data.masterProduct}));
    }
}


function* FetchEditItemData() {
  yield takeLatest(cartTypes.FETCH_EDIT_ITEM_DATA, FetchEditItemDataAction);
}


/* update Edit product */
function* updateEditProductAction(action){
  yield put(setCartLoading(true));
  yield ajaxCart("/cart/update.js", action.payload.oldData );
  if(action.payload.type == 'item_update'){
    yield ajaxCart("/cart/add.js", action.payload.newData );
  }
  yield put(setCartStart(true));
  yield put(setEditCartItem(false));
  if(action.payload.callback){
    action.payload.callback();
  }
}
function* updateEditProduct() {
  yield takeLatest(cartTypes.UPDATE_EDIT_ITEM, updateEditProductAction);
}


/* Clear cart */
function* clearCartAction(action){
  yield put(setCartLoading(true));
  yield getAjax("/cart/clear.js");
  yield put(setCartStart(true));
}
function* clearCart() {
  yield takeLatest(cartTypes.CLEAR_CART, clearCartAction);
}

export function* cartSagas() {
  yield all([
    call(cartStart),
    call(updateCartData),
    call(AddToCart),
    call(FetchEditItemData),
    call(updateEditProduct),
    call(TYTBCheck),
    call(clearCart)
  ]);
}


/* shopify cart actions */
function* ajaxCart(url,data){
  try{
    let res = yield fetch(url,{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
    })
    res = yield res.json();
    return res;
  }
  catch(e){

  }
}

function* getAjax(url){
  try{
    let res = yield fetch(url,{
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
      }
    })
    res = yield res.json();
    return res;
  }
  catch(e){

  }
}

// side cart update when product add to cart
window.updateSidecart = async(open) =>{
  try {
      let data = await fetch(`/cart?view=drawer`);
      data = await data.json();
      store.dispatch(setCartStart(data));
      // await setCartLoading(false);
  } catch (e) {
    console.log(e);
  }
}

//close edit option when close side cart
window.closeReactCart = () =>{
  store.dispatch(setEditCartItem(false));
}

/**
 * Updates cart with free gift if conditions matches
 * @param {Object} cartData 
 */
function* handleBlackFridayFreeGift(cartData = {}) {
  try {
    if (!Object.keys(cartData).length) return
    const blackFridayFreeGiftData = { ...window?.blackFridayFreeGift }
    if (blackFridayFreeGiftData) {
      const { isEnable, freeMiniProducts, freeMiniSet, firstFreeGiftAmount, secondFreeGiftAmount, thirdFreeGiftAmount } = blackFridayFreeGiftData

      if (!isEnable) {
        return;
      }
      const { items } = cartData;
      let cartTotal = cartData.total_price / 100;
      const freeSetExist = items.find((item)=> item.id == freeMiniSet.id && item.properties['_free_set'])
      let freeGiftsCount = 0;
      const freeGifts = items.filter((item)=> item.properties['_free_gift'])
      freeGifts.forEach((item)=> {
        freeGiftsCount = freeGiftsCount + item.quantity
      });
      let addItems = [];

      // add logic
      if(cartTotal >= thirdFreeGiftAmount && !freeSetExist){
        // Add free set
        addItems.push({
          id: freeMiniSet.id,
          quantity: 1,
          properties:{
            "_free_set": true,
            "_free_gift_type": "BFCM Free gift"
          }
        })
      }
      else if(cartTotal < thirdFreeGiftAmount && cartTotal >= secondFreeGiftAmount && freeGiftsCount < 2){
        // let product = freeMiniProducts.
        if(freeGiftsCount  <= 0){
          addItems.push({
            id: freeMiniProducts[0].id,
            quantity: 1,
            properties:{
              "_free_gift": true,
              "_free_gift_type": "BFCM Free gift"
            }
          })
        }
        addItems.push({
          id: freeMiniProducts[1].id,
          quantity: 1,
          properties:{
            "_free_gift": true,
            "_free_gift_type": "BFCM Free gift"
          }
        })
      }else if(cartTotal < secondFreeGiftAmount && cartTotal >= firstFreeGiftAmount && freeGiftsCount == 0 ){
        addItems.push({
          id: freeMiniProducts[0].id,
          quantity: 1,
          properties:{
            "_free_gift": true,
            "_free_gift_type": "BFCM Free gift"
          }
        })
      }

      // remove logic
      let remove = false;
      let qtyArray = [];
      let count = 0;
      qtyArray = qtyArray = items.map((item, item_index) => {
        if (item.properties['_free_gift'] && cartTotal >= thirdFreeGiftAmount) {
          remove = true;
          return 0
        }else
         if (item.properties['_free_set'] && cartTotal < thirdFreeGiftAmount && freeSetExist) {
          remove = true;
          return 0
        }
        else if (item.properties['_free_gift'] && cartTotal < secondFreeGiftAmount && freeGiftsCount >= 2) {
          count = count + 1;
          remove = true;
          if(count > 1) {
            return 1
          }else {
            return 0;
          }
        }else if(item.properties['_free_gift'] && cartTotal < firstFreeGiftAmount && freeGiftsCount > 0){
          remove = true;
          return 0
        }else if(item.properties['_free_gift'] && item.quantity > 1){
          remove = true;
          return 1
        }
        return item.quantity;
      });

      if (addItems.length > 0){
        yield addFreeProduct({'items':addItems})
      }
      if (remove){
        yield removeFreeGift(qtyArray)
      }

      if(addItems.length > 0 || remove){
        yield put(setCartLoading(true));
        yield put(setCartStart(true));
      }
    }
  } catch (error) {
    console.log(error)
  }
}

function* removeFreeGift(data) {
  yield ajaxCart("/cart/update.js", {
    updates: data
  });
}

function* addFreeProduct(data) {
  yield ajaxCart("/cart/add.js", data);
}
