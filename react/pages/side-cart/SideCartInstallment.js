import React from 'react';
import HtmlParser from "react-html-parser";
const SideCartInstallment = () =>{
    return(
        <div className="installment-pay-wrap">
            <div className="installment-pay">
                <div className="klarna-img">
                    <img src={simply.sideCart.klarnaImg} alt="klarna" />
                </div>
                <div className="afterpay-img">
                    <img src={simply.sideCart.afterPayImg} alt="klarna" />
                </div>
                <p className="installment-text">
                    {HtmlParser(simply.sideCart.installmentText)}
                    <img className="payment-option-popup-open" src={simply.informationIcon} alt="Information" />
                </p>
            </div>
        </div>
    )
}
export default SideCartInstallment;