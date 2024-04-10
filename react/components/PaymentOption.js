import React, { useState } from 'react';
import ReactHtmlParser from "react-html-parser";

const PaymentOption=()=> {
    let {mainTitle,installmentTitle,installmentText,installmentDescriptions,TBYBTitle,TBYBText,TBYBDescription} = simply.paymentOption;
    let installmentDescriptionsArray = installmentDescriptions.split('#');
    let TBYBDescriptionArray = TBYBDescription.split('#');
    const [togglePopup, setTogglePopup] = useState(false);
    window.showPaymentOptions = function(){
        setTogglePopup(true);
    }
    window.hidePaymentOptions = function(){
        setTogglePopup(false);
    }
    return (
        <>
                <div className={`payment-option-popup ${togglePopup ? 'active' : ''}`}>
                    <div className="payment-option-popup-content">
                    <div className="payment-option-popup-close">
                        <img src={simply.sideCart.closeIcon} alt="close" onClick={()=>setTogglePopup(false)} />
                    </div>
                        <div className="main-title">
                            <span>{ReactHtmlParser(mainTitle)}</span>
                        </div>
                        <div className="payment-option-popup-block">
                            <div className="payment-option-block">
                                <div className="title">
                                    <span>{ReactHtmlParser(installmentTitle)}</span>
                                </div>
                                <div className="text">
                                    <span> {ReactHtmlParser(installmentText)}</span>
                                </div>
                                <div className="description">
                                    <ul>
                                        {
                                            installmentDescriptionsArray.map((value, index) => {
                                                if (value !== "") {
                                                    return <li key={index}>{ReactHtmlParser(value)}</li>
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="payment-option-block">
                                <div className="title">
                                    <span>{ReactHtmlParser(TBYBTitle)}</span>
                                </div>
                                <div className="text">
                                    <span> {ReactHtmlParser(TBYBText)}</span>
                                </div>
                                <div className="description">
                                    <ul>
                                        {
                                            TBYBDescriptionArray.map((value, index) => {
                                                if (value !== "") {
                                                    return <li key={index}>{ReactHtmlParser(value)}</li>
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default PaymentOption;