import React, { Component } from "react";
import { connect } from "react-redux";
import BagSectionChild from './BagSectionChild';
import { findBagType } from "../../components/Helper";
import { addItem } from "../../redux/global/globalAction";
import LearnMore from "./LearnMore";
class BagSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      learnMorePopup:false
    };
  }
  learnMore = () => {
    this.setState({learnMorePopup:true});
  }
  closeLearnMore = () => {
    this.setState({learnMorePopup:false});
  }
  render() {
    let { selectedItems, selectedBag } = this.props;
    let { learnMorePopup } = this.state;
    let bagType = findBagType(selectedItems);
    return (
      <div className="bag-selection-wrap">
        <BagSectionChild bagType={bagType} learnMore={this.learnMore} />
        {learnMorePopup && selectedBag && selectedBag.learn_more && selectedBag.learn_more.title &&
          <>
            <LearnMore product={selectedBag} closePopup={this.closeLearnMore} />
          </>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selectedItems: state.global.selectedItems,
  selectedBag: state.global.selectedBag
});
const mapDispatchToProps = (dispatch) => ({
  setGlobalSettings: (settings) => dispatch(addItem(settings)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BagSection);
