import React from "react"

const FooterFaq = (props) => {
  const {
    button: { text, url = "#" },
    content: { heading, subHeading, mobileOnly },
    images
  } = props

  return (
    <section className={`footer-faq-section ${mobileOnly ? "xs-show" : ""}`}>
      <div className="content-wrapper">
        <h3 className="heading">{heading}</h3>
        <p
          className="sub-heading"
          dangerouslySetInnerHTML={{ __html: subHeading }}
        />
      </div>
      <a className="faq-btn" href={url}>
        {text}
      </a>
      <div className="images-wrapper">
        {images.map(({ heading, subheading, img }) => (
          <div className="content">
            <div className="img-wrapper">
              <img src={img} alt={heading} />
            </div>
            <div className="wrapper">
              <p className="text-heading">{heading}</p>
              <p
                className="text-subheading"
                dangerouslySetInnerHTML={{ __html: subheading }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FooterFaq
