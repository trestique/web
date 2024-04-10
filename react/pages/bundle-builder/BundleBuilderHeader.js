import React, { Component } from "react";
import HeaderBar from "./HeaderBar";
import SelectionBar from './SelectionBar';
class BundleBuilderHeader extends React.Component{
    render(){
        let {selectionBarShow,step} = this.props;
        return(
        <div className="bundle-builder-header">
            <HeaderBar/>
            <SelectionBar step={step} />
        </div>
        )
    }
}
export default BundleBuilderHeader;