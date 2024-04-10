import cartTypes from "./cartTypes";
export const addToCart = (data) => {
  return {
    type: cartTypes.ADD_TO_CART,
    payload: data,
  };
};
export const updateCart = (qtyArray) => ({
  type: cartTypes.UPDATE_CART,
  payload: qtyArray,
});
export const setCartStart = (start) => ({
  type: cartTypes.SET_CART_START,
  payload: start,
});
export const setCartData = (cart) => ({
  type: cartTypes.SET_CART,
  payload: cart,
});
export const setCartLoading = (loading) => ({
  type: cartTypes.SET_CART_LOAD,
  payload: loading,
});
export const setSideCartToggle = (side_cart) => ({
  type: cartTypes.TOGGLE_SIDE_CART,
  payload: side_cart,
});

export const setEditCartItem = (data) => ({
  type: cartTypes.SET_EDIT_ITEM,
  payload: data,
});
export const setEditCartType = (data) => ({
  type: cartTypes.SET_EDIT_TYPE,
  payload: data,
});

// Single edit product actions start
export const fetchEditItemData = (data) => ({
  type: cartTypes.FETCH_EDIT_ITEM_DATA,
  payload: data,
});

export const setEditItemData = (data) => ({
  type: cartTypes.SET_EDIT_ITEM_DATA,
  payload: data,
});
export const updateEditItem = (data) => ({
  type: cartTypes.UPDATE_EDIT_ITEM,
  payload: data,
});

// Single edit product actions end

// bundle edit product actions start
export const setEditBundleData = (data) => ({
  type: cartTypes.SET_EDIT_BUNDLE_DATA,
  payload: data,
});


export const updateEditBundle = (data) => ({
  type: cartTypes.UPDATE_EDIT_BUNDLE,
  payload: data,
});
// bundle edit product actions end


export const TYTBUpdate = (data) => ({
  type: cartTypes.TYTB_UPDATE,
  payload: data,
});

export const clearCart = (data) => ({
  type: cartTypes.CLEAR_CART,
  payload: data,
});