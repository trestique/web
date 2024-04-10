import React from "react";
import ShopByLookBanner from "./ShopByLookBanner";
import ShopByLookVideo from "./ShopByLookVideo";
import ShopLookCategory from "./ShopLookCategory";
import ShopLookImageWithText from "./ShopLookImageWithText";
import ShopByDescription from "./ShopByDescription";
class ShopByLookTemplate extends React.Component {
  render() {
    let { data } = this.props;
    let { banner, categories, desc, grid } = data;
    return (
      <div className="shop-by-look">
        <div className="shop-look-container">
          {banner?.blocks?.map((item, i) =>
            item.type == "banner" ? (
              <ShopByLookBanner key={i} item={item} />
            ) : (
              <ShopByLookVideo key={i} item={item} />
            )
          )}

          {categories?.blocks?.length > 0 && <div className="shop-by-look-categories">
            <div className="model-look-card">
              <ShopLookCategory categories={categories} />
            </div>
          </div>}

          <div className="model-look-img-text">
            {grid?.blocks?.map((item, i) => (
              <ShopLookImageWithText key={i} item={item} />
            ))}
          </div>

          <ShopByDescription desc={desc} />
        </div>
      </div>
    );
  }
}

export default ShopByLookTemplate;
