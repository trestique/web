import React from "react";
import ReactHtmlParser from "react-html-parser";

const Essential8Service = (props) => {
  const { settings } = props;
  const { services } = settings;
  if (cn(services)) {
    return null;
  }
  return (
    <div className="product-services">
      <ul className="service-items">
        {services.map((item, i) => {
          return (
            <li key={i}>
              <img src={item.service_icon} />
              <span>{ReactHtmlParser(item.service_text)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Essential8Service;
