import React from "react";
import { connect } from "react-redux";
import { setQuizSettings } from "../../redux/quiz/quizAction";

/* Component Imports */
import EssentialLoader from "./EssentialLoader";
import EssentialSlider from "./EssentialSlider";
import EssentialMain from "./EssentialMain";
import SustainabilitySection from "./SustainabilitySection";
import VideoSection from "./VideoSection";
import RoutineSection from "./RoutineSection";
import Essential8New from "./new-layout/Essential8New";
class Essential8BuilderTemplate extends React.Component {
  componentDidMount() {
    this.props.setQuizSettings(window.quiz.settings);
    /* Enable Review Section once Component mounts */
    document
      .querySelector(".es-8-review-section-container")
      .classList.remove("hide");
  }

  render() {
    const {sectionData} = this.props;
    let newLayout = false;
    if(sectionData?.layout == 'new'){
      newLayout = true;
    }
    return (
      <div>
        {newLayout && <Essential8New productDetail={this.props?.sectionData} />}
        <div className="essential-8-builder-template">
          {this.props.loader && <EssentialLoader />}
          {!newLayout && 
          <div className="essential-8-builder">
            <div className="flex-view-xs">
              <EssentialSlider />
              <EssentialMain handleLoader={this.handleLoader} />
            </div>
          </div>}
          {/* Sustain section */}
          <SustainabilitySection />

          {/* Video Section*/}
          <VideoSection />

          {/* Routine Section */}
          <RoutineSection />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loader: state.essential_8.loader,
  sectionData: state.essential_8.sectionData,
});

/* Action Dispatchers */
const mapDispatchToProps = (dispatch) => ({
  setQuizSettings: (data) => dispatch(setQuizSettings(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Essential8BuilderTemplate);
