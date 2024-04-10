import React, { Component } from "react";
class CollectionItemList extends Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  removePopup =() =>{
    let list = document.querySelectorAll('.builder-main-selection .selection-collection');
    if(this.element){
        this.element.current.classList.remove('active');
        // list.forEach((item)=>{
        //     item.classList.remove('active');
        // })
    }
  }
  handleClickOutside = (event) =>{
    if (this.element && !this.element.current.contains(event.target)) {
        this.removePopup();
    }
  }

  updateCollection = (e,i) =>{
    if(screen.width <= 767){
      let target = e.currentTarget.closest('.selection-collection');
      let parent = target.closest('.builder-main-selection');
      let collectionList = parent.querySelectorAll('.selection-collection');
      collectionList.forEach(element => {
          element.classList.remove('active');
      });
      target.classList.add('active');
      return;
    }
    this.props.setInitialCurrentCollection(i);
  }
  updateCurrentProduct = (handle) =>{
    let { setCurrentCollection,settings } = this.props;
    let {all_products,collections} = settings;
    let currentProduct = {};
    let currentCollection = {};
    collections.map((collection)=>{
      collection.collection_products.map((product)=>{
        if(product.data.handle == handle){
          currentCollection = collection;
          currentProduct = product
        }
      })
    })
    setCurrentCollection({currentProduct,currentCollection});
    if(screen.width <= 767){
        this.removePopup();
    }
  }

  renderProductList = (collection) => {
    let { currentProduct } = this.props;
     let products = collection.collection_products.map((product, i) => {
      let title = product.data.title 
      let titleTag = product.data.tags.find((tag)=> tag.includes('bundle_builder_title_'));
      if(titleTag){
        title = titleTag.replace('bundle_builder_title_','');
      }
      return <p  key={`p-${i}`} className={`collection-products${ currentProduct && currentProduct.data.handle === product.data.handle ? " active" : "" }`}
          onClick={() => this.updateCurrentProduct(product.data.handle)}
          data-handle={product.data.handle} >
          {title}
        </p>
    });
    return products;
  };

  render() {
    let { currentCollection,collection  } = this.props;
    return (
          <div ref={this.element}  className="selection-collection" key={collection.handle + "_" + i}>
            <h2 className={`collection-title${ currentCollection && currentCollection.collection_handle === collection.collection_handle
                  ? " active" : "" }`} onClick={(e) => this.updateCollection(e,i)} >
              {collection.collection_text}
            </h2>
            <div className="products-list">
            {this.renderProductList(collection)}
            </div>
        </div>
    );
  }
}

export default CollectionItemList;
