import React from 'react';
import {handleize, queryStringVariant} from '../components/Helper';
import { filePath } from "../settings";
class VariantSelector extends React.Component{
    
    checkVariantType = (name) => {
        let handleName = handleize(name);
        let type = "";
        if (handleName == "color" || handleName == "colour") {
          type = "color";
        } else {
          type = "normal";
        }
        return type;
    };
    // findVariantImages = title =>{
    //   let {variantImages} = this.props;
    //   if(variantImages){
    //     let vimg = variantImages.filter((image) => image.title == title );
    //     if(vimg.length>0){
    //           return vimg[0].vimg; 
    //     }else{
    //         return null;
    //     }
    //   }
    //    return null; 
    // }
    handleVariant = (variant) =>{
        let {setSelectedVariant,changeUrl} = this.props;
        if(variant.available == false && !changeUrl){
          return;
        }
        setSelectedVariant(variant);
        if(changeUrl){
          queryStringVariant(variant);
        }
    }
    render (){
      const {variant,variantMeta} = this.props;
      if(cn(variant)){
        return null;
      }
      let hoverText = '';
      let hoverColor = '';
      let hoverBgColor = '';
      let shoDefaultText = false;
      let currentVarMeta = '';
      if(variantMeta){
        currentVarMeta = variantMeta[variant.title];
        if(currentVarMeta['text_on_hover']) {
          hoverText = currentVarMeta['text_on_hover'];
        }
        if(currentVarMeta['color_on_hover']) {
          hoverColor = currentVarMeta['color_on_hover'];
        }
        if(currentVarMeta['bg_on_hover']) {
          hoverBgColor = currentVarMeta['bg_on_hover'];
        }
        if(currentVarMeta['show_default_text'] == "true") {
          shoDefaultText = true;
        }
      }
      

      let colorTagStyle = {color: hoverColor ? hoverColor : '#FFFFFF',backgroundColor:hoverBgColor ? hoverBgColor : "red"};
      
     
      
      const {option,selectedVariant,variantImages,setSelectedVariant} = this.props;
      let vimg = `${filePath}${handleize(variant.title)}.png`;
      let Style = {}
      if(this.checkVariantType(option) === "color" && vimg){
        Style = {backgroundImage: `url(${vimg})`};
      }
      
      
      let activeVariantId = '';
      if(!cn(selectedVariant)){
        activeVariantId = selectedVariant.id;
      }
      return(
        <li data-value={handleize(variant.title)} 
          onClick={()=>{ this.handleVariant(variant) }}
          className={`swatch-element ${this.checkVariantType(option)} 
          ${handleize(variant.title)} 
          ${variant.available ? '' : 'variant-soldout'}
          ${activeVariantId === variant.id ? 'active' : ''}`}>
          <label className="swatch-label" style={Style}>
            <span>{variant.title}</span>
          </label>
          {hoverText && (variant?.id == selectedVariant?.id || shoDefaultText) && <span className='variant-color-tag' style={colorTagStyle}>{hoverText}</span>}
        </li>
    );
  }
}
export default VariantSelector;
