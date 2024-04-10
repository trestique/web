import React from 'react';
import {connect} from 'react-redux';
import LookExtraInfo from './LookExtraInfo';
import LookProductVideo from './LookProductVideo';
import LookProductDetails from './LookProductDetails';
import MediaQuery from '../../components/MediaQuery';
class LookProductTemplate extends React.Component {
  render() {
    const {productData} = this.props;
    return (
      <div className="look-product-template">
        <div className="look-product-wrapper">
           <MediaQuery query="lap-and-up">
            <LookExtraInfo productData={productData} />
           </MediaQuery>
           <LookProductVideo productData={productData} />
           <LookProductDetails productData={productData} />
           <MediaQuery query="phone-and-tablet">
            <LookExtraInfo productData={productData} />
           </MediaQuery>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  productData: state.product,
});

export default connect(mapStateToProps)(LookProductTemplate);