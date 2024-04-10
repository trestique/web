import React, { Component } from "react";
import { connect } from "react-redux";
import ReviewSectionProduct from "./ReviewSectionProduct";
class ReviewSection extends Component {
  render() {
    let { localItems, cartPopup } = this.props;
    return (
      <div className="review-selection-wrap">
          <div className="custom-container">
          <div className="flex-view-xs space">
            {localItems.map((product,index) => {
                return <ReviewSectionProduct  index={index} product={product} cartPopup={cartPopup} />
            })}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  localItems: state.global.localItems
});
export default connect(mapStateToProps, null)(ReviewSection);
