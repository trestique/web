import React, { Component } from "react";

import CollectionList from "./CollectionList";
import ProductSlider from "./ProductSlider";
class BuilderMain extends Component {
  render() {
    return (
      <div className="builder-main">
        <CollectionList />

        <ProductSlider />

        <div className="builder-main-cart"></div>
      </div>
    );
  }
}

export default BuilderMain;
