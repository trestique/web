import React from "react";
import Srcset from "../../components/Srcset";
import ProductCard from "./ProductCard";

const CollectionWithMedia = (props) => {
  const {
    media: { image, video },
    collection: {
      title,
      metafields: { shortInfo },
    },
    showTitle,
    showDescription,
    products,
  } = props;

  return (
    <section className="product-wrapper-section">
      {(image || video) && (
        <div className="media-wrapper xs-hide">
          {image ? (
            <div className="img-wrapper">
              <Srcset src={image} />
            </div>
          ) : (
            <div className="video-wrapper">
              <video autoPlay loop controls muted playsInline>
                <source src={video} type="video/mp4"></source>
              </video>
            </div>
          )}
        </div>
      )}
      <div className="wrapper">
        <div className="content-wrapper">
          {showTitle && <h3 className="heading">{title}</h3>}
          {showDescription && (
            <div
              className="content xs-show"
              dangerouslySetInnerHTML={{ __html: shortInfo }}
            />
          )}
        </div>
        <div className="products-wrapper">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionWithMedia;
