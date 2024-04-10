import { checkItemLimit, getItemLimit, showToast, getBigProductCount, isBiggerProduct, findBagType, generateUniqueId } from "../../components/Helper";
import {minProducts,maxProducts,bigProducts, minProductsToDiscount} from './builderSettings';

export const bagExistCheck = (selectedItems) =>{
    let bag = selectedItems.find((item)=> item.type_bag);
    if(bag){
        return true;
    }else{
        return false;
    }
}
export const getBagPosition = (selectedItems) =>{
    let bag = selectedItems.find((item)=> item.type_bag);
    let bagIndex = selectedItems.indexOf(bag)
    return bagIndex;
}
export const selectBag = (props) =>{
    let { addSelectedItem, selectedItems,activeProduct } = props;
    let newSelectedItems = [...selectedItems];
    let alreadyExist = false; 
    let bagExist = bagExistCheck(selectedItems);
    selectedItems.map((item, index) => {
        if (activeProduct.currentVariant.id == item.currentVariant.id) {
            alreadyExist = true;
        }
    });
    if(alreadyExist){
        showToast( "Oops! Looks like you already have a this shade. Choose another shade." );
        return false;
    }
    if(bagExist){
        let bagIndex = getBagPosition(selectedItems);
        newSelectedItems.splice(bagIndex, 1);
    }
    newSelectedItems.push(activeProduct);
    addSelectedItem(newSelectedItems);
}
export const selectItems = props => {
    let { settings, addSelectedItem, selectedItems,activeProduct } = props;
    // let { currentProductVariant, activeProduct } = settings;
    if (!activeProduct) {
      showToast("Please select shade");
      return false;
    }
    if(activeProduct.type_bag){
      selectBag(props);
      return
    }
    let newSelectedItems = [...selectedItems];
    // Find number of different variant add to bag is possible. Default 2
    let limit = getItemLimit(activeProduct.data);
        // find xxl(big) product exist or not and count also.
        let bigProductCount = getBigProductCount(selectedItems);
        let checkBiggerProduct = isBiggerProduct(activeProduct);
        if (checkBiggerProduct) {
            if (bigProductCount == bigProducts) {
              showToast( "Oops! Looks like you already have a few of these. Choose another product." );
              return false;
            }
        }
        let alreadyExist = false;
        let count = selectedItems.length;
        selectedItems.map((item, index) => {
            if (activeProduct.currentVariant.id == item.currentVariant.id) {
                alreadyExist = true;
            }
        });
        if(alreadyExist){
            showToast( "Oops! Looks like you already have a this shade. Choose another shade." );
            return false;
        }
        if(count == maxProducts){
            showToast( "Oops! You reached limit");
            return false;
        }
        let itemLimit = checkItemLimit(activeProduct,selectedItems);
        if(itemLimit >= limit){
            showToast( "Oops! Looks like you already have a few of these. Choose another product.");
            return false;
        }
        newSelectedItems.push(activeProduct);
        addSelectedItem(newSelectedItems);
}
export const  goToBag = (settings,setCurrentCollection,selectedItems) =>{
    let totalProducts = getTotalProducts(selectedItems);
    if(totalProducts < 1){
        showToast( "Oops! Please select atleast 1 product." );
        return;
    }
    let index = findCollectionIndex('bags',settings);
    if(index){
      setCollection(index,settings,setCurrentCollection);
    }
}

export const checkProductAlreadyAdded = props =>{
    // Check current variant already selected
    let { activeProduct, selectedItems } = props;
    let alreadyAdded = false;
    selectedItems.map((item)=>{
      if (activeProduct.currentVariant.id == item.currentVariant.id){
        alreadyAdded = true
      }
    })
     return alreadyAdded;
}

export const  findCollectionIndex =(handle,settings)=>{
    let { collections } = settings;
    let collection = collections.find((collection,i)=> collection.collection_handle == handle);
    if(collection){
      let collectionIndex = collections.indexOf(collection);
      return collectionIndex;
    }else{
      return null;
    }
}

export const  setCollection = (i,settings,setCurrentCollection) => {
    let { collections } = settings;
    let currentCollection = collections[i];
    let currentProduct = currentCollection.collection_products[0];
    setCurrentCollection({currentProduct,currentCollection});
};

export const  getTotalProducts = (items) => {
    let bag = bagExistCheck(items);
    if(items.length == 0){
        return 0;
    }
    return items.length;
    // if(bag){
    //     return (items.length - 1);
    // }else{
    //     return items.length;
    // }
};

export const changeStep = (step,settings,addItem) => {
    let new_settings = { ...settings, activeStep: step};
    addItem(new_settings);
}