import { BaseBlackcart, TBYBButton, IValidatorCart } from '@blackcart/base';

export const initBlackcart = ({
    shopDomain,
    cart,
    clearCart,
    selectedCurrency,
    isProduction,
    useModal,
    modalConfig,
    moneyFormatter
  }) => {

  return BaseBlackcart.getInstance(
      shopDomain,
      cart,
      clearCart,
      selectedCurrency,
      isProduction,
      useModal,
      modalConfig,
      moneyFormatter
    )
      
};