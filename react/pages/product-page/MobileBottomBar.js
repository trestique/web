import React from 'react';
import ProductSubscribe from './ProductSubscribe';
import ProductButtons from './ProductButtons';
import { Spinner } from "../../components/Form";
import { formatMoney } from '../../components/Helper';
class MobileBottomBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showSubscription:false
    }
  }
  toggleSubscription = () => {
    this.setState({showSubscription:!this.state.showSubscription});
  }
  render() {
    let { settings, currentVariant, planType, selling_plan, changePlan, changeSubscription, quantity, changeQty, addToCartProcess, productPrice } = this.props;
    let { showSubscription } = this.state;
    return(
      <div className='mobile-bottom-bar'>
        <ProductButtons addToCartProcess={addToCartProcess} selling_plan={selling_plan} quantity={quantity} planType={planType} currentVariant={currentVariant} changeQty={changeQty}/>
      </div>
    )
  }
}
export default MobileBottomBar;