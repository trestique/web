import React from "react";
import ShopByLookTemplate from './ShopByLookTemplate';
class ShopByLook extends React.Component{
    state ={
        data : null
    }
    componentDidMount (){
        let data = simply.shopByLook;
        this.setState({data});
    }
    render(){
        if(!this.state.data){
            return null;
        }
        console.log('Data => ',this.state.data);
        return(
            <div className="shop-by-look-page">
                <ShopByLookTemplate data={this.state.data} />    
            </div>
        )
    }  
};


export default ShopByLook;