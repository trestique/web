import React from "react";

const SubscriptionProductsNote = (props) => {
  const { id, cartItems } = props;
  const filterChildItems = cartItems.filter(
    (item) => item.properties?._type === 'child' && item.properties?._bid === id && item.selected_selling_plan
  );
  if (!filterChildItems.length) return null;

  return (
    <div className="subscription-note-wrapper selected-selling-plan">
      {filterChildItems.map((item) => (
        <p key={item.key}>{item.product_title} : {item.selected_selling_plan.name}</p>
      ))}
    </div>
  );
};

export default SubscriptionProductsNote;
