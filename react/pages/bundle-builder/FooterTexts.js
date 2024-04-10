import React from 'react'; 
import MediaQuery from '../../components/MediaQuery';
import { connect } from "react-redux";
import {toggleDescriptionPopup,toggleHowToUsePopup,toggleIngredientsPopup,toggleSustainibilityPopup } from "../../redux/global/globalAction";

class FooterTexts extends React.Component{
    
  findFooterTags = (currentProduct) => {
    let tags = [];
    if (!cn(currentProduct)) {
      let metadata = currentProduct.metadata;
      if (!cn(metadata.bundle_footer_details) && !metadata.bundle_footer_details.error) {
        let tagsData = metadata.bundle_footer_details;
        tags = tagsData.split("##");
      }
    }
    return tags;
  };

  render(){
        let {activeProduct,activeStep} = this.props;
        if(cn(activeProduct) || activeStep == 3){
          return null;
        }
        let {toggleHowToUsePopup, toggleDescriptionPopup, toggleIngredientsPopup, toggleSustainibilityPopup} = this.props;


        let howTouse = activeProduct.metadata.how_to_use;
        let description = activeProduct.metadata.description;
        let ingredients = activeProduct.metadata.ingredients;
        let sustainability = activeProduct.metadata.sustainability;
        let variantMetaData = activeProduct?.metadata?.variantMeta[activeProduct?.currentVariant?.title];
        if(variantMetaData){
          if(variantMetaData.how_to_use){
            howTouse = variantMetaData.how_to_use;
          }
          if(variantMetaData.description){
            description = variantMetaData.description;
          }
          if(variantMetaData.ingredients){
            ingredients = variantMetaData.ingredients;
          }
          if(variantMetaData.sustainability){
            sustainability = variantMetaData.sustainability;
          }
        }

        return(
            <>
              <MediaQuery query="tablet-and-up">
                <ul className="footer-tags">
                {(activeProduct.metadata.how_to_use_video || howTouse)  && <li onClick={()=> toggleHowToUsePopup(true)}>HOW TO USE</li> }
                {description && <li onClick={()=> toggleDescriptionPopup(true)}>DESCRIPTION</li>}
                {ingredients && <li onClick={()=> toggleIngredientsPopup(true)}>INGREDIENTS</li>}
                {(sustainability || activeProduct.metadata.sustainability_video)  && <li onClick={()=> toggleSustainibilityPopup(true)}>SUSTAINABILITY</li>}

                </ul>
              </MediaQuery>
          </>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
  toggleDescriptionPopup: (value) => dispatch(toggleDescriptionPopup(value)),
  toggleHowToUsePopup: (value) => dispatch(toggleHowToUsePopup(value)),
  toggleIngredientsPopup: (value) => dispatch(toggleIngredientsPopup(value)),
  toggleSustainibilityPopup: (value) => dispatch(toggleSustainibilityPopup(value)),
});
export default connect(null, mapDispatchToProps)(FooterTexts);
