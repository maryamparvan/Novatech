import React, { useContext } from "react";
import "./Support.css";
import LanguageContext from "../../LanguageContext/LanguageContext.js";

const Support = () => {
    const { translations } = useContext(LanguageContext);
    return (
        <div className="SupportClass">
            <h1>{translations.support}</h1>
            <div className="Supportquestion">
                <label>{translations.NeedHelp}</label>
                <input type="search" placeholder={translations.search}/>
            </div>
            <div className="strongPclass">
                <strong>{translations.FAQ}</strong>
                <p>{translations.FAQAnswer}</p>
                <strong>{translations.Shipping}</strong>
                <p>{translations.ShippingAnswer}</p>
                <strong>{translations.Warranty}</strong>
                <p>{translations.WarrantyAnswer}</p>
                <strong>{translations.Returns}</strong>
                <p>{translations.ReturnsAnswer}</p>
            </div>
        </div>
    );
};

export default Support;
