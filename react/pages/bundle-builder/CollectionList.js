import React, { Component } from "react";
import { connect } from "react-redux";

import { setCurrentCollection } from "../../redux/global/globalAction";
import {findCollectionIndex, setCollection} from './bundleHelper';
import CollectionItemList from './CollectionItemList';
class CollectionList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { currentCollection,currentProduct,settings } = this.props;
    if(!currentCollection){
      this.setInitialCurrentCollection(0);
    }else if(currentProduct.type_bag){
      let collectionIndex = findCollectionIndex('bags',settings);
      if(collectionIndex){
        this.setInitialCurrentCollection(collectionIndex);
      }
    }
  }

  
  setInitialCurrentCollection = (i) => {
    let { settings,setCurrentCollection } = this.props;
    setCollection(i,settings,setCurrentCollection);
  };

  render() {
    let { currentCollection,settings, currentProduct, setCurrentCollection } = this.props;
    if(cn(currentCollection)){
      return null;
    }
    let {collections} = settings;
    return (
      <div className="builder-main-selection">
        {collections.map((collection, i) => {
          return <CollectionItemList collection={collection} setCurrentCollection={setCurrentCollection} settings={settings} currentProduct={currentProduct} setInitialCurrentCollection={this.setInitialCurrentCollection} currentCollection={currentCollection}  />
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.global.settings,
  currentProduct: state.global.currentProduct,
  currentCollection: state.global.currentCollection
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentCollection: (collection) => dispatch(setCurrentCollection(collection)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
