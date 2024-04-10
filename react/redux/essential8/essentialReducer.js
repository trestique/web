import essentialTypes from "./essentialTypes";

const INITIAL_STATE = {
  loader : false,
  sectionData : {upsell_products:[]},
  selectedItems:[],
  selectedBag:{
    
  },
  selectedItemsError : false,
};

const essentialReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case essentialTypes.SET_ESSENTIAL_DATA:
      return {
        ...state,
        sectionData : action.payload
      }
    
    case essentialTypes.SET_LOADER:
      return {
        ...state,
        loader : action.payload
      }
      
    case essentialTypes.ADD_CHILD_PRODUCT:
      return {
        ...state,
        selectedItems : action.payload
      }

    case essentialTypes.SET_ADD_ITEMS_ERROR:
      return {
        ...state,
        selectedItemsError : action.payload
      }
    case essentialTypes.UPDATE_UPSELL_PRODUCTS:
        return{
          ...state,
          sectionData:{
            ...state.sectionData,
            upsell_products: action.payload
          }

        }  
    default:
      return state;
  }
};
export default essentialReducer;
