import cartTypes from './cartTypes';
const INITIAL_VALUE = {
  cart: {},
  show: false,
  loading:true,
  editItem: false,
  editType: '',
  editItemData: {},
  editBundleData: {}
}
const cartReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case cartTypes.SET_CART_LOAD:
      return {
        ...state,
        loading: action.payload
      }
    case cartTypes.SET_CART:
      try{
        let cartCount = document.querySelectorAll('.header-cart__count');
        cartCount.forEach((item)=>{
          item.innerHTML = action.payload.item_count
        });
        if(action.payload.item_count > 0){
          let cartCountParent = document.querySelectorAll('.header-cart.action-area__link');
          cartCountParent.forEach((item)=>{
            item.classList.add('has-cart-count');
          });
        }
      }catch(e){

      }
      return {
        ...state,
        cart: action.payload 
      }
    case cartTypes.TOGGLE_SIDE_CART:
          return {
            ...state,
            show: action.payload
          }
    case cartTypes.SET_EDIT_ITEM:
      if(action.payload == false){
        return {
          ...state,
          editItem: action.payload,
          editType: '',
          editItemData: {},
          editBundleData: {}
        }
      }else{
        return {
          ...state,
          loading: true,
          editItem: action.payload
        }
      }
    
      case cartTypes.SET_EDIT_BUNDLE_DATA:
        return {
          ...state,
          editBundleData: action.payload,
          loading: false,
      }  
      
    case cartTypes.SET_EDIT_TYPE:
      return {
        ...state,
        editType: action.payload
      }
    case cartTypes.SET_EDIT_ITEM_DATA:
      return {
        ...state,
        editItemData: action.payload,
        loading: false,
      }      
    default:
      return state
  }
}
export default cartReducer;
