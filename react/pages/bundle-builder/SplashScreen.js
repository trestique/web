import React, { Component } from "react";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import Srcset from "../../components/Srcset";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_step: 0,
    };
  }

  changeScreen = () => {
    let { changeScreen } = this.props;
    changeScreen(1);
  };

  render() {
    let { image, heading, sub_heading, content_text, button_text } =
      this.props.settings;
    return (
      <div className="splash-main">
        <div className="placeholder-image">
          <Srcset alt={heading} src={image} className="splash-image" />
        </div>
        <div className="text-content">
          <h2 className="splash-heading">{heading}</h2>
          <h4 className="splash-subheading">{sub_heading}</h4>
          <div className="splash-content">{ReactHtmlParser(content_text)}</div>
          <div>
            <button className="splash-button" onClick={this.changeScreen}>
              {button_text}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.global.settings,
});

export default connect(mapStateToProps)(SplashScreen);
