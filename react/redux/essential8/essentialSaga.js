import { put , call , takeLatest , all } from "redux-saga/effects";
import essentialTypes  from "./essentialTypes";
import { setLoader } from "./essentialAction";
import { generateUniqueId  } from "../../components/Helper";
import { miniCartOpen } from '../../../javascript/helper';
import {cartStartAction} from '../cart/cartSaga';
/* Add to Cart [bundle] products */
function* addToCart({ payload }){
  const { allProducts, baseProduct, allProductIds, upsellProductsList, bundleType, btnAction } = payload;

  let finalProductsArr = [];

  /* Get All Products names */
  let allProductNames = '';

  allProducts.map((product) => {
    allProductNames = allProductNames.concat(product.productData.title + ", ");
  });

  /* Get Builder_Id & info */
  let bid = bundleType + '_' + generateUniqueId();

  /* Master Product */
  let masterProductID = baseProduct.variants[0].id;
  let masterHandle = baseProduct.handle;

  /* Child Products ID */
  let childProductIds = '';
  for(let i=0; i<allProductIds.length; i++){
    let item = allProductIds[i];
    if(i == 0){
      childProductIds = `${item.id}`;
    }else{
      childProductIds = `${childProductIds},${item.id}`;
    }
  }
  let master = baseProduct.title;
  // if(window.location.pathname == '/products/essential-6'){
  //   master = "THE ESSENTIAL 6 Build Your Kit";
  //   bundleType = "essential 6";
  // } else if (window.location.pathname == "/products/the-essential-5-basics-starter-kit") {
  //   master = "THE ESSENTIAL 5 Build Your Kit";
  //   bundleType = "essential 5";
  // }

  let masterProperties = {
    "_products": childProductIds,
    "_type": 'master',
    "_products_title": allProductNames,
    "_bid": bid,
    "_bundle_type" : bundleType,
    "_bundle_name": "essential 8"
  }
  if(window.location.pathname == '/products/essential-6'){
    masterProperties['isTBYB'] = true;
  }

  try{
    gtag('event', "bundle_add_to_cart", {
      'event_category': "Bundle add to cart",
      "bundle_type": bundleType,
      'event_label': "Routine",
      'value': `${masterProductID}`
    });
  }catch(e){

  }
  
  let masterObj = {
    id : masterProductID,
    quantity : 1,
    properties : masterProperties
  }

  finalProductsArr.push(masterObj);

  allProductIds.map((obj) => {
    let childProperty = {
      "_master_bundle": master,
      "_products": childProductIds,
      "_master_handle": masterHandle,
      "_bundle_name": "essential 8",
      "_pos": obj.pos,
      "_type": 'child',
      "_bid": bid,
      "_bundle_type" : bundleType
    }

    let childObj = {
      id : obj.id,
      quantity : 1,
      properties : childProperty
    }

    if(window.location.pathname == '/products/essential-8'){
      if(obj.selling_plan) {
        childObj['selling_plan'] = obj.selling_plan
      }
    }
  
    finalProductsArr.push(childObj);
  });

  upsellProductsList.map((obj) => {
    let childProperty = {
      "_type": 'essential_upsell',
      "_upsell_bid": bid,
      "_bundle_name": "essential 8",
      "_upsell_bType": bundleType
    }

    let childObj = {
      id : obj.id,
      quantity : 1,
      properties : childProperty
    }

    if(window.location.pathname == '/products/essential-8'){
      if(obj.selling_plan) {
        childObj['selling_plan'] = obj.selling_plan
      }
    }
  
    finalProductsArr.push(childObj);
  });

  /* Add items */
  window.a = finalProductsArr;
   yield ajaxCart("/cart/add.js" , { items : finalProductsArr });
   yield put(setLoader(false));
  //  miniCartOpen();
   
   if(btnAction){
    if(btnAction == 'drawer'){
      miniCartOpen();
      if(simply.sideCart.type == 'react-cart'){
        yield call(cartStartAction, true);
      }
      
    }else{
      window.location.href = '/checkout';
    }
   }else{
      miniCartOpen();
      if(simply.sideCart.type == 'react-cart'){
        yield call(cartStartAction, true);
      }
   }
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
    if(res.status){
      alert("Error : " + res.description);
    }
    return res;
  }
  catch(e){
    alert("Error : " + e.message);
  }
}


function* startAddToCart(){
  yield takeLatest(essentialTypes.ADD_TO_CART_ESSENTIAL, addToCart);
}


export function* essentialSaga(){
  yield all([
    call(startAddToCart)
  ])
}