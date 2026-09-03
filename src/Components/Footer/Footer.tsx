import React, { useContext } from "react";
import { Link } from "react-router-dom";
import '../Footer/Footer.css';
import { SiTechcrunch } from "react-icons/si";
import LanguageContext from "../LanguageContext/LanguageContext";

const Footer = () => {

    const { translations } = useContext(LanguageContext);
    const footerLinks = [
        {
            title: "product",
            option: [
                "beauty",
                "furniture",
                "groceries",
                "fragrances"
            ]
        },
        {
            title: "support",
            option: [
                "FAQ",
                "Shipping",
                "Warranty",
                "Returns"
            ]
        },
        {
            title: "company",
            option: [
                "AboutUs",
                "ContactUs",
                "Careers"
            ]
        }
    ];

    return (
        <footer className="footer">
            <div className="footerLogo">
                <h3>NovaTech</h3>
            </div>
            <div className="footerLinks">
                {footerLinks.map((item, index) => (
                    <div key={index}>
                        <h3>
                            <Link to={`/${item.title}`}>
                              {translations[item.title]}
                            </Link>
                        </h3>
                        <ul className="ulfooter">
                            {item.option.map((option, i) => (
                                <li key={i}>
                                    {translations[option]}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <SiTechcrunch />
            </div>
        </footer>
    );
};

export default Footer;