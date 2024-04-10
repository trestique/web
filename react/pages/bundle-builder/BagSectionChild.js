import React, { Component } from "react";
import { connect } from "react-redux";
import Srcset from "../../components/Srcset";
import { filePath } from "../../settings";
import { handleize } from "../../components/Helper";
import { addSelectedBag } from "../../redux/global/globalAction";
import MediaQuery from '../../components/MediaQuery';
import VariantSelector from '../../components/VariantSelector';
class BagSectionChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadeTitle:'Choose your shade',
      currentVariant: {},
    };
  }
  updateVariant = (currentVariant) => {
    // Update event for bag variants change
    this.setState({
      currentVariant
    },() => {this.props.addSelectedBag(currentVariant)});
  };
  renderShades = () => {
      // This function render to show each variant as a separate products.EX:one product has 2 variant and second product has 1 variant so... total number of product need to display is 3. 
      let { bagType, settings } = this.props;
      let { currentVariant } = this.state;
      let bagData = settings[`${bagType}_bag`];
      if(bagData.variants.length === 1 && bagData.variants[0].title === '"Default Title"'){
          return null;
        }
      let variants =  <ul key={bagData.id} className={`swatch-wrap`}>
            {bagData.variants.map((variant) => {
              return (
                <VariantSelector
                  key={variant.id}
                  option={'color'}
                  selectedVariant={currentVariant}
                  variant={variant}
                  setSelectedVariant={this.updateVariant}
                />
              );
            })}
          </ul>
    return variants;
  }
  render() {
    let { bagType, settings, learnMore } = this.props;
    let { currentVariant } = this.state;
    let bagData = settings[`${bagType}_bag`];
    let textData = settings[`${bagType}_bag_text`];
    let image = bagData.featured_image;
    if(!cn(currentVariant)){
      if(!cn(currentVariant.featured_image)){
        image = currentVariant.featured_image.src;
      }
    }
    return (
      <div className="bag-selection-child-wrap">
        <MediaQuery query="tablet-and-up">
          <div className="left-section-wrap">
            <div className="left-inner-wrap">
              <h2 className="main-title-text">{textData.main_title}</h2>
              <p className="main-sub-title-text">{textData.description}</p>
            </div>
          </div>
        </MediaQuery>
        <div className="right-section-wrap">
          <div className="bag-inner-wrap">
            <img src={image} alt="img" className="bag-product-image" />
            <h3 className="title-wrap">{textData.second_title}</h3>
            <MediaQuery query="phone">
              <p className="main-sub-title-text">{textData.description}</p>
            </MediaQuery>
            <div className="swatches-wrapper bag-swatches">
              {this.renderShades()}
            </div>
            <div className="selected-swatch">
              <span>{currentVariant.title}</span>
            </div>
            <div className="learn-more-btn-wrap">
              <p className="learn-more-btn" onClick={learnMore}>+ Learn more</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  settings: state.global.settings,
  selectedItems: state.global.selectedItems
});
const mapDispatchToProps = (dispatch) => ({
  addSelectedBag: (settings) => dispatch(addSelectedBag(settings)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BagSectionChild);