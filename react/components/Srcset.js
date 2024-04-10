import React from "react";
import Lazyload from './Lazyload';
import { imgURL } from "./Helper";

class Srcset extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { parentWidth: null };
  }
  render() {
    let { src, alt, callBack, className, ...otherProps } = this.props;
    let srcset = "";
    let srcsetArray = [180, 360, 480, 765, 900, 1000, 1200, 1500, 1900];
    srcsetArray = srcsetArray.map((srcNo) => {
      srcset = `${srcset} ${imgURL(src, `${srcNo}x`)} ${srcNo}w,`;
      return src;
    });

    let { parentWidth } = this.state;
    if (!src) {
      src =
        "https://cdn.shopify.com/s/files/1/0114/0621/3220/files/no-image.png?v=1623842945";
    }
    if (!parentWidth) {
      parentWidth = "30x";
      // showBlur = true;
    }
    if(!cn(this.myRef.current)){
      this.myRef.current.removeAttribute('srcset');
      this.myRef.current.classList.remove('lazyload--fade-in');
      this.myRef.current.classList.remove('lazyautosizes');
      this.myRef.current.classList.remove('lazyloaded');
      this.myRef.current.classList.add('lazyload');
      // this.myRef.current.removeAttribute('data-srcset');
    }
    return (
      <img
        src={imgURL(src, "30x")}
        data-srcset={srcset}
        data-sizes="auto"
        className={`lazyload responsive-image ${className}`}
        alt={alt}
        {...otherProps}
        ref={this.myRef}
        data-blur="true"
      />
    );
  }
}
export default Srcset;
