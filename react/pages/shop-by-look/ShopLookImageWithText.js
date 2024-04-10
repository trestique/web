import React from "react";
import ReactHtmlParser from "react-html-parser";
class ShopLookImageWithText extends React.Component {
  render() {
    let { item } = this.props;
    let textColor = {
      color: item.shade_title_color,
    };
    let btnStyle = {
      color: item.btn_text_color,
      backgroundColor: item.btn_back_color,
    };
    return (
      <div className="perfect-shade-banner">
        <div className="shade-banner-images">
          <div className="xs-hide">
            <img src={item.shade_image}></img>
          </div>
          <div className="xs-show">
            <img src={item.shade_image_mob}></img>
          </div>
        </div>
        <div className="shade-banner-content">
          <div className="shade-banner-desc" style={textColor}>
            {ReactHtmlParser(item.shade_title)}
          </div>
          <div className="shade-banner-btn">
            <a
              href={item.shade_button_url}
              className="button button--secondary"
              style={btnStyle}
            >
              {item.shade_button_title}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopLookImageWithText;
