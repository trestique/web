import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "./redux/global/globalAction";
import { addChildProduct, setEssentialData } from "./redux/essential8/essentialAction";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { trestiqueBuilder , essentialBuilder } = window;
    let { setGlobalSettings , setEssentialData, addChildProduct } = this.props;

    let settings = { ...trestiqueBuilder };

    /* set essential mix data */
    this.setState({ settings }, () => {
      setGlobalSettings(settings);
    });

    /* set essential-8 section data  */
    setEssentialData(essentialBuilder);
    /* select 1st shade in essential-5 || essential 8 */
    if(window.location.pathname === "/products/the-essential-5-basics-starter-kit" || window.location.pathname === "/products/essential-8") {
      const selectedItems = []
      essentialBuilder.selectable_products.forEach((product) => {
        const {variants, handle} = product.productData
        const variant = variants.find(variant => variant.available )
        selectedItems.push({handle: handle, id: variant.id})
      })
      addChildProduct(selectedItems)
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-container-block">{this.props.children}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setGlobalSettings: (settings) => dispatch(addItem(settings)),
  setEssentialData: (data) => dispatch(setEssentialData(data)),
  addChildProduct: data => dispatch(addChildProduct(data))
});
export default connect(null, mapDispatchToProps)(AppContainer);
