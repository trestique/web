import React from "react";

const ItemLoader = (props) => {
  return (
    <div className="item-loader">
      <div className="flex-view-xs">
        <div className="col-xs-4 col-sm-4">
          <div className="img"></div>
        </div>
        <div className="col-xs-8 col-sm-8">
          <div className="details">
            <p></p>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemLoader;
