import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { formatMoney, handleize, manageHeight } from "../../components/Helper";
import Srcset from "../../components/Srcset";
import { addChildProduct } from "../../redux/essential8/essentialAction";

const SubscriptionProduct = (props) => {

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const selectRef = useRef(null);

  const { productData, selectedItems, productVariant, updateSellingPlan, sellingPlans, removeSellingPlan } = props;
  const selectedVariant = selectedItems.find(item => item.handle === productData.handle)
  let activeVariant
  if (productVariant) {
    activeVariant = productData.variants.find(variant => variant.id == productVariant);
  } else {
    activeVariant = productData.variants.find(variant => variant.id === selectedVariant.id);
  }
  const sellingPlan = activeVariant.selling_plan_allocations[0]

  function updateShade(shade) {
    if (!shade.available) {
      setError('This Variant is Out of Stock !')
    } else {
      const selectedVariants = selectedItems.map((variant) => {
        if (variant.handle === productData.handle) {
          return {
            handle: productData.handle,
            id: shade.id,
          };
        }
        return variant;
      });
      dispatch(addChildProduct(selectedVariants))
    }
  }

  const isSubscribed = sellingPlans[productData.handle]

  setTimeout(() => {
    manageHeight(document.querySelectorAll('.subscription-popup-sets-content .swatch-wrap'))
    manageHeight(document.querySelectorAll('.subscription-popup-sets-content .product-title'))
  }, 1000)


  return (
    <div className={`product-slide-item${isSubscribed ? ' active' : ''}`} key={productData.key}>
      <div className="image-wrapper">
        <div className="img">
          <img
            alt="Maldives Luminescent"
            src={activeVariant?.featured_image?.src}
          />
        </div>
        <div className={`product-added-wrapper${isSubscribed ? ' active' : ''}`} onClick={() => removeSellingPlan(productData.handle)}>
          <span>ADDED</span>
        </div>
      </div>
      <div className="product-info-wrapper">
        <h3 className="product-title">{productData.title}</h3>
        <h4 className="variant-title">{activeVariant?.title}</h4>
        <div className="variants-details">
          <ul className="swatch-wrap ">
            {productData.variants.map((variant) => (
              <div
                key={variant.title + "_" + i}
                className={`swatch-element color-swatch${(selectedVariant?.id === variant.id || productVariant == variant.id) ? " active" : ''}${!variant.available ? " out_of_stock" : ''}`}
                data-handle={handleize(variant.title)}
                onClick={() => updateShade(variant)}
              >
                <Srcset
                  alt={variant.title}
                  src={"https://cdn.shopify.com/s/files/1/0114/0621/3220/files/" + handleize(variant.title) + ".png"}
                  className="swatch-image swatch-label"
                />
              </div>
            ))}
          </ul>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="select-box-wrap">
          <select className="subscribe-option" ref={selectRef}>
            {
              productData.selling_plan_groups[0].selling_plans.map((option) => (
                <option value={option.id} key={option.id}>{option.name.slice(9)}</option>
              ))
            }
          </select>
        </div>
        <div className="add-card-btn-wrapper">
          {
            (
              <button className={`add-to-cart${isSubscribed ? ' disabled': ''}`}
                onClick={() => isSubscribed ? removeSellingPlan(productData.handle) :  updateSellingPlan(selectRef.current.value, productData.handle)}>
                <span className="text">
                {
                  isSubscribed
                  ? 'Remove'
                  : `ADD ${formatMoney(sellingPlan.per_delivery_price, '${{amount}}')}`
                }
                </span>
              </button>
              )
          }
        </div>
      </div>
    </div>
  );
};

export default SubscriptionProduct;
