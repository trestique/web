import React from 'react';
import { connect } from "react-redux";
import MediaQuery from '../../components/MediaQuery';
/* Custom components */
import Srcset from '../../components/Srcset';

class RoutineSection extends React.Component {

  render() {

    const { sectionData } = this.props;

    if(!sectionData){
      return <div></div>;
    }

    const { settings } = sectionData;

    return (
      <div className="routine-section">
        <div className="image-wrapper">
          {settings.customize_routine_image && 
          <MediaQuery query="tablet-and-up">
          <Srcset src={settings.customize_routine_image} /> 
          </MediaQuery>}
          {settings.customize_routine_image_mob && 
          <MediaQuery query="phone">
          <Srcset src={settings.customize_routine_image_mob} />
          </MediaQuery>}
        </div>
        <div className="text-wrapper">
          <h1 className="routine-header">{settings.customize_routine_header}</h1>
          <div className="routine-description"><p>{settings.customize_routine_description}</p></div>
          {settings.customize_routine_btn_text && <button className="routine-btn" onClick={() => window.location.href = settings.customize_routine_btn_link}>{settings.customize_routine_btn_text}</button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sectionData : state.essential_8.sectionData
});


export default connect(mapStateToProps)(RoutineSection);