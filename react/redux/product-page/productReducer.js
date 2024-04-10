import productTypes from "./productTypes";

const INITIAL_VALUES = simply.product; 

const productReducer = (state = INITIAL_VALUES, action) => {
  switch (action.type) {
    case productTypes.UPDATE_VARIANT:
      return {
        ...state,
        currentVariant: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
