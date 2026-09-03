import React,{useContext} from "react";
import './Company.css';
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LanguageContext from '../../LanguageContext/LanguageContext'

const Company = (() =>{
    const navigate = useNavigate();
    const { translations } = useContext(LanguageContext);
    return(
        <div className="CompanyClass">
            <h1>NOVATECH</h1>
            <h3>{translations.TechnologyMadeSimple}</h3>
            <p>{translations.TechnologyMadeSimple2}</p>
            <div className="exploreClass">
                <h3>{translations.ExploreProducts} </h3>
                <GoArrowRight onClick={() => navigate('/product')} />
            </div>
            <h2>{translations.AboutNovaTech}</h2>
            <p>{translations.AboutNovaTech2}</p>
            <p>{translations.AboutNovaTech2}</p>
            <div className="whyClass">
                <h2>{translations.WhyChooseNovaTech}</h2>
                <ul>
                    <li>{translations.WhyChooseNovaTech2}</li>
                    <li>{translations.WhyChooseNovaTech3}</li>
                    <li>{translations.WhyChooseNovaTech4}</li>
                    <li>{translations.WhyChooseNovaTech1}</li>
                </ul>
            </div>
            <h2>{translations.misson}</h2>
            <div className="question">
                <h3>{translations.Readytofindyournextdevice}</h3>
                <Link to='../product'>{translations.ShopNow}</Link>
            </div>
        </div>
    )
})
export default Company