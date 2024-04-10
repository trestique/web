import globalActionTypes from "./globalActionTypes";

export function addItem(payload) {
  return { type: globalActionTypes.ITEM_ADD, payload };
}

export function removeItem(payload) {
  return { type: globalActionTypes.ITEM_REMOVE, payload };
}
export function addSelectedItem(payload) {
  return { type: globalActionTypes.ADD_SELECTED_ITEM, payload };
}
export function addSelectedBag(payload) {
  return { type: globalActionTypes.ADD_SELECTED_BAG, payload };
}
export function addLocalItem(payload) {
  return { type: globalActionTypes.ADD_LOCAL_ITEM, payload };
}
export function addLocalBag(payload) {
  return { type: globalActionTypes.ADD_LOCAL_BAG, payload };
}

export function setActiveProduct(payload) {
  return { type: globalActionTypes.SET_ACTIVE_PRODUCT, payload };
}

export function setCurrentProduct(payload) {
  return { type: globalActionTypes.SET_CURRENT_PRODUCT, payload };
}

export function setCurrentCollection(payload) {
  return { type: globalActionTypes.SET_CURRENT_COLLECTION, payload };
}

export function toggleDescriptionPopup(payload) {
  return { type: globalActionTypes.TOGGLE_DESCRIPTION_POPUP, payload };
}

export function toggleHowToUsePopup(payload) {
  return { type: globalActionTypes.TOGGLE_HOW_TO_USE_POPUP, payload };
}

export function toggleIngredientsPopup(payload) {
  return { type: globalActionTypes.TOGGLE_INGREDIENTS_POPUP, payload };
}

export function toggleSustainibilityPopup(payload) {
  return { type: globalActionTypes.TOGGLE_SUSTAINIBILITY_POPUP, payload };
}
