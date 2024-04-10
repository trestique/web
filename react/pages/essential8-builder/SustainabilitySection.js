import React from 'react';
import { connect } from "react-redux";

/* Custom Component */
import Srcset from '../../components/Srcset';

class SustainabilitySection extends React.Component {
  render() {

    const { sectionData } = this.props;

    if(!sectionData){
      return <div></div>;
    }

    const { sustainability_practices, settings } = sectionData;
    if(sustainability_practices.length <= 0){
      return null;
    }
    return (
      <div className="sustain-section">
      <div className="custom-container">
        <div className="sustain-container">
          <h1>{settings.sustain_package_title}</h1>
            <div className="image-wrapper row">
             { sustainability_practices.map((img,key) => <div className="col-sm-2 col-xs-6" key={key}><div className="img"><Srcset src={img} /></div></div>) }
            </div>
            <div className="sustain-link-wrapper">
              <a className="sustain-link" href="#">OUR SUSTAINABILITY PRACTICES</a>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sectionData : state.essential_8.sectionData
});


export default connect(mapStateToProps)(SustainabilitySection);