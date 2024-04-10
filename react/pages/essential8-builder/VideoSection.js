import React from 'react';
import { connect } from "react-redux";
import MediaQuery from "../../components/MediaQuery";

/* Custom components */
import Srcset from '../../components/Srcset';

class VideoSection extends React.Component {

  state = {
    enableVideo : false
  }

  handleClick = () => {
    /* Enable Video */
    this.setState(() => ({ enableVideo : true }));
  }

  render() {

    const { sectionData } = this.props;

    if(!sectionData ){
      return <div></div>;
    }

    const { video_section, settings } = sectionData;
    if(!settings.video_enable &&  video_section.length <=0){
      return null;
    }
    if(settings.video_enable){
      if(!settings.video_preview && !settings.video_link){
        return null;
      } 
    }
    return (
      <div className="es-8-video video-section container">
        {settings.video_section_title && <div className="col-xs-12">
          <h1>{settings.video_section_title}</h1>
        </div>}
        {video_section.length > 0 && 
        <div className="col-xs-12"> 
          <div className="image-wrapper row">
            { video_section.map((img,key) => <div className="col-sm-3 col-xs-6" key={key}><Srcset src={img} /></div>) }
          </div>
        </div>}
        {settings.video_enable && 
        <div className="col-xs-12">
          <div className="video-wrapper" onClick={() => this.handleClick()}>
            <>
            <MediaQuery query="lap-and-up">
            {!this.state.enableVideo && <Srcset src={settings.video_preview} />}
            <div className={this.state.enableVideo ? "video-frame-wrap active" : "video-frame-wrap"}>
              {settings.video_link ? 
              <video className='video' muted autoPlay={true} playsInline controls={false}>
                <source src={settings.video_link} type="video/mp4" />
              </video>
              :
              <iframe className="video-wrap-iframe" src={`https://www.youtube.com/embed/mOlb6K47c50?autoplay=${this.state.enableVideo ? '1' : '0'}`} allowFullScreen />
            }
            </div>
              
            </MediaQuery>
            <MediaQuery query="phone">
            {!this.state.enableVideo && <Srcset src={settings.video_preview_xs?.src ? settings.video_preview_xs?.src : settings.video_preview_xs} />}
            <div className={this.state.enableVideo ? "video-frame-wrap active" : "video-frame-wrap"}>
              {settings.video_link_xs ? 
              <video className='video' muted autoPlay={true} playsInline controls={false}>
                <source src={settings.video_link_xs} type="video/mp4" />
              </video>
              :
              <iframe className="video-wrap-iframe" src={`https://www.youtube.com/embed/mOlb6K47c50?autoplay=${this.state.enableVideo ? '1' : '0'}`} allowFullScreen />
            }
            </div>
              
            </MediaQuery>
            </>

          </div>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sectionData : state.essential_8.sectionData
});


export default connect(mapStateToProps)(VideoSection);