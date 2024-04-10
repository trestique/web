import productTypes from "./productTypes";


export const updateVariant = variant => ({
    type: productTypes.UPDATE_VARIANT,
    payload: variant
});

