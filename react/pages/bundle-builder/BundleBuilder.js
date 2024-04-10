import React, { Component } from "react";
import { connect } from "react-redux";

import BuilderMain from "./BuilderMain";
import SplashScreen from "./SplashScreen";
import BundleBuilderHeader from "./BundleBuilderHeader";
import BagSection from "./BagSection";
import FooterBar from "./FooterBar";
import ReviewSection from "./ReviewSection";
import { addItem } from "../../redux/global/globalAction";
import {queryString} from '../../components/Helper';
class BundleBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const query = queryString();
    // if(query.step) {
    //   if(query.step.value == "2") {
    //     this.setActiveStep(1);
    //   }
    // }
  }

  setActiveStep = (n) => {
    let { settings, setGlobalSettings } = this.props;
    let new_settings = { ...settings, activeStep: n };

    setGlobalSettings(new_settings);
  };

  renderSwitch(step,activeStep) {
    switch (step) {
      case 0:
        return <>
          <BundleBuilderHeader step={activeStep} selectionBarShow={true}/>
          <SplashScreen changeScreen={this.setActiveStep} />
        </>;

      case 1:
        return <>
          <BundleBuilderHeader step={activeStep} selectionBarShow={true} />
          <BuilderMain step={step} /><FooterBar />
        </>;

      case 2:
        return <>
          <BundleBuilderHeader step={activeStep} selectionBarShow={true} />
          <BagSection step={step} />
          <FooterBar />
        </>;

      case 3:
        return <>
        <BundleBuilderHeader step={activeStep} selectionBarShow={true} />
        <ReviewSection step={step} cartPopup={false} /><FooterBar /></>;

      default:
        return <><BundleBuilderHeader step={activeStep} selectionBarShow={true} /><SplashScreen changeScreen={this.setActiveStep} /></>;
    }
  }

  render() {
    let { activeStep } = this.props.settings;
    // const step = this.props.location.search
    return (
      <div className="bundle-builder">
        {this.renderSwitch(activeStep,activeStep)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.global.settings,
});
const mapDispatchToProps = (dispatch) => ({
  setGlobalSettings: (settings) => dispatch(addItem(settings)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BundleBuilder);
