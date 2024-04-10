import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { ajaxCart, formatMoney, handleize } from "../../components/Helper"
import Srcset from "../../components/Srcset"
import { setLoader } from "../../redux/essential8/essentialAction"
import { addToCart } from "../../redux/cart/cartAction"
import { miniCartOpen } from "../../../javascript/helper"

const ProductCard = props => {
  const [sellingPlan, setSellingPlan] = useState(0)
  const [currentVariant, setCurrentVariant] = useState(null)
  const [sellingPLanTitle, setSellingPLanTitle] = useState("")
  const modalRef = useRef()
  const dispatch = useDispatch()
  const { product } = props
  const {
    featured_image,
    title,
    variants,
    url,
    selling_plan_groups: [{ selling_plans }],
    metafields: { shortInfo, badge, backgroundColor, color, reviews },
  } = product

  const handleClick = () => {
    modalRef.current.classList.toggle("active")
  }

  const handleVariantChange = variantId => {
    if (!variantId) return
    const variant = variants.find(_variant => _variant.id === variantId)
    if (variant) {
      setCurrentVariant(variant)
    }
  }

  const handleSellingPlanChange = sellingPlanId => {
    if (!sellingPlanId) return
    if (currentVariant) {
      setSellingPlan(
        currentVariant.selling_plan_allocations.find(
          ({ selling_plan_id }) => selling_plan_id === sellingPlanId
        )
      )
    } else {
      setSellingPlan(
        variants[0].selling_plan_allocations.find(
          ({ selling_plan_id }) => selling_plan_id === sellingPlanId
        )
      )
    }
  }

  const handleAddToCart = () => {
    if (!(currentVariant?.id && sellingPlan?.selling_plan_id)) return
    const addTocartData = {
      id: currentVariant.id,
      qunatity: 1,
      selling_plan: sellingPlan.selling_plan_id,
    }
    dispatch(addToCart({ form: addTocartData, callback: miniCartOpen }))
  }

  return (
    <div className="product">
      {badge && (
        <p className="badge" style={{ backgroundColor, color }}>
          {badge}
        </p>
      )}
      <a href={url} className="img-wrapper">
        <Srcset
          src={
            currentVariant ? currentVariant.featured_image.src : featured_image
          }
          alt={title}
        />
      </a>
      <div className="info-wrapper">
        <div className="title-review-wrapper">
          <a href={url} className="title">{title}</a>
          <div
            className="reviews"
            dangerouslySetInnerHTML={{ __html: reviews }}
          />
        </div>
        <p className="short-info">{shortInfo}</p>
        <div className="variants-wrapper">
          {variants.map(({ id, title }) => (
            <div
              onClick={_event => handleVariantChange(id)}
              key={id}
              title={title}
              className={`variant${
                currentVariant && currentVariant.id === id ? " active" : ""
              }`}
            >
              <img
                src={`https://cdn.shopify.com/s/files/1/0114/0621/3220/files/${handleize(
                  title
                )}.png`}
                alt={title}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="extra">
        <div className="select-wrapper">
          <p className="frequency-input" onClick={handleClick}>
            <span>{sellingPlan ? sellingPLanTitle : `Select Frequency`}</span>
            <span>
              <img
                src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/down-arrow-svgrepo-com.svg"
                alt="Select Frequency"
              />
            </span>
          </p>
          <div className="frequency-data" ref={modalRef}>
            {selling_plans.map(({ id, options: [item] }) => (
              <p
                key={id}
                className="frequency"
                data-id={id}
                onClick={() => {
                  handleClick()
                  setSellingPLanTitle(item.value.replace(/\(|\)/g, ""))
                  handleSellingPlanChange(id)
                }}
              >
                {item.value.replace(/\(|\)/g, "")}
              </p>
            ))}
          </div>
        </div>

        <button
          disabled={
            !(currentVariant?.id && sellingPLanTitle) ||
            !currentVariant.available
          }
          className="add-to-cart-cta"
          onClick={handleAddToCart}
        >
          {currentVariant
            ? !currentVariant.available
              ? "Sold out"
              : sellingPlan
              ? "Add to cart"
              : "Select shade " +
                formatMoney(variants[0].selling_plan_allocations[0].price)
            : "Select shade " +
              formatMoney(variants[0].selling_plan_allocations[0].price)}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
