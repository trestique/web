import { AddToCartButton, useBlackcart } from "@blackcart/react-sdk";

const ProducPageComponent = () => {
  const isVariantEligibleForTBYB = true; // your rendering logic goes here
  const { isInitializing, setCart: setBCCart } = useBlackcart();

  const handleAddNewItem = () => {
    /*
        Here comes your storefront logic for updating a cart IF you want to use
        ADD as TBYB as a regular add to cart feature.
        For the Instant checkout with Blackcart feature see Examples.
        * */

        const tbybVariant = {...selecteVariant, properties: {...selecteVariant.properties, _tbyb: true}}

        fetch('add to cart', {method: 'PUT', body: JSON.stringify(tbybVariant)}).then(result => {
        // ... getting an updated cart
        // ... parse new cart to the IValidatorCart model and set `isTBYB`
        // flag for the added item to true
        setBCCart(parsedCart)
        })
    }
    return (
        <div>
          {/* some other components*/}
          {
            isVariantEligibleForTBYB && (
              <AddToCartButton
                fullWidth
                onClick={handleAddNewItem}
                buttonProps={{
                  text: 'Try before you buy',
                  disabled: false // Depends on the storefront Add to cart button state
                }}
              />
            )
          }
        </div>
      );
}
export default ProducPageComponent;