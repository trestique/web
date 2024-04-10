import React,{useRef} from 'react';
const LookProductVideo = ({productData}) => {
    if(!productData){
        return null;
    }
    const refVideo = useRef(null);
    let video = productData?.product?.shop_by_look_video;
    let videoLinks = productData?.product?.shop_by_look_videos_links;
    let plaVideo  = (time = 0 ) =>{
      console.log(time);
      if(refVideo.current){
        refVideo.current.currentTime = time;
      }
    } 

    return (
      <div className='look-product-video'>
        <div className='video-wrapper-shop'>
          {video && 
          <video ref={refVideo} muted autoPlay playsInline loop controls={true}  className="video">
              <source src={`${video}#t=0.001`} type="video/mp4" />
          </video>}
          {videoLinks && <ul className='video-links'>
            {videoLinks.map((link,i)=>{
              let data = link.split('#');
              let time = data[1];
              if(time){
                time = parseInt(time);
              }
              return <li key={i} className='link-item'><span  onClick={()=> plaVideo(time)}>{data[0]}</span></li>
            })}
          </ul>}
        </div>
      </div>
    )
}
export default LookProductVideo;
