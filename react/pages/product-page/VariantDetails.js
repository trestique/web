import React from 'react';
import ReactHtmlParser from "react-html-parser";
import { connect } from 'react-redux';
import VariantSelector from '../../components/VariantSelector';
import {updateVariant} from '../../redux/product-page/productAction';
import { formatMoney, miniCartOpen } from '../../components/Helper';
class VariantDetails extends React.Component {
    updateVariant = (currentVariant) => {
        // Update event for bag variants change
        let {changePlan,product} = this.props;
        let {oneTimeDisable} = product;
        if(!cn(oneTimeDisable[currentVariant.id])){
            changePlan('subscribe');
            this.props.updateVariant(currentVariant);
        }else{
            this.props.updateVariant(currentVariant);
        }
        this.props.callBack(currentVariant);
    };
    render() {
        let {currentVariant,product,settings} = this.props;
        let {variants,options,info,short_info,variantMeta} = product;
        let variantTitle = currentVariant.title;
        let availableVariants = variants.filter((item)=> item.available );
        let defaultVariant = false;
        if(variants.length === 1){
            if(variants[0].title == 'Default Title'){
                defaultVariant = true;
            }
        }
        let variantInfo  = "";
        if(info){
            variantInfo = info[variantTitle];
        }
        let {find_shade_link} = settings;

        return (
            <><div className={`xs-hide short-info${defaultVariant ? ' extra-margin' : ''}`}>{ReactHtmlParser(short_info)}</div>
            <div className={`${defaultVariant ? 'hide' : ''}`}>
                <div className="xs-hide selected-variant-details">
                    <h3 className="variant-title">{variantTitle}</h3>
                    {variantInfo && <p className="variant-info">{variantInfo}</p>}
                </div>
                <div className="variants-details">
                    {options.map((option) => {
                        let optionType = "normal";
                        if (option == "Color" || option == "color" || option == "Colour" || option == "colour") {
                            optionType = 'color'
                        }
                        return <ul className={`swatch-wrap swatch-type-${optionType}`}>
                            {variants.map((variant) => {
                                return (
                                    <VariantSelector
                                        key={variant.id}
                                        option={option}
                                        selectedVariant={currentVariant}
                                        variant={variant}
                                        variantMeta={variantMeta}
                                        changeUrl={true}
                                        setSelectedVariant={this.updateVariant}
                                    />
                                );
                            })}
                        </ul>
                    })}
                    <div className="xs-show selected-variant-details">
                        <h3 className="variant-title">{variantTitle}</h3>
                        {variantInfo && <p className="variant-info">{variantInfo}</p>}
                    </div>
                    <div className="variants-text-info">
                        <p>{availableVariants.length} Shades Available : <a href={find_shade_link}>Find your shade</a></p>
                    </div>
                </div>
            </div>
            <div className={`xs-show short-info${defaultVariant ? ' extra-margin' : ''}`}>{ReactHtmlParser(short_info)}</div>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    product: state.product.product,
    currentVariant: state.product.currentVariant,
    settings: state.product.settings,
});

const mapDispatchToProps = dispatch => {
    return {
        updateVariant: variant => dispatch(updateVariant(variant))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VariantDetails);