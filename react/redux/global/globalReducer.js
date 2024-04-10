import globalActionTypes from "./globalActionTypes";

const INITIAL_VALUES = {
  // activeStep:0,
  currentProduct: null,
  activeProduct: null,
  currentCollection: null,
  selectedItems:[],
  selectedBag: null,
  localItems:[],
  localBag: null,
  descriptionPopup: false,
  howToUsePopup: false,
  ingredientsPopup: false,
  sustainibilityPopup: false
};

const globalReducer = (state = INITIAL_VALUES, action) => {
  switch (action.type) {
    case globalActionTypes.ITEM_ADD:
      return {
        ...state,
        settings: action.payload,
      };

    case globalActionTypes.SET_ACTIVE_PRODUCT:
      return {
        ...state,
        activeProduct: action.payload,
      };
    case globalActionTypes.SET_CURRENT_PRODUCT:
        let aProduct = {...action.payload.currentProduct,currentVariant:action.payload.currentProduct.selected_or_first_available_variant}

      return {
        ...state,
        currentProduct: action.payload,
        activeProduct: aProduct
      };
    case globalActionTypes.SET_CURRENT_COLLECTION:
        let activeProduct = {...action.payload.currentProduct,currentVariant:action.payload.currentProduct.selected_or_first_available_variant}
        return {
          ...state,
          currentCollection: action.payload.currentCollection,
          currentProduct: action.payload.currentProduct,
          activeProduct
      };
    case globalActionTypes.ADD_SELECTED_ITEM:
      return {
        ...state,
        selectedItems: action.payload,
        localItems: action.payload,
      };
    case globalActionTypes.ADD_SELECTED_BAG:
      return {
        ...state,
        selectedBag: action.payload,
        localBag: action.payload,
      };
    case globalActionTypes.ADD_LOCAL_ITEM:
      return {
        ...state,
        localItems: action.payload,
      };
    case globalActionTypes.ADD_LOCAL_BAG:
      return {
        ...state,
        localBag: action.payload,
      };
    case globalActionTypes.ITEM_REMOVE:
      return state;
    case globalActionTypes.TOGGLE_DESCRIPTION_POPUP:
      return {
        ...state,
        descriptionPopup: action.payload,
      };
      case globalActionTypes.TOGGLE_HOW_TO_USE_POPUP:
        return {
          ...state,
          howToUsePopup: action.payload,
      };
      case globalActionTypes.TOGGLE_INGREDIENTS_POPUP:
        return {
          ...state,
          ingredientsPopup: action.payload,
        };
      case globalActionTypes.TOGGLE_SUSTAINIBILITY_POPUP:
        return {
          ...state,
          sustainibilityPopup: action.payload,
        };    
    default:
      return state;
  }
};
export default globalReducer;
