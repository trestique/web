import React from "react";
import ReactHtmlParser from "react-html-parser";

const ShopByDescription = (desc) => {
  let data = desc.desc.settings;
  let btnStyle = {
    backgroundColor: data.btn_back_color,
    borderBottom: `3px solid ${data.btn_back_color}`,
  };
  let elementStyle = {
    color: data.btn_text_color,
  };
  let boxStyle = {
    color: data.text_color,
    backgroundColor: data.back_color,
  };
  return (
    <div className="shop-by-look-desc" style={boxStyle}>
      <div className="shop-by-look-desc-block">

        <div className="desc" style={elementStyle}>{ReactHtmlParser(data.description)}</div>
        <a className="btn" href={data.button_url} style={btnStyle}>
          {data.button_title}
        </a>
      </div>
    </div>
  );
};

export default ShopByDescription;
