import React from 'react';
import SideCartTemplate from './SideCartTemplate';
class SideCart extends React.Component {
  render() {
    return (
      <div className="side-cart-wrap">
              <SideCartTemplate handleCartChange={this.props.handleCartChange} />
      </div>
    )
  }
}

export default SideCart;