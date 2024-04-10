import React from "react";
import ProductCard from "./ProductCard";

const CollectioWithProduct = ({
  collection: {
    id,
    title,
    metafields: { shortInfo },
  },
  products,
  media: { image, video, alignment, url = "/" },
}) => {
  return (
    <section key={id} className="collection-with-product">
      <div className="collection-info">
        <h3 className="title">{title}</h3>
        <p className="short-info xs-show">{shortInfo}</p>
      </div>
      {(image || video) && (
        <a
          href={url}
          className={`media-wrapper xs-hide ${
            alignment === "right" ? "align-right" : ""
          }`}
        >
          {image ? (
            <div className="img-wrapper">
              <img src={image} alt={title} />
            </div>
          ) : (
            <div className="vide-wrapper">
              <video autoPlay loop controls muted playsInline>
                <source src={video} type="video/mp4"></source>
              </video>
            </div>
          )}
        </a>
      )}
      <div className="collection-products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CollectioWithProduct;
