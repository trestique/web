import React from 'react';

const Loader = props =>{
    return(
        <div className={`react-loader ${props.show ? ' active': ''}`}>
            <div className="react-loader-wrap">
                <img src={simply.loaderImage} alt="Loading..."/>
            </div>
        </div>
    )
}
export default Loader;