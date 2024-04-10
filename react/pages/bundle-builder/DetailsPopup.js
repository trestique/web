import React from "react";
import ReactHtmlParser from "react-html-parser";


class DetailsPopup extends React.Component{
    constructor(props) {
        super(props);
        this.video = React.createRef();
    }
    toggleVideo = () =>{
        if(this.video){
            let parent = this.video.current.closest('.bundle-video-wrapper');
            if(this.video && !parent.classList.contains('active')){
                this.video.current.play();
                parent.classList.add('active');
            }else if(this.video &&parent.classList.contains('active')){
                this.video.current.pause();
                parent.classList.remove('active');
            }
        }
    }
    render(){
        let {title,content,closePopup,video} = this.props;
        return(
            <>
                <div className="es-mix-bundle-popup-overlay" onClick={()=> closePopup(false)}></div>
                <div className="es-mix-bundle-detail-popup">
                    <h3 className="bundle-popup-title">{title}
                    <span className="close-bundle-popup" onClick={()=> closePopup(false)}><img src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector_3.png?v=1647460404"/></span>
                    </h3>
                    {video && 
                    <div className="bundle-video-wrapper">
                    <div className="video-overlay" onClick={this.toggleVideo}>
                        <img className="play-icon" src="https://cdn.shopify.com/s/files/1/0114/0621/3220/files/Vector_4.png?v=1647540986" />
                    </div>
                    <video ref={this.video} playsInline loop controls={false}  className="video">
                        <source src={`${video}#t=0.001`} type="video/mp4" />
                    </video>
                    </div>}
                    <div className="bundle-popup-content">
                        {ReactHtmlParser(content)}
                    </div>
                </div>
            </>
        )
    }
}
export default DetailsPopup;