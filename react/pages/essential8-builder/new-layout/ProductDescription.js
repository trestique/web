import React, { useState, useRef, useEffect } from "react";
import HtmlParser from "react-html-parser";

const ProductDescription = ({settings}) => {
  const contentRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  
  useEffect(() => {
    // const child = contentRef.current.querySelector('p');
    const contentHeight = contentRef.current.clientHeight;
    const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
    const numberOfLines = contentHeight / lineHeight;
    
    // Check if content has more than 2 lines
    if (numberOfLines > 4) {
      setShowButton(true);
    }
  }, [settings.content_text]);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const {content_visible} = settings;
  
  return (
    <div className={`product-es8-details-text-description ${content_visible}`}>
      <div  
        style={{
          lineHeight: '1.6rem',
          maxHeight: showFullContent ? 'none' : '6.4rem', // Assuming 2 lines with a lineHeight of 2rem
          overflow: 'hidden',
        }} className={`description-content`}><div ref={contentRef}>{HtmlParser(settings.content_text)}</div></div>

    {showButton && 
      <div
        onClick={() => toggleContent()}
        className="product-es8-details-text-showButton"
      >
        {showFullContent ? "Show Less" : "Show More"}
      </div>}
    </div>
  );
};

export default ProductDescription;
