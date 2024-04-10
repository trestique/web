import essentialTypes from "./essentialTypes";

/* Set loader */
export const setLoader = (payload) => {
  return { type: essentialTypes.SET_LOADER , payload };
}

/* Set Essential data of section settings */
export const setEssentialData = (payload) => {
  return { type: essentialTypes.SET_ESSENTIAL_DATA , payload };
}

/* Add or Update the Child Product  */
export const addChildProduct = (payload) => {
  return { type: essentialTypes.ADD_CHILD_PRODUCT , payload };
}

/* Set Add Items Error  */
export const setSelectAllItemsError = (payload) => {
  return { type: essentialTypes.SET_ADD_ITEMS_ERROR , payload };
}

/* Add to Cart action  */
export const addToCart = (payload) => {
  return { type: essentialTypes.ADD_TO_CART_ESSENTIAL , payload };
}

/* Add to Cart action  */
export const updateUpsellProducts = (payload) => {
  return { type: essentialTypes.UPDATE_UPSELL_PRODUCTS , payload };
}