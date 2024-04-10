import React from "react";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

/* Custom Component Imports */
import ChildProduct from "./ChildProduct";

class ChildProducts extends React.Component {
  render() {
    const { sectionData, showQuiz } = this.props;

    if (!sectionData) {
      /* if data is not present */
      return <div></div>;
    }

    return (
      <div className="child-products-section ">
        <div className="shade-title-wrap">
          <h4 className="shades-title">{sectionData.settings.shades_title}</h4>
          {sectionData.settings?.essential_shade_text && (
            <div
              className="essential-shade-btn-text-content"
              style={{
                color: sectionData.settings?.essential_shade_text_color,
              }}
            >
              {ReactHtmlParser(sectionData.settings?.essential_shade_text)}
              {sectionData.settings.essential_shade_popup_open_text && (
                <span onClick={showQuiz} className="popup-open-text">
                  {sectionData.settings.essential_shade_popup_open_text}
                </span>
              )}
            </div>
          )}
        </div>
        {sectionData.selectable_products.map((selectable_product, key) => {
          return (
            <ChildProduct
              product={selectable_product}
              key={key}
              index={key}
              lastProduct={sectionData.selectable_products.length - 1 === key}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sectionData: state.essential_8.sectionData,
});

export default connect(mapStateToProps)(ChildProducts);
