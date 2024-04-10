import React from 'react';
/* Module imports */
import ProductTabs from '../../components/ProductTabs';
import ProductReviewSlider from '../../components/ProductReviewSlider';
import Essential8Services from './Essential8Services';

class Essntial8ExtraData extends React.Component {
  
  render() {
    const { settings } = this.props;

    if(!settings){
      return null;
    }

    return (
      <div className='essential-8-extra-data'>
          <ProductTabs settings={settings} />
          <Essential8Services settings={settings} />
          <ProductReviewSlider settings={settings} />
      </div>
    );
  }
}


export default Essntial8ExtraData;