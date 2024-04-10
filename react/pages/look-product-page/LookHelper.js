import {generateUniqueId,miniCartOpen} from '../../components/Helper';
export const getPrices = products =>{
    let price = 0, compare_at_price = 0;
    products.forEach(element => {
        price = price + element.price;
    });
    compare_at_price= price;
    price = price - ((price * 15)/100);
    // compare_at_price = compare_at_price - ((compare_at_price * 15)/100);
    return {price,compare_at_price};
}

export const makeBundleProcess = (product,products,addToCart,setLoading) =>{
    let bid = generateUniqueId();
    let items = [];

    // Matser product data
    let masterId = product.variants[0].id;
    let masterHandle = product.handle;
    let masterObj = {id:masterId,quantity:1};

    // Bag product Data
    let productIds = '';
    products.map(prod =>{
      if(cn(productIds)){
        productIds = `${prod.selectedVariant.id}`;
      }else{
        productIds = `${productIds},${prod.selectedVariant.id}`;
      }
    });
    productIds = `${productIds},${masterId}`;
    let childProperties = {'_master_handle': masterHandle,"_look":"true",'_bid':`emix${bid}`,'_bundle_type':"bundle builder",'_type':'child','_products':productIds};

    products.map(product=>{
        let productObj = {};
        let {selectedVariant} = product;
        productObj['id'] = selectedVariant.id;
        productObj['quantity'] = 1;
        productObj.properties = childProperties;
        items.push(productObj);
    });
    masterObj.properties ={'_bid':`emix${bid}`,"_quiz":"true",'_bundle_type':"bundle builder",'_type':'master','_products':productIds};
    items.push(masterObj);
    const form = {items};
    addToCart({form:form,callback:()=>{
      miniCartOpen();
      setLoading(false);
    }});
  }