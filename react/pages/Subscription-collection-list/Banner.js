import React from "react"
import HtmlParser from "react-html-parser"
import Srcset from "../../components/Srcset"

const Banner = (props) => {
  const { heading, content, info, media } = props
  const { enableImages, image, video, images } = media
  return (
    <section className="banner-section">
      <div className="banner-wrap">
        <div className="media-wrapper">
          {image ? (
            <div className="img-wrapper">
              <img src={image} alt={heading} />
            </div>
          ) : (
            <div className="video-wrapper">
              <video autoPlay loop controls muted playsInline>
                <source src={video} type="video/mp4"></source>
              </video>
            </div>
          )}
        </div>
        <div className="content-wrapper">
          <h3 className="banner-heading">{heading}</h3>
          <div className="banner-content">{HtmlParser(content)}</div>
          <p className="info xs-hide">{info}</p>
          {enableImages && (
            <div className="collection-icons">
              {images.map((img) => (
                <div key={img} className="img-wrapper">
                  <img src={img} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Banner
